import React, {useState} from 'react';
import style from './MusicList.module.css'
const MusicList = ({audioElem, songs, currentSong, setCurrentSong, setIsPlaying}) => {

    const setActive = (song) => {
        if (song.title !== currentSong.title) {
            //setCurrentSong(song);
            setCurrentSong({...song, "progress": 0});
            setIsPlaying(false);
        }
    }

    const [input, setInput] = useState('');

    const filteredSongs = songs.filter (song => {
        return song.title.toLowerCase().includes(input.toLowerCase());
    })

    return (
        <div className={style.songsList}>
            <input
                type="text"
                placeholder="Search"
                onChange={(e) => setInput(e.target.value)}
            />
            {filteredSongs.length ? filteredSongs.map((song) =>
                <div className={song.title === currentSong.title ? style.active_song : style.song}
                     onClick={() => setActive(song)}>
                    <div className={style.songWrapper}>
                        <div>
                            <img alt="song cover" src={song.image}/>
                        </div>
                        <div className={style.title}>{song.title}</div>
                    </div>

                </div>
            ) :
                <div style={{textAlign: "center"}}>
                    <br></br>
                    <p>No songs with that name</p>
                </div>
            }
        </div>
    );
};

export default MusicList;