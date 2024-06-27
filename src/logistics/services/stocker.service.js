import axios from 'axios';

const API_URL = 'http://localhost:5167/api/v1/authentication/';

class AuthService {
    login(user) {
        return axios.post(API_URL + 'sign-in', {
            username: user.username,
            password: user.password
        })
            .then(response => {
                if (response.data.token) {
                    console.log("user:", response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        return new Promise((resolve) => {
            localStorage.removeItem('user');
            resolve();
        });
    }

    register(user) {
        return axios.post(API_URL + 'sign-up', {
            username: user.username,
            password: user.password
        });
    }
}

export default new AuthService();
