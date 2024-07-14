import React, { useState, useEffect, useRef } from 'react';
import VideoStream from './VideoStream';
import './App.css'; // Import CSS file

const App = () => {
    const [videoSrc, setVideoSrc] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const connectWebSocket = async () => {
            const websocket = new WebSocket('ws://127.0.0.1:8000/video_feed/');

            websocket.onmessage = (event) => {
                setVideoSrc(`data:image/jpeg;base64,${event.data}`);
            };

            websocket.onopen = () => {
                setIsLoading(false);
            };

            websocket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            return () => {
                websocket.close();
            };
        };

        connectWebSocket();
    }, []);

    const switchAsana = async (path) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/switch_asana/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ asana_path: path }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Asana switched successfully');
            } else {
                console.log('Failed to switch asana');
            }
        } catch (error) {
            console.error('Error switching asana:', error);
        }
    };

    return (
        <>
        <h1 class='dflex justify-content-center' align='center'>Kickstart your yoga journey</h1>
        <div className="app-container ">
            
            <div className="button-section">
                <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-2.jpeg')}>Pranamasana</button><br />
                <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-3.jpeg')}>Hasta Uttanasana</button><br />
                <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-4.jpeg')}>PadaHastasana</button><br />
                 <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-5.jpeg')}>Ashwa Sanchalanasana</button><br />
                <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-6.jpeg')}>Dandasana</button><br />
                <button type="button" class="btn btn-outline-light" onClick={() => switchAsana('yoga_poses/step-7.jpeg')}>Ashtangasana</button><br />
               
            </div>
            <div className="video-section">
                {isLoading ? (
                    <p>Loading video stream...</p>
                ) : (
                    <VideoStream src={videoSrc} />
                )}
            </div>
        </div>
        </>
    );
};

export default App;
