import ReactPlayer from 'react-player'
import React from 'react'

const TEST_VIDEO_SRC = 'videos/game_play.webm';

export default function GameVideoPlayer() {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                url="https://youtu.be/Vqtc5FKhcbM"
                width='100%'
                height='100%'
                autoPlay
                controls={true}
                config={{
                    file: {
                        attributes: {
                            poster: '/img/thumbnail/thumbnail_game_play.png'
                        }
                    }
                }}
            />
        </div>
    )
}