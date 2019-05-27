<template>
  <header class="header">

    <div class="header__main" :class="{'active': isSidebarActive}">
      <app-top-menu></app-top-menu>
      <svg @click="isSidebarActive = !isSidebarActive" class="ham ham2 header__icon" viewBox="0 0 100 100" onclick="this.classList.toggle('active')">
        <path class="line top"
          d="m 70,33 h -40 c -6.5909,0 -7.763966,-4.501509 -7.763966,-7.511428 0,-4.721448 3.376452,-9.583771 13.876919,-9.583771 14.786182,0 11.409257,14.896182 9.596449,21.970818 -1.812808,7.074636 -15.709402,12.124381 -15.709402,12.124381" />
        <path class="line middle" d="m 30,50 h 40" />
        <path class="line bottom"
          d="m 70,67 h -40 c -6.5909,0 -7.763966,4.501509 -7.763966,7.511428 0,4.721448 3.376452,9.583771 13.876919,9.583771 14.786182,0 11.409257,-14.896182 9.596449,-21.970818 -1.812808,-7.074636 -15.709402,-12.124381 -15.709402,-12.124381" />
      </svg>
      <router-link class="header__logo" to="/">
        <img src="../assets/logo.png" alt="">
      </router-link>
      <font-awesome-icon class="header__icon" icon="sign-in-alt" />
    </div>

  </header>
</template>

<script>
  import AppTopMenu from './TopMenu.vue'
  export default {
    data () {
      return {
        isSidebarActive: false,
      }
    },
    components: {
      AppTopMenu,
    }
  }

</script>

<style lang="scss" scoped>
@import '@/assets/styles/main.scss';
  .header {
    border-bottom: 1px solid #b8b8b8;
    overflow: hidden;
    &__main {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background: #fff;
      padding: 0 $field-s;
      transition: transform 0.7s cubic-bezier(0.13, 0.77, 0.49, 1);
      margin: 5px 0;
      &.active {
        transform: translateX(calc(100% - 60px));
      }
    }
    &__logo {
      display: block;
      height: 65%;
      & img {
        height: 100%;
      }
    }
    &__icon {
      font-size: 22px;
      color: $grey;
    }
  }
  .ham {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 800ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: 46px;
    margin-left: -12px;
  }
  .hamRotate.active {
    transform: rotate(45deg);
  }
  .hamRotate180.active {
    transform: rotate(180deg);
  }
  .line {
    fill:none;
    transition: stroke-dasharray 800ms, stroke-dashoffset 800ms;
    stroke: $grey;
    stroke-width:5.5;
    stroke-linecap:round;
  }
  .ham2 .top {
    stroke-dasharray: 40 121;
  }
  .ham2 .bottom {
    stroke-dasharray: 40 121;
  }
  .ham2.active .top {
    stroke-dashoffset: -102px;
  }
  .ham2.active .bottom {
    stroke-dashoffset: -102px;
  }

</style>
