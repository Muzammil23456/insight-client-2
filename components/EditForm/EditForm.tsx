"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { db } from "../../modules/filebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
} from "@firebase/firestore";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

const schema = z.object({
  dynamicFields: z.array(
    z.object({
      Name: z
        .string()
        .min(3, { message: "Atleast 3" })
        .max(50, { message: "Less than 50" }),
    })
  ),
});

const EditForm = ({ ondata, ondata2 }) => {
  const [editArr, setEditArr] = useState([]);
  const [open, setOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("edit"));

  const onSubmit = async (da: any) => {
    setOpen(false);
    ondata2(false);
    const docRef = doc(db, "test", `${data[0]}`);
    await updateDoc(docRef, {
      Name: da.dynamicFields[0].Name,
      updated: serverTimestamp(),
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      dynamicFields: [{ Name: data[1] }],
    },
  });

  useEffect(() => {
    setOpen(ondata);
    const q = query(collection(db, "test"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      const d = testarr.filter((item: any) => item.id == data);
      setEditArr(d);
    });
    return unsubscribe;
  }, []);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <>
            <form
              className="flex form justify-center my-auto text-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <input
                  className="inputs-edit"
                  type="text"
                  placeholder="Name"
                  {...register(`dynamicFields.0.Name`)}
                />
                {errors && (
                  <span className="error ">
                    {errors?.dynamicFields?.at(0)?.Name?.message}
                  </span>
                )}
              </div>
              <button type="submit" className="btn">
                Edit
              </button>
            </form>
          </>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
          className="cancel"
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

export default EditForm;
