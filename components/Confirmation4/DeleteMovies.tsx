"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { collection, query, onSnapshot } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setContinue } from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { setBoolean6 } from "../../app/GlobalRedux/Features/confirm/confirmSlice";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import {
  deleteDoc,
  doc,
  writeBatch,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { RootState } from "@/app/GlobalRedux/store";

export function DeleteMovies() {
  const [Fav, setFav] = useState([]);

  const { text6, booleanValue6 } = useSelector(
    (state: RootState) => state.textReducer3
  );

  const getFav = () => {
    const q = query(collection(db, "Favourites"));
    const unsub2: any = onSnapshot(q, (querySnapshot) => {
      let testarr2: any = [];
      querySnapshot.forEach((doc) => {
        testarr2.push({ id: doc.id, ...doc.data() });
      });
      setFav(testarr2);
    });
    return unsub2;
  };
  const dispatch = useDispatch();
  const action = () => {
    const X = window.scrollX;
    const Y = window.scrollY;
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(setBoolean(false));
      dispatch(setBoolean2(false));
      window.scrollTo(X, Y);
    }, 3000);
  };

  const deleteItem = async (id: any) => {
    const batch = writeBatch(db);
    const i = Fav.filter((e: any) => e.Movie[0] == id[1]);
    await deleteDoc(doc(db, "Movies", id[0]))
      .then(() => {
        i.forEach((e: any, i) => {
          const docRef = doc(db, "Favourites", e.id);
          batch.update(docRef, {
            Movie: [""],
            updated: serverTimestamp(),
          });
        });
        batch.commit();
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Deleted"));
        action();
        dispatch(setContinue(false));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        action();
        dispatch(setContinue(false));
      });
  };

  useEffect(() => {
    getFav();
  }, []);

  return (
    <AlertDialog open={booleanValue6} onOpenChange={setBoolean6}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text6}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => dispatch(setBoolean6(false))}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              const id = JSON.parse(
                localStorage.getItem("deleteMovies") || "{}"
              );
              deleteItem(id);
              dispatch(setContinue(true));
              dispatch(setBoolean6(false));
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
