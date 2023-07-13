import React, { useState } from "react";
import { AiOutlineTable, AiOutlineUser } from "react-icons/ai";
import { RiVideoLine } from "react-icons/ri";
import { BiBookBookmark } from "react-icons/bi";
import { ReqUserPostCard } from "./ReqUserPostCard";

export const ReqUserPostPart = () => {
  const [activeTab, setActiveTab] = useState();
  const tabs = [
    {
      tab: "Post",
      icon: <AiOutlineTable></AiOutlineTable>,
      activeTab: "",
    },
    {
      tab: "Reels",
      icon: <RiVideoLine></RiVideoLine>,
    },
    {
      tab: "Saved",
      icon: <BiBookBookmark></BiBookBookmark>,
    },
    {
      tab: "Tagged",
      icon: <AiOutlineUser></AiOutlineUser>,
    },
  ];

  return (
    <div>
      <div className="flex space-x-14 border-t relative">
        {tabs.map((item) => (
          <div
            onClick={() => setActiveTab(item.tab)}
            className={`${
              activeTab === item.tab ? "border-t border-black" : "opacity:60"
            }flex items-center cursor-pointer py-2 text-sm`}
          >
            <p>{item.icon}</p>
            <p className="ml-1">{item.tab}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-wrap">
          {[1, 1, 1, 1].map((item) => (
            <ReqUserPostCard />
          ))}
        </div>
      </div>
    </div>
  );
};
