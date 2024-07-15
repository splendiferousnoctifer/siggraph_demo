<template>
    <div class="tap-page">
      <h2>Press each button once</h2>
      <div class="canvas-container" ref="canvasContainer">
        <canvas 
          ref="canvas" 
          @mousedown="handleTap" 
          @touchstart="handleTap">
        </canvas>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  import router from '../../router'; // Adjust the path as necessary

  const IMAGE_PATH = '/siggraph_demo/view_bs.png'; // Replace with your image path
  const DRAWING_KEY = 'button_small'; // Global variable for the key under which the drawing path will be saved

  
  export default defineComponent({
    name: 'TapPage',
    data() {
      return {
        taps: [] as { x: number; y: number }[],
        context: null as CanvasRenderingContext2D | null,
        canvas: null as HTMLCanvasElement | null,
        originalWidth: 800, // Original width of the image
        originalHeight: 600, // Original height of the image
        canvasSize: { width: 0, height: 0 }, // Canvas size to be saved in JSON
      };
    },
    methods: {
      handleTap(event: MouseEvent | TouchEvent) {
        event.preventDefault();
        const { x, y } = this.getCoordinates(event);
        this.taps.push({ x, y });
        this.drawTap(x, y);
        if (this.taps.length === 6) {
          this.saveTaps();
        }
      },
      drawTap(x: number, y: number) {
        if (this.context && this.canvas) {
          this.context.beginPath();
          this.context.arc(x, y, 5, 0, Math.PI * 2);
          this.context.fill();
        }
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
      saveTaps() {
        const formData = JSON.parse(localStorage.getItem('formData') || '{}');
        formData[DRAWING_KEY] = {
          canvasSize: this.canvasSize,
          taps: this.taps,
        };
        localStorage.setItem('formData', JSON.stringify(formData));
        const nextRoute = router.getRoutes().find(route => route.meta.order === this.$route.meta.order + 1);
        if (nextRoute) {
          this.$router.push({ name: nextRoute.name });
        } else {
          ElMessage.error('No next route found.');
        } 
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
  .tap-page {
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
  