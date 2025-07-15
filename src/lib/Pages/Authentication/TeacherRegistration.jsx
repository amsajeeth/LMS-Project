import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "/firebase";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "/firebase";

const TeacherRegistration = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [CV, setCV] = useState("");
  const navigation = useNavigate();

  const handleLogin = async () => {
    if (email == "" && CV == "" && subject == "") {
      alert("Please fill in all fields");
    } else {
      alert("Please wait...");
      try {
        await setDoc(doc(db, "teacher", email), {
          email: email,
          accepted: false,
          name: name,
          CV: CV,
          subject: subject,
        });
        alert(
          "We will send your login details to your email address after reviewing"
        );
        navigation("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full  mx-5 p-5 md:w-[80vw]  shadow-2xl ">
        <img
          src="images/logo.jpeg"
          alt="Authentication"
          className="h-[20vh]  w-[20vh] mx-auto "
        />
        <div className="  flex flex-col items-center justify-center gap-5 ">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            TutorRegistration
          </h1>
          <div className="h-10"></div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <select
            className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="Firstlanguage">First language</option>
            <option value="English">English</option>
            <option value="History">History</option>
            <option value="Science">Science</option>
            <option value="Mathematics">Mathematics</option>
          </select>
          <input
            type="text"
            onChange={(e) => setCV(e.target.value)}
            placeholder="CV link(google drive Link)"
            className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <button
            className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
            onClick={handleLogin}
          >
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <a href="/teacherauth" className="text-blue-500">
              Tutor Login
            </a>
          </p>{" "}
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

export default TeacherRegistration;
