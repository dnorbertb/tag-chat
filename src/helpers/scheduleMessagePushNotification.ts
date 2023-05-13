import { scheduleNotificationAsync } from "expo-notifications";
import { IMessage } from "../types/IMessage";


export async function scheduleMessagePushNotification(message: IMessage) {
    await scheduleNotificationAsync({
        content: {
            title: message.senderId,
            body: message.content,
            data: { senderId: message.senderId },
        },
        trigger: { seconds: 1 },
    });
}
