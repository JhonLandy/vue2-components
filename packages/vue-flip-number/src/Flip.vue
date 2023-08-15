<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    ref="vueFlip"
    class="vue-flip"
  >
    <div class="flip-wrapper">
      <div
        ref="flip"
        class="flip-content"
      >
        <b
          class="flip-previous-bottom"
          :data-value="previous"
        />
        <b
          ref="previous"
          class="flip-previous-top animation-flip-previous"
          :data-value="previous"
        />
        <b
          class="flip-value-top"
          :data-value="value"
        />
        <b
          ref="current"
          class="flip-value-bottom animation-flip-current"
          :data-value="value"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VueFlip',
  props: {
    value: {
      type: [Number, String],
      default: '6',
    },
  },
  data() {
    return {
      previous: this.value,
    };
  },
  watch: {
    value: {
      // eslint-disable-next-line no-unused-vars
      handler(_, oldVal) {
        this.previous = oldVal;
        this.runAnimation();
      },
    },
  },
  methods: {
    /**
         * @description 运行动画
        */
    runAnimation() {
      const flipRef = this.$refs.flip;
      flipRef.classList.remove('flip');
      // eslint-disable-next-line no-void
      void flipRef.offsetWidth;
      flipRef.classList.add('flip');
    },
  },
};
</script>
<style lang="scss" scoped>
.vue-flip {
    --width: var(--flip-width, 30px);
    --height:var(--flip-height, 40px);
    --font-size: var(--flip-fontSize,33px);
    --color: var(--flip-color,#31bacc);
    --radius: var(--flip-radius,5px);
    --border:  var(--flip-border, 2px solid black);
    --backgorund:var(--flip-backgorund, black);
    user-select: none;
}
@mixin base-style {
    display: block;
    font-size: var(--font-size);
    color: var(--color);
    border-radius: var(--radius);
    background: var(--backgorund);
}
.flip-wrapper {
    position: relative;
    width: var(--width);
    height: var(--height);
    border-radius: var(--radius);
    background: var(--backgorund);
}
.flip-content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    .flip-value-top {
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        border-bottom: var(--border);
        @include base-style;

    }
    .flip-value-bottom
     {
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 50%;
        @include base-style;
        // color: red;
    }
    .flip-previous-top {
        overflow: hidden;
        position: absolute;
        width: 100%;
        height: 50%;
        box-sizing: border-box;
        border-bottom: var(--border);
        @include base-style;
        // color: yellow;
    }
    .flip-previous-bottom  {
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        @include base-style;
        // color: green;
    }
    .flip-value-top::before {
        position: absolute;
        top: 0;
        display: block;
        content: attr(data-value);
        width: 100%;
        height: 100%;
    }
    .flip-value-bottom::after {
        position: absolute;
        transform: translateY(-50%);
        display: block;
        width: var(--width);
        height: var(--height);
        content: attr(data-value);
    }
    .flip-previous-top::before {
        display: block;
        content: attr(data-value);
        width: var(--width);
        height: var(--height);
    }
    .flip-previous-bottom::before {
        display: block;
        content: attr(data-value);
        width: var(--width);
        height: var(--height);
    }
}
.flip {
    .animation-flip-current {
        transform-origin: center top;
        animation: flip-current 0.6s cubic-bezier(0.37, 0.01, 0.94, 0.35);
        animation-fill-mode: both;
    }
    .animation-flip-previous {
        transform-origin: center bottom;
        animation: flip-previous 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
        animation-fill-mode: both;
    }
}

@keyframes flip-current {
    0% {
        z-index: -1;
        opacity: 0;
        transform: rotateX(90deg);
    }
   50% {
        opacity: 1;
    }
    100% {
        opacity: 1;
        transform: rotateX(0deg);
    }
}
@keyframes flip-previous {
    0% {
        z-index: 1;
        transform: rotateX(360deg)
    }
    0% {
        z-index: 1;
        transform: rotateX(320deg)
    }
    50%, 100% {
        z-index: 1;
        transform: rotateX(270deg)
    }

}
</style>
