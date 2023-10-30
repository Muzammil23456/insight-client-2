"use client";

import BigBtn from "@/components/BigBtn/BigBtn";
import React, { useEffect, useState } from "react";
import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import { redirect } from "next/navigation";
import "./style.css";
import Tablee from "@/components/Table/Table";
import Profile from "@/components/Profile/Profile";
import { Confirm } from "@/components/Confirmation/Confirm";
import { Confirm2 } from "@/components/Comfirmation2/Confirm2";
import Table2 from "@/components/Table2/Table2";
import EditUser from "@/components/EditUser/EditUser";
import Table3 from "@/components/Table3/Table3";

const page = () => {
  const [user, setUser] = useState("");
  const [userDatabase, setUserDatabase] = useState(false);
  const [dataDatabase, setDataDatabase] = useState(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [form, setForm] = useState(false);
  const [table, setTable] = useState(true);

  const curUser = localStorage.getItem("curUser");
  const active = localStorage.getItem("Active");

  useEffect(() => {
    console.log("1");
    setUser(`${curUser}`);
    if (!curUser) {
      redirect("/");
    }
  }, []);
  return (
    <>
      {user == "admin" && (
        <>
          <Confirm />
          <Confirm2 />
          <h1 className="text-3xl mb-7 font-bold ">Admin Panel</h1>
          <Profile />
          <div className="flex gap-5 mt-4">
            <button
              className="btn-database"
              onClick={() => {
                setUserDatabase((pre) => !pre);
                setDataDatabase(false);
                localStorage.setItem("Active", "Data");
              }}
            >
              Data
            </button>
            <button
              className="btn-database"
              onClick={() => {
                setDataDatabase((pre) => !pre);
                setUserDatabase(false);
                localStorage.setItem("Active", "User");
              }}
            >
              User
            </button>
          </div>
          {(userDatabase || active == "Data") && (
            <>
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
            </>
          )}
          {(dataDatabase || active == "User") && (
            <>
              {table && (
                <Table2 ondata={(data: boolean) => setEditUser(data)} />
              )}
              {editUser && (
                <EditUser
                  ondata={editUser}
                  ondata2={(data: boolean) => setEditUser(data)}
                />
              )}
            </>
          )}
        </>
      )}
      {user == "user" && (
        <>
        <Confirm />
          <h1 className="text-3xl  font-bold mb-5">User's Profile</h1>
          <Profile />
          {form && <Form ondata={(data: boolean) => setForm(data)} />}
          {table && (
            <Table3
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
        </>
      )}
    </>
  );
};

export default page;
