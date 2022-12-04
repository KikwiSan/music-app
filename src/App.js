import './App.css';
import Player from "./components/Player/Player";
import { songsdata } from './components/Player/data';
import {useEffect, useRef, useState} from "react";
function App() {
    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);

    const audioElem = useRef();

    // useEffect(() =>{
    //     if (isPlaying) {
    //         audioElem.current.play();
    //     }
    //     else {
    //         audioElem.current.pause();
    //     }
    // }, [isPlaying])

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const currentTime = audioElem.current.currentTime;

        setCurrentSong({...currentSong,
            "progress": currentTime / duration * 100,
            "length": duration
        })
    }

  return (
    <div className="App">
        <audio src={currentSong.url}
               ref={audioElem}
               onTimeUpdate={onPlaying}
        />

        <Player songs={songs}
                setSongs={setSongs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioElem={audioElem}
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
        />
    </div>
  );
}

export default App;
