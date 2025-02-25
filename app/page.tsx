import styles from "./page.module.css";
import { Title } from "@mantine/core";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Title order={1}>Hello</Title>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
