import React, { useEffect, useState } from "react";
import { db } from "/firebase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { DatePicker } from "antd";
import { TimePicker } from "antd";
import emailjs from "@emailjs/browser";
import ContentUploadingPage from "./ContentUploadingPage";
import ScheduledPage from "../BasePagesStudent/ScheduledPage";
import { AppBar } from "@/components/AppBar";

const Teacher = ({ user, subject }) => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    getData();
    getClasses();
  }, []);

  const [sb, setSB] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateS, setDateS] = useState("");
  const [title, setTitle] = useState("");
  const [timeStart, setStartTime] = useState("");
  const [timeEnd, setEndTime] = useState("");

  const addToMyList = async () => {
    if (confirm("Are you sure you want to add") == false) return;
    try {
      await addDoc(collection(db, "class"), {
        teacher: user.email,
        date: date,
        dateString: dateS,
        startTime: timeStart,
        endAt: timeEnd,
        title: title,
        subject: subject,
      });

      for (let i = 0; i < data.length; i++) {
        SendEmail(
          data[i].userEmail,
          `New Class Scheduled \n subject: ${subject}\n startTime:${timeStart}`
        );
      }
      alert("success!");
      location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const SendEmail = (email1, Message) => {
    emailjs
      .send(
        "service_g2qbwal",
        "template_6lgvjiy",
        {
          toemail: email1,

          message: Message,
        },

        "bL8segH-rFW2jlBe_"
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };
  const getClasses = async () => {
    console.log("run");
    try {
      const q = query(
        collection(db, "class"),
        where("teacher", "==", user.email)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setClasses(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  const getData = async () => {
    console.log("run");
    try {
      const q = query(collection(db, "Users"));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setData(filteredData);
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = async (id) => {
    if (confirm("Are you sure you want to cancel") == false) return;
    await deleteDoc(doc(db, "class", id));
    setTimeout(function () {
      //your code to be executed after 1 second

      getData();
      location.reload();
    }, 1000);
  };
  const onChange = (date, dateString) => {
    setDate(date.$d);
    setDateS(dateString);
    // console.log(date.$d);
  };
  const onChangeTime = (time, timeString) => {
    setStartTime(timeString[0]);
    setEndTime(timeString[1]);
  };
  return (
    <>
      <AppBar />
      <div className="mx-auto max-w-[1300px] min-h-screen">
        <Tabs defaultValue="account" className="w-full min-h-screen">
          <div className="h-20"></div>
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="account">Content Uploading</TabsTrigger>
            <TabsTrigger value="password">Schedule</TabsTrigger>{" "}
            {/* <TabsTrigger value="chat">chat</TabsTrigger> */}
          </TabsList>
          <TabsContent value="account" className="w-full">
            <ContentUploadingPage user={user} subject={subject} />
          </TabsContent>
          <TabsContent value="password">
            <div className="h-10"></div>
            <div className=" max-w-[500px] mx-auto shadow-lg cursor-pointer rounded-xl">
              <h1 className=" text-center py-3 px-10 font-bold text-3xl pb-10">
                Schedule A Session
              </h1>

              <div className="flex flex-col ">
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="title"
                  className="border-2 border-gray-300 w-full  p-4 rounded-lg max-w-[300px] mx-auto"
                />
                <DatePicker
                  onChange={onChange}
                  needConfirm
                  className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px] mx-auto"
                />
                <TimePicker.RangePicker
                  className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px] mx-auto"
                  onChange={onChangeTime}
                />
              </div>

              <div className="flex pb-10">
                <button
                  className="mt-6 bg-blue-500 mx-auto text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
                  onClick={addToMyList}
                >
                  Schedule
                </button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="chat"></TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Teacher;
