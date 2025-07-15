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

const FeedbackPage = () => {
  const [data, setData] = useState([]);
  const [fileType, setFileType] = useState("");
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("run");
    try {
      const q = query(collection(db, "feedbacks"));
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
  const Remove = async (ids) => {
    if (confirm("Are you sure?") == true) {
      await deleteDoc(doc(db, "feedbacks", ids));
      getData();
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="px-3 pb-20 max-w-[1300px] mx-auto pt-10 ">
        <div className="xl:w-[70%]">
          {data.map((data) => {
            return (
              <div className="border py-10 px-5">
                <p className="text-2xl">{data.email}</p>
                <p>{data.message}</p>
                <div className="h-10"></div>
                <buttton
                  className="bg-red-600 px-10 py-3 rounded-3xl  text-white"
                  onClick={(e) => Remove(data.id)}
                >
                  Remove
                </buttton>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-20"></div>
    </div>
  );
};

export default FeedbackPage;
