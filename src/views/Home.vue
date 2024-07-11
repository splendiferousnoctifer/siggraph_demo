<template>
  <div>
    <h1>Privacy Statement</h1>
    <p>We use your data to improve our service...</p>
    <button class="button" @click="agree">I Agree</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  methods: {
    agree() {
      this.$router.push('/form');
    },
  },
});
</script>
