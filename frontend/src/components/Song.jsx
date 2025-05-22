import React, { useState } from "react";
import {
  handleSubmit128p,
  handleSubmit256p,
  handleSubmit320p,
  handleSubmit64p,
} from "./utils/codeSnippets";

const Song = ({ song }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="Music h-full w-full flex p-2 max-sm:w-full max-sm:inline-block">
            <div className="image-container h-44 w-1/4 m-1 max-sm:w-full">
              <img className="image h-full w-full object-cover rounded-xl max-sm:w-full" src={song.image} alt={song.title} />
            </div>
            <div className="details w-[75%] h-[89%] ml-2 pb-2 max-sm:w-full">
              <h1 className="heading text-xl font-bold text-black mb-2.5 max-sm:text-lg">{song.title}</h1>
              <div className="flex max-sm:flex-wrap max-sm:justify-around">
                <i className="fa-solid fa-circle-user text-xl text-teal-400 "></i>
                <p className="font-medium text-black ml-3 cursor-pointer">{song.authorName}</p>
                <i className="fa-regular fa-calendar ml-14 text-xl text-teal-400"></i>
                <p className="font-medium text-black ml-3">{song.ago}</p>
                <div className="flex max-sm:mr-16">
                  <i className="fa-brands fa-youtube ml-14 text-xl text-teal-400 max-sm:mt-2"></i>
                  <p className="font-medium text-black ml-3 max-sm:mt-2">{song.views}</p>
                </div>
              </div>
              <p className="truncate w-5/6 text-black text-sm mt-1 max-sm:mr-4">{song.description}</p>
              <div className="max-sm:flex max-sm:justify-center ">
                {!isClicked ? (
                  <button
                    className="button bg-black rounded-md p-2.5 mt-2 text-white font-semibold hover:bg-teal-400 hover:text-black"
                    onClick={() => setIsClicked(true)}
                  >
                    <i className="fa-solid fa-music mr-2"></i>Download Mp3
                  </button>
                ) : (
                  <div className="button">
                    <button className="btn btn-info m-3" onClick={() => handleSubmit320p(song.videoId)}>320kb</button>
                    <button className="btn btn-success m-3" onClick={() => handleSubmit256p(song.videoId)}>256kb</button>
                    <button className="btn btn-warning m-3" onClick={() => handleSubmit128p(song.videoId)}>128kb</button>
                    <button className="btn btn-active m-3" onClick={() => handleSubmit64p(song.videoId)}>60kb</button>
                  </div>
                )}
              </div>
            </div>
          </div>
  );
};

export default Song;
