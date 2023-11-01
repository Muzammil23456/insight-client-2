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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "@firebase/firestore";
import { db } from "../../modules/filebase";
import "./style.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBool } from "../../app/GlobalRedux/Features/new/newSlice";
import loader from "@/public/loading.png";
import {
  setText3,
  setBoolean3,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import Filter from "../Filter/Filter";
import { RootState } from "@/app/GlobalRedux/store";
import { auth11 } from "@/modules/fileauth";
import { truncate } from "fs";

type TableData = {
  id: string;
  email: string;
  Name: string;
  createdBy: string;
  updated: string;
};

type onDataType = {
    ondata: (bool: boolean) => void;
    ondata2: (bool: boolean) => void;
  };
const Table4 = ({ ondata, ondata2 }: onDataType) => {
    const [filterValid, setFilterValid] = useState(true);

    const dispatch = useDispatch();
    const isBoolean = useSelector((state: any) => state.booleanValue.isBoolean);
    const { text3, booleanValue3, Continue } = useSelector(
      (state: RootState) => state.textReducer3
    );
    const [Fav, setFav] = useState([]);
  const [userCol, setUserCol] = useState("");
  const [role, setRole] = useState("");
  const [re, setRe] = useState(true);
  const [use, setUse] = useState<object | null>(null);
  const [verfied, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const getFav = () => {
    const q = query(collection(db, "Favourite-Movies"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ ...doc.data() });
      });
      setFav(testarr2);
      setLoading(false);
      console.log(testarr2);
    });
    return unsub2;
  };
  useEffect(() => {
    getFav();
  }, [])
  return (
    <>
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[130px]">ID</TableHead>
            <TableHead>Movies</TableHead>
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
                  <p className="truncate w-[120px]">
                  {arr.uid}
                  </p>
                </TableCell>
                <TableCell>{arr.Movies.map((a,i1) => a.Name + ", ")}</TableCell>
                <TableCell>{arr.Series.map((a,i2) => a.Name + ", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-2 justify-end">
                    <Tooltip>
                      <TooltipTrigger
                        disabled={
                          use === null ||
                          verfied === false ||
                          !(
                            localStorage.getItem("curUser") == "admin" ||
                            auth11.currentUser?.email === arr.createdBy
                          )
                        }
                        onClick={() => {
                          console.log("de");
                          dispatch(setBoolean3(true));
                          dispatch(
                            setText3("Are you Sure To Delete the record")
                          );
                          localStorage.setItem("delete", `${arr.id}`);
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
                          !(
                            localStorage.getItem("curUser") == "admin" ||
                            auth11.currentUser?.email === arr.createdBy
                          )
                        }
                        onClick={() => {
                          localStorage.setItem(
                            "edit",
                            JSON.stringify([arr.Movies.forEach(element => (element) ), arr.Series.forEach(element => {
                              element.Name
                            }) ])
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
      </Table></>
  )
}

export default Table4