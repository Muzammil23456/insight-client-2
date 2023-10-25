"use client";

import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Stepper from "@/components/Stepper/Stepper";
import { getAuth} from "firebase/auth";
import Tablee from "@/components/Table/Table";
import { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { Confirm } from "@/components/Confirmation/Confirm";
import { db } from "@/modules/filebase";

const Home = () => {
  // delaration
  const [form, setForm] = useState(false);
  const [firebase, setFirebase] = useState(false);
  const [table, setTable] = useState(true);
  const [use, setUse] = useState<object | null>(null);
  const auth = getAuth();
  const { text, booleanValue } = useSelector(
    (state: RootState) => state.textBoolean
  );
  const { text2, booleanValue2 } = useSelector(
    (state: RootState) => state.textReducer2
  );
  const { signIn,signUp } = useSelector(
    (state: RootState) => state.register
  );
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState<boolean>(false);

  return (
    <>
          <Confirm />
          {booleanValue && <AlertSuccess purpose={text} />}
          {booleanValue2 && <AlertError purpose={text2} />} 
          {form && <Form ondata={(data: boolean) => setForm(data)} />}
          {table && (
            <Tablee
              ondata={(data: boolean) => setEditForm(data)}
              ondata2={(data: boolean) => setForm(data)}
            />
          )}
          {editForm && (
            <EditForm
              ondata={editForm}
              ondata2={(data: boolean) => setEditForm(data)}
            />
          )}
          {signIn && <SignIn/>}
          {signUp && <SignUp />}
    </>
  );
};

export default Home;
