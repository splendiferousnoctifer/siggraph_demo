<template>
  <div>
    <h1>Thank You!</h1>
    <p>Your data has been saved.</p>
    <el-button type="primary" @click="downloadData" color="#6200ea">Finish</el-button>
    <div v-if="warnings.length > 0" class="warnings">
      <p v-for="(warning, index) in warnings" :key="index">
        {{ warning }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FinalPage',
  data() {
    return {
      summary: null as any,
      warnings: [] as string[],
    };
  },
  methods: {
    createSummary(data) {
      const summary = {};
      for (const key in data) {
        if (data[key].coordinates) {
          summary[key] = {
            type: 'slider',
            count: data[key].coordinates.length,
            summary: `Slider data with ${data[key].coordinates.length} coordinates`
          };
          if (data[key].coordinates.length < 6) {
            this.warnings.push(`Warning: ${key} has less than 6 coordinates.`);
          }
        } else if (data[key].taps) {
          summary[key] = {
            type: 'button',
            count: data[key].taps.length,
            summary: `Button data with ${data[key].taps.length} taps`
          };
          if (data[key].taps.length < 6) {
            this.warnings.push(`Warning: ${key} has less than 6 taps.`);
          }
        } else {
          summary[key] = {
            type: 'info',
            value: data[key],
            summary: `Info data with value: ${data[key]}`
          };
        }
      }
      return summary;
    },
    downloadData() {
      const data = localStorage.getItem('formData');
      if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        // Generate the dynamic file name based on current date and time
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;
        const fileName = `date_${timestamp}.json`;

        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        console.error('No data found in localStorage');
      }
    },
  },
  mounted() {
    const data = localStorage.getItem('formData');
    if (data) {
      const jsonData = JSON.parse(data);
      this.summary = this.createSummary(jsonData);
    } else {
      console.error('No data found in localStorage');
    }
  },
});
</script>

<style scoped>
.warnings {
  color: lightgray;
  font-size: 12px;
  margin-top: 10px;
}
.warnings h2 {
  font-size: 14px;
}
</style>
