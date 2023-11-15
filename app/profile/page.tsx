"use client";

import React, { useEffect, useState } from "react";
import EditForm from "@/components/EditForm1/EditData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Form from "@/components/Form1/DataForm";
import { redirect } from "next/navigation";
import Form2 from "@/components/Form2/MoviesForm";
import EditForm2 from "@/components/EditForm2/EditMovies";
import "./style.css";
import Data from "@/components/Table1/Data";
import Profile from "@/components/Profile/Profile";
import { DataDelete } from "@/components/Confirmation1/DataDelete";
import { DeleteUsers } from "@/components/Confirmation2/DeleteUsers";
import Users from "@/components/Table2/Users";
import EditUser from "@/components/EditUser/EditUser";
import DividedData from "@/components/Table3/DividedData";
import Fav from "@/components/Table4/Fav";
import DividedFav from "@/components/Table5/DividedFav";
import Movies from "@/components/Table6/Movies";
import Series from "@/components/Table7/Series";
import Form3 from "@/components/Form3/SeriesForm";
import SelectFav from "@/components/SelectFav/SelectFav";
import EditForm4 from "@/components/EditForm3/EditFav";
import { DeleteFav } from "@/components/Confirmation3/DeleteFav";
import { DeleteMovies } from "@/components/Confirmation4/DeleteMovies";
import { DeleteSeries } from "@/components/Confirmation5/DeleteSeries";
import EditSeries from "@/components/EditForm4/EditSeries";

const page = () => {
  const [user, setUser] = useState("");
  const [editForm, setEditForm] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);
  const [form2, setForm2] = useState(false);
  const [editForm2, setEditForm2] = useState<boolean>(false);
  const [form3, setForm3] = useState(false);
  const [editSeries, setEditSeries] = useState<boolean>(false);
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
          <DataDelete />
          <DeleteUsers />
          <DeleteFav />
          <DeleteMovies />
          <DeleteSeries />
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
                <Data
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
              <Users ondata={(data: boolean) => setEditUser(data)} />
              {editUser && (
                <EditUser
                  ondata={editUser}
                  ondata2={(data: boolean) => setEditUser(data)}
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
            <TabsContent value="Movies">
              {form2 && <Form2 ondata={(data: boolean) => setForm2(data)} />}
              <Movies
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
              <Series
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
          <DataDelete />
          <DeleteFav />
          <h1 className="text-3xl  font-bold mb-5">User's Profile</h1>
          <Profile />
          <Tabs className="mt-5" defaultValue="Data">
            <TabsList>
              <TabsTrigger value="Fav">Fav</TabsTrigger>
              <TabsTrigger value="Data">Data</TabsTrigger>
            </TabsList>
            <TabsContent value="Data">
              {form && <Form ondata={(data: boolean) => setForm(data)} />}
              <DividedData
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
              <DividedFav
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
