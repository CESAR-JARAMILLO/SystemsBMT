// pages/admin-dashboard.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Box, Title } from "@mantine/core";
import AdminTable from "@/components/Admin/AdminTable";
import styles from "./page.module.css";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // ✅ Ensure user is logged in
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth");
  }

  // ✅ Ensure user is an admin
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.is_admin) {
    redirect("/dashboard");
  }

  // ✅ Fetch all **unapproved** users
  const { data: pendingUsers, error: pendingError } = await supabase
    .from("profiles")
    .select("*")
    .eq("approved", false); // ✅ Only users waiting for approval

  if (pendingError) {
    throw new Error(pendingError.message);
  }

  console.log("✅ Unapproved Users:", pendingUsers); // Debugging Log

  // Remove the onApprove prop since we're using form submissions in AdminTable
  return (
    <Box className={styles.adminDasboardPage}>
      <Title c={"#fff"} order={2}>
        Admin Dashboard
      </Title>
      <AdminTable pendingUsers={pendingUsers} />
    </Box>
  );
}
