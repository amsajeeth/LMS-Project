import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "/firebase";
import { createUserWithEmailAndPassword, signOut } from "@firebase/auth";
import { auth } from "/firebase";
import emailjs from "@emailjs/browser";
const ManageTeachers = () => {
  // const [email, setEmail] = useState("");
  // const [pass, setPass] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  // const RegisterTeacher = async () => {
  //   if (email == "" && pass == "") {
  //     alert("Please fill in all fields");
  //   } else {
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, pass);
  //       signOut(auth);
  //       alert("Teacher registered successfully.");
  //     } catch (err) {
  //       console.log(err);
  //       alert(err.code);
  //     }
  //   }
  // };

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
  const getData = async () => {
    console.log("run");
    try {
      const q = query(collection(db, "teacher"));
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
  const updateData = async (email) => {
    const otp1 = Math.floor(100000 + Math.random() * 900000);

    try {
      await createUserWithEmailAndPassword(auth, email, otp1);
    } catch (err) {}
    await signOut(auth);

    await updateDoc(doc(db, "teacher", email), {
      accepted: true,
    });
    SendEmail(
      email,
      "we accepted Your Profile \n email: " + email + "\npassword: " + otp1
    );
    getData();
  };
  const Delete = async (email) => {
    await deleteDoc(doc(db, "teacher", email));

    DeleteContent(email);
    DeleteClasses(email);
    getData();
  };
  const DeleteContent = async (email) => {
    console.log(email);
    try {
      const q = query(
        collection(db, "content"),
        where("createdBy", "==", email)
      );
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(filteredData);
      filteredData.map(async (docu) => {
        await deleteDoc(doc(db, "content", docu.id));
      });

     
    } catch (err) {
      console.log(err);
    }
  };
  const DeleteClasses = async (email) => {
    console.log(email);
    try {
      const q = query(collection(db, "class"), where("teacher", "==", email));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      console.log(filteredData);
      filteredData.map(async (docu) => {
        console.log(doc.id);
        await deleteDoc(doc(db, "class", docu.id));
      });

     
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="min-h-[80vh] w-full flex flex-col  items-center gap-4">
        <h1 className="font-bold text-2xl pt-5">Teachers</h1>

        {data.map((data) => {
          return (
            <div
              key={data.id}
              className="border-2 border-gray-300 p-4 rounded-lg w-full px-10 max-w-[400px]"
            >
              <p>{data.name}</p>
              <p>{data.email}</p>
              <p>{data.subject}</p>
              <a href={data.CV} target="_blank">
                <button
                  className="bg-black text-white px-10 py-2 my-2 rounded-2xl"
                  onClick={(e) => updateData(data.email)}
                >
                  CV
                </button>
              </a>
              <div className="flex gap-4 pt-5">
                {data.accepted ? (
                  <div className="flex gap-4 ">
                    <button className="bg-green-500 text-white px-10 py-3 rounded-2xl">
                      Accepted
                    </button>
                    <button
                      className="bg-red-500 text-white px-10 py-3 rounded-2xl"
                      onClick={(e) => Delete(data.email)}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      className="bg-green-500 text-white px-10 py-3 rounded-2xl"
                      onClick={(e) => updateData(data.email)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-red-500 text-white px-10 py-3 rounded-2xl"
                      onClick={(e) => Delete(data.email)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageTeachers;
