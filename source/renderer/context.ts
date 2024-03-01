import { IContext, ISettings, StateOptions } from "./interface"

export function initContext(): IContext {
    let currentState = StateOptions.Relax
    let startTime = new Date()
    let settings: ISettings ={
        totalMins: 0,
        focusMins: 0,
        relaxMins: 0,
    }

    function getTargetSeconds(): number {
        const { focusMins, relaxMins } = settings

        const targetMins = currentState == StateOptions.Focus
            ? focusMins
            : relaxMins

        return targetMins * 60
    }

    function getRemainingSeconds(now: Date): number {
        const targetSeconds = getTargetSeconds()
        const diffSeconds = (now.getTime() - startTime.getTime()) / 1000

        return targetSeconds - diffSeconds
    }

    return {
        getNextState: (): StateOptions => currentState == StateOptions.Focus
            ? StateOptions.Relax
            : StateOptions.Focus,

        switchState: (state: StateOptions): void => {
            currentState = state
            startTime = new Date()
        },

        getState: (): StateOptions => currentState,

        getRemainingPercentAtTime: (now: Date): number => {
            const targetSeconds = getTargetSeconds()
            const remainingSeconds = getRemainingSeconds(now)
            const percent = remainingSeconds / targetSeconds

            return percent
        },

        getRemainingSeconds,

        updateSettings: (
            slider: HTMLInputElement | null,
            message: HTMLElement | null
        ): void => {

            if (slider) {
                const total = parseFloat(slider.value)
                const focus = Math.round(total * 5 / 6)
                const relax = total - focus

                settings.totalMins = total
                settings.focusMins = focus
                settings.relaxMins = relax
            }

            if (message) {
                const { focusMins, relaxMins } = settings

                message.innerHTML = `${focusMins} min / ${relaxMins} min`
            }
        }
    }
}
