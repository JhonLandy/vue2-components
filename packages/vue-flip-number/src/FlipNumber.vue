<template>
  <div
    ref="flipNumber"
    class="vue-flip-number"
  >
    <div
      v-for="(n,index) in nums"
      :key="index"
      class="vue-flip-number-item"
    >
      <Flip :value="n" />
    </div>
  </div>
</template>
<script>
import Flip from './Flip.vue';

export default {
  components: { Flip },
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    minBit: {
      type: [String, Number],
      default: 8,
    },
    flipStyle: {
      type: Object,
      default: () => ({
        width: '30px',
        height: '40px',
        fontSize: '33px',
        color: '#31bacc',
        background: '#31bacc',
      }),
    },
  },
  computed: {
    nums() {
      let result = Array.from(String(this.value));
      const bit = this.minBit - result.length;
      if (bit > 0) {
        const zores = Array(bit).fill(0);
        result = zores.concat(result);
      }
      return result;
    },
  },
  watch: {
    flipStyle: {
      handler() {
        this.setFlipStyle();
      },
      immediate: true,
    },
  },
  methods: {
    /**
         * @description 拆解數字
        */
    splitNumber() {

    },
    /**
         * @description 设置样式
        */
    setFlipStyle() {
      this.$nextTick(() => {
        const el = this.$refs.flipNumber;
        const style = this.flipStyle;
        Object.keys(style).forEach((key) => {
          el.style.setProperty(`--flip-${key}`, style[key]);
        });
      });
    },
  },
};
</script>
<style scoped>
.vue-flip-number {
    display: flex;
}
.vue-flip-number-item {
    display: flex;
    padding-right: 1px
}
</style>
