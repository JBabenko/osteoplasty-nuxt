<template>
  <nav class="top-menu">
    <ul class="menu">
      <nuxt-link tag="li" to="/" class="menu__item" exact active-class="active">
        <a class="menu__link">Home</a>
      </nuxt-link>
      <nuxt-link tag="li" to="/delivery" class="menu__item" exact active-class="active">
        <a class="menu__link">Delivery</a>
      </nuxt-link>
      <nuxt-link tag="li" to="/contacts" class="menu__item" exact active-class="active">
        <a class="menu__link">Contacts</a>
      </nuxt-link>
    </ul>
  </nav>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
  .top-menu {
    left: calc((100% - 80px) * -1);
    position: absolute;
  }
  .menu {
    display: flex;
    &__item {
      position: relative;
      margin-right: 14px;
      cursor: pointer;
      &.active:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        border-radius: 2px;
        background: $primary;
      }
    }
    &__link {
      display: block;
      padding: 4px;
      padding-bottom: 8px;
    }
  }
</style>
