import { IMainWindow } from "../interface";

export interface IResizerController { }

export function initResizerController(
    progress: HTMLElement | null,
    window: IMainWindow,
    minimizedHeight: number
) {
    progress?.addEventListener("dblclick", async (e) => {
        const { h } = await window.getWindowSize()

        if (h > minimizedHeight) {
            window.setWindowSize(500, 60)
        } else {
            window.setWindowSize(500, 300)
        }
    })

    return {}
}