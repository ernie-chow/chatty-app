import axios from "axios";
const chattyApiUrl = import.meta.env.VITE_CHATTY_API_URL_STRING;

class UserService {
    login(user) {
        // Create headers
        const headers = {
            "Content-Type": "application/json"
        };

        return axios.post(chattyApiUrl + "Users/Login", {
            username: user.username,
            password: user.password
        }, { headers: headers })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(user) {
        // Create headers
        const headers = {
            "Content-Type": "application/json"
        };

        return axios.post(chattyApiUrl + "Users/Register", {
            username: user.username,
            email: user.email,
            password: user.password
        }, { headers: headers });
    }
}

export default new UserService();