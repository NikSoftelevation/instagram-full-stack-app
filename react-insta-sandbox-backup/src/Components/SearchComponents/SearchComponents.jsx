import React, { useEffect } from "react";
import SearchUserCard from "./SearchUserCard";
import "./SearchComponents.css";
import { useDispatch, useSelector } from "react-redux";
import { searchUserAction } from "../../Redux/User/Action";

export const SearchComponents = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  // dispatch(SearchUserCard());

  const handleSearch = (e) => {
    dispatch(searchUserAction({ jwt: token, query: e.target.value }));
  };

  return (
    <div className="searchContainer">
      <div className="px-3 pb-5">
        <h1 className="text-xl pb-5">Search</h1>
        <input
          onChange={handleSearch}
          className="searchInput"
          type="text"
          placeholder="Search..."
        />
      </div>

      <hr />

      <div className="px-3 pt-5">
        {user.searchUser?.map((item) => (
          <SearchUserCard user={item} />
        ))}
      </div>
    </div>
  );
};
