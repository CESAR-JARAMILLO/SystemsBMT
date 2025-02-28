import styles from "./page.module.css";
import CombosCardSection from "@/components/CombosCardSection/CombosCardSection";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <CombosCardSection />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
