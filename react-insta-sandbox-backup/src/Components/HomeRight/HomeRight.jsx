import { useDispatch, useSelector } from "react-redux";
import SuggestionCard from "./SuggestionCard";
import React from "react";

export const HomeRight = () => {
  const { user, post } = useSelector((store) => store);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <img
                className="w-12 h-12 rounded-full"
                src={
                  user.reqUser?.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                }
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>{user.reqUser?.name}</p>
              <p className="opacity-70">{user.username}</p>
            </div>
          </div>

          <div>
            <p className="text-blue-700 font-semibold">Switch</p>
          </div>
        </div>
        <div className="space-y-5 mt-10">
          {user.popularUsers?.map((item) => {
            <SuggestionCard user={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
