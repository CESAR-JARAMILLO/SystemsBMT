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

  return (
    <Box className={styles.authContainer}>
      <Title order={2} className={styles.title}>
        {authMode === "sign_in" ? "Sign In" : "Sign Up"}
      </Title>
      <form className={styles.form}>
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
        {authMode === "sign_in" ? (
          <Button
            type="submit"
            formAction={login}
            fullWidth
            className={styles.submitButton}
          >
            Sign In
          </Button>
        ) : (
          <Button
            type="submit"
            formAction={signup}
            fullWidth
            className={styles.submitButton}
          >
            Sign Up
          </Button>
        )}
      </form>
      <Button
        variant="subtle"
        fullWidth
        className={styles.toggleButton}
        onClick={() =>
          setAuthMode(authMode === "sign_in" ? "sign_up" : "sign_in")
        }
      >
        {authMode === "sign_in"
          ? "Don't have an account? Sign Up"
          : "Already have an account? Sign In"}
      </Button>
      {authMode === "sign_up" && (
        <Checkbox
          label="I agree to receive marketing emails"
          name="marketingConsent"
          className={styles.checkbox}
        />
      )}
    </Box>
  );
};

export default Auth;
