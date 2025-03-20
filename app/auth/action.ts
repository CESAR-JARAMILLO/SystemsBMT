'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { addUserToKlaviyo, subscribeProfilesToKlaviyoList } from '@/lib/klaviyo'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: loginData, error } = await supabase.auth.signInWithPassword(data)
  if (error) {
    redirect('/error')
  }

  // If login was successful, update last_logged_in in the profiles table
  if (loginData?.user) {
    await supabase
      .from('profiles')
      .update({ last_logged_in: new Date().toISOString() })
      .eq('id', loginData.user.id)
  }

  revalidatePath('/')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // ✅ Step 1: Log all form data for debugging
  console.log("📝 Raw FormData Entries:");
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  // ✅ Extract and normalize values
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  let phone_number = formData.get('phone') ? (formData.get('phone') as string) : null;

  // ✅ Ensure phone number is in E.164 format
  if (phone_number) {
    phone_number = phone_number.replace(/\D/g, ""); // Remove non-numeric characters
    if (phone_number.length === 10) {
      phone_number = `+1${phone_number}`; // Assume US number if 10 digits
    } else if (!phone_number.startsWith("+")) {
      phone_number = `+${phone_number}`; // Prepend "+" if missing
    }
  }

  // ✅ Step 2: Debug checkbox behavior
  const marketingConsent = formData.get('marketingConsent') === "true"; // Ensure correct boolean conversion
  console.log("✅ Processed Marketing Consent:", marketingConsent);

  console.log("📝 Processed Signup Data:", { email, firstName, phone_number, marketingConsent });

  // ✅ Create user in Supabase Auth
  const { error, data } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error("❌ Supabase signup error:", error);
    redirect('/error');
  }

  if (data?.user) {
    // ✅ Insert user profile into Supabase
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        email,
        first_name: firstName,
        phone_number, // ✅ Ensure it's formatted correctly
        marketing_consent: marketingConsent,
      },
    ]);
    if (profileError) {
      console.error("❌ Supabase profile insert error:", profileError);
      redirect('/error');
    }

    // ✅ Add user to Klaviyo
    try {
      await addUserToKlaviyo({
        email,
        first_name: firstName,
        phone_number,
        marketing_consent: marketingConsent,
      });
      console.log("✅ Successfully added to Klaviyo!");
    } catch (klaviyoError) {
      console.error("❌ Error adding user to Klaviyo:", klaviyoError);
    }

    // ✅ Add user to Klaviyo List
    try {
      await subscribeProfilesToKlaviyoList({
        email,
      });
      console.log("✅ Successfully added to Klaviyo List!");
    } catch (klaviyoError) {
      console.error("❌ Error adding user to Klaviyo List:", klaviyoError);
    }
  }

  revalidatePath('/');
  redirect('/dashboard');
}

export async function approveUser(formData: FormData): Promise<void> {
  // Extract userId from the form data
  const userId = formData.get("userId") as string;
  if (!userId) {
    throw new Error("User ID is required");
  }

  const supabase = await createClient();

  // Step 1: Approve the user in the "profiles" table.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ approved: true })
    .eq("id", userId);

  if (updateError) {
    console.error("❌ Error approving user:", updateError);
    throw new Error("Error approving user: " + updateError.message);
  }

  // Step 2: Fetch user details (including email, first name, phone, and marketing_consent)
  const { data, error: fetchError } = await supabase
    .from("profiles")
    .select("email, first_name, phone_number, marketing_consent")
    .eq("id", userId)
    .single();

  if (fetchError || !data || !data.email) {
    console.error("❌ Error fetching user details:", fetchError);
    throw new Error("User details not found for Klaviyo subscription");
  }

  // Step 3: Add user to Klaviyo Profile.
  // This call is likely responsible for triggering the confirmation email.
  try {
    await addUserToKlaviyo({
      email: data.email,
      first_name: data.first_name,
      phone_number: data.phone_number,
      marketing_consent: data.marketing_consent || false,
    });
    console.log("✅ Successfully added user to Klaviyo Profile!");
  } catch (klaviyoError: any) {
    console.error("❌ Error adding user to Klaviyo Profile:", klaviyoError);
    // You might choose not to throw here if you want to continue with subscription
  }

  // Step 4: Subscribe the user to the Klaviyo list (this should trigger the email confirmation)
  try {
    await subscribeProfilesToKlaviyoList({ email: data.email });
    console.log("✅ Successfully added user to Klaviyo List!");
  } catch (klaviyoError: any) {
    console.error("❌ Error subscribing user to Klaviyo List:", klaviyoError);
    throw new Error("Error subscribing user to Klaviyo list: " + klaviyoError.message);
  }

  redirect("/dashboard/admin-dashboard");
}