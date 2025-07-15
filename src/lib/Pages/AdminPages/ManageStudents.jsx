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
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
} from "@firebase/auth";
import { auth } from "/firebase";

const ManageStudents = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const RegisterTeacher = async () => {
    if (email == "" && pass == "") {
      alert("Please fill in all fields");
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);

        alert("Student Registration successfull.");
      } catch (err) {
        console.log(err);
        alert(err.code);
      }
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

      // setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const updateData = async (email) => {
    await deleteUser(auth, email);

    getData();
  };
  const Delete = async (email) => {
    await deleteDoc(doc(db, "Users", email));

    getData();
  };
  return (
    <div>
      <div className="min-h-[80vh] w-full flex flex-col pt-10 items-center gap-4">
        <Dialog>
          <DialogTrigger>
            <button className="bg-blue-500 text-white py-3 px-4">
              Register a Student
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register a Student</DialogTitle>
              <DialogDescription
                className={"flex flex-col justify-center items-center py-5"}
              >
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
                />
                <input
                  type="password"
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                  className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
                />
                <button
                  className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
                  onClick={RegisterTeacher}
                >
                  Register
                </button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <h1 className="font-bold text-2xl pt-10">Students</h1>
        {data.map((data) => {
          return (
            <div
              key={data.id}
              className="border-2 border-gray-300 p-4 rounded-lg w-full px-10 max-w-[400px]"
            >
              <p>{data.userEmail}</p>
              <p>{data.userName}</p>
              <button
                className="bg-red-500 text-white px-10 py-3 rounded-2xl mt-5"
                onClick={(e) => Delete(data.userEmail)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageStudents;
