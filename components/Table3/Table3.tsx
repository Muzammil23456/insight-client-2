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

const Table3 = ({ ondata, ondata2 }: onDataType) => {
  // States

  const [filterValid, setFilterValid] = useState(true);

  const dispatch = useDispatch();
  const isBoolean = useSelector((state: any) => state.booleanValue.isBoolean);
  const { text3, booleanValue3, Continue } = useSelector(
    (state: RootState) => state.textReducer3
  );

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [userCol, setUserCol] = useState("");
  const [role, setRole] = useState("");
  const [re, setRe] = useState(true);
  const [use, setUse] = useState<object | null>(null);
  const [verfied, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  // Get Data from database
  const current = auth.currentUser?.email;
  const getdata = (): Promise<TableData> => {
    const q = query(collection(db, "test"), where("createdBy", "==", current));
    const unsub: any = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      setData2(testarr);
      console.log(testarr);
      setLoading(false);
    });
    return unsub;
  };

  // Get User from database

  const getuser = () => {
    const q = query(collection(db, "user"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ ...doc.data() });
      });
      setData3(testarr2);
      setLoading(false);
      console.log(testarr2[0].uid);
    });
    return unsub2;
  };

  const ttt = () => {
    const t = data3.forEach((e) => {
      console.log(e);
      if (auth11.currentUser?.uid == e?.uid && e?.role === "Admin") {
        localStorage.setItem("curUser", "admin");
        setRole("admin");
        console.log(e);
        setRe(false);
      } else if (auth11.currentUser?.uid == e?.uid && e?.role !== "Admin") {
        localStorage.setItem("curUser", "user");
      }
    });
    return t;
  };

  // useEffect

  useEffect(() => {
    console.log("1");
    getuser();
    ttt();
  }, []);

  useEffect(() => {
    getuser();
    ttt();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUse(user);
        setRole((pre) => pre);
        setVerified(user.emailVerified);
      } else {
        setUse(null);
      }
    });
  }, [use, verfied, onAuthStateChanged]);

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="my-5 ">
      <div className="flex gap-2">
        {!isBoolean && (
          <Tooltip>
            <TooltipTrigger
              disabled={use === null || verfied == false}
              type="submit"
              onClick={() => {
                ondata2(true);
                dispatch(setBool(true));
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
              dispatch(setBool(false));
            }}
            className=" flex btn-n justify-evenly mb-2 items-center"
          >
            <span>Close</span>
          </button>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[130px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="">Email</TableHead>
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
          {!loading && data2.length === 0 && (
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
            data2?.length !== 0 &&
            data2?.map((arr: TableData, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium text-ellipsis">
                  {arr.id}
                </TableCell>
                <TableCell>{arr.Name}</TableCell>
                <TableCell>{arr.createdBy}</TableCell>
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
                            console.log('de')
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
                            JSON.stringify([arr.id, arr.Name])
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
    </div>
  );
};

export default Table3;