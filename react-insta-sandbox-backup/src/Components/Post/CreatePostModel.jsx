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

export const CreatePostModel = (onClose, isOpem) => {
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    if (
      (file && file.type.startsWith("image/")) ||
      file.type.startsWith("video/")
    ) {
      setFile(file);
    } else {
      setFile(null);
      alert("Please select an imaage or video");
    }
  };

  return (
    <div>
      <Modal size={"4xl"} onClose={onclose} isOpen={true} isCentered>
        <ModalOverlay />

        <ModalContent>
          <div className="flex justify-between py-1 px-10 items-center">
            <p>Create New Post</p>
            <Button variant={"ghost"} size="5m" colorScheme={"blue"}>
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
                {file && <img src={URL.createObjectURL(file)} alt="" />}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};
