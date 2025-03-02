import Hero from "@/components/Dashboard/Hero";
import { Box } from "@mantine/core";
import styles from "./page.module.css";

const DashboardPage = () => {
  return (
    <Box className={styles.main}>
      <Hero />
    </Box>
  );
};

export default DashboardPage;
