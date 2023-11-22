import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { RootState } from "@/app/GlobalRedux/store";
import { setPeopleUMayKnow } from "@/app/GlobalRedux/Features/PeopleUMayKnow/PeopleUMayKnowSlice";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { db } from "@/modules/filebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "@/modules/fileauth";

type cardData = {
    name: string;
    role: string;
}

const PeopleUMayKnow = () => {
  const [data3, setData3] = useState([]);
 const [open,setOpen] = useState(false)
 const { peopleUMayKnow } = useSelector(
    (state: RootState) => state.peopleUMayKnow
  );
  const dispatch = useDispatch();
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
      setData3(testarr2?.filter((a)=>(a.uid!= auth?.currentUser?.uid)));
    });
    return unsub2;
  };
  useEffect(() => {
    getuser();
  }, []);
  return (
    <>
      <AlertDialog open={peopleUMayKnow} onOpenChange={setPeopleUMayKnow} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">
              People You May Know
            </AlertDialogTitle>
            <AlertDialogDescription>
              <ScrollArea className=" sm:h-[13.5rem] h-[11.5rem] p-2 rounded-md border">
            {data3.map((arr:cardData, i)=>(
                <Card key={i} className="m-2 flex justify-between ">
                  <CardHeader className="  p-4 sm:p-6  ">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarFallback className="uppercase text-sm">
                          {arr.name.substring(0, 3)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <CardTitle>{arr.name}</CardTitle>
                        <CardDescription>{arr.role}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <div className=" flex px-2 items-center">
                    <button className="border-solid border-[3px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300  sm:p-2 p-1 rounded sm:w-28 sm:text-sm text-xs text-center font-semibold text-white ">
                    <p>Add Friend</p>
                    </button>
                  </div>
                </Card>
            ))}
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{dispatch(setPeopleUMayKnow(false))}}>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PeopleUMayKnow;
