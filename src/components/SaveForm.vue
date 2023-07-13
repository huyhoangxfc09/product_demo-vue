<template>
  <div>
    <h2>Update Product</h2>
    <el-form :model="form" label-width="120px">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Price">
        <el-input-number v-model="form.price"></el-input-number>
      </el-form-item>
      <el-form-item label="Quantity">
        <el-input-number v-model="form.quantity"></el-input-number>
      </el-form-item>
      <el-form-item label="Category">
        <el-select v-model="form.category" placeholder="Select category">
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
export default {
  data() {
    return {
      form: {
        name: 'fsfadsf',
        price: 0,
        quantity: 0,
        category: ''
      },
      categories: [
        {id: 1, name: 'Category 1'},
        {id: 2, name: 'Category 2'},
        {id: 3, name: 'Category 3'}
      ]
    };
  },
  methods: {
    updateProduct() {
      // Xử lý logic cập nhật sản phẩm
      console.log('Form data:', this.form);
    }
  },
  created() {

  }
}
</script>
<style scoped>

</style>