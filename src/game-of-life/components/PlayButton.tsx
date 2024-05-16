/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useState } from "react";
import './PlayButton.css'

interface PlayButtonProps {
    isPlaying: MutableRefObject<boolean>;
}

function PlayButton({isPlaying}: PlayButtonProps) {

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        isPlaying.current = playing;
    }, [playing]);

    return (
        <div id="toggle-button" className={playing ? "pause-button" : "play-button"} onClick={() => setPlaying((playing) => !playing)}>{
            playing
                ? (<img className="icon" src="/pause_icon.svg" />)
                : (<img className="icon" src="/play_icon.svg" />)
        }</div>
    )
}

export default PlayButton;