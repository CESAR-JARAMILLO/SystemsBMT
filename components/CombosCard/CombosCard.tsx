import React from "react";
import { Box, Text, Badge, Button } from "@mantine/core";
import { ComboCategory } from "@/data/combos";
import styles from "./CombosCard.module.css";

interface CombosCardProps {
  category: ComboCategory;
}

const getBeltBadgeClass = (belt: string): string => {
  switch (belt) {
    case "white":
      return styles.beltWhite;
    case "yellow":
      return styles.beltYellow;
    case "orange":
      return styles.beltOrange;
    case "blue":
      return styles.beltBlue;
    default:
      return "";
  }
};

const CombosCard: React.FC<CombosCardProps> = ({ category }) => {
  return (
    <Box className={styles.comboCard}>
      <Box className={styles.cardHead}>
        <Text className={styles.categoryTitle}>{category.category}</Text>
      </Box>
      {category.combos.map((combo, comboIndex: number) => (
        <Box key={comboIndex} className={styles.cardBody}>
          {combo.belt_requirement && (
            <Badge
              className={`${styles.beltBadge} ${getBeltBadgeClass(
                combo.belt_requirement
              )}`}
            >
              {combo.belt_requirement.toUpperCase()} BELT REQUIREMENT
            </Badge>
          )}
          <Text className={styles.comboTitle}>{combo.title}</Text>
          <ul className={styles.comboList}>
            {combo.moves.map((move, moveIndex: number) => (
              <li key={moveIndex} className={styles.comboMove}>
                {move}
              </li>
            ))}
          </ul>
        </Box>
      ))}
      {category.references && category.references.length > 0 && (
        <Box className={styles.references}>
          <Text className={styles.referenceTitle}>Reference Videos:</Text>
          <Box className={styles.referenceButtons}>
            {category.references.map((ref, refIndex: number) => (
              <Button
                key={refIndex}
                className={styles.referenceButton}
                component="a"
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ref.title}
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CombosCard;
