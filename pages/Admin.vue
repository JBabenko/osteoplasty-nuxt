<template>
  <div class="admin">
    <div class="admin-left">
      <production-list :products="products" :refProducts="refProducts"></production-list>


    </div>
    <div class="admin-right">
      <add-product :products="products" :refProducts="refProducts"></add-product>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import AddProduct from '@/components/admin/AddProduct'
  import ProductionList from '@/components/admin/ProductionList'
  export default {
    data() {
      return {
        products: []
      }
    },
    layout: 'empty',
    mounted() {
      this.refProducts.on('value', snap => {
        this.products = snap.val();
      });
    },
    computed: {
      refProducts() {
        return firebase.database().ref().child('products');
      },
    },
    components: {
      AddProduct,
      ProductionList
    }
  }

</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
  /*  @import '@/assets/styles/bootstrap-css/bootstrap.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-grid.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-reboot.min.css'; */

  .admin {
    padding: 0 20px;
    display: flex;

    &-left {
      padding: 20px 15px 20px 0;
      border-right: 1px solid $black
    }

    &-right {
      padding: 20px 0 20px 15px;
      flex-grow: 1;
    }
  }

</style>
