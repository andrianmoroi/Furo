export enum NotificationType {
    Light,
    Strong
}

export interface IMainWindow {
    setWindowSize: (w: number, h: number) => void
    getWindowSize: () => Promise<{ w: number, h: number }>
    getAllSongs: () => Promise<string[]>

    log: (message: string) => void
}

export interface ISettings {
    totalMins: number
    focusMins: number
    relaxMins: number
}

export enum StateOptions {
    Focus,
    Relax
}

export interface IContext {

    getNextState: () => StateOptions,
    switchState: (state: StateOptions) => void,
    getState: () => StateOptions,

    getRemainingPercentAtTime: (now: Date) => number,
    getRemainingSeconds: (now: Date) => number,

    updateSettings: (
        slider: HTMLInputElement | null,
        message: HTMLElement | null
    ) => void
}
