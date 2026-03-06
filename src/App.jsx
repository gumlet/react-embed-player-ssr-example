// src/App.js
import React, { useEffect, useRef, useState } from 'react';

const App = () => {
  const playerRef = useRef(null);
  const [GumletPlayer, setGumletPlayer] = useState(null);

  // Dynamically import the player only on the client
  useEffect(() => {
    // Only runs in browser
    if (typeof window !== 'undefined') {
      import('@gumlet/react-embed-player').then((mod) => {
        setGumletPlayer(() => mod.GumletPlayer); // save as component
      });
    }
  }, []);

  // Player control functions
  const play = () => playerRef.current?.play();
  const pause = () => playerRef.current?.pause();
  const mute = () => playerRef.current?.mute();
  const unmute = () => playerRef.current?.unmute();
  const setVolume = (v) => playerRef.current?.setVolume(v);
  const setCurrentTime = (t) => playerRef.current?.setCurrentTime(t);
  const setPlaybackRate = (r) => playerRef.current?.setPlaybackRate(r);
  const getPaused = async () => alert(await playerRef.current?.getPaused());
  const getMuted = async () => alert(await playerRef.current?.getMuted());
  const getVolume = async () => alert(await playerRef.current?.getVolume());
  const getDuration = async () => alert(await playerRef.current?.getDuration());
  const getCurrentTime = async () => alert(await playerRef.current?.getCurrentTime());
  const getPlaybackRate = async () => alert(await playerRef.current?.getPlaybackRate());

  return (
    <>
      <div style={{ padding: '10px' }}>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
        <button onClick={mute}>Mute</button>
        <button onClick={unmute}>Unmute</button>
        <button onClick={() => setVolume(50)}>Set volume to 50%</button>
        <button onClick={() => setCurrentTime(2)}>Set time to 2 seconds</button>
        <button onClick={() => setPlaybackRate(2)}>Set playback rate to 2x</button>
        <button onClick={getPaused}>Get paused</button>
        <button onClick={getMuted}>Get muted</button>
        <button onClick={getVolume}>Get volume</button>
        <button onClick={getDuration}>Get duration</button>
        <button onClick={getCurrentTime}>Get current time</button>
        <button onClick={getPlaybackRate}>Get playback rate</button>
      </div>

      <div style={{ marginTop: '10px', padding: '10px' }}>
        {GumletPlayer ? (
          <>
            <h1>Gumlet Embed Player with SSR</h1>
            <GumletPlayer
              ref={playerRef}
              videoID="64bfb0913ed6e5096d66dc1e"
              title="Gumlet Player Example"
              style={{ height: '100vh', width: '100vw', position: 'relative' }}
              schemaOrgVideoObject={{
                "@context": "https://schema.org",
                "@type": "VideoObject",
                "name": "Siren pink 3:4 video",
                "description": "",
                "thumbnailUrl": [
                  ["https://video.gumlet.io/603cc6a9926fb6233baebb34/66487345e3dcc416dc9bbb5b/thumbnail-1-0.png?v=1716024171990"]
                ],
                "uploadDate": "2024-05-18T09:22:13.592Z",
                "duration": "PT7.833333S",
                "embedUrl": "https://play.gumlet.io/embed/66487345e3dcc416dc9bbb5b"
              }}
              autoplay={false}
              preload={false}
              muted={true}
              disable_player_controls={false}
              t={35}
              onReady={() => console.log("Player is ready.")}
              onPlay={() => console.log("Video is playing.")}
              onPause={() => console.log("Video is paused.")}
              onProgress={(e) => console.log("Video is at", e.percent)}
              onTimeUpdate={(e) => console.log("Video is at", e.seconds, "seconds")}
              onEnded={() => console.log("Video has ended.")}
              onFullScreenChange={(e) => console.log("Full screen change", e)}
              onPipChange={(e) => console.log("Picture in picture", e)}
              onAudioChange={(e) => console.log("Audio changed", e)}
              onQualityChange={(e) => console.log("Quality changed", e)}
              onVolumeChange={(e) => console.log("Volume changed", e)}
              onSeeked={(e) => console.log("Seeked", e)}
              onError={(e) => console.log("Error", e)}
            />
          </>
        ) : (
          <div>Loading player...</div>
        )}
      </div>
    </>
  );
};

export default App;
