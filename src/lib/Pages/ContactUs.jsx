import { AppBar } from "@/components/AppBar";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { db } from "/firebase";

export const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [feeedback, setFeedback] = useState("");

  const submitContact = async () => {
    try {
      await addDoc(collection(db, "contacts"), {
        email: email,
        number: number,
        message: feeedback,
      });
      alert("done");
      window.location.reload();
    } catch (e) {
      alert("Error! Please Try again.");
    }
  };
  const submitFeedback = async () => {
    try {
      await addDoc(collection(db, "feedbacks"), {
        email: email,

        message: feeedback,
      });
      alert("done");
      window.location.reload();
    } catch (e) {
      alert("Error! Please Try again.");
    }
  };
  return (
    <div>
      <AppBar />
      <div className="h-[80vh] relative ">
        <div className="absolute h-[80vh] bg-[#00000075] w-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-center text-7xl text-white ">
            {" "}
            Contact Us
          </h1>
        </div>
        <img
          src="images/main.jpg"
          className="h-[80vh] w-full object-cover"
          alt=""
        />
      </div>
      <div className="max-w-[800px] mx-auto pt-20 pb-10 text-xl px-5 grid md:grid-cols-3 gap-5 text-center">
        <div className="shadow-xl max-w-[300px] px-10 py-5 border rounded-xl  mx-auto">
          {" "}
          071 xxx xxxx
        </div>
        <div className="shadow-xl max-w-[300px] px-10 py-5 border rounded-xl mx-auto">
          {" "}
          071 xxx xxxx
        </div>
        <div className="shadow-xl max-w-[300px] px-10 py-5 border rounded-xl mx-auto">
          {" "}
          071 xxx xxxx
        </div>
      </div>
      <div className="max-w-[800px] mx-auto  text-xl px-5 grid md:grid-cols-2 gap-5 text-center">
        <div className="shadow-xl max-w-[300px] px-10 py-5 border rounded-xl">
          eduRise@gmail.com
        </div>{" "}
        <div className="shadow-xl max-w-[300px] px-10 py-5 border rounded-xl">
          eduRise@gmail.com
        </div>
      </div>
      <Tabs defaultValue="account" className="w-[400px] mx-auto mt-20">
        <TabsList>
          <TabsTrigger value="account">Feedbacks</TabsTrigger>
          <TabsTrigger value="password">Contact Us</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="shadow-lg flex flex-col w-full md:max-w-[400px] mx-auto py-5 px-10">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
            />
            <TextArea
              className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
              onClick={submitFeedback}
            >
              Submit
            </button>
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className="shadow-lg flex flex-col w-full md:max-w-[400px] mx-auto py-5 px-10">
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your Email"
              className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
            />
            <input
              type="text"
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Contact Number"
              className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
            />
            <TextArea
              className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button
              className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
              onClick={submitContact}
            >
              Submit
            </button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="h-20"></div>
    </div>
  );
};
