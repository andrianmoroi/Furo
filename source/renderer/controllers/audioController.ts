import { IAudioPlayer } from "../audioPlayer";
import { IContext, IMainWindow, StateOptions } from "../interface";
import { getMuteButtonImgUrl } from "../view";

export interface IAudioController {
    updateMusicState: (now: Date) => void
}

export async function initAudioController(
    muteButton: HTMLElement | null,
    nextButton: HTMLElement | null,
    audioPlayer: IAudioPlayer,
    context: IContext,
    main: IMainWindow
): Promise<IAudioController> {
    let songIndex = -1

    const musicFiles = await main.getAllSongs()

    shuffleArray(musicFiles)
    songIndex = 0
    audioPlayer.changeSong(musicFiles[songIndex])

    updateButtonImg()

    muteButton?.addEventListener("click", e => {
        e.preventDefault()

        audioPlayer.toggleMute()

        updateButtonImg()
    })

    nextButton?.addEventListener("click", e => {
        e.preventDefault()

        if (musicFiles.length > 0) {
            songIndex = (songIndex + 1) % musicFiles.length

            audioPlayer.changeSong(musicFiles[songIndex])
        }
    })

    function updateButtonImg() {
        const img = muteButton?.getElementsByTagName("img")[0] as HTMLImageElement

        if (img) {
            const isMute = audioPlayer.isMute()
            const icon = getMuteButtonImgUrl(isMute)

            img.src = icon
        }
    }

    return {
        updateMusicState: (now: Date) => {
            const state = context.getState()
            const remainingSeconds = context.getRemainingSeconds(now)

            if (state == StateOptions.Focus && remainingSeconds >= 0) {
                audioPlayer.playMusic()
            } else {
                audioPlayer.stopMusic()
            }
        }
    }
}

function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
}
