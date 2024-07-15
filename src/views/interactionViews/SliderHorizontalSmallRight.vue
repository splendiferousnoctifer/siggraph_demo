<template>
    <div class="drawing-page">
      <h3>Slide right &#8594</h3>
      <div class="canvas-container" ref="canvasContainer">
        <canvas 
          ref="canvas" 
          @mousedown="startDrawing" 
          @mouseup="stopDrawing" 
          @mousemove="draw"
          @touchstart="startDrawing" 
          @touchend="stopDrawing" 
          @touchmove="draw">
        </canvas>
      </div>
      <!-- <el-button class="button" @click="toggleVisibility">Toggle Drawing Visibility</el-button> 
      <el-button class="button" @click="toggleCircles">Toggle Circles</el-button>
      -->
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  import router from '../../router'; // Adjust the path as necessary

  const IMAGE_PATH = '/siggraph_demo/view_shs.png'; // Replace with your image path
  const DRAWING_KEY = 'slider_horizontal_small_right'; // Global variable for the key under which the drawing path will be saved

  export default defineComponent({
    name: 'DrawingPage',
    data() {
      return {
        drawing: false,
        showDrawing: true, // State to toggle drawing visibility
        showCircles: true, // State to toggle circles visibility
        coordinates: [] as { x: number; y: number; timestamp: number }[],
        context: null as CanvasRenderingContext2D | null,
        canvas: null as HTMLCanvasElement | null,
        originalWidth: 800, // Original width of the image
        originalHeight: 600, // Original height of the image
        canvasSize: { width: 0, height: 0 }, // Canvas size to be saved in JSON
      };
    },
    methods: {
      startDrawing(event: MouseEvent | TouchEvent) {
        event.preventDefault();
        this.drawing = true;
        this.recordCoordinates(event);
        if (this.showCircles && this.context && this.canvas) {
          const { x, y } = this.getCoordinates(event);
          this.context.beginPath();
          this.context.arc(x, y, 5, 0, Math.PI * 2);
          this.context.fill();
        }
      },
      stopDrawing(event: MouseEvent | TouchEvent) {
        event.preventDefault();
        this.drawing = false;
        if (this.showCircles && this.context && this.canvas) {
          const lastCoord = this.coordinates[this.coordinates.length - 1];
          this.context.beginPath();
          this.context.arc(lastCoord.x, lastCoord.y, 5, 0, Math.PI * 2);
          this.context.fill();
        }
        this.saveDrawing();
      },
      draw(event: MouseEvent | TouchEvent) {
        if (!this.drawing) return;
        event.preventDefault();
        this.recordCoordinates(event);
        if (this.showDrawing && this.context && this.canvas) {
          const { x, y } = this.getCoordinates(event);
          this.context.lineTo(x, y);
          this.context.stroke();
          this.context.beginPath();
          this.context.moveTo(x, y);
        }
      },
      recordCoordinates(event: MouseEvent | TouchEvent) {
        const { x, y } = this.getCoordinates(event);
        const timestamp = Date.now();
        this.coordinates.push({ x, y, timestamp });
        console.log(this.coordinates); // Log coordinates to console
      },
      getCoordinates(event: MouseEvent | TouchEvent) {
        const rect = this.canvas!.getBoundingClientRect();
        let x, y;
  
        if (event instanceof MouseEvent) {
          x = event.clientX - rect.left;
          y = event.clientY - rect.top;
        } else {
          const touch = event.touches[0];
          x = touch.clientX - rect.left;
          y = touch.clientY - rect.top;
        }
        return { x, y };
      },
      saveDrawing() {
        const formData = JSON.parse(localStorage.getItem('formData') || '{}');
        formData[DRAWING_KEY] = {
          canvasSize: this.canvasSize,
          coordinates: this.coordinates,
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        const nextRoute = router.getRoutes().find(route => route.meta.order === this.$route.meta.order + 1);
        if (nextRoute) {
          this.$router.push({ name: nextRoute.name });
        } else {
          ElMessage.error('No next route found.');
        }    
      },
      toggleVisibility() {
        this.showDrawing = !this.showDrawing;
        if (this.context) {
          this.context.clearRect(0, 0, this.canvas!.width, this.canvas!.height);
          const img = new Image();
          img.src = IMAGE_PATH; // Use global image path
          img.onload = () => {
            this.context!.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height);
          };
        }
      },
      toggleCircles() {
        this.showCircles = !this.showCircles;
      },
      resizeCanvas() {
        const canvas = this.canvas;
        const container = this.$refs.canvasContainer as HTMLDivElement;
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const aspectRatio = this.originalWidth / this.originalHeight;
  
        if (containerWidth / aspectRatio <= containerHeight) {
          canvas!.width = containerWidth;
          canvas!.height = containerWidth / aspectRatio;
        } else {
          canvas!.width = containerHeight * aspectRatio;
          canvas!.height = containerHeight;
        }
  
        // Update canvas size
        this.canvasSize = {
          width: canvas!.width,
          height: canvas!.height,
        };
  
        const context = canvas!.getContext('2d')!;
        this.context = context;
        const img = new Image();
        img.src = IMAGE_PATH; // Use global image path
        img.onload = () => {
          context.drawImage(img, 0, 0, canvas!.width, canvas!.height);
        };
      },
    },
    mounted() {
      this.canvas = this.$refs.canvas as HTMLCanvasElement;
      const img = new Image();
      img.src = IMAGE_PATH; // Use global image path
      img.onload = () => {
        this.originalWidth = img.width;
        this.originalHeight = img.height;
        this.resizeCanvas();
      };

      window.addEventListener('resize', this.resizeCanvas);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.resizeCanvas);
    },
  });
  </script>
  
  <style scoped>
  .drawing-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  .canvas-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  
  canvas {
    border: 1px solid #000;
  }
  </style>
  