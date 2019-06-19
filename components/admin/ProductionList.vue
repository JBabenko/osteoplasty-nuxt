<template>
  <ul>
    <li v-for="brand in products" :key="brand.id">
      {{brand.brand}}
      <ul class="items-list" v-if="brand.items">
        <nuxt-link v-for="item in brand.items"
                  :key="item.name"
                  tag="li"
                  :to="{
                    name: 'admin-item',
                    params: {item: item.id}
                  }"
                  exact
                  active-class="active">
          <a class="">{{item.name}}</a>
          <font-awesome-icon
            class=""
            icon="times-circle"
            @click="removeProduct(item, brand)"
          />
        </nuxt-link>
      </ul>
    </li>
  </ul>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    props: ['products', 'refProducts'],
    mounted() {
      console.log(this.$store.getters['products/products']);
    },
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
        return key;
      },
      removeProduct(item, brand) {
        if (confirm('Точно удалить ' + item.name + '?')) {
          const itemKey = this.getItemKey(item);
          const brandKey = this.getBrandKey(brand);
          this.refProducts.child(brandKey).child('items/' + itemKey).remove();
        }
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
  .items-list {
    margin-left: 20px;
  }
</style>
