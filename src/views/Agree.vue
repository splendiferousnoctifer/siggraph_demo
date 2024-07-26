<template>
  <div class="container">
    <h1>Privacy Statement</h1>
    <p>We are collecting your demographic and interacion data. We will not share your data with any third party. The data is used to train a machine learning model for detecting interaction  and gestures on textiles.

      <br><br> By clicking "I Agree" you are agreeing to our privacy statement.
    </p>
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

<style scoped>
  p {
    text-align: justify;
    width: 40%;
    margin-bottom: 50px;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
</style>