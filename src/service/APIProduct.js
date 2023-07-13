import http from "../http-common";
export  default class ApiProduct{

    getProductById(idProduct){
        return http.get(`/home/products/${idProduct}`);
    }
    getAllProduct(){
        return http.get(`/home/products`)
    }

    getAllCategory(){
        return http.get(`/home/products/categories`)
    }
}