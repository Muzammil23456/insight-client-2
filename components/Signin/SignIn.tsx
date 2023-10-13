"use client";

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
import "./style.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth11 } from "../../modules/fileauth";

const schema = z.object({
  Email: z.string().nonempty("Required").email("Invalid Email"),
  Password: z.string().nonempty("Required").min(6, { message: "Atleast 6" }),
});
const SignIn = ({ ondata }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const onsubmit = (data: any) => {
    setLoading(true);
    signInWithEmailAndPassword(auth11, data.Email, data.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`SignIn Successfully`);
        setOpen(false);
        ondata(false);
        reset();
      })
      .catch((error) => {
        setLoading(false);
        alert(error.code);
        const errorMessage = error.message;
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
                  <button type="submit" className="flex justify-center disabled:p-1 btn" disabled={loading}>
                    <img
                    className="animate-spin text-center"
                      src="https://img.icons8.com/material-sharp/30/FFFFFF/spinner-frame-8.png"
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
