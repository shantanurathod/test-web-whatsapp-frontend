// "use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  sheet: z
    .instanceof(FileList)
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, "File size must be less than 3MB")
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, "File must be a XLS. XLSX"),
  // sheet: z
  // .any()
  // .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
  // .refine((files) => files?.[0]?.size >= MAX_UPLOAD_SIZE, `Max file size is 5MB.`) // this should be greater than or equals (>=) not less that or equals (<=)
  // .refine(
  //   (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
});

export function ShadcnFormComp() {
  const [file, setFile] = useState();
  const [fileInfo, setFileInfo] = useState({
    sheetName: "",
    contactColumn: 0,
    nameColumn: null,
    starting: null,
    ending: null,
    textMessage: "",
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      sheet: "",
    },
  });

  function onUpload(e) {
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
    })
      .then((response) => {
        if (response.ok) {
          // handleIsUpload(true)
        }
        response.text();
      })
      .then((res) => console.log("res:", res))
      .catch((err) => {
        console.log("error", err);
        //   handleIsUpload(false)
      });
  }

  function onSubmit() {
    onUpload();
    console.log("submitted");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="sheet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload your Excel File</FormLabel>
              <FormControl>
                
              </FormControl>
              <FormDescription>
                .xls and .xlsx type files are allowed
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Input
          id="sheet"
          type="file"
          accept=".xls,.xlsx"
          //   {...field}
          onChange={(e) => {
            const file = e.target.files[0];
            if (
              file.type !==
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
              //   setWrongType(true)
            } else {
              setFile(e.target.files[0]);
              //   setWrongType(false)
            }
          }}
        />
        <Button onClick={onUpload}>Upload</Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
