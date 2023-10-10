"use client";

import React, { useEffect } from "react";
import "./style.css";
import { useState } from "react";

function Stepper() {
  const steps = [
    "https://img.icons8.com/sf-ultralight-filled/30/932c90/sent.png",
    "https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/30/932c90/external-new-email-mailing-smashingstocks-glyph-smashing-stocks.png",
    "https://img.icons8.com/external-kmg-design-glyph-kmg-design/30/932c90/external-processing-arrows-kmg-design-glyph-kmg-design.png",
    "https://img.icons8.com/fluency-systems-regular/30/932c90/favorite-window.png",
    "https://img.icons8.com/ios/30/932c90/pass.png",
  ];

  const [currentstep, setCurrentStep] = useState(1);

  return (
    <div className="my-2">
      <div className="flex justify-center my-2 text-center">
        {steps.map((step, i) => (
          <div
            className={`steps 
            ${currentstep === i + 1 && `after:!bg-pink-910 `} 
            ${currentstep > i + 1 && `after:!bg-pink-910 `}`}
          >
            <span className="relative inline-flex">
              <img
              className={`step_img  
              ${(i === 4 && currentstep == i + 1) && `!border-green-600 border-1 !bg-green-600 `}
              ${(currentstep == i + 1 && i < 4 ) && `!border-pink-910`} 
              ${(i === 2 && currentstep == i + 1) && `animate-spin`}
              ${currentstep > i + 1 && `!border-pink-910 transition-colors delay-150 duration-300 ease-in-out`}`}
                src={
                  i === 4 && currentstep == i + 1
                    ? `https://img.icons8.com/ios/30/FFFFFF/checkmark--v1.png`
                    : step
                }
              />
              {currentstep === i + 1 && (
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-751 
                  ${(i === 4 && currentstep == i + 1) ? `bg-green-600` : `bg-pink-910`}`}
                ></span>
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center">
        <button
          className={`btn ${
            currentstep === 1 && `cursor-not-allowed opacity-50`
          }`}
          disabled={currentstep === 1}
          onClick={() => {
            setCurrentStep((prev) => prev - 1);
          }}
          type="button"
        >
          Previous
        </button>
        <button
          className={`btn border-gray-400 ${
            currentstep === 5 && `cursor-not-allowed opacity-50`
          }`}
          disabled={currentstep === 5}
          onClick={() => {
            setCurrentStep((prev) => prev + 1);
          }}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Stepper;
