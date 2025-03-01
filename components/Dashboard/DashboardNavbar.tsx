import Link from "next/link";
import { Box, Text } from "@mantine/core";

export default function DashboardNavbar() {
  return (
    <Box>
      <Link href="/dashboard">
        <Text>🏠 Home</Text>
      </Link>
      <Link href="/dashboard/combos">
        <Text>🥊 Combos</Text>
      </Link>
    </Box>
  );
}
