'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

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
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // Extract values from the form
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const phone = (formData.get('phone') as string) || null
  // Checkbox returns a value only when checked, so we convert it to a boolean
  const marketingConsent = formData.get('marketingConsent') ? true : false

  // Create the user via Supabase Auth
  const { error, data } = await supabase.auth.signUp({ email, password })
  if (error) {
    redirect('/error')
  }

  // If a user is successfully created, insert a corresponding profile
  if (data && data.user) {
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        email,
        first_name: firstName,
        phone,
        marketing_consent: marketingConsent,
      },
    ])
    if (profileError) {
      redirect('/error')
    }
  }

  revalidatePath('/')
  redirect('/')
}
