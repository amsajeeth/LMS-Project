import { db } from "/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProfile = ({ user }) => {
  const [sb, setSB] = useState([]);
  const [n, sn] = useState("");
  const [m, sm] = useState("");
  //   const [n, sn] = useState("");
  const navigation = useNavigate();

  const managelisr = (data) => {
    // alert(data);

    if (sb.includes(data)) {
      sb.pop(data);
      setSB([...sb]);
    } else {
      setSB([...sb, data]);
    }
    console.log(sb);
  };

  const setData = async () => {
    alert("Please Wait...");
    const data = {
      userID: user.uid,
      userEmail: user.email,
      userName: n,
      mobile: m,
      subjects: sb,
      Firstlanguage: [],
      English: [],
      History: [],
      Science: [],
      Mathematics: [],
    };
    await setDoc(doc(db, "Users", user.email), data);
    alert("Profile Created");
    navigation("/");
  };

  return (
    <div className="min-h-screen w-full flex justify-center place-items-center">
      <div className="max-w-[500px] min-w-[450px] mx-auto shadow-xl py-10 px-5 rounded-xl text-center ">
        <h1 className="font-bold pb-5">Complete Your Profile</h1>
        <input
          type="text"
          onChange={(e) => sn(e.target.value)}
          placeholder="Enter your Name"
          className="border-2 border-gray-300 p-4 rounded-lg w-full  max-w-[300px]"
        />
        <div className="h-5"></div>
        <input
          type="text"
          onChange={(e) => sm(e.target.value)}
          placeholder="Mobile Number"
          className="border-2 border-gray-300 p-4 rounded-lg w-full  max-w-[300px]"
        />{" "}
        <div className="h-5"></div>
        {/* <h1 className="font-bold py-5">Select Subjects You want to learn</h1> */}
        <button
          onClick={setData}
          className="bg-black mx-3 w-full py-4 my-10  rounded-xl px-2 text-white max-w-[300px]"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default CreateProfile;
