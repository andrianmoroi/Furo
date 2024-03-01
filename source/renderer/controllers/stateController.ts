import { IContext } from "../interface"
import { getStateButtonImgUrl } from "../view"

export interface IStateController { }

export function initStateController(
    stateButton: HTMLElement | null,
    context: IContext
): IStateController {

    updateImage()

    stateButton?.addEventListener("click", e => {
        e.preventDefault()

        const nextState = context.getNextState()

        context.switchState(nextState)

        updateImage()
    })

    function updateImage() {
        if (stateButton) {
            const state = context.getState()
            const img = stateButton.getElementsByTagName("img")[0] as HTMLImageElement

            if (img) {
                img.src = getStateButtonImgUrl(state)
            }
        }
    }

    return {}
}