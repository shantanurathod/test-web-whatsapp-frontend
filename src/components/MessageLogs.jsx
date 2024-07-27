import { BellRing, Check } from "lucide-react";
import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { socket } from "../utils/socket";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

// const notifications = [
//   {
//     title: "Your call has been confirmed.",
//     description: "1 hour ago",
//   },
//   {
//     title: "You have a new message!",
//     description: "1 hour ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
//   {
//     title: "Your subscription is expiring soon!",
//     description: "2 hours ago",
//   },
// ];

export function MessageLogs({ className, ...props }) {
  const [currStatus, setCurrStatus] = useState([]);

  useEffect(() => {
    socket.on("currStatus", (status) => {
      console.log(currStatus);
      setCurrStatus([...currStatus, status]);
    });
  });
  return (
    <Card className={cn("w-[383px] md:mx-3 my-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Message Status</CardTitle>
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
      </CardHeader>
      <CardContent className="grid gap-4">
        {currStatus.length == 0 ? (
          <p className="text-gray-400">currently no message</p>
        ) : (
          <ScrollArea className="h-72 rounded-md ">
            <div>
              {currStatus.map((status, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-md font-medium leading-none">{status}</p>
                    <p className="text-sm text-muted-foreground">
                      {/* {notification.description} */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
