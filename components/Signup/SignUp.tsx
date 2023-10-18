"use client";

import "./style.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import {
  setText,
  setBoolean,
} from "../../app/GlobalRedux/Features/alert/alertSlice";
import loader from "@/public/loadingWhite.png";

import {
  setText2,
  setBoolean2,
} from "../../app/GlobalRedux/Features/alert2/alert2Slice";
import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
  applyActionCode,
} from "firebase/auth";
import { useRouter } from "next/navigation";

type oobCode= {
  oobCode: string
}
const schema = z
  .object({
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

type onDataType = {
  ondata: (bool: boolean) => void;
};
const SignUp = ({ ondata }: onDataType) => {
  // declaration
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [oobCode,setOobCode] = useState('')
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const auth = getAuth();
  const searchParams = useSearchParams();
  if(searchParams.get("oobCode")){
    setOobCode(`${searchParams.get("oobCode")}`);
  }

  console.log(oobCode);
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
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
      Confirm_Password: "",
    },
  });

  //Sign Up
  const onsubmit = (data: any) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, data.Email, data.Password)
      .then(() => {
        sendEmailVerification(auth.currentUser).then(() => {
          setOpen(false);
          ondata(false);
          applyActionCode(auth, oobCode).then((resp) => {
            console.log(resp)
            dispatch(setBoolean(true));
            dispatch(setText("Verification Email Sent Please Check it."));
          }).catch((err)=>{console.log(err)})
        });
        // alert(`SignUp Successfully`);
        // setOpen(false);
        // ondata(false);
        // reset()
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        setOpen(false);
        ondata(false);
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
                      className="animate-spin text-center"
                      src={loader.src}
                      width="35px"
                      height="35px"
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

export default SignUp;
