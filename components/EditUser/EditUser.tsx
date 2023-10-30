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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


type onDataType = {
  ondata: boolean;
  ondata2: (bool: boolean) => void;
};

const EditUser = ({ ondata, ondata2 }: onDataType) => {
  const [editArr, setEditArr] = useState([]);
  const [open, setOpen] = useState(false);
  const data = JSON.parse(localStorage.getItem("edit2") || "{}");
  const [select, setSelect] = useState(data[1]);

  const onSubmit = async (da: any) => {
    setOpen(false);
    ondata2(false);
    const docRef = doc(db, "user", `${data[0]}`);
    await updateDoc(docRef, {
      role: select,
    });
  };


  useEffect(() => {
    setOpen(ondata);
    const q = query(collection(db, "user"));
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
              onSubmit={onSubmit}
            >
              <div>
                <Select onValueChange={(e)=>{setSelect(e)}} defaultValue={select}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
               
              </div>
              <button type="submit" className="btn">
                Update
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

export default EditUser;
