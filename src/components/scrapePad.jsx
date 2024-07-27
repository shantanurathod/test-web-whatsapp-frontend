import React from 'react'

export const scrapePad = () => {
  return (
    <div><form onSubmit={handleFormSubmit}>
    <h3>Fill details</h3>
    <div className="">
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
    <div className="">
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
    </div>
    <textarea
      disabled={isUpload}
      required
      className=""
      onChange={(e) =>
        setFileInfo({ ...fileInfo, textMessage: e.target.value })
      }
      placeholder="type your message here"
    />
    <button className="bg-gray-400 m-2 p-2 rounded" type="submit">
      Upload
    </button>
  </form></div>
  )
}

        {/* <Button
          className="w-full"
          onClick={() => {
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
          }}
        >
          {/* <Check className="mr-2 h-4 w-4" /> */}
          {/* {pause ? "Pause" : "Start"} */}
          </Button> */}