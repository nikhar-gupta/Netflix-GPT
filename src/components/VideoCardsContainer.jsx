import React, { useRef } from "react";
import VideoCard from "./VideoCard";
import { useSelector } from "react-redux";
import "./VideoCardsContainer.css";

const VideoCardsContainer = ({ title, data, stateField }) => {
  const movies = useSelector((state) => state[stateField]?.[data]);
  const scrollRef = useRef();
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="videoCardsContainerMain" id="gptSearchResult">
      <h1>{title}</h1>
      <div className="videoCardsContainerSlider" ref={scrollRef}>
        <button onClick={() => scroll(-750)} className="scroll left">
          LEFT
        </button>
        <button onClick={() => scroll(750)} className="scroll right">
          RIGHT
        </button>
        <div className="videoCards">
          {movies?.map((movie, index) => {
            return (
              <VideoCard
                key={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                sequence={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoCardsContainer;
