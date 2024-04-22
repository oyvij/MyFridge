<template>
  <div id="interactive">
    <div id="barcode-scanner"></div>
    <div id="scan-box"></div>
  </div>
</template>

<script>
import Quagga from 'quagga';

export default {
  name: 'QuaggaBarcodeScanner',
  mounted() {
    this.initializeScanner();
  },
  methods: {
    initializeScanner() {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#barcode-scanner'), // Use Vue ref instead of document.querySelector
          constraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment"
          },
        },
        decoder: {
          readers: ["ean_reader"]
        },
      }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start(); // Start scanning when initialized without errors
      });

      Quagga.onDetected((result) => {
        const lastScannedCode = result.codeResult.code; // Store the scanned code
        this.$emit('scanned-ean', lastScannedCode);
      });
    }
  },
  beforeUnmount() {
    Quagga.stop(); // Stop Quagga when the component is unmounted
  }
}
</script>

<style>
#interactive {
  position: relative;
  width: 100%;
  /* Full width of the container */
  height: 0;
  padding-bottom: 75%;
  /* Adjust this based on the aspect ratio of the video stream */
  background: #000;
}

#barcode-scanner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#barcode-scanner video {
  width: 100%;
  height: 100%;
}

#scan-box {
  position: absolute;
  top: 25%;
  /* Adjust these values to position the scan box appropriately */
  left: 25%;
  width: 50%;
  height: 50%;
  border: 2px solid red;
  box-sizing: border-box;
}
</style>
