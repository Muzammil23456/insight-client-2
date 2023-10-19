"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import loader from '@/public/loadingWhite.png'
import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword ,getAuth } from "firebase/auth";
// import { auth11 } from "../../modules/fileauth";

type onDataType = {
  ondata: (bool: boolean)=>void
}
const schema = z.object({
  Email: z.string().nonempty("Required").email("Invalid Email"),
  Password: z.string().nonempty("Required").min(6, { message: "Atleast 6" }),
});
const SignIn = ({ ondata } : onDataType) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });
  const [open, setOpen] = useState(false);

  const action = () => {
    const X = window.scrollX;
    const Y = window.scrollY;
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(setBoolean2(false));
      window.scrollTo(X, Y);
    }, 3000);
  };
  const auth = getAuth()
  const onsubmit = (data: any) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, data.Email, data.Password)
      .then(() => {
        setOpen(false);
        ondata(false);
        dispatch(setBoolean(true));
        dispatch(setText("Successfully Sign In"));
        reset();
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        setOpen(false);
        ondata(false);
        dispatch(setBoolean2(true));
        dispatch(setText2(errorMessage));
        // ondata1(true);
        action();
      });
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((pre) => !pre);
  };
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">
              Sign In
            </AlertDialogTitle>
            <>
              <form
                onSubmit={handleSubmit(onsubmit)}
                className="flex form justify-center pt-6"
              >
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
                {loading && (
                  <button
                    type="submit"
                    className="flex justify-center disabled:p-1 btn"
                    disabled={loading}
                  >
                    <img
                      className="animate-spin text-center"
                      src={loader.src}
                      width='35px'
                      height='35px'
                      alt="spinner-frame-8"
                    />
                  </button>
                )}
                {!loading && (
                  <button type="submit" className="btn">
                    Sign In
                  </button>
                )}
              </form>
            </>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cancel"
              onClick={() => {
                setOpen(false);
                ondata(false);
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
export default SignIn;
