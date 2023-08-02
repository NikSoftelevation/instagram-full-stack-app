import React, { useEffect, useState } from "react";
import { StoryCircle } from "../Components/Story/StoryCircle";
import { HomeRight } from "../Components/HomeRight/HomeRight";
import { PostCard } from "../Components/Post/PostCard";
import { useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction, findUserPostAction } from "../Redux/Post/Action";
import {
  findPopularUser,
  findUserByUserIdsAction,
  getUserProfileAction,
} from "../Redux/User/Action";
import { hasStory } from "../Config/Logics";

const HomePage = () => {
  const { isOpen, OnOpen, onClose } = useDisclosure();

  const [userIds, setUserIds] = useState();

  const { user, post } = useSelector((store) => store);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id);

    setUserIds([user.reqUser?.id, ...newIds]);
  }, [user.reqUser]);

  useEffect(() => {
    const data = {
      jwt: token,
      userIds: [userIds].join(","),
    };

    dispatch(findUserPostAction(data));

    dispatch(findUserByUserIdsAction(data));

    dispatch(findPopularUser(token));
  }, [userIds, post.createNewPost, post.deletePost]);

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  const storyUsers = hasStory(user.findUserByIds);

  return (
    <div>
      <div className="mt-10 flex w-[100%] justify-center">
        <div className="w-[44%] px-10">
          <div className="storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full">
            {storyUsers.length > 0 && storyUsers.map((item) => <StoryCircle />)}
          </div>

          <div className="space-y-10 mt-10">
            {post.getUserPost.length > 0 &&
              post.getUserPost.map((item) => <PostCard post={item} />)}
          </div>
        </div>
        <div className="w-[27%]">
          <HomeRight />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
