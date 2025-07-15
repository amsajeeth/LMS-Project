import { signInWithEmailAndPassword } from "@firebase/auth";

import { auth } from "/firebase";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const StudentAuth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigate();

  const handleLogin = async () => {
    if (email == "" && pass == "") {
      alert("Please fill in all fields");
    } else {
      try {
        alert("Please Wait...");

        await signInWithEmailAndPassword(auth, email, pass);
        navigation("/");
      } catch (err) {
        console.log(err);
        alert(err.code);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full  mx-5 p-5 md:w-[80vw] min-h-[80vh] md:shadow-2xl grid grid-cols-1 md:grid-cols-2">
        <img
          src="images/auth.png"
          alt="Authentication"
          className="h-[80vh] hidden md:block p-20 object-contain"
        />
        <div className="  flex flex-col items-center justify-center gap-5">
          <img
            src="images/logo4.png"
            alt=""
            className="h-[20vh] object-contain "
          />
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Student Login
          </h1>
          <div className="h-10"></div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <button
            className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="mt-4 text-center">
            Are You A Teacher?{" "}
            <a href="/Teacherauth" className="text-blue-500">
              TeacherLogin
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentAuth;
