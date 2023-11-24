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
import { FirebaseError } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type user = {
  email: string;
};
type cardData = {
  name: string;
  role: string;
  uid: string;
  id: string;
  Request?: [{ Name: string; Uid: string; Status: string; Request: string }];
};

const PeopleUMayKnow = () => {
  const [data3, setData3] = useState([]);
  const [data2, setData2] = useState([]);
  const [clicked, setClicked] = useState("");
  const [reRender, setReRender] = useState("");
  const [request, setRequest] = useState(false);
  const { peopleUMayKnow } = useSelector(
    (state: RootState) => state.peopleUMayKnow
  );
  const dispatch = useDispatch();
  const Request = JSON.parse(localStorage.getItem("Request") || "[]");

  const auth = getAuth();

  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        console.log(user.email);
        setReRender(user?.email);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        // ...
      } else {
        // User is signed out
        // ...
        setReRender("");

        console.log("user sign out");
      }
    });
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
      setData3(testarr2.filter((a: any) => a.uid != auth.currentUser?.uid));
      console.log(data3);
    });
    return unsub2;
  };

  useEffect(() => {
    getuser();
    console.log("reRender");
  }, [reRender]);

  const requestSend = async (id: string, uid: string, role: string) => {
    localStorage.setItem("Request", JSON.stringify([uid]));
    const uid2 = auth.currentUser?.uid;
    const name = auth.currentUser?.displayName;
    const docRef = doc(db, "user", `${id}`);
    await updateDoc(docRef, {
      Request: [
        {
          Name: name,
          Uid: uid2,
          Role: role,
          Status: "Pending",
          Request: "Received",
        },
      ],
    }).then(() => {
      setRequest(true);
    });
    // console.log(name,uid,id)
  };

  const friendsAdd = async (name: string) => {
    const user = data2.filter((a: any) => a.uid == auth.currentUser?.uid);
    const docRef = doc(db, "user", `${user[0]?.id}`);
    await updateDoc(docRef, {
      Friends: [{ Name: name, Request: "Sent", Status: "Pending" }],
    });
  };

  const requestCancel = async (id: string, role: string) => {
    const uid2 = auth.currentUser?.uid;
    const name = auth.currentUser?.displayName;
    const docRef = doc(db, "user", id);
    await updateDoc(docRef, {
      Request: arrayRemove({
        Name: name,
        Uid: uid2,
        Role: role,
        Status: "Pending",
        Request: "Received",
      }),
    }).then(() => setClicked(""));
  };

  const friendsRemove = async (name: string) => {
    const user = data2.filter((a: any) => a.uid == auth.currentUser?.uid);
    const docRef = doc(db, "user", `${user[0]?.id}`);
    await updateDoc(docRef, {
      Friends: arrayRemove({ Name: name, Request: "Sent", Status: "Pending" }),
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
                className=" sm:h-[13.5rem] h-[11.5rem] p-2 rounded-md border"
              >
                {data3.map((arr: cardData, i) => (
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
                      {clicked != arr.uid && (
                        <button
                          onClick={() => (
                            requestSend(arr.id, arr.uid, arr.role),
                            friendsAdd(arr.name)
                          )}
                          className="border-solid border-[3px] disabled:!bg-pink-920 disabled:opacity-60 disabled:border-pink-920 border-pink-910 !bg-pink-910 hover:!bg-pink-920 hover:border-pink-920 hover:transition-all hover:duration-300  sm:p-2 p-1 rounded sm:w-28 sm:text-sm text-xs text-center font-semibold text-white "
                        >
                          <p>Add Friend</p>
                        </button>
                      )}
                      {clicked == arr.uid && (
                        <button
                          onClick={() => (
                            requestCancel(arr.id, arr.role),
                            friendsRemove(arr.name)
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
