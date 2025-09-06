import axios, { AxiosRequestConfig } from "axios";

export class FetchApi {
    static async get(
        path: string,
        config?: AxiosRequestConfig<any> | undefined
    ) {
        try {
            const res = await axios.get("/api" + path, config);
            return res;
        } catch (e: any) {
            console.error("GET error:", e.response?.data || e.message);
            throw e;
        }
    }

    static async patch(
        path: string,
        body?: any,
        config?: AxiosRequestConfig<any> | undefined
    ) {
        try {
            const res = await axios.patch("/api" + path, body, config);
            return res;
        } catch (e: any) {
            console.error("PATCH error:", e.response?.data || e.message);
            throw e;
        }
    }

    static async put(
        path: string,
        body?: any,
        config?: AxiosRequestConfig<any> | undefined
    ) {
        try {
            const res = await axios.put("/api" + path, body, config);
            return res;
        } catch (e: any) {
            console.error("PUT error:", e.response?.data || e.message);
            throw e;
        }
    }

    static async delete(
        path: string,
        config?: AxiosRequestConfig<any> | undefined
    ) {
        try {
            const res = await axios.delete("/api" + path, config);
            return res;
        } catch (e: any) {
            console.error("DELETE error:", e.response?.data || e.message);
            throw e;
        }
    }

    static async post(
        path: string,
        body?: any,
        config?: AxiosRequestConfig<any> | undefined
    ) {
        try {
            const res = await axios.post("/api" + path, body, config);
            return res;
        } catch (e: any) {
            console.error("POST error:", e.response?.data || e.message);
            throw e;
        }
    }
}

