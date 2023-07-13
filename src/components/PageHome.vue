<template>
  <div>
    <NavPage/>
    <h2>List Product</h2>
    <el-table :data="products" style="width: 100%">
      <el-table-column type="index" label="STT"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="quantity" label="Quantity"></el-table-column>
      <el-table-column prop="category.name" label="Category"></el-table-column>
      <el-table-column label="Actions">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateFormProduct(scope.row.id)">Edit</el-button>
          <el-button type="danger" size="mini" @click="deleteProduct(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import NavPage from "@/components/layout/NavPage";
import Swal from 'sweetalert2';

export default {
  components: {NavPage},
  computed: {
    ...mapGetters("productStore", ["products"]),

  },
  methods: {
    ...mapMutations('productStore', ['setProducts', 'setDeleteProduct']),
    ...mapActions('productStore', ['showAllProduct', 'deleteProduct']),
    updateFormProduct(id) {
      this.$router.push(`/update/${id}`)
    },
    deleteProduct(id) {
      Swal.fire({
        title: 'Xác nhận',
        text: 'Bạn có chắc chắn muốn xóa?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('productStore/deleteProduct', id).then(() => {
            this.$store.commit('productStore/setDeleteProduct', id); // Gọi mutation setDeleteProduct để xóa sản phẩm khỏi danh sách
            Swal.fire('Đã xóa!', 'Dữ liệu đã được xóa.', 'success');
          }).catch((error) => {
            console.error('Delete error:', error);
            Swal.fire('Lỗi', 'Đã xảy ra lỗi khi xóa dữ liệu.', 'error');
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Đã hủy', 'Dữ liệu không bị xóa.', 'info');
        }
      });
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