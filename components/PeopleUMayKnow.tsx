import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { updateDoc, doc, arrayRemove } from "@firebase/firestore";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { RootState } from "@/app/GlobalRedux/store";
import { setPeopleUMayKnow } from "@/app/GlobalRedux/Features/PeopleUMayKnow/PeopleUMayKnowSlice";
import { collection, query, arrayUnion, onSnapshot } from "@firebase/firestore";
import { db } from "@/modules/filebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "@/modules/fileauth";
import { onAuthStateChanged } from "firebase/auth";
import { RollerCoaster } from "lucide-react";

type cardData = {
  name: string;
  role: string;
  uid: string;
  id: string;
  RequestR?: [
    { Name: string; Uid: string; Status: string; Request: string; Role: string }
  ];
};
type data = {
  name: string;
  role: string;
  uid: string;
  id: string;
  RequestR?: [
    { Name: string; Uid: string; Status: string; Request: string; Role: string }
  ];
};

const PeopleUMayKnow = () => {
  const [data3, setData3] = useState<data[]>([]);
  const [data2, setData2] = useState<data[]>([]);
  const [data4, setData4] = useState<data[]>([]);
  const [clicked, setClicked] = useState("");
  const [reRender, setReRender] = useState("");
  const [request, setRequest] = useState(false);
  const { peopleUMayKnow } = useSelector(
    (state: RootState) => state.peopleUMayKnow
  );
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setReRender(user?.email);
      } else {
        setReRender("");
      }
    });
  }, []);

  const getuser = () => {
    console.log("get user");
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
      const f1 = testarr2.filter((a: any) => a.uid != auth.currentUser?.uid);
      const f2 = f1.filter((e: any )=> e.RequestR?.[0]?.Status != "Accepted")
      setData3(f2);
      setData4(testarr2.filter((a: any) => a.uid == auth.currentUser?.uid));
    });
    return unsub2;
  };

  useEffect(() => {
    getuser();
  }, [reRender]);

  const requestSend = async (id: string, uid: string) => {
    const role = data4[0].role;
    console.log("sent");
    setClicked(uid);
    const uid2 = auth.currentUser?.uid;
    const name = auth.currentUser?.displayName;
    const docRef = doc(db, "user", `${id}`);
    await updateDoc(docRef, {
      RequestR: arrayUnion({
        Name: name,
        Uid: uid2,
        Role: data4[0].role,
        Status: "Pending",
        Request: "Received",
        Sender: data4[0].id,
      }),
    }).then(() => {
      setRequest(true);
    });
    // console.log(name,uid,id)
  };

  const friendsAdd = async (name: string, uid: string, role: string, reciever: string) => {
    const user = data2.filter((a: any) => a.uid == auth.currentUser?.uid);
    const docRef = doc(db, "user", `${user[0]?.id}`);
    await updateDoc(docRef, {
      RequestS: arrayUnion({
        Name: name,
        Request: "Sent",
        Status: "Pending",
        Uid: uid,
        Role: role,
        Reciever: reciever
      }),
    });
  };

  const requestCancel = async (id: string, role: string) => {
    const uid2 = auth.currentUser?.uid;
    const name = auth.currentUser?.displayName;
    const docRef = doc(db, "user", id);
    await updateDoc(docRef, {
      RequestR: arrayRemove({
        Name: name,
        Uid: uid2,
        Role: data4[0].role,
        Status: "Pending",
        Request: "Received",
        Sender: data4[0].id,
      }),
    }).then(() => setClicked(""));
  };

  const friendsRemove = async (name: string, uid: string,role: string, reciever: string) => {
    const user = data2.filter((a: any) => a.uid == auth.currentUser?.uid);
    const docRef = doc(db, "user", `${user[0]?.id}`);
    await updateDoc(docRef, {
      RequestS: arrayRemove({
        Name: name,
        Request: "Sent",
        Status: "Pending",
        Uid: uid,
        Role: role,
        Reciever: reciever
      }),
    });
  };

  return (
    <>
      <AlertDialog open={peopleUMayKnow} onOpenChange={setPeopleUMayKnow}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-5">
              People You May Know
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <ScrollArea
                type="auto"
                className=" sm:h-[13.5rem] h-[11.5rem] p-1 rounded-md border"
              >
                {data3.map((arr: cardData, i) => (
                  <Card key={i} className="m-2 flex justify-between ">
                    <CardHeader className=" p-[0.65rem] sm:p-6">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarFallback className="uppercase text-sm">
                            {arr.name.substring(0, 3)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                          <CardTitle className="text-justify text-[.95rem] sm:text-base">
                            {arr.name}
                          </CardTitle>
                          <CardDescription>{arr.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <div className=" flex px-2 items-center">
                      {`${data4
                        .map((e: any) =>
                          e.RequestS?.map((friend: any) => friend.Uid)
                        )
                        .flat()
                        .find((a) => a == arr.uid)}` !== `${arr.uid}` && (
                        <button
                          onClick={() => (
                            getuser(),
                            requestSend(arr.id, arr.uid),
                            friendsAdd(arr.name, arr.uid, arr.role, arr.id)
                          )}
                          className="border-solid border-[3px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300  sm:p-2 p-1 rounded sm:w-28 sm:text-sm text-xs text-center font-semibold text-white "
                        >
                          <p>Add Friend</p>
                        </button>
                      )}
                      {`${data4
                        .map((e: any) =>
                          e.RequestS?.map((friend: any) => friend.Uid)
                        )
                        .flat()
                        .find((a) => a == arr.uid)}` === `${arr.uid}` && (
                        <button
                          onClick={() => (
                            requestCancel(arr.id, arr.role),
                            friendsRemove(arr.name, arr.uid,arr.role,arr.id)
                          )}
                          className="border-solid border-[3px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300  sm:p-2 p-1 rounded sm:w-28 sm:text-sm text-xs text-center font-semibold text-white "
                        >
                          <p>Cancel</p>
                        </button>
                      )}
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                dispatch(setPeopleUMayKnow(false));
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

export default PeopleUMayKnow;
