import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ✅ IMPORTANT: Do not remove this
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ Allow access to public pages
  const isPublicPage = ["/", "/about", "/contact"].some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // ✅ Redirect unauthenticated users away from protected routes
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
                           request.nextUrl.pathname.startsWith('/admin-dashboard');

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    return NextResponse.redirect(url);
  }

  // ✅ Check if user is pending approval
  if (user) {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('is_admin, approved')
      .eq('id', user.id)
      .single();

    if (profileError || !profileData) {
      console.error("❌ Error fetching profile:", profileError);
      const url = request.nextUrl.clone();
      url.pathname = '/auth'; // Redirect to login if profile data is missing
      return NextResponse.redirect(url);
    }

    // ✅ Redirect to pending approval page ONLY if accessing /dashboard
    if (!profileData.approved && request.nextUrl.pathname.startsWith('/dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = '/pending-approval';
      return NextResponse.redirect(url);
    }

    // ✅ Restrict non-admins from admin dashboard
    if (!profileData.is_admin && request.nextUrl.pathname.startsWith('/admin-dashboard')) {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
