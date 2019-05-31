<template>
  <figure class="item">
    <div class="item__img">
      <img
        class="item__img-pic"
        :src="getImgUrl(item.previewImage)"
        :alt="item.name"
      >
    </div>
    <h3 class="item__title">{{ item.name }}</h3>
    <div class="item__params">
      <div class="item__param">
        <span v-if="item.type === 'bone'">Объём: </span>
        <span v-if="item.type === 'membrane' || item.type === 'block'">Размер: </span>
        <span v-if="item.params.length > 1" class="select-wrap">
          <select class="item__param_bold" v-model="selectedVolume" @change="onChangeSelectVolume">
            <option
              v-for="(params, index) in item.params"
              :value="params.volume"
              :key="index"
            >
              {{ params.volume }}
            </option>
          </select>
          <font-awesome-icon class="icon icon-select-arrow" icon="caret-down" />
        </span>
        <span class="item__param_bold" v-else>{{ selectedVolume }}</span>
        <span>{{ item.unit }}</span>
      </div>
      <div class="item__param" v-if="itemSizes">
        <span v-if="item.type === 'bone'">Гранулы: </span>
        <span v-if="item.type === 'membrane'">Толщина: </span>
        <span v-if="itemSizes.length > 1" class="select-wrap">
          <select v-model="selectedSize" class="item__param_bold">
            <option
              v-for="(size, index) in itemSizes"
              :value="size"
              :key="index"
            >
              {{ size }}
            </option>
          </select>
          <font-awesome-icon class="icon icon-select-arrow" icon="caret-down" />
        </span>

        <span class="item__param_bold" v-else>{{ selectedSize }}</span>
      </div>

    </div>
    <div class="item__buy">
      <div class="item__buy-price">
          <span class="item__param_bold">
            {{ itemPrice }}
          </span>
          {{ currency }}
      </div>
      <div class="item__buy-button">
        <div class="item__buy-quantity">
          <font-awesome-icon
            class="item__buy-quantity-change item__buy-quantity-plus"
            icon="chevron-up"
            @click="quantity++"
          />
          <input
            type="number"
            class="item__buy-quantity-input"
            v-model="quantity"
          >
          <font-awesome-icon
            class="item__buy-quantity-change item__buy-quantity-minus"
            icon="chevron-down"
            @click="quantity--"
          />
        </div>
        <font-awesome-icon class="icon-cart-plus" icon="cart-plus" />
      </div>
    </div>
  </figure>
</template>

<script>
  export default {
    props: ['item', 'brand', 'currency'],
    data () {
      return {
        selectedVolume: this.item.params[0].volume,
        selectedSize: null,
        quantity: 1
      }
    },
    methods: {
      getImgUrl(img) {
        return require('../assets/images/' + img)
      },
      onChangeSelectVolume() {
        if (this.itemSizes) {
          this.selectedSize = this.itemSizes[0];
        }
      },
    },
    computed: {
      itemPrice() {
        let price;
        this.item.params.forEach(param => {
          if (param.volume === this.selectedVolume) {
            price = param.price;
            return;
          }
        });
        return price;
      },
      itemSizes() {
        let sizes;
        this.item.params.forEach(param => {
          if (param.volume === this.selectedVolume) {
            sizes = param.sizes;
            return;
          }
        });
        return sizes;
      }
    },
    watch: {
      quantity: function(val) {
        if (val < 1) {
          this.quantity = 1;
        }
      }
    },
    mounted() {
      if (this.itemSizes) {
        this.selectedSize = this.itemSizes[0];
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '@/assets/styles/main.scss';
  .item {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid $light-grey;
    border-radius: 14px;
    padding: 10px;
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow: hidden;
    z-index: 1;
    &__img {
      width: 100%;
      text-align: center;
      &-pic {
        border-radius: 14px;
        max-width: 100%;
        height: 145px;
      }
    }
    &__title {
      margin: 5px 0 10px 0;
      text-align: center;
    }
    &__param {
      margin-bottom: 10px;
      &_bold {
        font-weight: 600;
      }
    }
    &__buy {
      position: absolute;
      display: flex;
      justify-content: space-between;
      align-items: center;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      background: $primary-light;
      &-price {
        font-size: 20px;
        padding-left: 10px;
      }
      &-quantity {
        position: absolute;
        display: flex;
        align-items: center;
        left: 0;
        top: 50%;
        transform: translate(-100%, -50%);
        height: 100%;
        &-input {
          width: 40px;
          text-align: center;
          font-size: 20px;
          border: none;
          background: inherit;
        }
        &-change {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 14px;
          color: $light-grey;
        }
        &-plus {
          top: 1px;
        }
        &-minus {
          bottom: 1px;
        }
      }
      &-button {
        position: relative;
        width: 50px;
        height: 100%;
        background: $primary;
      }
    }
  }
  select {
    padding: 0 16px 0 5px;
    color: $black;
  }
  .select-wrap {
    position: relative;
    display: inline-block;
    padding-bottom: 2px;
    border-bottom: 1px solid $primary;
  }
  .icon {
    &-select-arrow {
      pointer-events: none;
      position: absolute;
      top: 2px;
      right: 4px;
      font-size: 13px;
    }
    &-cart-plus {
      position: absolute;
      left: calc(50% - 1px);
      top: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 24px;
    }
  }
</style>
