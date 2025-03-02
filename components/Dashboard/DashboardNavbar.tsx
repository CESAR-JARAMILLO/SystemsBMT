"use client";

import Link from "next/link";
import { Box, Text, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // Import Supabase client
import styles from "./DashboardNavbar.module.css";

export default function DashboardNavbar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (profile?.is_admin) {
          setIsAdmin(true);
        }
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth");
  };

  return (
    <Box className={styles.navbar}>
      <Link href="/dashboard" className={styles.navLink}>
        <Text>Home</Text>
      </Link>
      <Link href="/dashboard/combos" className={styles.navLink}>
        <Text>Combos</Text>
      </Link>

      {/* Show Admin Dashboard Link if user is an Admin */}
      {isAdmin && (
        <Link href="/dashboard/admin-dashboard" className={styles.navLink}>
          <Text>Admin Dashboard</Text>
        </Link>
      )}

      <Button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
