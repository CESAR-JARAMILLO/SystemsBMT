"use client";

import React, { useState } from "react";
import {
  Box,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Checkbox,
} from "@mantine/core";
import styles from "./Auth.module.css";
import { login, signup } from "@/app/auth/action";

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [loading, setLoading] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // ✅ Ensure checkbox value is added to FormData
    const formData = new FormData(event.currentTarget);
    formData.set("marketingConsent", marketingConsent.toString());

    // Determine which function to use
    const formAction = authMode === "sign_in" ? login : signup;

    // Execute login/signup function
    try {
      await formAction(formData);
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.authContainer}>
      <Title order={2} className={styles.title}>
        {authMode === "sign_in" ? "Sign In" : "Sign Up"}
      </Title>

      <form className={styles.form} onSubmit={handleSubmit}>
        {authMode === "sign_up" && (
          <TextInput
            label="First Name"
            name="firstName"
            placeholder="Your first name"
            required
            className={styles.input}
          />
        )}
        <TextInput
          label="Email"
          name="email"
          placeholder="your-email@example.com"
          required
          className={styles.input}
        />
        {authMode === "sign_up" && (
          <TextInput
            label="Phone (optional)"
            name="phone"
            placeholder="Your phone number"
            className={styles.input}
          />
        )}
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Your password"
          required
          className={styles.input}
        />
        {authMode === "sign_up" && (
          <PasswordInput
            label="Verify Password"
            name="verifyPassword"
            placeholder="Re-enter your password"
            required
            className={styles.input}
          />
        )}
        {/* {authMode === "sign_up" && (
          <Checkbox
            label="I agree to receive marketing emails"
            name="marketingConsent"
            checked={marketingConsent}
            onChange={(event) =>
              setMarketingConsent(event.currentTarget.checked)
            }
          />
        )} */}
        <Button
          type="submit"
          fullWidth
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? authMode === "sign_in"
              ? "Signing In..."
              : "Signing Up..."
            : authMode === "sign_in"
            ? "Sign In"
            : "Sign Up"}
        </Button>
      </form>

      <Button
        variant="subtle"
        fullWidth
        className={styles.toggleButton}
        onClick={() =>
          setAuthMode(authMode === "sign_in" ? "sign_up" : "sign_in")
        }
        disabled={loading}
      >
        {authMode === "sign_in"
          ? "Don't have an account? Sign Up"
          : "Already have an account? Sign In"}
      </Button>
    </Box>
  );
};

export default Auth;
