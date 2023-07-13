import React from "react";
import { useNavigate } from "react-router-dom";

export const StoryCircle = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/story");
  };
  return (
    <div
      onClick={handleNavigate}
      className="cursor-pointer flex flex-col items-center"
    >
      <img
        className="w-16 h-16 rounded-full"
        src="https://cdn.pixabay.com/photo/2023/06/06/14/49/chamois-8044855_640.jpg"
        alt=""
      />
      <p>Username</p>
    </div>
  );
};
