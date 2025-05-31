import React, { useState } from "react";

const VideoCard = ({ title, poster_path, sequence }) => {
  const [cardHover, setCardHover] = useState("hide");
  const checkSequence = (index) => {
    if (index === 0) {
      setCardHover("show1");
    } else if (index === 19) {
      setCardHover("show20");
    } else setCardHover("show");
  };

  return (
    poster_path && (
      <div
        className="videoCard"
        onPointerEnter={() => checkSequence(sequence)}
        onPointerOut={() => setCardHover("hide")}
        id={cardHover}
      >
        <p className="videoCardTitle">{title}</p>
        <img src={"https://image.tmdb.org/t/p/w500/" + poster_path} />
      </div>
    )
  );
};

export default VideoCard;
