import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "/firebase";
import emailjs from "@emailjs/browser";
import { Navigate, useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function Teacherauth() {
  const [value, setValue] = React.useState("");
  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const OTP = () => {
    const otp1 = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp1);
    SendEmail(email, `Your OTP is ${otp1}`);
  };

  const navigation = useNavigate();

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

  const handleLogin = async () => {
    if (email == "" && pass == "") {
      alert("Please fill in all fields");
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
        navigation("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    if (value.length == 6) {
      if (value == otp) {
        setAuth(true);
      }
    }
    console.log(value);
  }, [value]);

  const [isAuth, setAuth] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full  mx-5 p-5 md:w-[80vw] h-[80vh] shadow-2xl grid grid-cols-1 md:grid-cols-2">
        <img
          src="images/authT.png"
          alt="Authentication"
          className="h-[80vh] hidden md:block p-20 object-contain"
        />
        <div className="  flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl md:text-5xl font-bold text-center">
            Teacher Login
          </h1>
          <div className="h-5"></div>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Teacher ID"
            className="border-2 border-gray-300 p-4 rounded-lg w-full"
          />
          {isAuth ? (
            <>
              <input
                type="password"
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter your password"
                className="mt-4 border-2 border-gray-300 p-4 rounded-lg w-full"
              />{" "}
              <button
                className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full max-w-[30vw]"
                onClick={handleLogin}
              >
                Login
              </button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger className="w-full">
                <button
                  type="submit"
                  onClick={() => OTP()}
                  className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full"
                >
                  Get OTP
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center pb-5 text-2xl font-bold">
                    Enter Your OTP
                  </DialogTitle>
                  <DialogDescription className="flex flex-col justify-center items-center">
                    <InputOTP
                      maxLength={6}
                      value={value}
                      onChange={(value) => setValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <a href="/TutorRegistration" className="text-blue-500">
              Create a profile
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Teacherauth;
