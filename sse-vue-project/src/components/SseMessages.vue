<template>
  <div>
    <h1>SSE Messages</h1>
    <div v-if="message" v-html="message"></div>
    <div v-else>Waiting for messages...</div>
  </div>
</template>

<script>
import { SseService } from '../../src/services/sseService';

export default {
  data() {
    return {
      message: null,
      sseService: null,
    };
  },
  created() {
    this.sseService = new SseService();
    this.sseService.connect('http://localhost:3000/sse').subscribe({
      next: (event) => {
        const data = JSON.parse(event.data);
        this.message = `${data.body} <br> Timestamp: ${event.timeStamp}`;
      },
      error: (error) => {
        console.error('SSE error:', error);
      },
    });
  },
  beforeUnmount() {
    if (this.sseService) {
      this.sseService.disconnect();
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>