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
  collection,
  query,
  onSnapshot,
  arrayRemove,
  updateDoc,
  doc,
  arrayUnion,
} from "@firebase/firestore";
import { db } from "../../modules/filebase";
import React, { useEffect, useState } from "react";
import loader from "@/public/loading.png";
import { auth } from "@/modules/fileauth";

type TableData = {
  name: string;
  role: string;
  uid: string;
  id: string;
  RequestR?: [
    {
      Name: string;
      Uid: string;
      Role: string;
      Status: string;
      Request: string;
      Sender: string;
    }
  ];
  Friends: [
    {
      Name: string;
      Uid: string;
    }
  ];
};

const Friends = () => {
  // States

  const [data3, setData3] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);

  // Get User from database

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
      const f1 = testarr2.filter((a: any) => a.uid == auth.currentUser?.uid);
      setData3(f1);
      console.log(f1);
      setLoading(false);
    });
    return unsub2;
  };

  const unfriend = async (uid: string, name: string, id: string) => {
    const docRef = doc(db, "user", `${id}`);
    await updateDoc(docRef, {
      Friends: arrayRemove({
        Name: name,
        Uid: uid,
      }),
    }).then(async () => {
      await updateDoc(docRef, {
        RequestS: arrayUnion({
          Name: name,
          Uid: uid,
          Request: "Sent",
          Status: "Accepted",
        }),
      });
    });
  };
  // useEffect

  useEffect(() => {
    getuser();
  }, []);

  return (
    <div className="my-5 ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="md:w-[25%]">UID</TableHead>
            <TableHead className="md:w-[25%]">Name</TableHead>
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
            data3.every((e) => e.Friends?.length < 1 || !e.Friends) && (
              <TableRow>
                <TableCell />
                <TableCell className="flex justify-start">
                  <p className="font-medium">No Friends Found!</p>
                </TableCell>
                <TableCell />
              </TableRow>
            )}
          {!loading &&
            data3[0].Friends?.length > 0 &&
            data3?.map((arr: TableData) => (
              <>
                {arr.Friends?.map((a: any, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-ellipsis">
                      <p className="truncate w-[140px]" title={a.Uid}>
                        {a.Uid}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="truncate w-[150px]" title={a.Name}>
                        {a.Name}
                      </p>
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <button
                        onClick={() => unfriend(a.Uid, a.Name, arr.id)}
                        className="btn-e"
                      >
                        Un Friend
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Friends;
