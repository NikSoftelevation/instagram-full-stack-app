import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  likePostAction,
  savePostAction,
  unLikePostAction,
  unSavedPostAction,
} from "../../Redux/Post/Action";
import { isPostLikedByUser, isSavedPost } from "../../Config/Logics";
import { useNavigate } from "react-router-dom";

export const PostCard = ({ post }) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  console.log("reqUser ----", user.reqUser);

  const data = { jwt: token, postId: post?.id };

  const [showDropDown, setShowDropDown] = useState(false);

  const [isPostLike, setIsPostLike] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const handleOpenCommentModal = () => {
    navigate(`/comment/${post.id}`);
    onOpen();
  };

  const handlePostLike = () => {
    setIsPostLike(true);
    dispatch(likePostAction(data));
  };

  const handlePostUnLike = () => {
    setIsPostLike(false);
    dispatch(unLikePostAction(data));
  };

  const handleClick = () => {
    setShowDropDown(!showDropDown);
  };

  const handleSavePost = () => {
    setIsSaved(!true);
    dispatch(savePostAction(data));
  };

  const handleUnsavedPost = () => {
    setIsSaved(false);
    dispatch(unSavedPostAction(data));
  };

  useEffect(() => {
    setIsPostLike(isPostLikedByUser(post, user.reqUser?.id));

    setIsSaved(isSavedPost(user.reqUser, post.id));
  }, [post.likedByUsers, user.reqUser]);

  return (
    <div>
      <div className="border rounded-md w-full">
        <div className="flex justify-between items-center w-full py-4 px-5">
          <div className="flex items-center">
            <img
              className="h-12 w-12 rounded-full"
              src={
                post.user.userImage ||
                "https://cdn.pixabay.com/photo/2023/06/05/08/41/bird-8041708_640.jpg"
              }
              alt=""
            />

            <div className="pl-2">
              <p className="font-semibold text-sm">{post?.user.username}</p>
              <p className="font-thin text-sm">{post.location}</p>
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
          <img className="w-full" src={post?.image} alt="" />
        </div>

        <div className="flex justify-between items-center w-full px-5 py-4">
          <div className="flex items-center space-x-2">
            {isPostLike ? (
              <AiFillHeart
                className="text-2xl hover:opacity-50 cursor-pointer text-red-600"
                onClick={handlePostUnLike}
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
                onClick={handleUnsavedPost}
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
          {post?.likedByUsers?.length > 0 && (
            <p>{post?.likedByUsers?.length}Likes</p>
          )}
          {post?.comments?.length > 0 && (
            <p className="opacity-50 py-2 cursor-pointer">
              View All {post?.comments?.length} Comments
            </p>
          )}
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

      <CommentModel
        handlePostLike={handlePostLike}
        onClose={onClose}
        isOpen={isOpen}
        handleSavePost={handleSavePost}
        isPostLike={isPostLike}
        isSaved={isSaved}
      />
    </div>
  );
};
