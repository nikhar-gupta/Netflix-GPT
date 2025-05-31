import React from "react";
import "./HomeVideoMainContainer.css";
import VideoPlayer from "./VideoPlayer";
import VideoInfo from "./VideoInfo";
import { useSelector } from "react-redux";

const HomeVideoMainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return;
  const { title, overview, id } = movies[1];

  return (
    <div className="homeVideoMainContainer">
      <VideoPlayer id={id} />
      <VideoInfo title={title} overview={overview} />
    </div>
  );
};

export default HomeVideoMainContainer;
