import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  updateDoc,
  doc,
  deleteDoc,
  arrayRemove,
  FieldValue,
  deleteField,
  where,
} from "@firebase/firestore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { RootState } from "@/app/GlobalRedux/store";
import { setFriendRequests } from "@/app/GlobalRedux/Features/FriendRequests/FriendRequestsSlice";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "@/modules/filebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "@/modules/fileauth";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import confirm from "@/public/confirm.png";
import cancel from "@/public/cancel.png";

type cardData = {
  name: string;
  role: string;
  uid: string;
  id: string;
  Request?: [
    { Name: string; Uid: string; Role: string; Status: string; Request: string }
  ];
};

const Requests = () => {
  const [data3, setData3] = useState([]);
  const [data2, setData2] = useState([]);
  const [clicked, setClicked] = useState("");
  const [request, setRequest] = useState(false);
  const { friendRequests } = useSelector(
    (state: RootState) => state.friendRequests
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getuser();
    console.log(data3);
  }, []);

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
      setData2(testarr2);
      setData3(testarr2.filter((a: any) => a.uid == auth.currentUser?.uid));
      console.log(testarr2.filter((a: any) => a.uid == auth.currentUser?.uid));
    });
    return unsub2;
  };
  return (
    <>
      <AlertDialog open={friendRequests} onOpenChange={setFriendRequests}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">
              Friend Requests
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <ScrollArea
                type="auto"
                className=" sm:h-[13.5rem] h-[11.5rem] p-2 rounded-md border"
              >
                {data3.map((arr: cardData, i) => (
                  <Card key={i} className="m-2 flex justify-between ">
                    <CardHeader className="  p-4 sm:p-6  ">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarFallback className="uppercase text-sm">
                            {arr.Request?.[0].Name.substring(0, 3)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <CardTitle>{arr.Request?.[0].Name}</CardTitle>
                          <CardDescription>
                            {arr.Request?.[0].Role}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <div className=" flex gap-2 px-2 items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="border-solid border-[2px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300 p-[6px] rounded sm:text-base text-sm text-center font-semibold text-white ">
                              <img
                                className="w-[22px] sm:w-[25px]  text-center"
                                src={confirm.src}
                                alt="spinner-frame-8"
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Confirm</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="border-solid border-[2px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300 p-[6px] rounded sm:text-base text-sm text-center font-semibold text-white ">
                              <img
                                className=" w-[22px] sm:w-[25px] text-center"
                                src={cancel.src}
                                alt="spinner-frame-8"
                              />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cancel</p>
                          </TooltipContent>
                        </Tooltip>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                dispatch(setFriendRequests(false));
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Requests;
