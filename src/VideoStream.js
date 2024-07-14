import React from 'react';

const VideoStream = ({ src }) => {
    return (
        <img src={src} alt="Video Stream" style={{ width: '80%', height: 'auto' }} />
    );
};

export default VideoStream;
