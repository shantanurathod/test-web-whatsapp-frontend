import { useEffect, useState } from "react";
import CreateSession from "./components/CreateSession";
import FileUploadForm from "./components/FileUploadForm";
import { socket } from "./utils/socket";
import MsgStatus from "./components/MsgStatus";
import { ShadcnFormComp } from "./components/ShadcnFormComp";
import { MessageLogs } from "./components/MessageLogs";
import { Header } from "./components/Header";
import LoginPage from "./components/LoginPage";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";

const App = () => {
  const supabase = createClient(
    "https://hvtwyhswibiambbhjghw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dHd5aHN3aWJpYW1iYmhqZ2h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzQzNDAsImV4cCI6MjAzODM1MDM0MH0.nqU9ofoCVqQUeF-QPYRND_fVZILDgGUwQGYVzZKeoXM"
  );

  const [connected, setConnected] = useState(false);
  const [isClientReady, setClientReady] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [session, setSession] = useState(null);
  useEffect(() => {
    socket.on("connect", () => {
      // console.log("connected to server")
      setConnected(true);
    });
    socket.on("clientReady", (ack) => setClientReady(ack));

    socket.on("disconnect", () => {
      setConnected(false);
      setClientReady(false);
      setIsUpload(false);
    });
  }, [session]);

  function handleIsUpload(data) {
    setIsUpload(data);
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    setSession(null);
    console.log("signout err:", error);
  }

  async function signin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      // options: {
      //   queryParams: {
      //     access_type: "offline",
      //     prompt: "consent",
      //   },
      // },
    });
    setSession(data);
  }

  function Compbaby() {
    return connected ? (
      isClientReady ? (
        <div className="md:flex md:justify-stretch">
          <FileUploadForm
            isUpload={isUpload}
            handleIsUpload={handleIsUpload}
            isClientReady={isClientReady}
          />
          <MessageLogs />
        </div>
      ) : (
        <CreateSession />
      )
    ) : (
      <div>
        <p>connecting to server...</p>
      </div>
    );
  }
  return (
    <div className="grid place-items-center w-screen">
      <Header />
      {session === null ? (
        <Button variant="default" onClick={signin}>
          Sign in with Google
        </Button>
      ) : (
        <div className="div">
          <Compbaby />
          <Button onClick={signOut}>Logout</Button>
        </div>
      )}
      {/* <h1>sdfsdf</h1> */}

      {/* {isUpload && <MsgStatus />} */}
      {/* <FileUploadForm /> */}

      {/* <ShadcnFormComp /> */}
    </div>
  );
};
export default App;
