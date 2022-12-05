import React from 'react';
import style from './MusicList.module.css'
const MusicList = ({audioElem, songs, currentSong, setCurrentSong, setIsPlaying}) => {

    const setActive = (song) => {
        if (song.title !== currentSong.title) {
            //setCurrentSong(song);
            setCurrentSong({...song, "progress": 0});
            setIsPlaying(false);
        }
    }

    return (
        <div className={style.songsList}>
            {songs.map((song) =>
                <div className={song.title === currentSong.title ? style.active_song : style.song}
                     onClick={() => setActive(song)}>
                    <div className={style.songWrapper}>
                        <div>
                            <img alt="song cover" src={song.image}/>
                        </div>
                        <div className={style.title}>{song.title}</div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default MusicList;