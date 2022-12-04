import './App.css';
import Player from "./components/Player/Player";
import { songsdata } from './components/Player/data';
import {useEffect, useRef, useState} from "react";
function App() {
    const [songs, setSongs] = useState(songsdata);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(songsdata[0]);

    const audioElem = useRef();

    useEffect(() =>{
        if (isPlaying) {
            audioElem.current.play();
        }
        else {
            audioElem.current.pause();
        }
    }, [isPlaying])


  return (
    <div className="App">
        <audio src="https://mp3.chillhop.com/serve.php/?mp3=10454"
               ref={audioElem}
        />

        <Player songs={songs}
                setSongs={setSongs}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioElem={audioElem}
        />
    </div>
  );
}

export default App;
