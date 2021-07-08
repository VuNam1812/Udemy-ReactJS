// @flow
import * as React from "react";
import ReactPlayer from "react-player";
import "./style.scss";
export const VideoPlayer = ({ className, video }) => {
  return (
    <div className={`video-player ${className}`}>
      {video.src && (
        <ReactPlayer
          className="video-player__body"
                  url={`http://localhost:3030/${video.src.replaceAll("\\", "/")}`}
                  controls
        ></ReactPlayer>
      )}
    </div>
  );
};
