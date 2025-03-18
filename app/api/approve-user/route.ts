import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { subscribeProfilesToKlaviyoList } from "@/lib/klaviyo";

export async function POST(req: Request) {
  console.log("🚀 POST endpoint hit");
  
  const supabase = await createClient(); 
  console.log("✅ Supabase client created");

  try {
    const { userId } = await req.json();
    console.log("📥 Received payload:", { userId });
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // ✅ Approve user in `profiles`
    const { error } = await supabase
      .from("profiles")
      .update({ approved: true })
      .eq("id", userId);
    
    if (error) {
      console.error("❌ Error updating profile approval:", error);
      return NextResponse.json({ error: "Failed to approve user" }, { status: 500 });
    }
    console.log("✅ User approved in profiles");

    // ✅ Fetch user email
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .single();
    
    if (fetchError || !data?.email) {
      console.error("❌ Error fetching user email:", fetchError);
      return NextResponse.json({ error: "User email not found" }, { status: 404 });
    }
    console.log("📩 Fetched user email:", data.email);

    // ✅ Add approved user to Klaviyo List
    console.log("📩 Preparing to send email to Klaviyo:", data.email);
    try {
      await subscribeProfilesToKlaviyoList({ email: data.email });
      console.log("✅ Successfully added to Klaviyo List!");
    } catch (klaviyoError) {
      console.error("❌ Error adding user to Klaviyo List:", klaviyoError);
      return NextResponse.json({ error: "Failed to add user to Klaviyo" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Error approving user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
