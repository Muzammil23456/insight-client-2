"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import loader from "@/public/loading.png";
import {
  setText4,
  setBoolean4,
} from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import { auth11 } from "@/modules/fileauth";

type TableData = {
  id: string;
  uid: string;
  email: string;
  role: string;
};

type onDataType = {
  ondata: (bool: boolean) => void;
};
const Users = ({ ondata }: onDataType) => {
  const [filter, setFilter] = useState("updated");
  const dispatch = useDispatch();
  const isBoolean = useSelector((state: any) => state.booleanValue.isBoolean);
  const [data3, setData3] = useState([]);
  const [verfied, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const getuser = () => {
    const q = query(collection(db, "user"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setData3(testarr2);

      setLoading(false);
    });
    return unsub2;
  };
  useEffect(() => {
    getuser();
  }, [filter]);
  return (
    <div className="my-5 ">
      <div className="flex gap-2"></div>
      <Table>
        {!loading && data3.length === 0 && (<TableCaption>No Record Found!</TableCaption>)}
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[25%]">U-ID</TableHead>
            <TableHead className="md:w-[25%]">Email</TableHead>
            <TableHead className="md:w-[25%]">Role</TableHead>
            <TableHead className="text-right md:w-[25%]">Actions</TableHead>
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
          {!loading &&
            data3?.length !== 0 &&
            data3?.map((arr: TableData, i) => (
              <TableRow key={i}>
                <TableCell
                  className="font-medium text-ellipsis"
                  title={arr.uid}
                >
                  <p className="truncate w-[140px]">{arr.uid}</p>
                </TableCell>
                <TableCell title={arr.email}>
                  <p className="truncate w-[140px]">{arr.email}</p>
                </TableCell>
                <TableCell title={arr.role}>{arr.role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-2 justify-end">
                    <Tooltip>
                      <TooltipTrigger
                        disabled={
                          verfied !== false ||
                          localStorage.getItem("curUser") !== "admin" ||
                          auth11.currentUser?.uid === arr.uid
                        }
                        onClick={() => {
                          dispatch(setBoolean4(true));
                          dispatch(setText4("Are you Sure To Delete the user"));
                          localStorage.setItem("deleteUsers", `${arr.id}`);
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
                        {localStorage.getItem("curUser") === "admin" &&
                          auth11.currentUser?.uid !== arr.uid && <p>Delete</p>}
                        {auth11.currentUser?.uid === arr.uid && (
                          <p>Not Allowed</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger
                        type="button"
                        disabled={
                          verfied !== false ||
                          localStorage.getItem("curUser") !== "admin" ||
                          auth11.currentUser?.uid === arr.uid
                        }
                        onClick={() => {
                          localStorage.setItem(
                            "editUsers",
                            JSON.stringify([arr.id, arr.role])
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
                        {localStorage.getItem("curUser") === "admin" &&
                          auth11.currentUser?.uid !== arr.uid && <p>Edit</p>}
                        {auth11.currentUser?.uid === arr.uid && (
                          <p>Not Allowed</p>
                        )}
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

export default Users;
