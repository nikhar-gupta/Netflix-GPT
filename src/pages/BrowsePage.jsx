import React from "react";
import Header from "../components/Header";
import "./BrowsePage.css";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import HomeVideoMainContainer from "../components/HomeVideoMainContainer";
import VideoCardsContainer from "../components/VideoCardsContainer";
import usePopularTvShows from "../hooks/usePopularTvShows";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedTvShows from "../hooks/useTopRatedTvShows";
import Footer from "../components/Footer";
import GptSearch from "../components/GptSearch";
import { useSelector } from "react-redux";

const BrowsePage = () => {
  useNowPlayingMovies();
  usePopularTvShows();
  useUpcomingMovies();
  useTopRatedTvShows();
  const gptSearch = useSelector((store) => store.gptSearch.showGptSearch);

  return (
    <div>
      <Header />
      {gptSearch ? (
        <GptSearch />
      ) : (
        <div className="browse-body">
          <HomeVideoMainContainer />
          <VideoCardsContainer
            title={"Now Playing Movies"}
            data={"nowPlayingMovies"}
            stateField={"movies"}
          />
          <VideoCardsContainer
            title={"Upcoming Movies"}
            data={"upcomingMovies"}
            stateField={"movies"}
          />
          <VideoCardsContainer
            title={"Popular TV Shows"}
            data={"popularTvShows"}
            stateField={"movies"}
          />
          <VideoCardsContainer
            title={"Top-Rated TV Shows"}
            data={"topRatedTvShows"}
            stateField={"movies"}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BrowsePage;
