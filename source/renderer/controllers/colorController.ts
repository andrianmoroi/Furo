import { IContext } from "../interface"
import { getStateColor, getStateColorTransparent } from "../view"

export interface IColorController{
    render: () => void
}

export function initColorController(
    container: HTMLElement | null,
    context: IContext
) : IColorController {

    return {
        render: () => {
            if (container) {
                const state = context.getState()

                container.style.setProperty(
                    "--main-color", getStateColor(state)
                )
                container.style.setProperty(
                    "--main-transparent-color", getStateColorTransparent(state)
                )
            }
        }
    }
}