import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../HomePage";
import Sidebar from "../../Components/ProfileComponent/Sidebar/Sidebar";
import Profile from "../Profile/Profile";
import Story from "../../Components/Story/Story";
import { Auth } from "../Auth/Auth";
import EditAccountDetails from "../../Components/EditAccount/EditAccountDetails";

const Router = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <div className="flex">
          <div className="w-[20%] border-l-slate-500">
            <Sidebar />
          </div>
          <div className="w-full">
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/:username" element={<Profile />}></Route>
              <Route path="/story/:userId" element={<Story />}></Route>
              <Route path="/comment/:postId" element={<HomePage />}></Route>
              <Route
                path="/account/edit"
                element={<EditAccountDetails />}
              ></Route>
            </Routes>
          </div>
        </div>
      )}
      {location.pathname === "/login" ||
        (location.pathname === "/signup" && (
          <div>
            <Routes>
              <Route path="/signup" element={<Auth />}></Route>
              <Route path="/login" element={<Auth />}></Route>
            </Routes>
          </div>
        ))}
    </div>
  );
};

export default Router;
