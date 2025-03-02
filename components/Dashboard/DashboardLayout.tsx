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
    >
      {/* ✅ Header (Visible only on mobile) */}
      <AppShell.Header
        c={"#fff"}
        p={16}
        bg={"#1F2A38"}
        withBorder={false}
        hiddenFrom="sm"
      >
        <Group h="100%" px="md">
          <Burger
            color={"#fff"}
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
          />
          <Text fw={600}>Systems BMT Dashboard</Text>
        </Group>
      </AppShell.Header>

      {/* ✅ Sidebar (Pass close handler to close on click) */}
      <AppShell.Navbar bg={"#2A3D54"} withBorder={false} p="md">
        <DashboardNavbar onClose={() => setOpened(false)} />
      </AppShell.Navbar>

      {/* ✅ Main Content */}
      <AppShell.Main pt={32} bg={"#3A506B"}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
