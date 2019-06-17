<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3">
          <ul>
            <li v-for="brand in products" :key="brand.id">
              {{brand.brand}}
              <ul class="items-list" v-if="Object.keys(brand.items).length != 0">
                <li v-for="item in brand.items" :key="item.id">
                  {{item.name}}
                </li>
              </ul>
            </li>
          </ul>

        </div>
        <div class="col-9">
          <add-product :products="products" :refProducts="refProducts"></add-product>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  import AddProduct from '@/components/admin/AddProduct'
  export default {
    /* async fetch({
      store
    }) {
      if (store.getters['products/products'].length === 0) {
        await store.dispatch('products/fetch');
      }
    }, */
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
      }
    },
    components: {
      AddProduct
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/bootstrap-css/bootstrap.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-grid.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-reboot.min.css';

  .items-list {
    margin-left: 20px;
  }

</style>
