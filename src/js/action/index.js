import { ADD_PRODUCT } from "../constant";
export function addProduct(payload) {
    return { type: ADD_PRODUCT, payload }
};