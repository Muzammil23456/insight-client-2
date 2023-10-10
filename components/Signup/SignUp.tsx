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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../modules/fileauth";

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

const SignUp = ({ ondata }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
      Confirm_Password: "",
    },
  });

  //   const auth = getAuth();
  const onsubmit = (data: any) => {
    createUserWithEmailAndPassword(auth, data.Email, data.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`SignUp Successfully`);
        setOpen(false);

        ondata(false);
        reset();
      })
      .catch((error) => {
        alert(error.code);
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword((pre)=>!pre);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((pre)=>!pre);
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
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="off"
                    {...register("Password")}
                    placeholder="Password"
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    className="show"
                  >
                   {showPassword ? 'Hide' : 'Show'}
                  </span>
                </div>
                {errors && (
                  <span className="error ">{errors?.Password?.message}</span>
                )}
                <div className="relative w-full text-center">
                  <input
                    className="input "
                    type={showPassword2 ? 'text' : 'password'}
                    autoComplete="off"
                    {...register("Confirm_Password")}
                    placeholder="Confirm Password"
                  />
                  <span
                    onClick={togglePasswordVisibility2}
                    className="show"
                  >
                    {showPassword2 ? 'Hide' : 'Show'}
                  </span>
                </div>
                {errors && (
                  <span className="error ">
                    {errors?.Confirm_Password?.message}
                  </span>
                )}
                <button type="submit" className="btn">
                  Sign Up
                </button>
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
