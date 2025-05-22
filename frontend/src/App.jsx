import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import Song from "./components/Song";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const fetchData = () => {
    if (!query) return;
    setIsLoading(true);
    fetch(`https://yt-songs-download.onrender.com/home/${query}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        console.log(songs);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gray-200">
      <div className="w-10/12 h-[90%] bg-white rounded-xl overflow-hidden max-md:w-11/12 max-sm:w-11/12 max-sm:p-2">
        <form
          onSubmit={handleSubmit}
          className="w-full h-16 mt-2 flex justify-center items-center max-sm:flex-wrap max-sm:gap-1"
        >
          <div className="icon w-12 bg-neutral-100 mr-2 rounded-lg flex justify-center items-center ">
            <i className="fab fa-spotify text-4xl text-black cursor-pointer"></i>
          </div>
          <input
            placeholder="Search or Paste the URL for your Favourite Music"
            type="text"
            onChange={handleInput}
            value={query}
            name="input"
            required
            className="input-box w-4/5 h-[75%] bg-neutral-100 rounded-lg outline-none indent-4 text-black max-lg:w-[70%] max-md:w-[70%] max-sm:w-4/5"
          />
          <button
            type="submit"
            className="btn bg-black text-white border-none text-base ml-5 hover:btn-accent hover:text-white max-sm:mr-6 max-sm:mt-1"
          >
            Search
          </button>
        </form>

        <div className="w-full h-full overflow-y-scroll pb-16 max-sm:mt-12 max-sm:w-full">
          {isLoading ? (
            <Loading />
          ) : songs && songs.length > 0 ? (
            <div className="">
              {songs.map((song, index) => (
                <Song key={index} song={song} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-[80%]">
              <h1 className="font-semibold text-xl">Songs are not found.</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
