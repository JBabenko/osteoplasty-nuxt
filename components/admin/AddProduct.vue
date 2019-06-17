<template>
  <form>
    <div class="form-group">
      <label for="brand">Бренд</label>
      <select v-model="brand" class="form-control" id="brand">
        <option v-for="brand in products" :key="brand.brand" :value="brand.brand">{{brand.brand}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="name">Название</label>
      <input v-model="name" type="text" class="form-control" id="name">
    </div>
    <div class="form-group">
      <label for="type">Тип</label>
      <select v-model="type" class="form-control" id="type">
        <option value="bone">Кость</option>
        <option value="membrane">Мембрана</option>
        <option value="block">Блок</option>
      </select>
    </div>
    <div class="form-group">
      <label for="unit">Единицы измерения</label>
      <input v-model="unit" type="text" class="form-control" id="unit">
    </div>
    <div class="container">
      <div class="row">
        <add-product-params @params="setParams"></add-product-params>
      </div>
    </div>
    <div class="form-group">
      <label for="img">Изображение</label>
      <input v-model="img" type="text" class="form-control" id="img">
    </div>
    <div @click="addProduct()">Добавить</div>
  </form>

</template>

<script>
  import * as firebase from 'firebase'
  import AddProductParams from '@/components/admin/AddProductParams'
  export default {
    props: ['products', 'refProducts'],
    data() {
      return {
        brand: '',
        currency: '',
        name: '',
        type: '',
        unit: '',
        img: '',
        params: []
      }
    },
    components: {
      AddProductParams
    },
    methods: {
      setParams(params) {
        this.params = params;
      },
      addProduct() {
        let brandKey = null;
        const brand = this.brand
        this.refProducts.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            if (childData.brand === brand) {
              brandKey = childKey;
            }
          });
        });
        if (brandKey) {
          this.refProducts.child(brandKey).child('items').push({
            name: this.name,
            previewImage: this.img,
            type: this.type,
            unit: this.unit,
            params: this.params
          });
        } else {
          alert('Нет такого бренда');
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/bootstrap-css/bootstrap.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-grid.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-reboot.min.css';

</style>
