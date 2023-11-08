"use client";

import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Stepper from "@/components/Stepper/Stepper";
import Tablee from "@/components/Table/Table";
import { useState } from "react";
import "./style.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { Confirm } from "@/components/Confirmation/Confirm";
import Table4 from "@/components/Table4/Table4";
import Form2 from "@/components/Form2/Form2";
import EditForm2 from "@/components/EditForm2/EditForm2";
import { Confirm3 } from "@/components/Confirmation3/Confirm3";

const Home = () => {
  // delaration
  const [form, setForm] = useState(false);
  const [form2, setForm2] = useState(false);
  const [editForm2, setEditForm2] = useState<boolean>(false);
  const { text, booleanValue } = useSelector(
    (state: RootState) => state.textBoolean
  );
  const { text2, booleanValue2 } = useSelector(
    (state: RootState) => state.textReducer2
  );
  const { signIn, signUp } = useSelector((state: RootState) => state.register);
  const [editForm, setEditForm] = useState<boolean>(false);

  return (
    <>
      <Confirm />
      <Confirm3 />
      {booleanValue && <AlertSuccess purpose={text} />}
      {booleanValue2 && <AlertError purpose={text2} />}
      <Tabs defaultValue="Data">
        <TabsList>
          <TabsTrigger value="Fav">Fav</TabsTrigger>
          <TabsTrigger value="Data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="Data">
          {form && <Form ondata={(data: boolean) => setForm(data)} />}

          <Tablee
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
          {form2 && <Form2 ondata={(data: boolean) => setForm2(data)} />}
          <Table4
            ondata={(data: boolean) => setEditForm2(data)}
            ondata2={(data: boolean) => setForm2(data)}
          />
          {editForm2 && (
            <EditForm2
              ondata={editForm2}
              ondata2={(data: boolean) => setEditForm2(data)}
            />
          )}
        </TabsContent>
      </Tabs>

      {signIn && <SignIn />}
      {signUp && <SignUp />}
    </>
  );
};

export default Home;
