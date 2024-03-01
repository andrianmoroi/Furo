import { NotificationType, StateOptions } from "./interface";

export function getStateButtonImgUrl(state: StateOptions): string {
    return state == StateOptions.Focus
        ? "icons\\laptop.svg"
        : "icons\\coffe.svg"
}

export function getMuteButtonImgUrl(isMute: boolean): string {
    return isMute ? "icons\\mute.svg" : "icons\\volume.svg"
}

export function getProgressColor(state: StateOptions, percentage: number): string {
    if (percentage < 0) {
        return "var(--over-color)"
    } else {
        return getStateColor(state)
    }
}

export function getStateColor(state: StateOptions): string {
    return state == StateOptions.Focus
        ? "var(--focus-color)"
        : "var(--relax-color)"
}

export function getStateColorTransparent(state: StateOptions): string {
    return state == StateOptions.Focus
        ? "var(--focus-transparent-color)"
        : "var(--relax-transparent-color)"
}

export function getNotificationPath(notification: NotificationType): string {
    return notification == NotificationType.Strong
        ? "sounds\\notifications\\beep-strong.mp3"
        : "sounds\\notifications\\beep-light.mp3"
}

export function getSoundsPath(){
    console.log("music")
}