import React from "react";

const SearchUserCard = () => {
  return (
    <div className="py-2 cursor-pointer">
      <div className="flex items-center">
        <img
          className="w-10 h-10 rounded-full"
          src="https://cdn.pixabay.com/photo/2023/07/04/17/14/rocks-8106681_640.jpg"
          alt=""
        />
        <div className="ml-3">
          <p>Full Name</p>
          <p className="opacity-70">Username</p>
        </div>
      </div>
    </div>
  );
};

export default SearchUserCard;
