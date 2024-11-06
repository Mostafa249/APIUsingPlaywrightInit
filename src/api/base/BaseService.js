import { request } from "@playwright/test";
import AuthService from "./AuthService";
import Logger from "../../utils/Logger"

class BaseService {
    async getRequest(endpoint, queryParam = {}, headers = {}) {
        const token = await AuthService.getAuthToken();
        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },
        });
        const response = await apiContext.get(endpoint, { params: { ...queryParam } });
        return response;
    }

    async postRequest(endpoint, body, headers = {}) {
        const token = await AuthService.getAuthToken();
        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },

        });
        const response = await apiContext.post(endpoint, { data: body });
        return response;
    }

    async putRequest(endpoint, body, headers = {}) {
        const token = await AuthService.getAuthToken();
        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },

        });
        const response = await apiContext.put(endpoint, { data: body });
        return response;
    }

    async deleteRequest(endpoint, queryParam = {}, headers = {}) {
        const token = await AuthService.getAuthToken();
        const apiContext = await request.newContext({
            extraHTTPHeaders: {
                ...headers,
                'Authorization': `Bearer ${token}`
            },
        });
        const response = await apiContext.delete(endpoint, { params: { ...queryParam } });
        return response;
    }
}

module.exports = new BaseService();