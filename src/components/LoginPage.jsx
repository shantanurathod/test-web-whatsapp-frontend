import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "./ui/button";

export default function LoginPage({ supabase, session, setSession }) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    console.log("signout err:", error);
  }

  return (
    <Auth
      provider={["google"]}
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
    />
  );
}

// <Button onClick={signOut}>Logout</Button>
