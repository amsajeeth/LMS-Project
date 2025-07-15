import { useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import StudentAuth from "./lib/Pages/Authentication/StudentAuth";
import Teacherauth from "./lib/Pages/Authentication/Teacherauth";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "/firebase";
import ProtectedRoute from "./lib/services/ProtectedRoute";

import MeetingRoom from "./lib/Pages/Chatting/MeetingRoom";

import { doc, getDoc } from "firebase/firestore";
import CreateProfile from "./lib/Pages/Authentication/CreateProfile";
import Teacher from "./lib/Pages/TeacherPages/Teacher";

import TeacherRegistration from "./lib/Pages/Authentication/TeacherRegistration";

import ScheduledPage from "./lib/Pages/BasePagesStudent/ScheduledPage";
import SubjectSelectionPage from "./lib/Pages/BasePagesStudent/SubjectSelectionPage";
import Subject from "./lib/Pages/BasePagesStudent/Subject";


import { FooterPage } from "./components/Footer";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
import ru from "javascript-time-ago/locale/ru";
import { AboutUs } from "./lib/Pages/AboutUs";
import { ContactUs } from "./lib/Pages/ContactUs";
import AdminAuth from "./lib/Pages/AdminPages/AdminAuth";

function App() {
  const [isFetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        checkUserProfile(user);

        return;
      }
      setUser(null);
      setFetching(false);
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {}, []);
  const checkUserProfile = async (userd) => {
    const docRef = doc(db, "Users", userd.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      var data = docSnap.data();
      setUserData(data);
      console.log(data);
      setFetching(false);
    } else {
      console.log("No student!");
      const docRe = doc(db, "teacher", userd.email);
      const docSna = await getDoc(docRe);

      if (docSna.exists()) {
        console.log("teacher!");
        var datas = docSna.data();
        setSubject(datas["subject"]);
        setFetching(false);
      } else {
        setFetching(false);
        // Create a new document
      }
    }
  };

  if (isFetching) {
    return <div>Loading</div>;
  }
  TimeAgo.addDefaultLocale(en);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute user={user}>
              <SubjectSelectionPage user={user} userDatas={userData} />
            </ProtectedRoute>
          }
        />
        <Route path="/studentauth" element={<StudentAuth />} />
        <Route path="/meetingroom/:id" element={<MeetingRoom user={user} />} />
        <Route path="/TutorRegistration" element={<TeacherRegistration />} />
        
        <Route
          path="/create"
          element={
            <ProtectedRoute user={user}>
              <CreateProfile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes/:email"
          element={
            <ProtectedRoute user={user}>
              <ScheduledPage user={user} />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/subject/:subject"
          element={
            <ProtectedRoute user={user}>
              <Subject user={user} />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/teacher"
          element={
            <ProtectedRoute user={user}>
              <Teacher user={user} subject={subject} />
            </ProtectedRoute>
          }
        />
    
        <Route path="/teacherauth" element={<Teacherauth />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/Admin" element={<AdminAuth /> } />
      </Routes>
      <FooterPage />
    </BrowserRouter>
  );
}

export default App;
