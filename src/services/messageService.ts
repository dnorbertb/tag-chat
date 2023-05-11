import { apiAddress } from "../configs/apiConfig";
import { APIResponse } from "../types/APIResponse";
import { IMessage } from "../types/IMessage";

const BASE_URL = apiAddress + '/message';

export const fetchNewMessagesService: (userId: string) => Promise<APIResponse<IMessage[]>> = async (userId) => {
    try {
        const req = await fetch(BASE_URL + `?userId=${userId}`);
        const { data }: { data: IMessage[] } = await req.json();
        return { success: true, data: data };
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Error when fetching messages' };
    }
}


export const sendMessageService: (message: IMessage) => Promise<APIResponse<{ message: string }>> = async (message) => {
    try {
        const req = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...message
            })
        });
        return { success: true, data: { message: 'Message sent' } };
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Error when sending message' };
    }
}