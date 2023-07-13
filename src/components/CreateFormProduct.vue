<template>
  <div>
    <div>
      <div class="form-container">
        <el-form ref="productForm" :model="product" label-width="100px" class="form">
          <h2>Create</h2>
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
            <el-select v-model="selectedCategoryId" placeholder="Select Category" @change="updateCategory">
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
          <el-button type="primary" @click="createProduct">Create</el-button>
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
          Lưu thành công
        </el-message>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Swal from "sweetalert2";
export default {
    data(){
      return{
        product:{
          name:"",
          price: 0,
          quantity: 0,
          category: null
        },
        selectedCategoryId: null,
        updateSuccess: false
      }
    },
    computed:{
      ...mapGetters('productStore',['categories'])
    },
    methods:{
      ...mapMutations('productStore', ['setCategories']),
      ...mapActions('productStore', ['showCategories','saveProduct']),
      backToHome() {
        this.$router.push({name:'PageHome'})
      },
      updateCategory() {
        const selectedCategory = this.categories.find(category => category.id === this.selectedCategoryId);
        this.product.category = selectedCategory;
      },
      createProduct() {
        console.log('New Product:')
        console.log(this.product)
        const categoryId = this.product.category.id;
        const newProduct = {
          ...this.product,
          category: {
            id: categoryId,
            name: this.categories.find(category => category.id === categoryId)?.name // Lấy tên category từ danh sách categories
          },
          status: true
        };
        this.saveProduct(newProduct)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Cập nhật thành công',
                showConfirmButton: false,
                timer: 1500
              });
            })
            .catch(error => {
              console.error("Update error:", error);
              // Xử lý lỗi nếu có
            });
      }
    },
    created(){
      this.showCategories()
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