import React, { useEffect, useState } from 'react'
import { socket } from "../utils/socket";

const MsgStatus = () => {
    const [currStatus, setCurrStatus] = useState("")
    const [pause, setPause] = useState(false);
    const [inProcess, setInProcess] = useState(false)

    useEffect(()=>{
        socket.on("currStatus", (status) => setCurrStatus(currStatus + status + "\n"))
    })
  return (
    <div>
        <h2>File uploaded successfully</h2><br/>
        <textarea readOnly disabled placeholder={currStatus}/><br/>
        <button className='m-2 p-2' onClick={()=>{
            console.log("start sending")
            if(!inProcess)
            {
              socket.emit('startSending', "start sending messages")
              setInProcess(true)
              setPause(!pause)
              return
            }
            if(!pause) socket.emit('resumeSending', "resume sending messages")
            else socket.emit("pauseSending", "pause sending messages")
            setPause(!pause)
        }}>{pause ? "Pause" : "Start"}</button>
    </div>
  )
}

export default MsgStatus