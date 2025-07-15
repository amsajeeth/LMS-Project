import { db } from "/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  const [sublist, setSublist] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    checkUserProfile();
  }, []);
  const navigation = useNavigate();
  const checkUserProfile = async () => {
    if (user == null) {
      setLoading(false);
      return;
    }
    console.log(user.email);
    const docRef = doc(db, "teacher", user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setLoading(false);
      navigation("/teacher");
    } else {
      const docRef = doc(db, "Users", user.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLoading(false);
      } else {
        setLoading(false);
        navigation("/create");
      }
    }
  };

  return user ? (
    loading ? (
      <div>Loading...</div>
    ) : (
      children
    )
  ) : loading ? (
    <div>Loading...</div>
  ) : (
    <Navigate to="/studentauth"></Navigate>
  );
};

export default ProtectedRoute;
