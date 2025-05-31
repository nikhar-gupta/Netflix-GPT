import React, { useRef, useState } from "react";
import "./GptSearch.css";
import { OPENAI_KEY, options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptTmdbResults } from "../utils/gptSearchSlice";
import VideoCardsContainer from "./VideoCardsContainer";

const GptSearch = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState(false);

  const tmdbMovieSearch = async (movie) => {
    const movieResults = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`,
      options
    );
    const json = await movieResults.json();
    return json.results.filter((m) => {
      if (movie === m.title) {
        return m.original_language === "hi" || m.original_language === "en";
      }
    });
  };
  const handleAiSearchSubmit = async (e) => {
    e.preventDefault();
    const query = `Act as a movie recommendation system having knowledge of all the latest and old movies and suggest atmost 20 movies for the query : ${searchText.current.value}. The results should only contain movie names seperated by commas. If you are unable to fulfil the request, just send "Not found" in response.`;
    //Make API call to gpt api and get movie results
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4.1-nano-2025-04-14",
    //   messages: [{ role: "user", content: query }],
    // });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-nano-2025-04-14",
        messages: [{ role: "user", content: query }],
      }),
    });
    const completion = await response.json();
    const results = completion?.choices[0]?.message?.content.split(", ");
    const promises = results.map((movie) => tmdbMovieSearch(movie));
    const tmdbMovies = await Promise.all(promises);
    const movieResults = tmdbMovies
      .filter((inner) => Array.isArray(inner) && inner.length > 0)
      .flat();
    dispatch(
      addGptTmdbResults({ movieArray: results, tmdbMovieResults: movieResults })
    );
    setSearchResult(true);
  };

  return (
    <div className="gptSearchMainContainer">
      <div className="gptSearchSecondaryContainer">
        <h1 className="gptSearchHeading">
          What would you like to watch today?
        </h1>
        <form className="aiSearchForm" onSubmit={handleAiSearchSubmit}>
          <input
            type="text"
            placeholder="What's on your mind?"
            id="searchbox"
            ref={searchText}
          />
          <input type="submit" id="submit" />
        </form>
      </div>
      {searchResult && (
        <VideoCardsContainer
          title={"Search Results:"}
          data={"gptSearchTmdbResults"}
          stateField={"gptSearch"}
        />
      )}
    </div>
  );
};

export default GptSearch;
