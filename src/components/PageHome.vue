<template>
  <div>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
      <el-table-column prop="category.name" label="Category"></el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateFormProduct(scope.row.id)">Edit</el-button>
          <el-button type="danger" size="mini" @click="deleteProduct(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters("productStore", ["products"]),

  },
  methods: {
    ...mapMutations('productStore',['setProducts']),
    ...mapActions('productStore', ['showAllProduct']),
    updateFormProduct(id) {
      this.$router.push(`/update/${id}`)
    },
    deleteProduct() {

    }
  },
  mounted() {
    this.showAllProduct()
  },
  // created() {
  //   this.showAllProduct()
  // }
}
</script>
<style scoped>

</style>