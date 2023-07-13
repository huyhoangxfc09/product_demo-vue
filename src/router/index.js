import Vue from 'vue'
//Dòng này để import vue-router
import Router from 'vue-router'
import UpdateFormProduct from "@/components/UpdateFormProduct.vue";
import PageHome from "@/components/PageHome.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import CreateFormProduct from "@/components/CreateFormProduct";

Vue.use(Router)

export default new Router({
    routes: [ // bao gồm danh sách route
        {
            path: '/', ///path của route
            name: 'PageHome', // tên route
            component: PageHome // component route sử dụng
        },
        {
            path: '/update/:id',
            name: 'About',
            component: UpdateFormProduct
        },
        {
            path: '/hello',
            name: 'Hello',
            component: HelloWorld
        },
        {
            path: '/create',
            name: 'CreateFormProduct',
            component: CreateFormProduct
        }
    ]
})
