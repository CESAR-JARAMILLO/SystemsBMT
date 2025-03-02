// pages/admin-dashboard.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Box, Title } from "@mantine/core";
import AdminTable from "@/components/Admin/AdminTable";
import styles from "./page.module.css";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth");
  }

  // Check if the user is an admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || !profile.is_admin) {
    redirect("/auth");
  }

  // Fetch all user profiles from the "profiles" table
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*");

  if (profilesError) {
    throw new Error(profilesError.message);
  }

  return (
    <Box className={styles.adminDasboardPage}>
      <Title c={"#fff"} order={2}>
        Admin Dashboard
      </Title>
      <AdminTable profiles={profiles} />
    </Box>
  );
}
