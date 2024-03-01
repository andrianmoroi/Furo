import { IContext } from "../interface"

export interface ITimerController {
    render: (now: Date) => void
}

export function initTimerController(
    timerElement: HTMLElement | null,
    context: IContext
): ITimerController {

    function format(v: number): string {
        return v.toString().padStart(2, '0')
    }

    return {
        render: (now: Date) => {
            if (timerElement) {
                const totalSeconds = context.getRemainingSeconds(now)
                const totalSecondsAbs = Math.abs(totalSeconds)
                const mins = Math.floor(totalSecondsAbs / 60)
                const seconds = Math.floor(totalSecondsAbs - mins * 60)
                const sign = totalSeconds < 0 ? '-' : ''
                
                const text = `${sign} ${format(mins)} : ${format(seconds)}`
                timerElement.innerHTML = text
            }
        }
    }
}