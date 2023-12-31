"use Client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, addDoc, serverTimestamp,arrayUnion } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { query, onSnapshot } from "@firebase/firestore";
import { setBool2 } from "@/app/GlobalRedux/Features/new/newSlice";
import React, { useEffect, useState } from "react";
import { auth11 } from "@/modules/fileauth";
import { useDispatch } from "react-redux";

type TableData = {
  Name: string;
  id: string
};

type onDataType = {
  ondata: (bool: boolean) => void;
};

const SelectFav = ({ ondata }: onDataType) => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [selectMovie, setSelectMovie] = useState("");
  const [selectSeries, setSelectSeries] = useState("");
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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    addDoc(collection(db, "Favourites"), {
      Movie:  arrayUnion(selectMovie) ,
      Series: arrayUnion(selectSeries),
      uid: auth11.currentUser?.uid,
      username: auth11.currentUser?.displayName,
      created: serverTimestamp()
    }).then(() => {
      console.log(selectSeries)
      dispatch(setBool2(false));
      ondata(false);
    });
  };

  useEffect(() => {
    getMovies();
    getSeries();
  }, []);

  return (
    <div className="my-10 sm:my-5">
      <form
        className="flex form  gap-3 flex-col items-center"
        onSubmit={onSubmit}
      >
        <Select
          onValueChange={(e) => {
            setSelectMovie(e);
          }}
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
        >
          <SelectTrigger className="w-[230px]">
            <SelectValue placeholder="Series" />
          </SelectTrigger>
          <SelectContent>
            {data3.map((series: TableData, i) => (
              <SelectItem key={i} value={series.Name} >
                <p className="overflow-hidden">{series.Name}</p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button type="submit" className="Btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SelectFav;
