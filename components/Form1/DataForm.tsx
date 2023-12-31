"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./style.css";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import removepng from "../../public/remove.png";
import { useDispatch } from "react-redux";
import { setBool } from "../../app/GlobalRedux/Features/new/newSlice";
import { auth11 } from "../../modules/fileauth";
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
interface Errors {
  dynamicFields: {
    Name: string;
    createdBy?: string | null;
  }[];
}
type onDataType = {
  ondata: (bool: boolean) => void;
};

const Form = ({ ondata }: onDataType) => {
  const schema = z.object({
    dynamicFields: z.array(
      z.object({
        Name: z
          .string()
          .min(3, { message: "Atleast 3" })
          .max(50, { message: "Less than 50" }),
      })
    ),
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      dynamicFields: [{ Name: "", createdBy: auth11.currentUser?.email }],
    },
  });

  const dispatch = useDispatch();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dynamicFields",
  });

  // Add Data into database

  const onSubmit = (data: any) => {
    for (let i = 0; i < data.dynamicFields?.length; i++) {
      addDoc(collection(db, "test"), {
        Name: data.dynamicFields[i].Name,
        created: serverTimestamp(),
        updated: serverTimestamp(),
        createdBy: auth11.currentUser?.email,
      });
    }
    if (isSubmitSuccessful) {
      reset();
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      ondata(false);
      dispatch(setBool(false));
    }
  }, [isSubmitSuccessful]);

  const showError = (id: number) => {
    if (errors) {
      if (errors.dynamicFields) {
        const d: any = errors.dynamicFields;
        const a: Array<any> = d;
        if (a[id]) {
          const err = a[id].Name.message;
          return err;
        }
      }
    }
  };

  return (
    <form
      className="flex form justify-center my-auto text-center "
      onSubmit={handleSubmit(onSubmit)}
    >
      {fields.map((field, index: number) => (
        <div key={field.id}>
          <input
            className="input-for-form"
            type="text"
            placeholder="Name"
            {...register(`dynamicFields.${index}.Name`)}
          />
          <div className="flex justify-end relative">
            {index > 0 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => remove(index)}
              >
                <img
                  width="100"
                  height="100"
                  className="max-w-none h-5 w-5"
                  src={removepng.src}
                  alt="macos-close"
                />
              </button>
            )}
          </div>
          <span className="error ">{showError(index)}</span>
        </div>
      ))}
      <div className="flex flex-row gap-2">
        <button
          type="button"
          className="Btn"
          onClick={() => append({ Name: "" })}
        >
          Add
        </button>
        <button type="submit" className="Btn">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
