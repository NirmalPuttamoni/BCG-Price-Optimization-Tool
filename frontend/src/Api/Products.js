import { message } from "antd";
import axiosInstance from "./index";

// register a new user

export const GetAllProducts = async (navigate) => {
    try {
        const response = await axiosInstance.get("/api/product/get-products");
        return response.data;
    } catch (error) {
        console.log("error : ", error?.response);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleUnauthorized(navigate);
            return;
        }
        return error?.response?.data;
    }
}

export const AddProduct = async (values, navigate) => {
    try {
        const response = await axiosInstance.post("/api/product/add-product", values);
        return response.data;
    } catch (error) {
        console.log("error : ", error?.response?.data);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleUnauthorized(navigate);
            return;
        }
        return error?.response?.data;
    }
}

export const DeleteProduct = async (id, navigate) => {
    try {
        const response = await axiosInstance.delete(`/api/product/delete-product/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleUnauthorized(navigate);
            return;
        }
        return error?.response?.data;
    }
}

export const UpdateProduct = async (id, navigate) => {
    try {
        const response = await axiosInstance.put(`/api/product/update-product/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            handleUnauthorized(navigate);
            return;
        }
        return error?.response?.data;
    }
}

export const handleUnauthorized = (navigate) => {
    localStorage.removeItem("user_details");
    message.warning("Session expired");
    setTimeout(() => {
        navigate("/login");
    }, 1500);
};