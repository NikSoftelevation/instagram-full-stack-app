import React from "react";
import StoryViewer from "../StoryComponents/StoryViewer";

const Story = () => {
  const story = [
    {
      image:
        "https://cdn.pixabay.com/photo/2023/05/03/12/40/bird-7967570_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/05/12/03/12/australian-king-parrot-7987514_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/05/03/12/40/bird-7967570_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/06/15/07/53/ladybug-8064737_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2023/06/29/04/30/fishing-boat-at-sea-8095632_640.jpg",
    },
  ];

  return (
    <div>
      <StoryViewer stories={story} />
    </div>
  );
};

export default Story;
