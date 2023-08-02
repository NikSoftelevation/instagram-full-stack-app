import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
import {
  BsBookmarkFill,
  BsBookmark,
  BsEmojiSmile,
  BsThreeDots,
} from "react-icons/bs";
import "./CommentModel.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  findPostCommentAction,
} from "../../Redux/Comment/Action";
import { useParams } from "react-router-dom";
import { findPostByIdAction } from "../../Redux/Post/Action";
import { timeDifference } from "../../Config/Logics";

export const CommentModel = ({
  onClose,
  isOpen,
  isSaved,
  isPostLike,
  handlePostLike,
  handleSavePost,
}) => {
  const [commentContent, setCommentContent] = useState();

  const token = localStorage.getItem("token");

  const { postId } = useParams();
  const { comment, post, user } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    const data = { jwt: token, postId };

    if (postId) {
      dispatch(findPostByIdAction(data));
    }
  }, [comment.createdComment, postId]);

  return (
    <div>
      <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <div className="flex h-[75vh]">
              <div className="w-[45%] flex flex-col justify-center">
                <img
                  className="pt-40 max-h-full w-full"
                  src={post.singlePost?.image}
                  // "https://cdn.pixabay.com/photo/2023/05/15/09/18/iceberg-7994536_1280.jpg"
                  alt=""
                />
              </div>
              <div className="w-[55%] pl-10 relative">
                <div className="flex justify-between items-center py-5">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="w-9 h-9 rounded-full"
                        src={
                          user.reqUser.image ||
                          "https://cdn.pixabay.com/photo/2023/06/05/08/41/bird-8041708_640.jpg"
                        }
                        // "https://cdn.pixabay.com/photo/2023/05/15/09/18/iceberg-7994536_1280.jpg"
                        alt=""
                      />
                    </div>

                    <div className="ml-2">
                      <p>{user.reqUser.username}</p>
                    </div>
                  </div>

                  <BsThreeDots />
                </div>
                <hr />

                <div className="comment">
                  {post.singlePost.comments?.map((item) => (
                    <CommentCard comment={item} />
                  ))}
                </div>

                <div className="absolute bottom-0 w-[90%]">
                  <div className="flex justify-between items-center w-full py-4">
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

                      <FaRegComment className="text-xl hover:opacity-50 cursor-pointer" />

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
                  <div className="w-full py-2">
                    {post.singlePost?.likedByUsers.length > 0 && (
                      <p>{post.singlePost?.likedByUsers.length}Likes</p>
                    )}
                    <p className="opacity-50 text-sm">
                      {timeDifference(post.singlePost?.createdAt)}{" "}
                    </p>
                  </div>

                  <div className="flex items-center w-full">
                    <BsEmojiSmile className="mr-2" />
                    <input
                      classname="commentInput"
                      type="text"
                      placeholder="Add a comment"
                      onChange={(e) => setCommentContent(e.target.value)}
                      value={commentContent}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const data = {
                            postId,
                            jwt: token,
                            data: {
                              content: commentContent,
                            },
                          };

                          dispatch(createCommentAction());

                          setCommentContent("");
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
