const VideoInfo = ({ title, overview }) => {
  const info =
    overview.length > 150 ? overview.slice(0, 150) + "..." : overview;

  return (
    <div className="video-info">
      <div className="title">
        <h1>{title}</h1>
      </div>
      <div className="overview" id="hidden">
        <p>{info}</p>
      </div>
      <div className="trailer-btns">
        <button>
          <p>Play</p>
        </button>
        <button id="info-btn">
          <p>More Info</p>
        </button>
      </div>
    </div>
  );
};

export default VideoInfo;
