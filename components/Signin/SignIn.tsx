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
import { auth } from "../../modules/fileauth";

const schema = z.object({
  Email: z.string().nonempty("Required").email("Invalid Email"),
  Password: z.string().nonempty("Required").min(6, { message: "Atleast 6" }),
});
const SignIn = ({ ondata }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });
  const [open, setOpen] = useState(false);

  //   const auth = getAuth();
  const onsubmit = (data: any) => {
    signInWithEmailAndPassword(auth, data.Email, data.Password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`SignIn Successfully`)
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

  function togglePassword() {
    let passwordInput = document.getElementById('txtPassword'),
    icon = document.getElementById('toggler');
    console.log(passwordInput)
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.innerHTML='hide'
    } else {
      passwordInput.type = 'password';
      icon.innerHTML='show'
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword((pre)=>!pre);
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
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  {...register("Password")}
                  placeholder="Password"
                />
                 <span 
                    onClick={togglePasswordVisibility}
                  className="show">
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </div>
                {errors && (
                  <span className="error ">{errors?.Password?.message}</span>
                )}
                <button type="submit" className="btn">
                  Sign In
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
export default SignIn;
