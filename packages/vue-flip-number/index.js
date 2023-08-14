import FlipNumber from './src/FlipNumber.vue';

export default Object(FlipNumber, {
  install(Vue) {
    if (!Vue) {
      // eslint-disable-next-line no-param-reassign
      Vue = window.Vue;
    }
    Vue.component('VueFlipNumber', FlipNumber);
  },
});
