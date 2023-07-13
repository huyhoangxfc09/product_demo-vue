<template>
  <div>
    <h2>Update Product</h2>
    <el-form :model="productForm" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="productForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Price">
        <el-input-number v-model="productForm.price"></el-input-number>
      </el-form-item>
      <el-form-item label="Quantity">
        <el-input-number v-model="productForm.quantity"></el-input-number>
      </el-form-item>
      <el-form-item label="Category">
        <el-select v-model="productForm.category" placeholder="Select category">
          <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateProduct">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";


export default {
  data() {
    return {
      form: {
        name: "",
        price: 0,
        quantity: 0,
        category:''
      },
    };
  },
  computed: {
    ...mapGetters('productStore', ['categories']),
    ...mapGetters('productStore', ['product']),
    productForm: {
      get() {
        return this.product;
      },
      set(value) {
        this.form = value;
      }
    }
  },
  methods: {
    updateProduct() {
      // Xử lý logic cập nhật sản phẩm
      console.log('Form data:', this.productForm);
    },
    ...mapActions('productStore', ['showCategories', 'findProductById']),
    ...mapMutations('productStore', ['setCategories'])
  },
  created() {
    const idProduct = this.$route.params.id;
    console.log("Product ID:", idProduct);
    this.showCategories()
    this.findProductById(idProduct)
  }
}
</script>

<style scoped>

</style>