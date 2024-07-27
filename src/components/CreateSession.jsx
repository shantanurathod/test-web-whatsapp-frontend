import { socket } from "../utils/socket";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const CreateSession = () => {
  const [QR, setQR] = useState("");
  const [createSessionBtn, setCreateSessionBtn] = useState(false);
  useEffect(() => {
    socket.on("qrGenerated", (qr) => {
      console.log("qr-->", qr);
      setQR(qr);
    });

    socket.on("clientReady", (ack) => {
      console.log("Client is Ready!", ack);
    });
  });

  return (
    <div className="space-y-3">
      <QRCode
        className="p-2 rounded bg-[#f8fafc]"
        bgColor="#f8fafc"
        fgColor="#020617"
        value={QR}
      />
      {/* <button onClick={() => {
        setCreateSessionBtn(true)
        socket.emit('createSession', "create session request from client")
      }} className="m-4 py-4 px-2 text-gray-500 cursor-not-allowed font-bold bg-white drop-shadow-2xl italic rounded text-sm" disabled={createSessionBtn}>Create Session mf</button> */}
      {createSessionBtn ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {QR.length == 0 ? "Please wait" : "Please scan QR with whatsapp"}
        </Button>
      ) : (
        <Button
          className=""
          onClick={() => {
            setCreateSessionBtn(true);
            socket.emit("createSession", "create session request from client");
          }}
          variant="ghost"
        >
          Create Session
        </Button>
      )}
    </div>
  );
};

export default CreateSession;
