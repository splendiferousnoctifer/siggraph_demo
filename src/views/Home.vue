<template>
  <div class="container">
    <h1>Welcome to TexEdge!</h1>
    <p>
      In the following, you will interact with Textile Sensor Mockups by swiping and pressing as instructed. Each page features a different interaction, and you will be told what to do at the top of the page. Read the instructions carefully and follow them. <br>
    </p>
    <div class="image-grid">
      <div class="grid-item"><img src="/view_bl.png" alt="Image 1"></div>
      <div class="grid-item"><img src="/view_shl.png" alt="Image 2"></div>
      <div class="grid-item"><img src="/view_svs.png" alt="Image 4"></div>
      <div class="grid-item"><img src="/view_srl.png" alt="Image 3"></div>
    </div>
    <button class="button" @click="agree">Continue</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
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
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  margin: 20px;
  width: 70%; /* Adjusts the grid to be 80% of the page width */
  margin-bottom: 50px;
}

.grid-item img {
  width: 100%; /* Makes the image take up the full width of its grid item */
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

.button {
  background-color: #6200ea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #3700b3;
}
</style>