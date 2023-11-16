"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateDoc, doc, serverTimestamp } from "@firebase/firestore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBool2 } from "../../app/GlobalRedux/Features/new/newSlice";
import loader from "@/public/loading.png";
import {
  setText5,
  setBoolean5,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import Filter from "../Filter/Filter";
import { RootState } from "@/app/GlobalRedux/store";
import { auth11 } from "@/modules/fileauth";

type movies = [{ Name: string }];

type series = [{ Name: string }];

type fav = [{ id: string; Movie: { Name: string }; Series: { Name: string } }];

type TableData = {
  uid: string;
  username: string;
  id: string;
  Movie: { Name: string };
  Series: { Name: string };
};

type onDataType = {
  ondata: (bool: boolean) => void;
  ondata2: (bool: boolean) => void;
};
const Fav = ({ ondata, ondata2 }: onDataType) => {
  const dispatch = useDispatch();
  const isBoolean = useSelector((state: any) => state.booleanValue.isBloolean2);
  const [Fav, setFav] = useState([]);
  const [fav2, setFav2] = useState<fav>();
  const [movies, setMovies] = useState<movies>();
  const [series, setSeries] = useState<series>();
  const [count, setCount] = useState(0);
  const [role, setRole] = useState("");
  const [re, setRe] = useState(true);
  const [use, setUse] = useState<object | null>(null);
  const [verfied, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ondata2(false);
        dispatch(setBool2(false));
        setUse(user);
        setRole((pre) => pre);
        setVerified(user.emailVerified);
      } else {
        ondata2(false);
        dispatch(setBool2(false));
        setUse(null);
      }
    });
  }, [use, verfied, onAuthStateChanged]);

  const getFav = () => {
    const q = query(collection(db, "Favourites"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ id: doc.id, ...doc.data() });
      });
      setFav(testarr2);
      setFav2(testarr2);
      setLoading(false);
    });
    return unsub2;
  };
  const getSeries = () => {
    const q = query(collection(db, "Series"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setSeries(testarr2);
      setLoading(false);
    });
    return unsub2;
  };
  const getMovies = () => {
    const q = query(collection(db, "Movies"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({
          id: doc.id,
          ...doc.data(),
          // Release: doc.data()["Release"].toMillis()
        });
      });
      setMovies(testarr2);
      setLoading(false);
    });
    return unsub2;
  };

  const compare = async () => {
    // console.log("movies", movies?.at(0)?.Name);
    // console.log("series", series?.at(0)?.Name);
    // console.log("fav", fav2?.at(0));
    for (let i = 0; i < fav2?.length; i++) {
      for (let index = 0; index < series?.length; index++) {
        if ((series?.at(index)?.Name != fav2?.at(i)?.Series?.Name)) {
          // const docRef = doc(db, "Favourites", `${fav2?.at(i)?.id}`);
          // await updateDoc(docRef, {
          //   Series: { Name: "N/A" },
          //   updated: serverTimestamp(),
          // });
          console.log(i, "not found");
          continue;
        }
      }
    }
  };

  useEffect(() => {
    getFav();
    getMovies();
    getSeries();
  }, []);
  compare();

  return (
    <>
      <div className="flex mt-4"></div>
      {!isBoolean && (
        <Tooltip>
          <TooltipTrigger
            disabled={use === null || verfied == false}
            type="submit"
            onClick={() => {
              ondata2(true);
              dispatch(setBool2(true));
            }}
            className=" flex btn-n justify-evenly mb-2 items-center"
          >
            <span>New</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width="20"
                height="20"
                viewBox="0 0 20 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            {use === null && <p>First sign Up</p>}
            {use !== null && verfied == false && <p>Not verfied</p>}
            {use !== null && !(verfied == false) && <p>Add Record</p>}
          </TooltipContent>
        </Tooltip>
      )}
      {isBoolean && (
        <button
          disabled={use === null || verfied == false}
          type="submit"
          onClick={() => {
            ondata2(false);
            dispatch(setBool2(false));
          }}
          className=" flex btn-n justify-evenly mb-2 items-center"
        >
          <span>Close</span>
        </button>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[130px]">UID</TableHead>
            <TableHead>UserName</TableHead>
            <TableHead>Movie</TableHead>
            <TableHead className="">Series</TableHead>
            <TableHead className="text-right md:w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="flex justify-start">
                <img
                  width="80"
                  height="80"
                  className="animate-spin"
                  src={loader.src}
                  alt="spinner-frame-1"
                />
              </TableCell>
              <TableCell />
            </TableRow>
          )}
          {!loading && Fav.length === 0 && (
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell className="flex justify-start">
                <p className="font-medium">No Record Found!</p>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
          {!loading &&
            Fav?.length !== 0 &&
            Fav?.map((arr: TableData, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-ellipsis">
                  <p className="truncate w-[120px]">{arr.uid}</p>
                </TableCell>
                <TableCell>{arr.username}</TableCell>
                <TableCell>{arr.Movie.Name ? arr.Movie.Name : "N/A"}</TableCell>
                <TableCell>
                  {arr.Series.Name ? arr.Series.Name : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-2 justify-end">
                    <Tooltip>
                      <TooltipTrigger
                        disabled={
                          use === null ||
                          verfied === false ||
                          !(
                            localStorage.getItem("curUser") == "admin" ||
                            auth11.currentUser?.uid == arr.uid
                          )
                        }
                        onClick={() => {
                          dispatch(setBoolean5(true));
                          dispatch(
                            setText5("Are you Sure To Delete the record")
                          );
                          localStorage.setItem("deleteFav", `${arr.id}`);
                        }}
                        className="btn-r"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon sm:w-6 sm:h-6 w-5 h-5 icon-tabler icon-tabler-trash"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M4 7l16 0"></path>
                          <path d="M10 11l0 6"></path>
                          <path d="M14 11l0 6"></path>
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        {use === null ? (
                          <p>First sign In</p>
                        ) : auth11.currentUser?.uid === arr.uid ||
                          localStorage.getItem("curUser") === "admin" ? (
                          <p>Delete</p>
                        ) : (
                          <p>Not Authorized</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        disabled={
                          use === null ||
                          verfied === false ||
                          !(
                            localStorage.getItem("curUser") == "admin" ||
                            auth11.currentUser?.uid == arr.uid
                          )
                        }
                        onClick={() => {
                          localStorage.setItem(
                            "editFav",
                            JSON.stringify([
                              arr.Movie.Name,
                              arr.Series.Name,
                              arr.id,
                            ])
                          );
                          ondata(true);
                        }}
                        className="btn-e"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon sm:w-6 sm:h-6 w-5 h-5 icon-tabler icon-tabler-edit"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path
                            stroke="none"
                            d="M0 0h24v24H0z"
                            fill="none"
                          ></path>
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                          <path d="M16 5l3 3"></path>
                        </svg>
                      </TooltipTrigger>
                      <TooltipContent>
                        {use === null ? (
                          <p>First sign In</p>
                        ) : auth11.currentUser?.uid === arr.uid ||
                          localStorage.getItem("curUser") === "admin" ? (
                          <p>Edit</p>
                        ) : (
                          <p>Not Authorized</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Fav;
