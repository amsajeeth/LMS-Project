import SideBar from "@/components/AntDesign/SideBar";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

import MeetingRoom from "../Chatting/MeetingRoom";

import TeacherFinder from "./TeacherFinder";
import MyTeachers from "./MyTeachers";

const HomePage = ({ user, subjects }) => {
  const [index, setIndex] = useState(0);
  const items = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Find Teachers",
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "My Teachers",
    },
    {
      key: "3",
      icon: <ContainerOutlined />,
      label: "Option 3",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);

  const HomePageList = [
    <TeacherFinder user={user} />,
    <MyTeachers user={user} />,
  ];
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
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

export default HomePage;
