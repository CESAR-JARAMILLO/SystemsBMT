import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Box, Table, Title } from "@mantine/core";

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
    <Box p="md">
      <Title order={2}>Admin Dashboard</Title>
      <Table highlightOnHover striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Belt Level</th>
            <th>Created At</th>
            <th>Last Logged In</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile: any) => (
            <tr key={profile.id}>
              <td>{profile.first_name}</td>
              <td>{profile.email}</td>
              <td>{profile.phone || "N/A"}</td>
              <td>{profile.belt_level}</td>
              <td>{new Date(profile.created_at).toLocaleString()}</td>
              <td>
                {profile.last_logged_in
                  ? new Date(profile.last_logged_in).toLocaleString()
                  : "Never"}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
