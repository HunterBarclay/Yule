/* eslint-disable react-hooks/exhaustive-deps */
import { MutableRefObject, useEffect, useState } from "react";

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
                ? "pause"
                : "play"
        }</div>
    )
}

export default PlayButton;