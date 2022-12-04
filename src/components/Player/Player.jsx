import React, {useRef} from 'react';
import style from './Player.module.css';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';
const Player = ({songs, audioElem, isPlaying ,setIsPlaying, currentSong, setCurrentSong}) => {

    const widthRef = useRef();
    const PlayPause = () => {
        setIsPlaying(!isPlaying);

        if (isPlaying) audioElem.current.pause();
        else audioElem.current.play();
    }



    const checkWidth = (e) => {
        let width = widthRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divprogress = offset / width;
        audioElem.current.currentTime = divprogress * currentSong.length;
    }

    const skipBack = () => {
        const index = songs.findIndex(x => x.title === currentSong.title);
        if (index === 0) {
            setCurrentSong(songs[songs.length - 1]);
        }
        else{
            setCurrentSong(songs[index - 1]);
        }
        audioElem.current.currentTime = 0;
        setIsPlaying(false);
    }

    const skipNext = () => {
        const index = songs.findIndex(x => x.title === currentSong.title);
        setCurrentSong(songs[(index + 1) % songs.length]);
        audioElem.current.currentTime = 0;
        setIsPlaying(false);
    }

    return (
        <div className={style.player_container}>
            <div className ={style.title}>
            <p>{currentSong.title}</p>
            </div>
            <div className={style.navigation}>
                <div className={style.navigation_wrapper} onClick={checkWidth} ref={widthRef}>
                    <div className={style.seek_bar}
                         style={{width: `${currentSong.progress+"%"}`}}
                    ></div>
                </div>
            </div>
            <div className={style.controls}>
                <BsFillSkipStartCircleFill className={style.btn_action} onClick={skipBack}/>

                {isPlaying ? <BsFillPauseCircleFill className={style.btn_action} onClick={PlayPause} style ={{fontSize: 50}}/>
                : <BsFillPlayCircleFill className={style.btn_action} onClick={PlayPause} style ={{fontSize: 50}}/>}

                <BsFillSkipEndCircleFill className={style.btn_action} onClick={skipNext}/>
            </div>
        </div>
    );
};

export default Player;