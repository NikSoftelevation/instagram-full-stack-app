import React, { useState } from "react";
import {
  BsBookmarkFill,
  BsThreeDots,
  BsBookmark,
  BsEmojiSmile,
} from "react-icons/bs";
import "./PostCard.css";
import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import { CommentModel } from "../Comments/CommentModel";

export const PostCard = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const [isPostLike, setIsPostLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpenCommentModal = () => {
    onOpen();
  };

  const handlePostLike = () => {
    setIsPostLike(!isPostLike);
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12  rounded-full"
              src="https://cdn.pixabay.com/photo/2023/06/01/06/03/fire-8032745_640.jpg"
              alt=""
            />

            <div className="pl-2">
              <p className="font-semibold text-sm">Username</p>
              <p className="font-thin text-sm">Location</p>
            </div>
          </div>

          <div className="dropdown">
            <BsThreeDots className="dots" onClick={handleClick} />

            <div className="dropdown-content">
              {showDropDown && (
                <p className="bg-black text-white py-1 px-4 rounded-md cursor-pointer">
                  Delete
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full">
          <img
            className="w-full"
            src="https://cdn.pixabay.com/photo/2023/06/19/15/48/butterfly-8074948_640.jpg"
            alt=""
          />
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLike ? (
              <AiFillHeart
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                onClick={handlePostLike}
              />
            ) : (
              <AiOutlineHeart
                className="text-2xl hover:opacity-50 cursor-pointer"
                onClick={handlePostLike}
              />
            )}

            <FaRegComment
              onClick={handleOpenCommentModal}
              className="text-xl hover:opacity-50 cursor-pointer"
            />

            <RiSendPlaneLine className="text-xl hover:opacity-50 cursor-pointer" />
          </div>

          <div className="cursor-pointer">
            {isSaved ? (
              <BsBookmarkFill
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            ) : (
              <BsBookmark
                onClick={handleSavePost}
                className="text-xl hover:opacity-50 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-full py-2 px-5">
          <p>10 Likes</p>
          <p className="opacity-50 py-2 cursor-pointer">View All 10 Comments</p>
        </div>

        <div className="border border-t w-full">
          <div className="flex w-full items-center px-5">
            <BsEmojiSmile className="mr-2" />
            <input
              classname="commentInput"
              type="text"
              placeholder="Add a comment"
            />
          </div>
        </div>
      </div>

      <CommentModel handlePostLike />
    </div>
  );
};
