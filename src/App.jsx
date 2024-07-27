import { useEffect, useState } from "react";
import CreateSession from "./components/CreateSession";
import FileUploadForm from "./components/FileUploadForm";
import { socket } from "./utils/socket";
import MsgStatus from "./components/MsgStatus";
import { ShadcnFormComp } from "./components/ShadcnFormComp";
import { MessageLogs } from "./components/MessageLogs";
import { Header } from "./components/Header";

const App = () => {
  const [connected, setConnected] = useState(false);
  const [isClientReady, setClientReady] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
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
  });

  function handleIsUpload(data) {
    setIsUpload(data);
  }
  return (
    <div className="grid place-items-center w-screen">
      <Header />
      {connected ? (
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
        <p>connecting to server...</p>
      )}
      {/* {isUpload && <MsgStatus />} */}
      {/* <FileUploadForm /> */}

      {/* <ShadcnFormComp /> */}
    </div>
  );
};
export default App;
