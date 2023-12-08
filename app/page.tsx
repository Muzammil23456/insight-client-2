"use client";

import EditForm from "@/components/EditForm1/EditData";
import Form from "@/components/Form1/DataForm";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Data from "@/components/Table1/Data";
import { useEffect, useState } from "react";
import "./style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { DataDelete } from "@/components/Confirmation1/DataDelete";
import Fav from "@/components/Table4/Fav";
import SelectFav from "@/components/SelectFav/SelectFav";
import { DeleteFav } from "@/components/Confirmation3/DeleteFav";
import EditForm4 from "@/components/EditForm3/EditFav";
import { auth } from "@/modules/fileauth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {
  // delaration
  const [form, setForm] = useState(false);
  const [form2, setForm2] = useState(false);
  const [user, setUser] = useState(false);
  const { text, booleanValue } = useSelector(
    (state: RootState) => state.textBoolean
  );
  const { text2, booleanValue2 } = useSelector(
    (state: RootState) => state.textReducer2
  );
  const { signIn, signUp } = useSelector((state: RootState) => state.register);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editForm4, setEditForm4] = useState<boolean>(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(true);
    }
  });

  return (
    <>
      <DataDelete />
      <DeleteFav />
      {booleanValue && <AlertSuccess purpose={text} />}
      {booleanValue2 && <AlertError purpose={text2} />}
      {user && (
        <>
          <button onClick={()=>alert("text")}>new</button>
          <Tabs defaultValue="Data">
            <TabsList>
              <TabsTrigger value="Fav">Fav</TabsTrigger>
              <TabsTrigger value="Data">Data</TabsTrigger>
            </TabsList>
            <TabsContent value="Data">
              {form && <Form ondata={(data: boolean) => setForm(data)} />}
              <Data
                ondata={(data: boolean) => setEditForm(data)}
                ondata2={(data: boolean) => setForm(data)}
              />
              {editForm && (
                <EditForm
                  ondata={editForm}
                  ondata2={(data: boolean) => setEditForm(data)}
                />
              )}
            </TabsContent>
            <TabsContent value="Fav">
              {form2 && (
                <SelectFav ondata={(data: boolean) => setForm2(data)} />
              )}
              <Fav
                ondata={(data: boolean) => setEditForm4(data)}
                ondata2={(data: boolean) => setForm2(data)}
              />
              {editForm4 && (
                <EditForm4
                  ondata={editForm4}
                  ondata2={(data: boolean) => setEditForm4(data)}
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
      {!user && (
        <>
          {form && <Form ondata={(data: boolean) => setForm(data)} />}
          <Data
            ondata={(data: boolean) => setEditForm(data)}
            ondata2={(data: boolean) => setForm(data)}
          />
          {editForm && (
            <EditForm
              ondata={editForm}
              ondata2={(data: boolean) => setEditForm(data)}
            />
          )}
        </>
      )}
      {signIn && <SignIn />}
      {signUp && <SignUp />}
    </>
    // <Requests/>
  );
};

export default Home;
