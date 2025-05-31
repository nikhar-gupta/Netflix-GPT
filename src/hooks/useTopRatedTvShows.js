import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { addTopRatedTvShows } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedTvShows = () => {
  const dispatch = useDispatch();
  const topRatedTvShows = useSelector((store) => store.movies.topRatedTvShows);
  const getTopRatedTvShows = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/tv/top_rated?page=1",
      options
    );

    const json = await data.json();
    dispatch(addTopRatedTvShows(json.results));
  };
  useEffect(() => {
    !topRatedTvShows && getTopRatedTvShows();
  }, []);
};
export default useTopRatedTvShows;
