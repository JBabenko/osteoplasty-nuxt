<template>
  <form>
    <div class="form-group">
      <label for="brand">Бренд</label>
      <input v-model="brand" type="text" class="form-control" id="brand">
    </div>
    <div class="form-group">
      <label for="currency">Валюта</label>
      <input v-model="currency" type="text" class="form-control" id="currency">
    </div>
    <div class="form-group">
      <label for="name">Название</label>
      <input v-model="name" type="text" class="form-control" id="name">
    </div>
    <div class="form-group">
      <label for="type">Тип</label>
      <input v-model="type" type="text" class="form-control" id="type">
    </div>
    <div class="form-group">
      <label for="unit">Единицы измерения</label>
      <input v-model="unit" type="text" class="form-control" id="unit">
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
      }
    },
    methods: {
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
            params: [
              {
                price: '11',
                volume: '0.5',
                sizes: ['0.25 - 1.0', '1.0 - 2.0']
              }
            ]
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
