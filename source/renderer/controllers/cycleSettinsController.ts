import { IContext } from "../interface"

export interface ICycleSettingsController {

}

export function initCycleSettingsController(
    slider: HTMLInputElement | null,
    cycleMessage: HTMLElement | null,
    context: IContext
): ICycleSettingsController {

    context.updateSettings(slider, cycleMessage)

    slider?.addEventListener("input", (e) => {
        const target = e.target as HTMLInputElement

        context.updateSettings(target, cycleMessage)
    })

    return {}
}