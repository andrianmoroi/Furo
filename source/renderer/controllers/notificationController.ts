import { IAudioPlayer } from "../audioPlayer";
import { IContext, NotificationType, StateOptions } from "../interface";

export interface INotificationController {
    checkNotification: (now: Date) => void
}

const NOTIFICATION_SECONDS: [number, NotificationType][] = [
    [5 * 60, NotificationType.Light],
    [1 * 60, NotificationType.Light],
    [0 * 60, NotificationType.Strong],
    [-1 * 60, NotificationType.Light],
    [-2 * 60, NotificationType.Light],
    [-3 * 60, NotificationType.Light],
    [-4 * 60, NotificationType.Light],
    [-5 * 60, NotificationType.Light],
]

export function initNotificationController(
    audioPlayer: IAudioPlayer,
    context: IContext
): INotificationController {
    let lastState: StateOptions | undefined = undefined
    let notificationsTimes: [number, NotificationType][] = []

    return {
        checkNotification: (now: Date) => {
            const currentState = context.getState()
            const remainingSeconds = context.getRemainingSeconds(now)

            if (lastState != currentState) {
                notificationsTimes = generateNotificationSeconds(
                    remainingSeconds
                )
            }

            const [seconds, type] = notificationsTimes[0]
            if (
                notificationsTimes.length > 0 &&
                remainingSeconds <= seconds
            ) {
                audioPlayer.notify(type)

                notificationsTimes.shift()
            }

            lastState = currentState
        }
    }
}

function generateNotificationSeconds(
    remainingSeconds: number
): [number, NotificationType][] {
    return [
        [remainingSeconds, NotificationType.Strong],
        ...NOTIFICATION_SECONDS.filter(m => m[0] < remainingSeconds)
    ]
}