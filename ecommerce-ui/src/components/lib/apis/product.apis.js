import { $axios } from "../axios"

export const fetchBuyerProducts = async (paginationData) => {
    return await $axios.post("/products/buyer/all", paginationData)
}

export const fetchSellerProducts = async (paginationData) => {
    return await $axios.post("/products/seller/all", paginationData)
}

export const deleteProduct = async (_id) => {
    return await $axios.delete(`/product/delete/${_id}`)
}

export const addProduct = async values => {
    return await $axios.post("/product/add", values)
}