import Auth from "@/components/Auth/Auth";
import { Box } from "@mantine/core";
import React from "react";
import styles from "./page.module.css";

const auth = () => {
  return (
    <Box className={styles.main}>
      <Auth />
    </Box>
  );
};

export default auth;
