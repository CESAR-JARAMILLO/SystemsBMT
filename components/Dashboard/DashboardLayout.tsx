"use client";

import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      {/* ✅ Header only for mobile */}
      <AppShell.Header hiddenFrom="sm">
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
          />
          <Text fw={600}>Bang Muay Thai Dashboard</Text>
        </Group>
      </AppShell.Header>

      {/* ✅ Sidebar (Always visible) */}
      <AppShell.Navbar p="md">
        <DashboardNavbar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
