<template>
  <div>
    <h1>Privacy Statement</h1>
    <p>We use your data to improve our service...</p>
    <button class="button" @click="agree">I Agree</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router'; // Adjust the path as necessary



export default defineComponent({
  name: 'Home',
  methods: {
    agree() {
      const nextRoute = router.getRoutes().find(route => route.meta.order === this.$route.meta.order + 1);
      if (nextRoute) {
        this.$router.push({ name: nextRoute.name });
      } else {
        ElMessage.error('No next route found.');
      }
    },
  },
});
</script>
