<template>
  <div>
    <h1>Final Page</h1>
    <p>Your data has been saved.</p>
    <el-button type="primary" @click="downloadData" color="#6200ea">Download Data</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FinalPage',
  methods: {
    downloadData() {
      const data = localStorage.getItem('formData');
      if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('No data found in localStorage');
      }
    },
  },
});
</script>

<style scoped>
/* Add any necessary styles here */
</style>
