import { db } from "/firebase";
import {
  addDoc,
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
import YouTube from "react-youtube";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactTimeAgo from "react-time-ago";
import ScheduledPage from "../BasePagesStudent/ScheduledPage";

const MaterialPage = ({ user }) => {
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  const handleFileTypeChange = (e) => setFileType(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("run");
    try {
      const q = query(collection(db, "content"), orderBy("createdAt"));
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
  const Remove = async (ids, type) => {
    if (confirm("Are you sure?") == true) {
      await deleteDoc(doc(db, "content", ids));
      getData();
      if (type == "document") return;
      //   await updateDoc(doc(db, "subjects", subject), {
      //     videoCount: increment(-1),
      //   });
    }
  };
  const extractYouTubeID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ fileType, link, title });

    try {
      await addDoc(collection(db, "content"), {
        title: title,
        link: link,
        type: fileType,
        // subject: subject,
        createdBy: user.email,
        createdAt: new Date(),
      });
      getData();
      if (fileType == "document") return;
      //   await updateDoc(doc(db, "subjects", subject), {
      //     videoCount: increment(1),
      //   });
    } catch (e) {
      console.log("Error uploading file: ", e);
    }
  };

  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration();
    const currentTime = e.target.getCurrentTime();
    if (currentTime / duration > 0.1) {
      //   setModalIsOpen(true);
      console.log("done");
    }
  };
  return (
    <div className="min-h-screen ">
      <div className=" min-h-screen  flex flex-col xl:flex-row px-3 pb-20 max-w-[1300px] mx-auto pt-10 gap-[4rem]">
        <div className="min-h-screen w-[100%] xl:w-[70%]">
          {data.map((data) => {
            var link = data.link;

            return data.type == "video" ? (
              <div className=" w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden   my-5  border-2">
                <div className=" px-10 py-2">
                  {/* <YouTube
                      videoId={extractYouTubeID(link)}
                      onPlay={(e) => {
                        console.log(e);
                      }}
                      opts={opts}
                      onEnd={(e) => updateCount(data.id)}
                      onStateChange={(e) => checkElapsedTime(e)}
                    /> */}

                  {/* Title and Buttons */}

                  <div className="flex items-center justify-between">
                    <a
                      href={data.link}
                      target="_blank"
                      onClick={(e) => updateCount(data.id)}
                    >
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
                          <h3 className="block mt-1 text-md leading-tight   text-black">
                            {data.createdBy}
                          </h3>{" "}
                          <h3 className="block mt-1 text-md leading-tight   text-black">
                            {data.subject}
                          </h3>
                        </div>
                      </div>
                    </a>

                    <buttton
                      className="bg-red-600 px-10 py-3 rounded-3xl text-white"
                      onClick={(e) => Remove(data.id, data.type)}
                    >
                      Remove
                    </buttton>
                  </div>
                </div>
              </div>
            ) : (
              <div className=" w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden   my-5  border-2">
                <div className=" px-10 py-2">
                  {/* <YouTube
                      videoId={extractYouTubeID(link)}
                      onPlay={(e) => {
                        console.log(e);
                      }}
                      opts={opts}
                      onEnd={(e) => updateCount(data.id)}
                      onStateChange={(e) => checkElapsedTime(e)}
                    /> */}

                  {/* Title and Buttons */}
                  <div className="flex  items-center justify-between">
                    <a href={data.link} target="_blank">
                      <div className="flex items-center gap-5">
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
                      </div>
                    </a>

                    <buttton
                      className="bg-red-600 px-10 py-3 rounded-3xl text-white"
                      onClick={(e) => Remove(data.id, data.type)}
                    >
                      Remove
                    </buttton>
                  </div>
                </div>
              </div>
            ); //display the content in the content uploading page.
          })}
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default MaterialPage;
