import Vue from 'vue'
import Vuex from 'vuex'
import {productStore} from "@/store/productStore";
Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        productStore
    }
})