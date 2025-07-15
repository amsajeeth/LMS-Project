import { JitsiMeeting } from "@jitsi/react-sdk";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const MeetingRoom = ({ user }) => {
  const params = useParams();
  const [isloading, setLoading] = useState(true);
  return (
    <div>
      {isloading ? (
        <div className="h-screen w-full absolute bg-white flex justify-center items-center">
          <h1>Loading....</h1>
        </div>
      ) : (
        <></>
      )}

      <JitsiMeeting
        // domain={"http://localhost:5173"}
        roomName={params.id}
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: user.email,
        }}
        onApiReady={(externalApi) => {
          setLoading(false);
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "100vh";
        }}
      />
    </div>
  );
};

export default MeetingRoom;
