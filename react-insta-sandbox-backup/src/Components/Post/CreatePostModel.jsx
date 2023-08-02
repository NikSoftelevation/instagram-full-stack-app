import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import "./CreatePostModel.css";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../Redux/Post/Action";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";

export const CreatePostModel = (onClose, isOpem) => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const [isDragOver, setIsDragOver] = useState(false);
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [location, setLocation] = useState("");

  const [file, setFile] = useState();

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.file[0];
    if (
      droppedFile.type.startsWith("image/") ||
      droppedFile.type.startsWith("video/")
    ) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    if (
      (file && file.type.startsWith("image/")) ||
      file.type.startsWith("video/")
    ) {
      const imgUrl = await uploadToCloudinary(file);

      setImgUrl(imgUrl);

      setFile(file);
    } else {
      setFile(null);
      alert("Please select an imaage or video");
    }
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };
  const handleCreatePost = () => {
    const data = {
      jwt: token,
      data: {
        caption,
        location,
        image: imgUrl,
      },
    };

    dispatch(createPostAction(data));
    onclose();
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onclose} isOpen={isOpem} isCentered>
        <ModalOverlay />

        <ModalContent>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button
              variant={"ghost"}
              size="5m"
              colorScheme={"blue"}
              onClick={handleCreatePost}
            >
              Share
            </Button>
          </div>
          <hr />

          <ModalBody>
            <div>
              <div className="w-[50%]">
                {!file && (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="drag-drop h-full"
                  >
                    <div>
                      <FaPhotoVideo className="text-3xl" />
                      <p>Drag Photos or Videos Here</p>
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                      Select From Computer
                    </label>
                    <input
                      className="fileInput"
                      type="file"
                      id="file-upload"
                      accept="image/*,video/*"
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                {file && (
                  <img
                    className="max-h-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                )}
              </div>
              <div className="w-[1px] border h-full"></div>
              <div className="w-[50%]">
                <div className="flex items-center px-2">
                  <img
                    className="w-7 h-7 rounded-full"
                    src="https://cdn.pixabay.com/photo/2022/11/14/11/54/quince-7591433__340.jpg"
                    alt=""
                  />
                  <p className="font-semibold ml-4">Username</p>
                </div>
                <div className="px-2">
                  <textarea
                    placeholder="Write a caption"
                    className="captionInput"
                    name="caption"
                    rows="8"
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>
                <div className="flex justify-between px-2">
                  <GrEmoji />
                  <p className="opacity-70">{caption?.length}/2200</p>
                </div>
                <hr />

                <div className="p-2 flex justify-between items-center">
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    className="locationInput"
                    type="text"
                    placeholder="Location"
                    name="location"
                  />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
