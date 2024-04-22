import axios from "axios";
const baseURL = "http://localhost:9001";

export default {
    register: async (email, password, password2) => {
        try {
            const response = await axios.post(`${baseURL}/api/accounts/register`, {
                email: email,
                password: password,
                password2: password2
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    login: async (email, password) => {
        try {
            const response = await axios.post(`${baseURL}/api/accounts/login`, {
                email: email,
                password: password
            });
            sessionStorage.setItem("accountTokenId", response.data.accountTokenId);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    createHomeForAccount: async () => {
        try {
            const response = await axios.post(`${baseURL}/api/homes`, { accountId: sessionStorage.getItem("accountTokenId") });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getHomesForAccount: async () => {
        try {
            const response = await axios.get(`${baseURL}/api/homes/account-id/${sessionStorage.getItem("accountTokenId")}`);
            sessionStorage.setItem("homeNanoId", response.data.home.nanoId);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    addItemToHome: async (ean) => {
        try {
            const response = await axios.post(`${baseURL}/api/homes/add-item`, { ean: ean, homeNanoId: sessionStorage.getItem("homeNanoId") });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    removeItemFromHome: async (ean) => {
        try {
            const response = await axios.post(`${baseURL}/api/homes/remove-item`, { ean: ean, homeNanoId: sessionStorage.getItem("homeNanoId") });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    checkItem: async (ean) => {
        try {
            const response = await axios.post(`${baseURL}/api/homes/check-item`, { ean: ean, homeNanoId: sessionStorage.getItem("homeNanoId") });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
