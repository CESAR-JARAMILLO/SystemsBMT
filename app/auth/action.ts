"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // Extract values from the form
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const phone = (formData.get("phone") as string) || null;

  // ✅ Create the user via Supabase Auth
  const { error, data } = await supabase.auth.signUp({ email, password });
  if (error) {
    redirect("/error");
  }

  // ✅ If user is successfully created, insert profile into Supabase
  if (data?.user) {
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        email,
        first_name: firstName,
        phone,
      },
    ]);
    if (profileError) {
      redirect("/error");
    }

    // ✅ Add user to Klaviyo
    try {
      const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
      const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

      if (!KLAVIYO_API_KEY || !KLAVIYO_LIST_ID) {
        console.error("Missing Klaviyo API Key or List ID");
        return;
      }

      // ✅ Step 1: Create or update profile in Klaviyo
      const profileResponse = await fetch(
        "https://a.klaviyo.com/api/profiles",
        {
          method: "POST",
          headers: {
            accept: "application/vnd.api+json",
            revision: "2023-01",
            "content-type": "application/vnd.api+json",
            Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          },
          body: JSON.stringify({
            data: {
              type: "profile",
              attributes: {
                email,
                first_name: firstName || "",
                phone_number: phone || "",
                properties: {
                  source: "Website Signup",
                  joined_at: new Date().toISOString(),
                },
              },
            },
          }),
        }
      );

      const profileData = await profileResponse.json();
      if (!profileResponse.ok || !profileData.data?.id) {
        console.error("Klaviyo Profile Error:", profileData);
        return;
      }

      // ✅ Step 2: Add profile to the Klaviyo List
      const profileId = profileData.data.id;
      const listResponse = await fetch(
        `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
        {
          method: "POST",
          headers: {
            accept: "application/vnd.api+json",
            revision: "2023-01",
            "content-type": "application/vnd.api+json",
            Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          },
          body: JSON.stringify({
            data: [{ type: "profile", id: profileId }],
          }),
        }
      );

      if (!listResponse.ok) {
        const listErrorData = await listResponse.json();
        console.error("Klaviyo List Subscription Error:", listErrorData);
      } else {
        console.log("User successfully added to Klaviyo list.");
      }
    } catch (error) {
      console.error("Klaviyo API Error:", error);
    }
  }

  revalidatePath("/");
  redirect("/dashboard");
}
