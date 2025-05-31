import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addPopularTvShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularTvShows = () => {
  const dispatch = useDispatch();
  const popularTvShows = useSelector((store) => store.movies.popularTvShows);
  const getPopularTvShows = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/popular?page=1",
      options
    );

    const json = await data.json();
    dispatch(addPopularTvShows(json.results));
  };
  useEffect(() => {
    !popularTvShows && getPopularTvShows();
  }, []);
};
export default usePopularTvShows;
