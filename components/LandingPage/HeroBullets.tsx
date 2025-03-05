"use client";

import { useEffect, useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import image from "@/public/bmt-landing.jpg";
import styles from "./HeroBullets.module.css";

// ✅ Define _klOnsite globally to avoid TypeScript errors
declare global {
  interface Window {
    _klOnsite?: {
      openForm: (args: [string]) => void;
    };
  }
}

export function HeroBullets() {
  const [klaviyoLoaded, setKlaviyoLoaded] = useState(false);

  useEffect(() => {
    // ✅ Check if Klaviyo script is loaded every 500ms
    const checkKlaviyoScript = setInterval(() => {
      if (window._klOnsite) {
        setKlaviyoLoaded(true);
        clearInterval(checkKlaviyoScript);
      }
    }, 500);

    return () => clearInterval(checkKlaviyoScript);
  }, []);

  const handleOpenKlaviyoForm = () => {
    if (klaviyoLoaded && window._klOnsite) {
      window._klOnsite.openForm(["XYNAsn"]);
      console.log("Klaviyo form triggered!");
    } else {
      console.error("Klaviyo script not loaded yet.");
    }
  };

  return (
    <>
      <Button
        component="a"
        href="/auth"
        radius="xl"
        size="md"
        className={styles.memberLoginButton}
      >
        Member Login
      </Button>

      <Container size="md">
        <div className={styles.inner}>
          <div className={styles.content}>
            <Title order={1} className={styles.title}>
              Get Fit, Learn Self-Defense, <br />
              and{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red", to: "yellow" }}
              >
                Have Fun with Systems BMT
              </Text>
            </Title>
            <Text className={styles.description} mt="md">
              Looking for a <b>fun, beginner-friendly</b> way to get in shape,
              build confidence, and be part of an amazing community? Systems
              Bang Muay Thai makes it easy for anyone—no experience required!
              Our structured
              <b> belt progression system</b> ensures you improve step by step
              while having fun.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon bg={"#ff8000"} size={32} radius="xl">
                  <IconCheck size={22} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item className={styles.listItem}>
                <span className={styles.listItemTitle}>
                  Perfect for Beginners
                </span>{" "}
                – No experience? No problem! Our <b>step-by-step coaching</b>{" "}
                ensures you start with the basics and progress at your own pace.
              </List.Item>
              <List.Item className={styles.listItem}>
                <span className={styles.listItemTitle}>
                  Structured Belt System
                </span>{" "}
                – Track your progress and
                <b> earn belts & certifications</b> as you improve. Set goals
                and level up with confidence.
              </List.Item>
              <List.Item className={styles.listItem}>
                <span className={styles.listItemTitle}>
                  Get in Shape While Having Fun
                </span>{" "}
                – Burn calories, improve endurance, and build strength with
                engaging, high-energy workouts designed for
                <b> all fitness levels</b>.
              </List.Item>
            </List>

            {/* ✅ "Learn More" button that triggers Klaviyo pop-up */}
            <Group mt={30} className={styles.emailForm}>
              <Button
                radius="xl"
                size="md"
                className={styles.emailButton}
                onClick={handleOpenKlaviyoForm}
                disabled={!klaviyoLoaded} // Button disabled until Klaviyo loads
              >
                Learn More
              </Button>
            </Group>
          </div>
          <Image radius="xl" src={image.src} className={styles.image} />
        </div>
      </Container>
    </>
  );
}
