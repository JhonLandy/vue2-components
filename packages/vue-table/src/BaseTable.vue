<template>
  <section v-loading="loading">
    <section class="toolbar">
      <slot name="toolbar" />
    </section>
    <el-table :data="{}" />
  </section>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
};
</script>
