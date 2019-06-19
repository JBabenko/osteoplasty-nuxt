<template>
  <div>
    <h1 @click="test()">Товар: {{dataItem.name}}</h1>
    <p></p>
  </div>
</template>

<script>
  import * as firebase from 'firebase'
  export default {
    async asyncData ({params}) {
      let dataItem = null;
      const key = params.item;
      await firebase.database().ref().child('products').on('value', snap => {
          snap.forEach(childSnap => {
            if (childSnap.val().items) {
              for (let el in childSnap.val().items) {
                if (el === key) {
                  dataItem = childSnap.val().items[el];
                  return;
                }
              }
            }
            return dataItem;
          });
        });
        return { dataItem }
    },
    data() {
      return {
        item: this.$router.currentRoute.params['item'],
      }
    },
    methods: {
      test() {

      }
    },
    validate ({ params }) {
      // Должен быть числом
      /* return /^\d+$/.test(params.id) */
      return true;
    }
  }
</script>

<style lang="scss" scoped>

</style>
