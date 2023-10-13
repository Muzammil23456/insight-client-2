'use client'

import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from "next/navigation";
import {
  getAuth,
  applyActionCode,
  sendEmailVerification
} from "firebase/auth";
import firebase from 'firebase/app';
import { auth } from "../../modules/fileauth";

const page = () => {

  const actionCode = useSearchParams()
  
//   useEffect(()=>{
  
//   const getActionCodeFromURL = () => {
//     // Implement a function to extract the action code from the URL
//     // You can use URLSearchParams or any other method based on your routing setup.
//     // For example, if the action code is in the query parameter 'code':
//     const params = new URLSearchParams(window.location.search);
//     return params.get('code');
//   };
//   // const auth = firebase.auth();
//   const auth = getAuth();
//   // Replace with the actual action code
//   const continueUrl = "/"; // Replace with the actual continue URL
//   const lang = "en"; // Replace with the actual language
//   function handleVerifyEmail(auth, actionCode, continueUrl, lang) {
//     // Localize the UI to the selected language as determined by the lang
//     // parameter.
//     // Try to apply the email verification code.
//     sendEmailVerification(auth.currentUser)
//     applyActionCode(auth, actionCode)
//       .then((resp) => {
//         console.log(resp)
//         // Email address has been verified.
//         // TODO: Display a confirmation message to the user.
//         // You could also provide the user with a link back to the app.
//         // TODO: If a continue URL is available, display a button which on
//         // click redirects the user back to the app via continueUrl with
//         // additional state determined from that URL's parameters.
//       })
//       .catch((error) => {
//         // Code is invalid or expired. Ask the user to verify their email address
//         // again.
//       });
//     }

//     handleVerifyEmail(auth, actionCode, continueUrl, lang);
//  },[])

// useEffect(() => {
  
//   const actionCode = ''; // Implement a function to get the action code from the URL
//   const continueUrl = 'http://localhost:3000/'; // Replace with your actual continue URL
//   const lang = 'en'; // Replace with the actual language

//   handleVerifyEmail(auth, actionCode, continueUrl, lang);
// }, []);
//   const params = new URLSearchParams(window.location.search).get('oodCode');
// console.log(params)
// const handleVerifyEmail = (auth, actionCode, continueUrl, lang) => {
//   applyActionCode(auth,actionCode)
//     .then((res) => {
//       console.log(res)
//       // Email address has been verified successfully.
//       // setVerificationStatus('Email verification successful. Redirecting...');
//       // Redirect to a success page or display a success message
//       if (continueUrl) {
//         window.location.href = continueUrl;
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//       // Code is invalid or expired. Ask the user to verify their email address again.
//       // setVerificationStatus(`Email verification error: ${error.message}`);
//     });
// };
  return (
    <>
    <div>verification sent</div>
    {/* <button disabled={!auth.currentUser?.emailVerified} onClick={()=>{router.push('/')}}>Return</button> */}
    </>
  )
}

export default page