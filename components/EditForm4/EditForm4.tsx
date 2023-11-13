"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as React from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";

type TableData = {
  Name: string;
};

type onDataType = {
  ondata: boolean;
  ondata2: (bool: boolean) => void;
};

const EditForm4 = ({ ondata, ondata2 }: onDataType) => {
  const da = JSON.parse(localStorage.getItem("edit5") || "{}");
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectMovie, setSelectMovie] = useState(da[0]);
  const [selectSeries, setSelectSeries] = useState(da[1]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const getMovies = () => {
    const q = query(collection(db, "Movies"));
    const unsub: any = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      setData2(testarr);
    });
    return unsub;
  };

  const getSeries = () => {
    const q = query(collection(db, "Series"));
    const unsub: any = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      setData3(testarr);
    });
    return unsub;
  };

  useEffect(() => {
    getMovies();
    getSeries();
    setOpen(ondata);
  }, []);

  const onSubmit = async () => {
    setOpen(false);
    ondata2(false);
    const docRef = doc(db, "Favourites", `${da[2]}`);
    await updateDoc(docRef, {
      Movie: { Name: selectMovie },
      Series: { Name: selectSeries },
      updated: serverTimestamp(),
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="my-10 sm:my-5">
            <form
              className="flex form  gap-3 flex-col items-center"
              onSubmit={onSubmit}
            >
              <Select
                onValueChange={(e) => {
                  setSelectMovie(e);
                }}
                defaultValue={selectMovie}
              >
                <SelectTrigger className="w-[230px]">
                  <SelectValue placeholder="Movies" />
                </SelectTrigger>
                <SelectContent>
                  {data2.map((movie: TableData, i) => (
                    <SelectItem key={i} value={movie.Name}>
                      {movie.Name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(e) => {
                  setSelectSeries(e);
                }}
                defaultValue={selectSeries}
              >
                <SelectTrigger className="w-[230px]">
                  <SelectValue placeholder="Series" />
                </SelectTrigger>
                <SelectContent>
                  {data3.map((series: TableData, i) => (
                    <SelectItem key={i} value={series.Name}>
                      <p className="overflow-hidden">{series.Name}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
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

export default EditForm4;
