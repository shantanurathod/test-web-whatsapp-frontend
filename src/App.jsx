import { useEffect, useState } from "react";
import CreateSession from "./components/CreateSession"
import FileUploadForm from "./components/FileUploadForm";
import { socket } from "./utils/socket";
import MsgStatus from "./components/MsgStatus";
import {MessageLogs} from "./components/MessageLogs"

const App = () => {
  const [connected, setConnected] = useState(false);
  const [isClientReady, setClientReady] = useState(false)
  const [isUpload, setIsUpload] = useState(false)
  useEffect(()=>{
    socket.on("connect", () => {
      // console.log("connected to server")
      setConnected(true)
    })
    socket.on("clientReady", (ack) => 
    setClientReady(ack)
    )

    socket.on('disconnect', () => {
      setConnected(false)
      setClientReady(false)
      setIsUpload(false)
    })
  })

  function handleIsUpload(data)
  {
    setIsUpload(data)
  }
  return (
    <div>
      <h1 className="">Whatsapp-bot</h1>
      {connected ? (isClientReady ? <FileUploadForm isUpload = {isUpload} handleIsUpload = {handleIsUpload}/> : <CreateSession/>) : <p>connecting to server...</p>}
      {isUpload && <MsgStatus/>}
      <FileUploadForm/>
      <MessageLogs/>
    </div>
  );
};
export default App;
