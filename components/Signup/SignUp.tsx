"use client";

import "./style.css";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  setSignUp,
  setSignIn,
} from "@/app/GlobalRedux/Features/Register/registerSlice";
import { collection, addDoc, serverTimestamp } from "@firebase/firestore";
import { db } from "../../modules/filebase";
import { useDispatch } from "react-redux";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import loader from "@/public/loadingWhite.png";
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { auth11 } from "@/modules/fileauth";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  updateProfile,
} from "firebase/auth";

const schema = z
  .object({
    Name: z.string().nonempty("Required").min(3, { message: "Atleast 6" }),
    Email: z.string().nonempty("Required").email("Invalid Email"),
    Password: z.string().nonempty("Required").min(6, { message: "Atleast 6" }),
    Confirm_Password: z
      .string()
      .nonempty("Required")
      .min(6, { message: "Atleast 6" }),
  })
  .refine((data) => data.Password === data.Confirm_Password, {
    message: "Password must match",
    path: ["Confirm_Password"],
  });

const SignUp = () => {
  // declaration
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [oobCode, setOobCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const searchParams = useSearchParams();
  if (searchParams.get("oobCode")) {
    setOobCode(`${searchParams.get("oobCode")}`);
  }

  const action = () => {
    const X = window.scrollX;
    const Y = window.scrollY;
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(setBoolean2(false));
      window.scrollTo(X, Y);
    }, 3000);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      Confirm_Password: "",
    },
  });

  const onSubmit = (data: any) => {
    for (let i = 0; i < data.dynamicFields?.length; i++) {
      addDoc(collection(db, "user"), {
        role: data.dynamicFields[i].Name,
        uid: auth11.currentUser?.email,
      });
    }
  };

  const actionCodeSetting = {
    url: "http://localhost:3000",
    handleCodeInApp: true,
  };

  //Sign Up
  const onsubmit = (data: any) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.Email, data.Password)
      .then((res) => {
        updateProfile(auth.currentUser, { displayName: data.Name });
        addDoc(collection(db, "user"), {
          role: "user",
          uid: res.user.uid,
        });
        sendEmailVerification(res.user, actionCodeSetting).then(() => {
          setOpen(false);
          dispatch(setSignUp(false));
          dispatch(setBoolean(true));
          dispatch(setText("Verification Email Sent Please Check it."));
        });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        setOpen(false);
        dispatch(setSignUp(false));
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        action();
      });
  };

  //useEffect

  useEffect(() => {
    setOpen(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((pre) => !pre);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((pre) => !pre);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">
              Sign Up
            </AlertDialogTitle>
            <>
              <form
                onSubmit={handleSubmit(onsubmit)}
                className="flex form justify-center pt-6"
              >
                <input
                  className="input"
                  type="text"
                  autoComplete="off"
                  {...register("Name")}
                  placeholder="Username"
                />
                {errors && (
                  <span className="error ">{errors?.Name?.message}</span>
                )}
                <input
                  className="input"
                  type="email"
                  autoComplete="off"
                  {...register("Email")}
                  placeholder="Email"
                />
                {errors && (
                  <span className="error ">{errors?.Email?.message}</span>
                )}
                <div className="relative w-full text-center">
                  <input
                    className="input"
                    type={showPassword ? "text" : "password"}
                    autoComplete="off"
                    {...register("Password")}
                    placeholder="Password"
                  />
                  <span onClick={togglePasswordVisibility} className="show">
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors && (
                  <span className="error ">{errors?.Password?.message}</span>
                )}
                <div className="relative w-full text-center">
                  <input
                    className="input "
                    type={showPassword2 ? "text" : "password"}
                    autoComplete="off"
                    {...register("Confirm_Password")}
                    placeholder="Confirm Password"
                  />
                  <span onClick={togglePasswordVisibility2} className="show">
                    {showPassword2 ? "Hide" : "Show"}
                  </span>
                </div>
                {errors && (
                  <span className="error ">
                    {errors?.Confirm_Password?.message}
                  </span>
                )}
                {loading && (
                  <button
                  type="submit"
                  className="flex justify-center disabled:p-1 btn"
                  disabled={loading}
                >
                  <img
                    className="animate-spin w-[22px] sm:w-[35px] text-center"
                    src={loader.src}
                    alt="spinner-frame-8"
                  />
                </button>
                )}
                {!loading && (
                  <button type="submit" className="btn">
                    Sign Up
                  </button>
                )}
              </form>
            </>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setOpen(false);
                dispatch(setSignUp(false));
              }}
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SignUp;
