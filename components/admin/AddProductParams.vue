<template>
  <div class="wrapper">
    <span class="label">Параметры</span>
    <div class="params">
      <div class="params-group">
        <div class="form-group">
          <label for="volume">Объем/размер</label>
          <input v-model="volume" type="text" class="form-control" id="volume">
        </div>
        <div class="form-group">
          <label for="price">Цена</label>
          <input v-model="price" type="text" class="form-control" id="price">
        </div>
      </div>
      <div class="params-group params params-options">
        <div class="form-group">
          <label for="size">Опции</label>
          <div class="input-wrapper">
            <input v-model="size" type="text" id="size" class="input-add">
            <div class="add" @click="addSize()">+</div>
          </div>
        </div>
        <div class="options">
          <div class="options-item" v-for="size in sizes" :key="size">{{size}}
            <font-awesome-icon
              class="options-remove"
              icon="times-circle"
              @click="removeOption(size)"
            />
          </div>
        </div>
      </div>
        <font-awesome-icon
          class="params-add-button"
          icon="plus-square"
          @click="addParam()"
        />
    </div>
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
          this.size = '';
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
          this.price = '';
          this.volume = '';
          this.sizes = [];
        }
      },
      removeOption(size) {
        const index = this.sizes.indexOf(size);
        this.sizes.splice(index, 1);
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

  .wrapper {
    margin-bottom: 25px;
  }
  .params {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid $black;
    padding: 8px 12px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;

    &-group {
      margin-right: 15px;
      height: 100%;
      box-sizing: border-box;
      flex-grow: 1;
    }

    &-options {
      flex-direction: column;
      max-width: 300px;
    }

    &-add-button {
      width: 50px;
      height: 50px;
      cursor: pointer;
      & path {
        color: $primary
      }
    }
  }
  .label {
    margin-bottom: 5px;
    width: 100%;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  .input-wrapper {
    position: relative;
  }
  .input-add {
    padding: 8px 38px 8px 12px;
  }
  .add {
    position: absolute;
    text-align: center;
    line-height: 1;
    right: 0;
    top: 0;
    height: calc(100% - 2px);
    width: 30px;
    font-size: 30px;
    font-weight: 500;
    border: 1px solid $black;
    border-radius: 10px;
    background: $primary;
    cursor: pointer;
  }
  .options {
    display: flex;
    flex-wrap: wrap;
    &-item {
      position: relative;
      padding: 3px;
      font-size: 12px;
      border: 1px solid $black;
      border-radius: 10px;
      margin-right: 15px;
      margin-bottom: 15px;
    }
    &-remove {
      position: absolute;
      top: -5px;
      right: -7px;
      cursor: pointer;
    }
  }
  select, input {
    border: 1px solid $black;
    padding: 8px 12px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
  }

</style>
