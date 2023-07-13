<template>
  <div>
    <div class="form-container">
      <el-form ref="productForm" :model="product" label-width="100px" class="form">
        <h2>Update Product</h2>
        <el-form-item label="Name" class="el-form-item__label">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="product.price"></el-input-number>
        </el-form-item>
        <el-form-item label="Quantity">
          <el-input-number v-model="product.quantity"></el-input-number>
        </el-form-item>
        <el-form-item label="Category">
          <el-select v-model="productCategoryId" placeholder="Select Category">
            <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="button-container">
        <el-button type="primary" @click="updateProduct">Update</el-button>
        <el-button type="info" @click="backToHome">Back</el-button>
      </div>
    </div>
    <div class="alert-container">
      <el-message
          v-if="updateSuccess"
          type="success"
          show-icon
          center
          :duration="3000"
          @close="updateSuccess = false"
      >
        Cập nhật thành công
      </el-message>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Swal from 'sweetalert2';


export default {
  data() {
    return {
      productCategoryId: null,
      updateSuccess : false,
    };
  },
  computed: {
    ...mapGetters('productStore', ['categories']),
    ...mapGetters('productStore', ['product']),

  },
  methods: {
    updateProduct() {
      console.log('Update Product:')
      console.log(this.product)
      // Tạo đối tượng payload để gửi đi
      const payload = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
        category: {
          id: this.productCategoryId,
          name: this.categories.find(
              category => category.id === this.productCategoryId
          ).name
        },
        status: true
      }


      this.saveProduct(payload)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công',
              showConfirmButton: false,
              timer: 3000
            });
          })
          .catch(error => {
            console.error("Update error:", error);
            // Xử lý lỗi nếu có
          });
    },
    ...mapActions('productStore', ['showCategories', 'findProductById', 'saveProduct']),
    ...mapMutations('productStore', ['setCategories']),
    backToHome() {
      this.$router.push({name: 'PageHome'})
    }
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
.form-container {
  position: relative; /* Thay đổi position thành relative */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1; /* Thay đổi z-index thành 1 */
  margin-top: 20vh;
}

.form {
  max-width: 500px;
  display: flex;
  flex-direction: column; /* Đổi flex-direction thành column để các thành phần trong form căn chỉnh theo chiều dọc */
}


.alert-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2; /* Thay đổi z-index thành 2 */
  text-align: center;
  width: 100%;
}
</style>