<template>
  <ul>
    <li v-for="brand in products" :key="brand.id" :data-key="getBrandKey(brand)">
      {{brand.brand}}
      <ul class="items-list" v-if="Object.keys(brand.items).length != 0">
        <li v-for="item in brand.items" :key="item.id" :data-key="getItemKey(item)">
          {{item.name}}
          <font-awesome-icon
            class=""
            icon="times-circle"
            @click="removeProduct(item)"
          />
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    props: ['products', 'refProducts'],
    methods: {
      getBrandKey(brand) {
        let key = null;
        this.refProducts.once('value', function(snapshot) {
          snapshot.forEach(function(snap) {
            const childKey = snap.key;
            const childData = snap.val();
            if (childData.brand === brand.brand) {
              key = childKey;
            }
          });
        });
        return key;
      },
      getItemKey(item) {
        let key = null;
        this.refProducts.once('value', function(snapshot) {
          snapshot.forEach(function(snap) {
            const items = snap.val().items;
            for (let el in items) {
              if (items[el].name === item.name) {
                key = el;
              }
            }
          });
        });
        console.log(key);
        return key;
      },
      removeProduct(item) {
        console.log(item);
        /* let brandKey = null;
        const brand = this.brand
        this.refProducts.once('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            if (childData.brand === brand) {
              brandKey = childKey;
            }
          });
        }); */
      }
    },
    computed: {

    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
  .items-list {
    margin-left: 20px;
  }
</style>
