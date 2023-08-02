import React, { useEffect } from "react";
import StoryViewer from "../StoryComponents/StoryViewer";
import { useDispatch, useSelector } from "react-redux";
import { findStoryUserId } from "../../Redux/Story/Action";
import { useParams } from "react-router-dom";

const Story = () => {
  const dispatch = useDispatch();
  const { story } = useSelector((story) => story);
  const { userId } = useParams();
  const jwt = localStorage.getItem("token");

  console.log("", story);

  useEffect(() => {
    const data = { jwt, userId };

    dispatch(findStoryUserId(data));

    console.log("dispatched");
  }, [userId]);

  return (
    <div>
      <StoryViewer stories={story?.stories} />
    </div>
  );
};

export default Story;
