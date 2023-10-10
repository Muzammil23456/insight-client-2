"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  orderBy,
} from "@firebase/firestore";
import { db } from "../../modules/filebase";
import "./style.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBoolean } from "../../app/GlobalRedux/Features/new/newSlice";
import loading from "../../public/Dual Ring-1.4s-194px.png";
const Tablee = ({ ondata, ondata2 }) => {
  const dispatch = useDispatch();
  const isBoolean = useSelector((state) => state.booleanValue.isBoolean);
  const isBoolean2 = useSelector((state) => state);

  const [data2, setData2] = useState([]);
  const [use, setUse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get Data from database

  const getdata = () => {
    const q = query(collection(db, "test"), orderBy("updated", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let testarr: any = [];
      querySnapshot.forEach((doc) => {
        testarr.push({ ...doc.data(), id: doc.id });
      });
      setData2(testarr);
      setLoading(false);
    });
    return unsubscribe;
  };

  // console.log(user)

  // Delete Data From database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "test", id));
  };
  useEffect(() => {
    getdata();
  }, []);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUse(user);
      } else {
        setUse(null)
      }
    });
  }, [use]);

  return (
    <div className="my-5 ">
      {!isBoolean && (
        <button
          disabled={use === null}
          type="submit"
          onClick={() => {
            ondata2(true);
            dispatch(setBoolean(true));
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
        </button>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right md:w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell />
              <TableCell className="flex justify-center">
                <img
                  width="80"
                  height="80"
                  className="animate-spin"
                  src="https://img.icons8.com/material-sharp/100/b335ae/spinner-frame-1.png"
                  alt="spinner-frame-1"
                />
              </TableCell>
              <TableCell />
            </TableRow>
          )}
          {!loading && data2.length === 0 && (
            <TableRow>
              <TableCell />
              <TableCell className="flex justify-center">
                <p className="font-medium">No Record Found!</p>
              </TableCell>
              <TableCell />
            </TableRow>
          )}
          {!loading &&
            data2?.length !== 0 &&
            data2?.map((arr, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{arr.id}</TableCell>
                <TableCell>{arr.Name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-row gap-2 justify-end">
                    <button
                      disabled={use === null}
                      onClick={() => {
                        deleteItem(arr.id);
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
                    </button>
                    <button
                      type="button"
                      disabled={use === null}
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
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tablee;
