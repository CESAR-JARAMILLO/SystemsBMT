"use client";

import React, { useState } from "react";
import { Box, SegmentedControl, TextInput } from "@mantine/core";
import combos from "@/data/combos";
import styles from "./CombosCardSection.module.css";
import CombosCard from "../CombosCard/CombosCard";

const beltOptions = [
  { label: "All", value: "all" },
  { label: "White", value: "white" },
  { label: "Yellow", value: "yellow" },
  { label: "Orange", value: "orange" },
  { label: "Blue", value: "blue" },
];

const CombosCardSection: React.FC = () => {
  const [selectedBelt, setSelectedBelt] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter each category's combos by both belt and search query
  const filteredCombos = combos
    .map((category) => {
      const filteredCategoryCombos = category.combos.filter((combo) => {
        const matchesBelt =
          selectedBelt === "all" || combo.belt_requirement === selectedBelt;
        const matchesSearch = combo.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesBelt && matchesSearch;
      });
      return { ...category, combos: filteredCategoryCombos };
    })
    .filter((category) => category.combos.length > 0);

  return (
    <Box className={styles.cardSection}>
      <TextInput
        className={styles.searchInput}
        placeholder="Search combos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        mb="md"
      />
      <Box className={styles.segmentControlContainer}>
        <SegmentedControl
          data={beltOptions}
          value={selectedBelt}
          onChange={setSelectedBelt}
        />
      </Box>
      <Box className={styles.container}>
        {filteredCombos.map((category, index) => (
          <CombosCard key={index} category={category} />
        ))}
      </Box>
    </Box>
  );
};

export default CombosCardSection;
