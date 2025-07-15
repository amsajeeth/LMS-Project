import { AppBar } from "@/components/AppBar";
import React from "react";

export const AboutUs = () => {
  return (
    <div>
      <AppBar />
      <div className="h-[80vh] relative ">
        <div className="absolute h-[80vh] bg-[#00000075] w-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-center text-7xl text-white ">
            {" "}
            AboutUs
          </h1>
        </div>
        <img
          src="images/main.jpg"
          className="h-[80vh] w-full object-cover"
          alt=""
        />
      </div>
      <div className="max-w-[800px] mx-auto py-20 text-xl px-5">
        {" "}
        <p>
          At Eduraise, we believe that every student deserves the tools and
          support needed to succeed academically and beyond. Our platform is
          designed to provide a comprehensive and engaging learning experience
          in four core subjects: Mathematics, Science, First Language, and
          English. With a focus on interactive content, personalized learning
          paths, and up-to-date resources, Eduraise empowers students to take
          charge of their education.
          <br />
          <br /> We understand that every student learns differently, which is
          why we offer a flexible learning environment tailored to individual
          needs. Whether it’s grasping complex concepts in mathematics,
          exploring the wonders of science, honing language skills, or mastering
          English, our platform is here to guide students every step of the way.
          <br />
          <br />
          Our mission at Eduraise is to raise the bar for education by blending
          traditional knowledge with modern, digital tools. Through real-time
          feedback, progress tracking, and engaging multimedia content, we aim
          to make learning not just effective, but enjoyable. With Eduraise,
          students are not just preparing for exams—they are building the skills
          they need for lifelong success.
        </p>
      </div>
    </div>
  );
};
