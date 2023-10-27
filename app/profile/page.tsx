"use client";

import BigBtn from "@/components/BigBtn/BigBtn";
import React, { useEffect, useState } from "react";
import EditForm from "@/components/EditForm/EditForm";
import Form from "@/components/Form/Form";
import { redirect } from "next/navigation";
import "./style.css";
import Tablee from "@/components/Table/Table";
import ProfileUpdate from "@/components/ProfileUpdate/ProfileUpdate";
import { Confirm } from "@/components/Confirmation/Confirm";
import Table2 from "@/components/Table2/Table2";

const page = () => {
  const [user, setUser] = useState("");
  const [userDatabase, setUserDatabase] = useState(false);
  const [dataDatabase, setDataDatabase] = useState(false);
  const [editForm, setEditForm] = useState<boolean>(false);
  const [form, setForm] = useState(false);
  const [table, setTable] = useState(true);

  const curUser = localStorage.getItem("curUser");
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
          <h1 className="text-3xl mb-7 font-bold ">Admin Panel</h1>
          <div className="flex gap-5">
            <button
              className="btn-database"
              onClick={() => {
                setUserDatabase((pre) => !pre);
                setDataDatabase(false);
              }}
            >
              Data
            </button>
            <button
              className="btn-database"
              onClick={() => {
                setDataDatabase((pre) => !pre);
                setUserDatabase(false);
              }}
            >
              User
            </button>
          </div>
          {userDatabase && (
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
          {dataDatabase && <>
              {table && (
                <Table2
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
          </>}
        </>
      )}
      {user == "user" && (
        <>
          <h1 className="text-3xl  font-bold ">User's Profile</h1>
          <ProfileUpdate/>
        </>
      )}
    </>
  );
};

export default page;
