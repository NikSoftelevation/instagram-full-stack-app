import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { isCommentLikedByUser, timeDifference } from "../../Config/Logics";
import {
  likeCommentAction,
  unlikeCommentAction,
} from "../../Redux/Comment/Action";
import { unLikePostAction } from "../../Redux/Post/Action";

const CommentCard = ({ comment }) => {
  const [isCommentLike, setIsCommentLike] = useState(false);

  const { user } = useSelector((store) => store);

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const data = {
    commentId: comment.id,
    jwt: token,
  };

  const handleLikeComment = () => {
    setIsCommentLike(true);
    dispatch(likeCommentAction(data));
  };
  const handleUnLikeComment = () => {
    setIsCommentLike(false);
    dispatch(unlikeCommentAction(data));
  };

  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser.id));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <div className="flex items-center">
          <div>
            <img
              className="w-9 h-9 rounded-full"
              src={
                comment.userDto.userImage ||
                "https://cdn.pixabay.com/photo/2023/06/05/08/41/bird-8041708_640.jpg"
              }
              alt=""
            />
          </div>
          <div className="ml-3">
            <p>
              <span className="font-semibold">{comment?.userDto.username}</span>
              <span className="ml-2">{comment.content}</span>
            </p>

            <div className="flex items-center space-x-3 text-xs opacity-60 pt-2">
              <span>{timeDifference(comment?.createdAt)}</span>
              {comment?.likedByUsers?.length > 0 && (
                <span>{comment?.likedByUsers?.length}Likes</span>
              )}
            </div>
          </div>
        </div>

        {isCommentLike ? (
          <AiFillHeart
            onClick={handleUnLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer text-red-600"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleLikeComment}
            className="text-xs hover:opacity-50 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default CommentCard;
