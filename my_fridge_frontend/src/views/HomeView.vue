<template>
  <div>
    <h1>My Home</h1>
    <QuaggaBarcodeScanner @scanned-ean="onScannedEan" />
    <div>{{ checkedItemResponse }}</div>
  </div>
</template>

<script>
import api from '../api';
import QuaggaBarcodeScanner from '../components/QuaggaBarcodeScanner.vue';
export default {
  name: 'HomeView',
  data() {
    return {
      lastScannedEan: null,
      checkedItemResponse: null
    }
  },
  components: {
    QuaggaBarcodeScanner
  },
  watch: {
    lastScannedEan: {
      async handler(newEan) {
        if (newEan != null) {
          const data = await api.checkItem(newEan);
          this.checkedItemResponse = data;
        }
      },
      immediate: true // Run on initial value as well
    }
  },
  methods: {
    onScannedEan(ean) {
      this.lastScannedEan = ean;
    }
  }
}
</script>

<style></style>