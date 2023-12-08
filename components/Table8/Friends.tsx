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
  RequestR: [
    {
      Name: string;
      Uid: string;
      Role: string;
      Status: string;
      Request: string;
      Sender: string;
    }
  ];
  RequestS: [
    {
      Name: string;
      Uid: string;
      Role: string;
      Status: string;
      Request: string;
      Reciever: string;
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

  const unfriend = async (
    FriendsUid: string,
    FriendsName: string,
    SenderId: string,
    SenderName: string,
    SenderRole: string,
    SenderUid: string,
    RecevierId: string,
    ReceiverName: string,
    RecevierUid: string,
    ReceiverRole: string,
    SenderId2: string,
    SenderName2: string,
    SenderRole2: string,
    SenderUid2: string,
  ) => {
    // const docRef = doc(db, "user", `${SenderId}`);
    // const docRef2 = doc(db, "user", `${SenderId2}`);

    // await updateDoc(docRef, {
    //   Friends: arrayRemove({
    //     Name: ReceiverName,
    //     Uid: RecevierUid,
    //   }),
    // }).then(async () => {
    //   await updateDoc(docRef, {
    //     RequestS: arrayRemove({
    //       Name: ReceiverName,
    //       Reciever: RecevierId,
    //       Request: "Sent",
    //       Role: ReceiverRole,
    //       Status: "Accepted",
    //       Uid: RecevierUid,
    //     }),
    //   });
    // });
    // await updateDoc(docRef2, {
    //   Friends: arrayRemove({
    //     Name: FriendsName,
    //     Uid: FriendsUid,
    //   }),
    // }).then(async () => {
    //   await updateDoc(docRef2, {
    //     RequestR: arrayRemove({
    //       Name: SenderName,
    //       Request: "Received",
    //       Role: SenderRole,
    //       Sender: SenderId,
    //       Status: "Accepted",
    //       Uid: SenderUid,
    //     }),
    //   });
    // });
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
            data3?.map((arr: TableData, index) => (
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
                        onClick={() => {
                          unfriend(
                            a.Uid,
                            a.Name,
                            arr.RequestR[0]?.Sender,
                            arr.RequestR[0]?.Name,
                            arr.RequestR[0]?.Role,
                            arr.RequestR[0]?.Uid,
                            arr.id,
                            arr.name,
                            arr.uid,
                            arr.role,
                            arr.RequestS[0]?.Reciever,
                            arr.RequestS[0]?.Name,
                            arr.RequestS[0]?.Role,
                            arr.RequestS[0]?.Uid,
                          );
                        }}
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
