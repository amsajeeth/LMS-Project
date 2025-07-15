import React, { useEffect, useState } from "react";
import { db } from "/firebase";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { collection, getDocs, query, where } from "firebase/firestore";

const ScheduledPage = ({ user, subject }) => {
  useEffect(() => {
    getData();
  }, []);

  const localizer = momentLocalizer(moment);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const q = query(collection(db, "class"), where("subject", "==", subject));
      const data = await getDocs(q);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(filteredData);
      setData(filteredData);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const myEventsList = data.map((item) => {
    console.log("data " + item.id);
    return {
      id: item.id,

      title: item.title,
      Description: item.teacher,

      start: new Date(`${item.dateString}T${item.startTime}`),
      end: new Date(`${item.dateString}T${item.endAt}`),
      color: "black",
    };
  });

  return (
    <div className=" ">
      <div className="flex flex-col">
        {!loading ? (
          <Calendar
            localizer={localizer}
            events={myEventsList}
            // startAccessor="start"
            // endAccessor="end"

            onSelectEvent={(event) => {
              if (confirm("Join Meeting.") == true) {
                console.log("Event details: ", event);
                window.location.href = `/meetingroom/${event.id}`;
              }
            }}
            className="h-[50vh]"
          />
        ) : (
          <h1>Loading</h1>
        )}

        <div className="grid grid-cols-3 gap-4"></div>
        <div className="h-20vh]"></div>
      </div>
    </div>
  );
};

export default ScheduledPage;
