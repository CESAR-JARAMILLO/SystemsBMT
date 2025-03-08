'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { addUserToKlaviyo } from '@/lib/klaviyo'

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
        phone_number, // ✅ Corrected phone format
        marketing_consent: marketingConsent,
      });
      console.log("✅ Successfully added to Klaviyo!");
    } catch (klaviyoError) {
      console.error("❌ Error adding user to Klaviyo:", klaviyoError);
    }
  }

  revalidatePath('/');
  redirect('/dashboard');
}