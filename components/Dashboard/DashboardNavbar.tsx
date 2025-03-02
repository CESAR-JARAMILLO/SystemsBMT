"use client";

import Link from "next/link";
import { Box, Text, Button, CloseButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import styles from "./DashboardNavbar.module.css";

export default function DashboardNavbar({ onClose }: { onClose?: () => void }) {
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
      {/* ✅ Close Button (For Mobile) */}
      <CloseButton
        onClick={onClose}
        className={styles.closeButton}
        size="lg"
        aria-label="Close navbar"
      />

      <Link href="/dashboard" className={styles.navLink} onClick={onClose}>
        <Text>Home</Text>
      </Link>
      <Link
        href="/dashboard/combos"
        className={styles.navLink}
        onClick={onClose}
      >
        <Text>Combos</Text>
      </Link>

      {isAdmin && (
        <Link
          href="/dashboard/admin-dashboard"
          className={styles.navLink}
          onClick={onClose}
        >
          <Text>Admin Dashboard</Text>
        </Link>
      )}

      <Button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}
