import { db } from "/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentUploadingPage from "../TeacherPages/ContentUploadingPage";
import ScheduledPage from "./ScheduledPage";
import ReactTimeAgo from "react-time-ago";
import { AppBar } from "@/components/AppBar";
import { getAuth, signOut } from "@firebase/auth";
import { auth } from "/firebase";

const Subject = ({ user }) => {
  const param = useParams();
  const [data, setData] = useState([]);

  const subject = param.subject;

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("run");
    try {
      const q = query(
        collection(db, "content"),
        orderBy("createdAt"),
        where("subject", "==", subject)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(filteredData);

      setData(filteredData);

      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCount = async (id) => {
    if (subject == "Science") {
      await updateDoc(doc(db, "Users", user.email), {
        Science: arrayUnion(id),
      });
    }
    if (subject == "Mathematics") {
      await updateDoc(doc(db, "Users", user.email), {
        Mathematics: arrayUnion(id),
      });
    }
    if (subject == "English") {
      await updateDoc(doc(db, "Users", user.email), {
        English: arrayUnion(id),
      });
    }
    if (subject == "FirstLanguage") {
      await updateDoc(doc(db, "Users", user.email), {
        FirstLanguage: arrayUnion(id),
      });
    }
    if (subject == "History") {
      await updateDoc(doc(db, "Users", user.email), {
        History: arrayUnion(id),
      });
    }
  };

  const extractYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.1) {
      console.log("done");
    }
  };
  const opts = {
    height: "400",
    width: "350",
  };
  return (
    <div className="mx-auto  min-h-screen ">
      <div className="nav shadow-md w-full h-[8vh] px-10  bg-white z-[20]">
        <div className="max-w-[1300px] flex justify-around items-center mx-auto">
          <a href="/">
            <div className="flex items-center justify-center gap-4">
              <img src="/images/logo4.png" alt="" className="h-[8vh] " />
              <h1 className="font-bold text-xl">EduRaise</h1>
            </div>
          </a>
          <button
            className="bg-black text-white py-3 px-5 rounded-xl"
            onClick={(e) => {
              signOut(auth);
            }}
          >
            LogOut
          </button>
        </div>
      </div>
      <div className="h-10"></div>

      <div className=" flex flex-col xl:flex-row px-3 pb-20 max-w-[1300px] mx-auto pt-10 gap-[4rem]">
        <div className=" w-[100%] xl:w-[70%]">
          {data.length == 0 ? (
            <h1 className="text-3xl">NO Materials Found</h1>
          ) : (
            <></>
          )}
          {data.map((data) => {
            var link = data.link;

            return data.type == "video" ? (
              <a
                href={data.link}
                target="_blank"
                onClick={(e) => updateCount(data.id)}
              >
                <div className=" w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden   my-5  border-2">
                  <div className=" px-10 py-2">
                    <div className="flex gap-5 items-center">
                      <img
                        src="/images/video.png"
                        alt=""
                        className="h-10 w-10"
                      />
                      <div className="text-left flex flex-col gap-1">
                        <h3 className="block mt-1 text-lg leading-tight capitalize font-medium text-black">
                          {data.title}
                        </h3>
                        <p>
                          <ReactTimeAgo
                            date={data.createdAt.toDate()}
                            locale="en-US"
                          />{" "}
                        </p>
                      </div>

                      <div className="mt-4 flex space-x-4"></div>
                    </div>
                  </div>
                </div>
              </a>
            ) : (
              <a href={data.link} target="_blank">
                <div className=" w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden   my-5  border-2">
                  <div className=" px-10 py-2">
                    <div className="flex gap-4 items-center">
                      <img
                        src="/images/google-docs.png"
                        alt=""
                        className="h-10 w-10"
                      />
                      <div className="text-left flex flex-col gap-1">
                        <h3 className="block mt-1 text-lg leading-tight capitalize font-medium text-black">
                          {data.title}
                        </h3>
                        <p>
                          <ReactTimeAgo
                            date={data.createdAt.toDate()}
                            locale="en-US"
                            timeStyle="twitter"
                          />{" "}
                        </p>
                      </div>

                      <div className="mt-4 flex space-x-4"></div>
                    </div>
                  </div>
                </div>
              </a>
            ); //display the content in the content uploading page.
          })}
        </div>
        <ScheduledPage user={user} subject={subject} />
      </div>
    </div>
  );
};

export default Subject;
