"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { db } from "../../modules/filebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
  writeBatch,
} from "@firebase/firestore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
interface Errors {
  dynamicFields: {
    Name: string;
    createdBy?: string | null;
  }[];
}
type onDataType = {
  ondata: boolean;
  ondata2: (bool: boolean) => void;
};

const EditSeries = ({ ondata, ondata2 }: onDataType) => {
  const schema = z.object({
    dynamicFields: z.array(
      z.object({
        Name: z
          .string()
          .min(3, { message: "Atleast 3" })
          .max(50, { message: "Less than 50" }),
        Release: z.any(),
      })
    ),
  });

  const [open, setOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("editSeries") || "{}");
  const [Fav, setFav] = useState([]);
  const [date, setDate] = useState<Date>();
  const [date2, setDate2] = useState<Date>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      dynamicFields: [
        {
          Name: data[0],
          Release: date,
        },
      ],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  const getFav = () => {
    const q = query(collection(db, "Favourites"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ id: doc.id, ...doc.data() });
      });
      setFav(testarr2);
    });
    return unsub2;
  };
  // Add Data into database

  const onSubmit = async (da: any) => {
    const batch = writeBatch(db);
    const i = Fav.filter((e: any) => e.Series[0] == data[0]);
    setOpen(false);
    ondata2(false);
    if (date) {
      const docRef = doc(db, "Series", `${data[2]}`);
      console.log(date);
      await updateDoc(docRef, {
        Name: da.dynamicFields[0].Name,
        Release: Timestamp.fromDate(date),
        updated: serverTimestamp(),
      }).then(() => {
        console.log(i);
        i.forEach((e: any, i) => {
          const docRef = doc(db, "Favourites", e.id);
          batch.update(docRef, {
            Series: [da.dynamicFields[0].Name],
            updated: serverTimestamp(),
          });
        });
        batch.commit();
      });
    }
  };

  useEffect(() => {
    getFav();
    const d = new Date(data[1]);
    setDate(d);
    setOpen(ondata);
    const q = query(collection(db, "Movies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      const d = testarr.filter((item: any) => item.id == data);
      // setEditArr(d);
    });
    return unsubscribe;
  }, []);

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <>
            <form
              className="flex editform justify-center my-auto text-center "
              onSubmit={handleSubmit(onSubmit)}
            >
              {fields.map((field, index: number) => (
                <div key={field.id} className="w-full">
                  <div className="mb-2">
                    <input
                      className="inputs-edit "
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
                          "sm:w-[280px] w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        defaultMonth={date}
                        required
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
              ))}

              <button type="submit" className="EditBtn">
                Submit
              </button>
            </form>
          </>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              ondata2(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditSeries;
