<template>
  <div class="params">
    <div class="form-group">
      <label for="volume">Объем/размер</label>
      <input v-model="volume" type="text" class="form-control" id="volume">
    </div>
    <div class="form-group">
      <label for="price">Цена</label>
      <input v-model="price" type="text" class="form-control" id="price">
    </div>
    <div class="form-group">
      <label for="size">Размеры</label>
      <input v-model="size" type="text" class="form-control" id="size">
      <div @click="addSize()">Добавить размер</div>
    </div>
    <span v-for="size in sizes" :key="size">{{size}}</span>
    <div @click="addParam()">Добавить параметр</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        price: '',
        volume: '',
        sizes: [],
        size: '',
        params: []
      }
    },
    methods: {
      addSize() {
        if (this.size.length) {
          this.sizes.push(this.size);
        }
      },
      addParam() {
        if (this.price.length && this.volume.length) {
          const param = {
            price: this.price,
            volume: this.volume,
            sizes: this.sizes
          };
          this.params.push(param);
        }
      }
    },
    watch: {
      params() {
        this.$emit('params', this.params);
      }
    }
  }

</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
/*   @import '@/assets/styles/bootstrap-css/bootstrap.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-grid.min.css';
  @import '@/assets/styles/bootstrap-css/bootstrap-reboot.min.css'; */

  .params {
    display: flex;
    justify-content: space-between;
  }
  .form-group {
    margin-bottom: 15px;
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

</style>
