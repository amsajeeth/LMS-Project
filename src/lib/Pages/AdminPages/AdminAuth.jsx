import React, { useState } from "react";

import { Button, Menu } from "antd";

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import ManageTeachers from "./ManageTeachers";
import ManageStudents from "./ManageStudents";

import CalenderPage from "./CalenderPage";

import MaterialPage from "./Materials";
import FeedbackPage from "./Feedbacks";
import ContactPage from "./ContactPage";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [authenticated, setisatuhenticated] = useState(false);
  // const navigation = useNavigate();

  const [index, setIndex] = useState(0);
  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "manage Teachers",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "manage students",
    },
    {
      key: "3",
      icon: <ContainerOutlined />,
      label: "Calender",
    },
    {
      key: "4",
      icon: <ContainerOutlined />,
      label: "Materials",
    },
    {
      key: "5",
      icon: <ContainerOutlined />,
      label: "Feedbacks",
    },
    {
      key: "6",
      icon: <ContainerOutlined />,
      label: "submissions",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);

  const HomePageList = [
    <ManageTeachers />,
    <ManageStudents />,
    <CalenderPage />,
    <MaterialPage />,
    <FeedbackPage />,
    <ContactPage />,
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogin = async () => {
    if (email == "" && pass == "") {
      alert("Please fill in all fields");
    } else {
      try {
        if (email == "admin@eduraise.com" && pass == "eduraise") {
          setisatuhenticated(true);
        } else {
          alert("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
        alert(err.code);
      }
    }
  };

  return !authenticated ? (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full  mx-5 p-5 md:w-[80vw] min-h-[80vh] md:shadow-2xl  ">
        <div className="  flex flex-col items-center justify-center gap-5">
          <img
            src="images/logo4.png"
            alt=""
            className="h-[20vh] object-contain "
          />
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Admin Login
          </h1>
          <div className="h-10"></div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className="border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <input
            type="password"
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter your password"
            className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full max-w-[300px]"
          />
          <button
            className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[300px]"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex w-full max-h-full ">
      <div className="">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          onClick={(e) => {
            console.log(e);
            setIndex(e.key - 1);
          }}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          className=" py-3 "
        />
      </div>
      <div className="content w-full h-screen px-2 min overflow-y-scroll ">
        {HomePageList[index]}
      </div>
    </div>
  );
};

export default AdminAuth;
