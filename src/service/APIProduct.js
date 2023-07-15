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
    saveProduct(product){
        return http.post(`/home/products/save`,product)
    }
    deleteProduct(idProduct){
        return http.delete(`/home/products/delete/${idProduct}`)
    }
    getPageAllProduct(){
        return http.get(`/home/products/pages`)
    }
}