import React, { useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"



const FileUploadForm = ({handleIsUpload, isUpload}) => {
  const [file, setFile] = useState(null);
  const [wrongType, setWrongType] = useState(false)
  const [fileInfo, setFileInfo] = useState({
    sheetName: "",
    contactColumn: 0,
    nameColumn: null,
    starting: null,
    ending: null,
    textMessage: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const url = "http://localhost:3001/";
    const formData = new FormData();
    if (file) {
      // console.log("File type: ", file.type);
      formData.append("sheet", file);
    }
    for (const key in fileInfo) {
      formData.append(key, fileInfo[key]);
    }
    fetch(url, {
      method: "POST",
      body: formData,
      // mode: "no-cors"
    }).then(response => {
      if(response.ok)
      {
        handleIsUpload(true)
      }
      response.text()
    })
    .then(res => console.log("res:",res))
    .catch(err => {
      console.log("error", err)
      handleIsUpload(false)
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <h3>Fill details</h3> */}
        {/* <div className="">
          <input
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
                setWrongType(true)
              } else {
                setFile(e.target.files[0]);
                setWrongType(false)
              }
            }}
          />
        </div> */}
        {/* <div className="">
          <input
            disabled={isUpload}
            required
            className=""
            onChange={(e) =>
              setFileInfo({ ...fileInfo, contactColumn: Number(e.target.value) })
            }
            placeholder="Contact column"
            type="text"
          />
        </div> */}
        {/* <textarea
          disabled={isUpload}
          required
          className=""
          onChange={(e) =>
            setFileInfo({ ...fileInfo, textMessage: e.target.value })
          }
          placeholder="type your message here"
        /> */}
        {/* <button className="bg-gray-400 m-2 p-2 rounded" type="submit">
          Upload
        </button> */}
      </form>


      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="sheet">Excel File (.xlsx, .xls)</Label>
        <Input 
          id="sheet" 
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
              setWrongType(true)
            } else {
              setFile(e.target.files[0]);
              setWrongType(false)
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
          placeholder="Column number" />
        <Textarea 
          disabled={isUpload}
          required
          className=""
          onChange={(e) =>
            setFileInfo({ ...fileInfo, textMessage: e.target.value })
          }
          placeholder="Type your message here."
        />
        <Button type="submit" >Upload</Button>
    </div>
    </div>
    
  );
};

export default FileUploadForm;
