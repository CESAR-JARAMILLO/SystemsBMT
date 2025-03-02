"use client";

import React, { useState } from "react";
import { ScrollArea, Table } from "@mantine/core";
import styles from "./AdminTable.module.css";

interface Profile {
  id: string;
  email: string;
  first_name: string;
  phone?: string;
  belt_level: string;
  created_at: string;
  last_logged_in?: string;
}

interface AdminTableProps {
  profiles: Profile[];
}

export default function AdminTable({ profiles }: AdminTableProps) {
  const [scrolled, setScrolled] = useState(false);

  const rows = profiles.map((profile) => (
    <Table.Tr key={profile.id}>
      <Table.Td>{profile.first_name}</Table.Td>
      <Table.Td>{profile.email}</Table.Td>
      <Table.Td>{profile.phone || "N/A"}</Table.Td>
      <Table.Td>{profile.belt_level}</Table.Td>
      <Table.Td>{new Date(profile.created_at).toLocaleString()}</Table.Td>
      <Table.Td>
        {profile.last_logged_in
          ? new Date(profile.last_logged_in).toLocaleString()
          : "Never"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea
      h={300}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table className={styles.table} miw={700}>
        <Table.Thead
          className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
        >
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Belt Level</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Last Logged In</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
