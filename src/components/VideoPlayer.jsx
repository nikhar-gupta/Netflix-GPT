import React from "react";
import useTrailerVideo from "../hooks/useTrailerVideo";
import { useSelector } from "react-redux";

const VideoPlayer = ({ id }) => {
  useTrailerVideo(id);
  const trailerVideo = useSelector((state) => state.movies?.trailerVideo);
  return (
    <>
      {trailerVideo && (
        <div className="videoPlayer">
          <iframe
            id="trailer"
            src={
              "https://www.youtube.com/embed/" +
              trailerVideo?.key +
              "?mute=1&autoplay=1&loop=1&showinfo=0&controls=0&modestbranding=1&autohide=1&color=white&iv_load_policy=3&playlist=" +
              trailerVideo?.key
            }
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
