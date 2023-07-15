<template>
  <el-dialog :visible="dialogVisible" @update:visible="updateDialogVisible" width="50%">
    <div class="form-container">
      <el-form ref="productForm" :model="product" label-width="100px" class="form">
        <h2>Update Product</h2>
        <el-form-item label="Name" class="el-form-item__label">
          <el-input v-model="product.name"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input-number v-model="product.price"></el-input-number >
        </el-form-item>
        <el-form-item label="Quantity">
          <el-input-number v-model="product.quantity"></el-input-number>
        </el-form-item>
        <el-form-item label="Category" prop="category">
          <el-select v-model="product.category.name" placeholder="Select Category">
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
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  props: {
    showDialog: {
      type: Boolean,
      required: true
    },
    idProduct: {
      type:Number,
    }
  },
  data() {
    return {
      dialogVisible: false,

    };
  },
  computed: {
    ...mapGetters('productStore', ['categories']),
    ...mapGetters('productStore', ['product']),
  },
  watch: {
    showDialog(newVal) {
      this.dialogVisible = newVal;

    },
    idProduct(newVal) {
      if (newVal !== null) {
        this.findProductById(newVal);
      }
    },
  },
  methods: {
    ...mapActions('productStore', ['showCategories', 'findProductById', 'saveProduct']),
    ...mapMutations('productStore', ['setCategories']),
    updateProduct() {
      const selectedCategory = this.categories.find(category => category.id === this.product.category.name);
      const payload = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
        category: {
          id: selectedCategory.id
        },
        status: true
      }
      this.saveProduct(payload).then(() => {
        this.$emit('updateProductData', this.product);
        this.$emit('update:showDialog', false);
      });
    },
    closeDialog() {
      this.dialogVisible = false;
      this.$emit('update:showDialog', false);
    },
    updateDialogVisible(newVal) {
      this.dialogVisible = newVal;
      this.$emit('update:showDialog', newVal);
    }
  },
  mounted() {
    if (this.idProduct!=null){
      this.findProductById(this.idProduct)
    }
    this.showCategories()
  }
};
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
</style>
