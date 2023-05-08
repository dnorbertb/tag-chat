import { apiAddress } from "../configs/apiConfig";
import { APIResponse } from "../types/APIResponse";

export const registerUser = async (username: string): Promise<APIResponse<{ username: string }>> => {
    try {
        const response = await fetch(apiAddress + '/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username
            })
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Error, try again.' }
    }
}