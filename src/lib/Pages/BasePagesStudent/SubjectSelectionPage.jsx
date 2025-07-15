import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "/firebase"; // Import the Firestore instance
import { AppBar } from "@/components/AppBar";
const SubjectSelectionPage = ({ user, userDatas }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log("run");
    try {
      const q = query(collection(db, "subjects"));
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

  return (
    <div className="">
      <AppBar />
      <div className="h-[80vh] relative ">
        <div className="absolute h-[80vh] bg-[#00000075] w-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-center text-8xl text-white ">
            {" "}
            EduRise
          </h1>
          <p className="text-white ">The Best Education System</p>
        </div>
        <img
          src="images/main.jpg"
          className="h-[80vh] w-full object-cover"
          alt=""
        />
        <div className="box  w-full    absolute bottom-[-8vh] z-10">
          <div className="h-28 shadow-2xl mx-auto flex justify-center items-center w-[350px] bg-white rounded-2xl">
            <h1 className="font-bold text-2xl">HI {userDatas.userName}</h1>
          </div>
        </div>
      </div>

      <h1 className="text-5xl font-bold text-center pt-[20vh] pb-10 ">
        Subjects
      </h1>
      <div className=" gap-5 grid xl:grid-cols-3 px-4 xl:px-0 py-20">
        {data.map((doc) => {
          const subject = doc.id;
          return (
            <a href={"/subject/" + doc.id}>
              <div className="max-w-[450px] mx-auto  shadow-2xl pb-5 text-center rounded-2xl gap-5 flex flex-col">
                <div
                  className={`box max-w-[450px] py-10   flex justify-center gap-5  items-center    rounded-2xl bg-[#7369fa] text-white`}
                >
                  <img
                    src="images/logo4.png"
                    alt=""
                    className="h-[10vh] w-20 "
                  />
                  <div>
                    <h1 className="text-center text-2xl font-bold">{doc.id}</h1>
                  </div>
                </div>

                {doc.videoCount == 0 ? (
                  <div>
                    <h1 className="font-bold">0/0 Complete </h1>
                    <progress
                      value={0}
                      max={100}
                      className="my-3 h-2 progress-bar px-10"
                    ></progress>
                  </div>
                ) : doc.videoCount == userDatas[subject].length ? (
                  <h1 className="font-bold">Completed</h1>
                ) : (
                  <div>
                    <h1 className="font-bold">
                      {userDatas[subject].length}/{doc.videoCount} Complete{" "}
                    </h1>
                    <progress
                      value={userDatas[subject].length}
                      max={doc.videoCount}
                      className="my-3 h-2 progress-bar px-10"
                    ></progress>
                  </div>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SubjectSelectionPage;
