"use client";

import React, { useState } from "react";
import {
  Box,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Notification,
  Checkbox,
} from "@mantine/core";
import { supabase } from "@/lib/supabaseClient";
import styles from "./Auth.module.css";

const Auth: React.FC = () => {
  const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (authMode === "sign_in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Successfully signed in!");
      }
    } else {
      if (password !== verifyPassword) {
        setError("Passwords do not match");
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        const user = data.user;
        if (user) {
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: user.id,
                email,
                first_name: firstName,
                phone: phone || null,
                marketing_consent: marketingConsent,
              },
            ]);
          if (profileError) {
            setError(profileError.message);
          } else {
            setMessage(
              "Sign up successful! Please check your email for verification."
            );
          }
        }
      }
    }
  };

  return (
    <Box className={styles.authContainer}>
      <Title order={2} className={styles.title}>
        {authMode === "sign_in" ? "Sign In" : "Sign Up"}
      </Title>
      {error && (
        <Notification color="red" className={styles.notification}>
          {error}
        </Notification>
      )}
      {message && (
        <Notification color="green" className={styles.notification}>
          {message}
        </Notification>
      )}
      <form onSubmit={handleAuth} className={styles.form}>
        {authMode === "sign_up" && (
          <TextInput
            label="First Name"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
        )}
        <TextInput
          label="Email"
          placeholder="your-email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        {authMode === "sign_up" && (
          <TextInput
            label="Phone (optional)"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
          />
        )}
        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
          className={styles.input}
        />
        {authMode === "sign_up" && (
          <PasswordInput
            label="Verify Password"
            placeholder="Re-enter your password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.currentTarget.value)}
            required
            className={styles.input}
          />
        )}
        <Button type="submit" fullWidth className={styles.submitButton}>
          {authMode === "sign_in" ? "Sign In" : "Sign Up"}
        </Button>
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
          checked={marketingConsent}
          onChange={(e) => setMarketingConsent(e.currentTarget.checked)}
          className={styles.checkbox}
        />
      )}
    </Box>
  );
};

export default Auth;
