import React, {useRef} from 'react';
import style from './Player.module.css';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';

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
            setCurrentSong({...songs[songs.length - 1], "progress": 0})
        }
        else{
            setCurrentSong({...songs[index - 1], "progress": 0});
        }
        audioElem.current.currentTime = 0;
        setTimeout(function () {
            audioElem.current.play();
            setIsPlaying(true);
        }, 10);
    }

    const skipNext = () => {
        const index = songs.findIndex(x => x.title === currentSong.title);
        setCurrentSong({...songs[(index + 1) % songs.length], "progress": 0});
        audioElem.current.currentTime = 0;
        setTimeout(function () {
            audioElem.current.play();
            setIsPlaying(true);
        }, 10);
    }

    const getTime = (time) => {
        let sec_num = parseInt(time, 10)
        let hours = Math.floor(sec_num / 3600) % 24
        let minutes = Math.floor(sec_num / 60) % 60
        let seconds = sec_num % 60
        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <div className={style.player_container}>
            <img alt="song cover" src={currentSong.image} className={style.image}/>
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

                <p>{!isNaN(currentSong.progress) ? getTime(currentSong.progress/100 * currentSong.length) : getTime(0)}</p>
                <BsFillSkipStartCircleFill className={style.btn_action} onClick={skipBack}/>

                {isPlaying ? <BsFillPauseCircleFill className={style.btn_action} onClick={PlayPause} style ={{fontSize: 80}}/>
                : <BsFillPlayCircleFill className={style.btn_action} onClick={PlayPause} style ={{fontSize: 80}}/>}

                <BsFillSkipEndCircleFill className={style.btn_action} onClick={skipNext}/>
                <p>{isNaN(currentSong.length)  ? getTime(0) : getTime(currentSong.length)}</p>

            </div>
        </div>
    );
};

export default Player;