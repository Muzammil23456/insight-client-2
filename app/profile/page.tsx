"use client";

import React, { useEffect, useState } from "react";
import EditForm from "@/components/EditForm/EditForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "@/components/Form/Form";
import { redirect } from "next/navigation";
import Form2 from "@/components/Form2/Form2";
import EditForm2 from "@/components/EditForm2/EditForm2";
import "./style.css";
import Tablee from "@/components/Table/Table";
import Profile from "@/components/Profile/Profile";
import { Confirm } from "@/components/Confirmation/Confirm";
import { Confirm2 } from "@/components/Comfirmation2/Confirm2";
import Table2 from "@/components/Table2/Table2";
import EditUser from "@/components/EditUser/EditUser";
import Table3 from "@/components/Table3/Table3";
import Table4 from "@/components/Table4/Table4";
import Table5 from "@/components/Table5/Table5";
import Table6 from "@/components/Table6/Movies";
import Table7 from "@/components/Table7/Series";
import Form3 from "@/components/Form3/Form3";
import EditForm3 from "@/components/EditForm3/EditForm3";
import SelectFav from "@/components/SelectFav/SelectFav";
import EditForm4 from "@/components/EditForm4/EditForm4";
import { Confirm3 } from "@/components/Confirmation3/Confirm3";
import { Confirm4 } from "@/components/Comfirmation4/Confirm4";
import { Confirm6 } from "@/components/Confirmation6/Confirm6";
import { Confirm7 } from "@/components/Confirmation7/Confirm7";
import EditSeries from "@/components/EditSeries/EditSeries";

const page = () => {
  const [user, setUser] = useState("");
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [form2, setForm2] = useState(false);
  const [editForm2, setEditForm2] = useState<boolean>(false);
  const [form3, setForm3] = useState(false);
  const [editForm3, setEditForm3] = useState<boolean>(false);
  const [editSeries,setEditSeries] = useState<boolean>(false);
  const [editForm4, setEditForm4] = useState<boolean>(false);
  const [form, setForm] = useState(false);
  const [table, setTable] = useState(true);
  const curUser = localStorage.getItem("curUser");

  useEffect(() => {
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
          <Confirm4/>
          <Confirm6 />
          <Confirm7/>
          <h1 className="text-3xl mb-7 font-bold ">Admin Panel</h1>
          <Profile />
          <Tabs className="mt-5" defaultValue="User">
            <TabsList className="w-full sm:w-[300px] ">
              <TabsTrigger className="w-[20%] sm:w-1/2" value="User">
                User
              </TabsTrigger>
              <TabsTrigger className="w-[20%] sm:w-1/2" value="Data">
                Data
              </TabsTrigger>
              <TabsTrigger className="w-[20%] sm:w-1/2" value="Fav">
                Fav
              </TabsTrigger>
              <TabsTrigger className="w-[20%] sm:w-1/2" value="Movies">
                Movies
              </TabsTrigger>
              <TabsTrigger className="w-[20%] sm:w-1/2" value="Series">
                Series
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Data">
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
            </TabsContent>
            <TabsContent value="User">
              <Table2 ondata={(data: boolean) => setEditUser(data)} />
              {editUser && (
                <EditUser
                  ondata={editUser}
                  ondata2={(data: boolean) => setEditUser(data)}
                />
              )}
            </TabsContent>
            <TabsContent value="Fav">
            {form2 && <SelectFav ondata={(data: boolean) => setForm2(data)} />}
              <Table4
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
            <TabsContent value="Movies">
              {form2 && <Form2 ondata={(data: boolean) => setForm2(data)} />}
              <Table6
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
            <TabsContent value="Series">
              {form3 && <Form3 ondata={(data: boolean) => setForm3(data)} />}
              <Table7
                ondata={(data: boolean) => setEditSeries(data)}
                ondata2={(data: boolean) => setForm3(data)}
              />
              {editSeries && (
                <EditSeries
                  ondata={editSeries}
                  ondata2={(data: boolean) => setEditSeries(data)}
                />
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
      {user == "user" && (
        <>
          <Confirm />
          <Confirm4/>
          <h1 className="text-3xl  font-bold mb-5">User's Profile</h1>
          <Profile />
          <Tabs className="mt-5" defaultValue="Data">
            <TabsList>
              <TabsTrigger value="Fav">Fav</TabsTrigger>
              <TabsTrigger value="Data">Data</TabsTrigger>
            </TabsList>
            <TabsContent value="Data">
              {form && <Form ondata={(data: boolean) => setForm(data)} />}
              <Table3
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
              {form2 && <SelectFav ondata={(data: boolean) => setForm2(data)} />}
              <Table5
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
    </>
  );
};

export default page;
