import React from "react";
import { TbCircleDashed } from "react-icons/tb";

export const ProfileUserDetails = () => {
  return (
    <div className="py-10 w-full">
      <div className="flex items-center">
        <div className="w-[15%]">
          <img
            className="w-32 h-32 rounded-full"
            src="https://cdn.pixabay.com/photo/2023/05/19/15/40/man-8004816_640.jpg"
            alt=""
          />
        </div>
        <div className="space-y-5">
          <div className="flex space-x-10 items-center">
            <p className="mb-2">Username</p>
            <button>Edit Profile</button>

            <TbCircleDashed></TbCircleDashed>
          </div>
          <div className="flex space-x-10">
            <div>
              <span className="fonts-semibold mr-2">10</span>
              <span>Posts</span>
            </div>
            <div>
              <span className="fonts-semibold mr-2">5</span>
              <span>Followers</span>
            </div>
            <div>
              <span className="fonts-semibold mr-2">7</span>
              <span>Following</span>
            </div>
          </div>
          <div>
            <p className="font-semibold">Full Name</p>
            <p className="font-thin text-sm">Engeneering Grad | Coder | </p>
          </div>
        </div>
      </div>
    </div>
  );
};
