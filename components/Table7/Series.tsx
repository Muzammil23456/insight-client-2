"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  setText7,
  setBoolean7,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import Filter from "../Filter/Filter";
import { RootState } from "@/app/GlobalRedux/store";

type TableData = {
  id: string;
  Release: { seconds: number };
  Name: string;
};

type onDataType = {
  ondata: (bool: boolean) => void;
  ondata2: (bool: boolean) => void;
};
const Table7 = ({ ondata, ondata2 }: onDataType) => {
  const dispatch = useDispatch();
  const isBoolean = useSelector((state: any) => state.booleanValue.isBloolean2);

  const [Fav, setFav] = useState([]);
  const [role, setRole] = useState("");
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
    const q = query(collection(db, "Series"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setFav(testarr2);
      setLoading(false);
    });
    return unsub2;
  };
  useEffect(() => {
    getFav();
  }, []);
  // const date =  new Date(arr.Release.seconds*1000)
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
            <TableHead className="md:w-[130px]">ID</TableHead>
            <TableHead>Series</TableHead>
            <TableHead>Release Date</TableHead>
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
                  <p className="truncate w-[120px]">{arr.id}</p>
                </TableCell>
                <TableCell className="text-ellipsis">
                  <p className=" whitespace-pre-wrap w-[130px]">{arr.Name}</p>
                </TableCell>
                <TableCell>
                  {new Date(arr.Release.seconds * 1000).toLocaleDateString(
                    "en-US"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-2 justify-end">
                    <Tooltip>
                      <TooltipTrigger
                        disabled={
                          use === null ||
                          verfied === false ||
                          !(localStorage.getItem("curUser") == "admin")
                        }
                        onClick={() => {
                          dispatch(setBoolean7(true));
                          dispatch(
                            setText7("Are you Sure To Delete this Series")
                          );
                          localStorage.setItem("deleteSeries", `${arr.id}`);
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
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        disabled={
                          use === null ||
                          verfied === false ||
                          !(localStorage.getItem("curUser") == "admin")
                        }
                        onClick={() => {
                          localStorage.setItem(
                            "editSeries",
                            JSON.stringify([arr.Name, arr.Release.seconds * 1000, arr.id])
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
                        <p>Edit</p>
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

export default Table7;
