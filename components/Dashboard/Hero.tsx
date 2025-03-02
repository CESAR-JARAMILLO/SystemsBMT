import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import classes from "./Hero.module.css";

export default async function Hero() {
  // ✅ Create the Supabase client properly
  const supabase = await createClient(); // ✅ Await the client
  let userName = "Back!";

  // ✅ Fetch user session properly
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ Fetch profile if user exists
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("first_name")
      .eq("id", user.id)
      .single();

    if (profile?.first_name) {
      userName = profile.first_name;
    }
  }

  return (
    <div className={classes.wrapper}>
      {/* <Overlay color="#000" opacity={0.25} zIndex={1} /> */}

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome{" "}
          <Text component="span" inherit className={classes.highlight}>
            {userName}!
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            This is the beta version of the site, so you'll probably be seeing
            changes as we improve your experience.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Link href="/dashboard/combos">
            <Button className={classes.control} variant="white" size="lg">
              View Combos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
