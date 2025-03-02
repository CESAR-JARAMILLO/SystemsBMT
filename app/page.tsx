import { HeroBullets } from "@/components/LandingPage/HeroBullets";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroBullets />
    </main>
  );
}
