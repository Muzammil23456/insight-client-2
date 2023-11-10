"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./style.css";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import removepng from "../../public/remove.png";
import { useDispatch } from "react-redux";
import { setBool, setBool2 } from "../../app/GlobalRedux/Features/new/newSlice";
import { auth11 } from "../../modules/fileauth";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface Errors {
  dynamicFields: {
    Name: string;
    createdBy?: string | null;
  }[];
}
type onDataType = {
  ondata: (bool: boolean) => void;
};

const Form2 = ({ ondata }: onDataType) => {
  const schema = z.object({
    dynamicFields: z.array(
      z.object({
        Name: z
          .string()
          .min(3, { message: "Atleast 3" })
          .max(50, { message: "Less than 50" }),
        Release: z.string(),
      })
    ),
  });

  const [date, setDate] = React.useState<Date>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      dynamicFields: [
        {
          Name: "",
          Release: "",
        },
      ],
    },
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  // Add Data into database

  const onSubmit = (data: any) => {
    console.log(data.dynamicFields);
    for (let i = 0; i < data.dynamicFields?.length; i++) {
      addDoc(collection(db, "Movies"), {
        Name: data.dynamicFields[i].Name,
        Release: date,
      });
    }
    if (isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      ondata(false);
      dispatch(setBool2(false));
    }
  }, [isSubmitSuccessful]);

  console.log(errors);
  
  const showError = (id: number) => {
    if (errors) {
      if (errors.dynamicFields) {
        const d: any = errors.dynamicFields;
        const a: Array<any> = d;
        if (a[id]) {
          const err = a[id].Name.message;
          return err;
        }
      }
    }
  };

  return (
    <form
      className="flex form justify-center my-5 text-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field, index: number) => (
        <>
          <div key={field.id}>
            <div className="mb-2">
              <input
                className="inputs "
                type="text"
                placeholder="Movie"
                {...register(`dynamicFields.${index}.Name`)}
              />
              {/* <span className="error ">{showError(index)}</span> */}
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar

                  {...register(`dynamicFields.${index}.Release`)}
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </>
      ))}
      <div >
        <button type="submit" className="btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form2;
