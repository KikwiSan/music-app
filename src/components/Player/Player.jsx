import React from 'react';
import style from './Player.module.css';
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';
const Player = ({audioElem, isPlaying ,setIsPlaying}) => {

    const PlayPause = () => {
        setIsPlaying(!isPlaying);

    }

    return (
        <div className={style.player_container}>
            <div className ={style.title}>
            <p>first song</p>
            </div>
            <div className={style.navigation}>
                <div className={style.navigation_wrapper}>
                    <div className={style.seek_bar}></div>
                </div>
            </div>
            <div className={style.controls}>
                <BsFillSkipStartCircleFill className={style.btn_action}/>

                {isPlaying ? <BsFillPauseCircleFill className={style.btn_action} onClick={PlayPause}/>
                : <BsFillPlayCircleFill className={style.btn_action} onClick={PlayPause}/>}

                <BsFillSkipEndCircleFill className={style.btn_action}/>
            </div>
        </div>
    );
};

export default Player;