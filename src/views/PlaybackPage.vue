<template>
  <div class="playback-page">
    <h1>Playback Drawing</h1>
    <input type="file" @change="handleFileUpload" accept=".json" />
    <el-select v-model="selectedDataType" @change="loadSelectedData" placeholder="Select Data Type" v-if="dataTypes.length > 0">
      <el-option
        v-for="item in dataTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <div v-if="!hasData && selectedDataType">
      <p><strong>Warning:</strong> No data available for this selection.</p>
    </div>
    <div v-if="selectedDataType === 'age' || selectedDataType === 'gender' || selectedDataType === 'handedness'">
      <p><strong>{{ selectedDataType.charAt(0).toUpperCase() + selectedDataType.slice(1) }}:</strong> {{ drawingData[selectedDataType] }}</p>
    </div>
    <div class="canvas-container" ref="canvasContainer" v-if="canvasVisible">
      <canvas ref="canvas"></canvas>
    </div>
    <el-button @click="startPlayback" v-if="canvasVisible && hasData">Start Playback</el-button>
    <el-button @click="clearCanvas" v-if="canvasVisible && hasData">Clear Canvas</el-button>
    <div class="data-sheet" v-if="canvasVisible && hasData">
      <p><strong>Total Interaction Length:</strong> {{ totalInteractionLength }} ms</p>
      <p><strong>Total Points Drawn:</strong> {{ totalPoints }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PlaybackPage',
  data() {
    return {
      drawingData: null as any,
      selectedDataType: '',
      canvasVisible: false,
      context: null as CanvasRenderingContext2D | null,
      canvas: null as HTMLCanvasElement | null,
      playbackInterval: null as any,
      dataTypes: [] as { label: string, value: string }[],
      totalInteractionLength: 0,
      totalPoints: 0,
      hasData: false,
    };
  },
  methods: {
    handleFileUpload(event: Event) {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            this.drawingData = JSON.parse(e.target.result as string);
            this.populateDataTypes();
          }
        };
        reader.readAsText(file);
      }
    },
    populateDataTypes() {
      this.dataTypes = Object.keys(this.drawingData).map(key => ({ label: key, value: key }));
    },
    setupCanvas() {
      this.$nextTick(() => {
        this.canvas = this.$refs.canvas as HTMLCanvasElement;
        if (this.canvas) {
          this.context = this.canvas.getContext('2d');
  
          // Set canvas size
          const canvasSize = this.drawingData[this.selectedDataType].canvasSize;
          const canvasWidth = window.innerWidth * 0.3;
          const scale = canvasWidth / canvasSize.width;
          this.canvas.width = canvasWidth;
          this.canvas.height = canvasSize.height * scale;
        } else {
          console.error('Canvas element is not available.');
        }
      });
    },
    loadSelectedData() {
      if (!this.selectedDataType || !this.drawingData[this.selectedDataType]) {
        console.error('Invalid data type selected or data not found.');
        this.hasData = false;
        this.canvasVisible = false;
        return;
      }
      this.hasData = true;
      if (['age', 'gender', 'handedness'].includes(this.selectedDataType)) {
        this.canvasVisible = false;
      } else {
        this.canvasVisible = true;
        this.setupCanvas();
        if (['button_large', 'button_small'].includes(this.selectedDataType)) {
          this.calculateButtonDataSheet();
        } else {
          this.calculateDataSheet();
        }
      }
    },
    startPlayback() {
      if (!this.drawingData || !this.context || !this.canvas) {
        console.error('Missing drawing data or canvas context.');
        return;
      }

      let index = 0;
      const data = this.drawingData[this.selectedDataType];
      const coordinates = data.coordinates || data.taps;

      this.playbackInterval = setInterval(() => {
        if (index < coordinates.length) {
          const { x, y } = coordinates[index];
          const canvasWidth = this.canvas!.width;
          const canvasSize = data.canvasSize;
          const scale = canvasWidth / canvasSize.width;
          this.drawPoint(x * scale, y * scale);
          index++;
        } else {
          clearInterval(this.playbackInterval);
        }
      }, 10); // Adjust the interval for playback speed
    },
    drawPoint(x: number, y: number) {
      if (this.context) {
        this.context.fillStyle = 'black';
        this.context.beginPath();
        this.context.arc(x, y, 2, 0, Math.PI * 2);
        this.context.fill();
      }
    },
    clearCanvas() {
      if (this.context && this.canvas) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    },
    calculateDataSheet() {
      const coordinates = this.drawingData[this.selectedDataType].coordinates;
      if (coordinates.length > 0) {
        const firstTimestamp = coordinates[0].timestamp;
        const lastTimestamp = coordinates[coordinates.length - 1].timestamp;
        this.totalInteractionLength = lastTimestamp - firstTimestamp;
        this.totalPoints = coordinates.length;
      } else {
        this.totalInteractionLength = 0;
        this.totalPoints = 0;
      }
    },
    calculateButtonDataSheet() {
      const taps = this.drawingData[this.selectedDataType].taps;
      this.totalInteractionLength = 'N/A'; // No timestamp for button data
      this.totalPoints = taps.length;
    },
  },
  mounted() {
    // No need to load drawing data on mount since it is uploaded via file
  },
});
</script>

<style scoped>
.playback-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

canvas {
  border: 1px solid #000;
}

.data-sheet {
  margin-top: 20px;
  text-align: center;
}
</style>
