<template>
  <div>
    <div class="wrapper">
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
      <div class="form-group">
        <label for="img">Изображение</label>
        <input v-model="img" type="text" class="form-control" id="img">
      </div>
    </div>
    <add-product-params @params="setParams"></add-product-params>

    <app-item-params :item="item" :brand="brand.brand" :currency="brand.currency"></app-item-params>
    <button class="add-button" @click="addProduct()">Добавить товар</button>
  </div>

</template>

<script>
  import * as firebase from 'firebase'
  import AddProductParams from '@/components/admin/AddProductParams'
  import AppItemParams from '@/components/ItemParams'
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
      AddProductParams,
      AppItemParams
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
          const newProductKey = this.refProducts.child(brandKey).child('items').push().key;
          this.item.id = newProductKey;
          this.refProducts.child(brandKey).child('items').child(newProductKey).update(this.item);
        } else {
          alert('Нет такого бренда');
        }
      }
    },
    computed: {
      item() {
        return {
          name: this.name.length ? this.name : '{Имя не задано}',
          type: this.type.length ? this.type : 'bone',
          unit: this.unit.length ? this.unit : '{Единицы не заданы}',
          previewImage: this.img.length ? this.img : 'no-photo.png',
          params: this.params.length ? this.params : [{price: '{Цена не задана}', volume: '{Объем не задан}'}]
        }
      }
    }
  }

</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
/*   @import '@/assets/styles/bootstrap-css/bootstrap.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-grid.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-reboot.min.css'; */

  .wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .form-group {
    margin-bottom: 15px;
    margin-right: 10px;
    width: 30%;
    flex-grow: 1;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  select, input {
    border: 1px solid $black;
    padding: 8px 12px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .add-button {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    background: $primary;
    border-radius: 10px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }

</style>
