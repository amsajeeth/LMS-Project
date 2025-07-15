import { getAuth, signOut } from "@firebase/auth";
import { auth } from "/firebase";
import React from "react";

export const AppBar = () => {
  return (
    <div>
      <div className="nav shadow-md w-full h-[8vh] px-10 fixed bg-white z-[20]">
        <div className="max-w-[1300px] flex justify-around items-center mx-auto">
          <a href="/">
            <div className="flex items-center justify-center gap-4">
              <img src="images/logo4.png" alt="" className="h-[8vh] " />
              <h1 className="font-bold text-xl">EduRaise</h1>
            </div>
          </a>{" "}
          {getAuth().currentUser == null ? (
            <></>
          ) : (
            <button
              className="bg-black text-white py-3 px-5 rounded-xl"
              onClick={(e) => {
                signOut(auth);
              }}
            >
              LogOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
