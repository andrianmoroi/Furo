import { IContext } from "../interface";
import { getProgressColor } from "../view";

export interface IProgressController {
    render: (now: Date) => void
}

export function initProgressController(
    progress: HTMLElement | null,
    context: IContext
): IProgressController {

    return {
        render: (now: Date) => {
            if (progress) {
                const state = context.getState()
                const percentage = context.getRemainingPercentAtTime(now)
                const progressPercentage = Math.min(Math.abs(percentage), 100)
                const cssPercentage = progressPercentage * 100

                progress.style.setProperty(
                    "--percentage", `${cssPercentage}%`
                )
                progress.style.setProperty(
                    "--color", getProgressColor(state, percentage)
                )
            }
        }
    }
}