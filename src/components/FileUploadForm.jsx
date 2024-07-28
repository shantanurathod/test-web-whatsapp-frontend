import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { socket } from "../utils/socket";
import { BellRing, Check } from "lucide-react";

const FileUploadForm = ({ handleIsUpload, isUpload, isClientReady }) => {
  const [file, setFile] = useState(null);
  const [wrongType, setWrongType] = useState(false);
  const [pause, setPause] = useState(false);
  const [processComplete, setProcessComplete] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [fileInfo, setFileInfo] = useState({
    sheetName: "",
    contactColumn: 0,
    nameColumn: null,
    starting: null,
    ending: null,
    textMessage: "",
  });
  // isClientReady = true;
  function handleFormSubmit(e) {
    e.preventDefault();
    const url =
      process.env.USER === "ubuntu"
        ? process.env.PROD_URL
        : "http://localhost:3001/";
    const formData = new FormData();
    if (file) {
      // console.log("File type: ", file.type);
      formData.append("sheet", file);
    }
    for (const key in fileInfo) {
      formData.append(key, fileInfo[key]);
    }
    fetch("/api/data", {
      method: "POST",
      body: formData,
      // headers: {
      //    "Access-Control-Allow-Origin":"*"
      // },
      // mode: "no-cors",
    })
      .then((response) => {
        if (response.ok) {
          handleIsUpload(true);
        }
        response.text();
      })
      .then((res) => console.log("res:", res))
      .catch((err) => {
        console.log("error", err);
        handleIsUpload(false);
      });
  }

  function startSendingFunc() {
    console.log("start sending");
    if (!inProcess) {
      socket.emit("startSending", "start sending messages");
      setInProcess(true);
      setPause(!pause);
      return;
    }
    if (!pause) socket.emit("resumeSending", "resume sending messages");
    else socket.emit("pauseSending", "pause sending messages");
    setPause(!pause);
  }

  function ButtonChoices() {
    if (processComplete) {
      return (
        <Button
          variant="default"
          disabled={true}
          className="bg-green-900 text-green-400"
        >
          <Check className="" />
          Process Complete
        </Button>
      );
    }
    if (isClientReady && isUpload) {
      if (inProcess) {
        return (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            In progress
          </Button>
        );
      } else {
        return (
          <Button
            variant="default"
            className="bg-green-400 text-gray-900 hover:text-white"
            onClick={startSendingFunc}
          >
            Start
          </Button>
        );
      }
    } else {
      if (isUpload) {
        return (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading
          </Button>
        );
      } else {
        return <Button onClick={handleFormSubmit}>Upload</Button>;
      }
    }
  }

  useEffect(() => {
    socket.on("processComplete", (ack) => {
      console.log(ack);
      setInProcess(false);
      setProcessComplete(true);
    });
  });
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="sheet">Excel File (.xlsx, .xls)</Label>
      <Input
        id="sheet"
        disabled={isUpload}
        required
        type="file"
        name="sheet"
        accept=".xlsx, .xls"
        onChange={(e) => {
          const file = e.target.files[0];
          if (
            file.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          ) {
            // setWrongType(true);
          } else {
            setFile(e.target.files[0]);
            // setWrongType(false);
          }
        }}
      />
      <Input
        disabled={isUpload}
        required
        className=""
        onChange={(e) =>
          setFileInfo({ ...fileInfo, contactColumn: Number(e.target.value) })
        }
        type="number"
        placeholder="Column number"
      />
      <Textarea
        disabled={isUpload}
        required
        className=""
        onChange={(e) =>
          setFileInfo({ ...fileInfo, textMessage: e.target.value })
        }
        placeholder="Type your message here."
      />
      {ButtonChoices()}
    </div>
  );
};

export default FileUploadForm;
