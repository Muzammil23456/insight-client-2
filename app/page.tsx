"use client";

import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import SignIn from "@/components/Signin/SignIn";
import SignUp from "@/components/Signup/SignUp";
import Stepper from "@/components/Stepper/Stepper";
import Tablee from "@/components/Table/Table";
import { useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/GlobalRedux/store";
import { AlertSuccess, AlertError } from "@/components/Alert/Alert";
import { Confirm } from "@/components/Confirmation/Confirm";
import Table4 from "@/components/Table4/Table4";

const Home = () => {
  // delaration
  const [form, setForm] = useState(false);
  const [table, setTable] = useState(true);
  const [favDatabase, setFavDatabase] = useState(false);
  const [dataDatabase, setDataDatabase] = useState(false);
  const { text, booleanValue } = useSelector(
    (state: RootState) => state.textBoolean
  );
  const { text2, booleanValue2 } = useSelector(
    (state: RootState) => state.textReducer2
  );
  const { signIn, signUp } = useSelector((state: RootState) => state.register);
  const [editForm, setEditForm] = useState<boolean>(false);
  const active = localStorage.getItem("Active2");

  return (
    <>
    <Confirm />
      {booleanValue && <AlertSuccess purpose={text} />}
      {booleanValue2 && <AlertError purpose={text2} />}
      <div className="flex gap-5 mt-4">
        <button
          className="btn-database"
          onClick={() => {
            setFavDatabase(true);
            setDataDatabase(false);
            localStorage.setItem("Active2", "Fav");
          }}
        >
          Fav
        </button>
        <button
          className="btn-database"
          onClick={() => {
            setDataDatabase(true);
            setFavDatabase(false);
            localStorage.setItem("Active2", "Data");
          }}
        >
          Data
        </button>
      </div>
      
      {form && <Form ondata={(data: boolean) => setForm(data)} />}
      {(dataDatabase|| active == "Data") && (
        <Tablee
          ondata={(data: boolean) => setEditForm(data)}
          ondata2={(data: boolean) => setForm(data)}
        />
      )}
      {(favDatabase || active == "Fav") &&
        <Table4/>
      }
      {editForm && (
        <EditForm
          ondata={editForm}
          ondata2={(data: boolean) => setEditForm(data)}
        />
      )}
      {signIn && <SignIn />}
      {signUp && <SignUp />}
    </>
  );
};

export default Home;
