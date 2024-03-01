import { initAudioPlayer } from "./audioPlayer"
import { initContext } from "./context"
import { initAudioController } from "./controllers/audioController"
import { initColorController } from "./controllers/colorController"
import { initCycleSettingsController } from "./controllers/cycleSettinsController"
import { initNotificationController } from "./controllers/notificationController"
import { initProgressController } from "./controllers/progressController"
import { initResizerController } from "./controllers/resizerController"
import { initStateController } from "./controllers/stateController"
import { initTimerController } from "./controllers/timerController"
import { IMainWindow, StateOptions } from "./interface"

declare global {
    interface Window {
        main: IMainWindow
    }
}

const MINIMIZED_WINDOW_HEIGHT = 220

const container = document.getElementById("container")
const slider = document.getElementById("cycle-range") as HTMLInputElement
const cycleMessage = document.getElementById("cycle-message")
const stateButton = document.getElementById("change-state")
const muteButton = document.getElementById("mute")
const nextButton = document.getElementById("next")
const progress = document.getElementById("progress")
const timer = document.getElementById("timer")
const player = document.getElementById("player") as HTMLAudioElement
const notifier = document.getElementById("notification") as HTMLAudioElement

const context = initContext()
const audioPlayer = initAudioPlayer(player, notifier)

context.switchState(StateOptions.Relax)

const progressController = initProgressController(progress, context)
const timerController = initTimerController(timer, context)
const colorController = initColorController(container, context)
const stateController = initStateController(stateButton, context)
const audioController = await initAudioController(
    muteButton, nextButton, audioPlayer, context, window.main
)
const cycleSettingController = initCycleSettingsController(
    slider, cycleMessage, context
)
const resizerController = initResizerController(
    progress, window.main, MINIMIZED_WINDOW_HEIGHT
)
const notificationController = initNotificationController(audioPlayer, context)

setInterval(() => {
    const now = new Date()

    audioController.updateMusicState(now)
    notificationController.checkNotification(now)

    colorController.render()
    progressController.render(now)
    timerController.render(now)

}, 300)
