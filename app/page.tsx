import styles from "./page.module.css";
import { Title } from "@mantine/core";
import CombosCardSection from "@/components/CombosCardSection/CombosCardSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title order={1}>Hello</Title>
        <CombosCardSection />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
