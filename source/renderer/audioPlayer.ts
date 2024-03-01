import { NotificationType } from "./interface"
import { getNotificationPath } from "./view"

export interface IAudioPlayer {
    notify: (type: NotificationType) => void,
    changeSong: (songPath: string) => void,
    playMusic: () => void,
    stopMusic: () => void,
    isMute: () => boolean,
    toggleMute: () => void,
}

export function initAudioPlayer(
    audioPlayerElement: HTMLAudioElement,
    notifierPlayerElement: HTMLAudioElement,
): IAudioPlayer {
    let isMute = false
    let isPlaying = false
    audioPlayerElement.loop = true
    notifierPlayerElement.loop = false

    updatePlayerState()

    function updatePlayerState() {
        if (isPlaying && !isMute) {
            if (audioPlayerElement.paused) {
                audioPlayerElement.play()
            }
        } else {
            if (!audioPlayerElement.paused) {
                audioPlayerElement.pause()
            }
        }
    }

    return {
        notify: (type: NotificationType) => {
            if (!isMute) {
                const path = getNotificationPath(type)
                notifierPlayerElement.src = path
                notifierPlayerElement.play()
            }
        },
        changeSong: (songPath: string) => {
            audioPlayerElement.src = songPath
        },
        playMusic: () => {
            isPlaying = true

            updatePlayerState()
        },
        stopMusic: () => {
            isPlaying = false

            updatePlayerState()
        },

        isMute: () => isMute,
        toggleMute: () => {
            isMute = !isMute

            updatePlayerState()
        },
    }
}
