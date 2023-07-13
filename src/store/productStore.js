import ApiProduct from "@/service/APIProduct";
const apiProduct = new ApiProduct()
export const productStore = {
    namespaced: true,
    state: {
        product:{},
        listProduct: [],
        categories: []
    },
    getters: {
        product: (state) => state.product,
        products: (state) => state.listProduct,
        categories: (state) => state.categories
    },
    mutations: {
        setProduct(state, product){
          state.product = product
        },
        setProducts(state, products) {
            state.listProduct = products;
        },
        setCategories(state, category) {
            state.categories = category;
        }
    },
    actions: {
        // Hiển thị tất cả sản phẩm
        showAllProduct({commit}) {
            apiProduct.getAllProduct().then(response => {
                commit('setProducts', response.data)
                console.log("List Product")
                console.log(response.data)
            })
        },

        // Hiển thị category
        showCategories({commit}){
            apiProduct.getAllCategory().then(response =>{
                commit('setCategories', response.data)
                console.log("Categories")
                console.log(response.data)
            })
        },

        // Truy xuất sản phẩm theo idProduct
        findProductById({commit}, idProduct){
            apiProduct.getProductById(idProduct).then(response =>{
                commit('setProduct',response.data)
                console.log("Product")
                console.log(response.data)
            })
        },

        // Tạo mới/cập nhật sản phẩm
        saveProduct({commit},product){
            apiProduct.saveProduct(product).then(response =>{
                commit('setProduct',response.data)
            })
        }
    }
}