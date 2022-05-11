import axios from "axios";
import authHeader from "./auth-header";
const chattyApiUrl = import.meta.env.VITE_CHATTY_API_URL_STRING;

// TODO: Add methods to support different channels
class MessageService {
    getMessages() {
        return axios.get(chattyApiUrl + "Messages", { headers: authHeader() });
    }
    sendMessage(message) {
        return axios.post(chattyApiUrl + "Messages", message, { headers: authHeader() });
    }
}

export default new MessageService();