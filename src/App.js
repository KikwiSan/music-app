import './App.css';
import Player from "./components/Player/Player";
import { songsdata } from './components/Player/data';
import {useRef, useState} from "react";
import MusicList from "./components/MusicList/MusicList";
function App() {
    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);
    const audioElem = useRef();

    const onPlaying = () => {
        const duration = audioElem.current.duration;
        const currentTime = audioElem.current.currentTime;

        setCurrentSong({...currentSong,
            "progress": currentTime / duration * 100,
            "length": duration
        })
    }
    const skipNext = () => {
        const index = songs.findIndex(x => x.title === currentSong.title);
        setCurrentSong({...songs[(index + 1) % songs.length], "progress": 0});
        audioElem.current.currentTime = 0;
        setIsPlaying(false);
    }

  return (
    <div className="App">
        <div className="list_wrapper">
            <MusicList songs={songs}
                       currentSong={currentSong}
                       setCurrentSong={setCurrentSong}
                       setIsPlaying={setIsPlaying}
                       audioElem={audioElem}
            />
        </div>
        <div className="player_wrapper">
            <audio src={currentSong.url}
                   ref={audioElem}
                   onTimeUpdate={onPlaying}
                   onEnded={skipNext}
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

    </div>
  );
}

export default App;
