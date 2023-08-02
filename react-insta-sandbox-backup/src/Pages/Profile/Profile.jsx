import React, { useEffect } from "react";
import { ProfileUserDetails } from "../../Components/ProfileComponent/ProfileUserDetails";
import { ReqUserPostPart } from "../../Components/ProfileComponent/ReqUserPostPart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isFollowing, isReqUser } from "../../Config/Logics";
import {
  findUserByUserNameAction,
  getUserProfileAction,
} from "../../Redux/User/Action";

const Profile = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const username = useParams();

  const { user } = useSelector((store) => store);

  const isReqUser = isReqUser[(user.reqUser?.id, user.findByUsername?.id)];

  const isFollowed = isFollowing(user.reqUser, user.findByUsername);

  console.log("------", user);

  useEffect(() => {
    const data = {
      token,
      username,
    };

    dispatch(getUserProfileAction(token));

    dispatch(findUserByUserNameAction(data));
  }, [username, user.follower, user.following]);

  return (
    <div className="px-20">
      <div>
        <ProfileUserDetails
          user={isReqUser ? user.reqUser : user.findByUsername}
          isFollowing={isFollowed}
          isReqUser={isReqUser}
        />
      </div>
      <div>
        <ReqUserPostPart
          user={isReqUser ? user.reqUser : user.findByUsername}
        />
      </div>
    </div>
  );
};
export default Profile;
