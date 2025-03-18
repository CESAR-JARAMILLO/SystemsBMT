// components/Admin/AdminTable.server.tsx
import { Box } from "@mantine/core";
import styles from "./AdminTable.module.css";
import { approveUser } from "@/app/auth/action";

interface Profile {
  id: string;
  email: string;
  first_name: string;
  phone?: string;
  created_at: string;
  approved: boolean;
}

interface AdminTableProps {
  pendingUsers: Profile[];
}

export default function AdminTable({ pendingUsers }: AdminTableProps) {
  return (
    <Box className={styles.scrollArea}>
      <Box component="table" className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.tr}>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Created At</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {pendingUsers.map((user) => (
            <tr key={user.id} className={styles.tr}>
              <td className={styles.td}>{user.first_name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>{user.phone || "N/A"}</td>
              <td className={styles.td}>
                {new Date(user.created_at).toLocaleString()}
              </td>
              <td className={styles.td}>
                {/* Pass the server action function as the form's action */}
                <form action={approveUser}>
                  <input type="hidden" name="userId" value={user.id} />
                  <button type="submit" className={styles.button}>
                    Approve
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Box>
  );
}
