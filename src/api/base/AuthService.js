import { request } from "@playwright/test";

const loginService = '/auth/token/login/'
const username = process.env.LOGIN_USERNAME;
const password = process.env.LOGIN_PASSWORD;

class AuthService {
    async getAuthToken() {
        const apiContext = await request.newContext();

        const formData = {
            username: username,
            password: password
        };

        const response = await apiContext.post(loginService, {
            data: formData,
        });

        if (!response.ok()) {
            throw new Error(`Login failed with status: ${response.status()}`);
        }

        const responseBody = await response.json();
        let authToken = responseBody.access;

        return authToken;
    }
}

module.exports = new AuthService();