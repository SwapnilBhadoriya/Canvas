<template>
  <div class="canvas-ground">
    <div class="side-bar">
      <button @click="addRectangle">Add Box</button>
      <button @click="addText">Add Text</button>
      <button @click="addLogo">Add Image/Logo</button>
      <button @click="logJson">Save</button>
      <div class="properties">
        <label>Border Width:</label>
        <input type="range" v-model="borderWidth" min="0" max="10" step="1">
        <br>
        <label>Border Color:</label>
        <input type="color" v-model="borderColor">
        <br>
        <label>Fill Color:</label>
        <input type="color" v-model="fillColor">
      </div>

    </div>
    <div class="editor" style="border:1px solid black; margin:0 5px;">
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
<script>
import { fabric } from 'fabric';

export default {
  data: function () {
    return {
      canvas: null,
      rect: null,
      borderWidth: 0,
      borderColor: '#000000',
      fillColor: 'red'
    }
  },
  mounted: function () {
    const canvas = new fabric.Canvas('canvas', { backgroundColor: 'black', height: 800, width: 600 });
    this.canvas = canvas;
    this.canvas.preserveObjectStacking = true;
    this.canvas.renderAll();


  },
  watch: {
    borderWidth() {
      this.updateProperties();
    },
    borderColor() {
      this.updateProperties();
    },
    fillColor() {
      this.updateProperties();
    }
  },
  methods: {
    addRectangle: function () {
      const shapeRect = new fabric.Rect({ width: 100, height: 20, fill: this.fillColor,zIndex:1 ,evented:true});;
      this.canvas.add(shapeRect);
      this.rect = shapeRect;

    },
    addText: function () {
      var text = new fabric.Text('Argusoft', { left: 100, top: 100, fill: 'white',zIndex:2 });
      this.canvas.add(text);
    },
    addLogo: function () {

    },
    logJson:function(){
      const json = this.canvas.toJSON();
      console.log(json);
    },
    updateProperties() {
      this.rect.set({
        borderWidth: this.borderWidth,
        stroke: this.borderColor,
        fill: this.fillColor
      });
      this.canvas.renderAll();
    }
  }
}
</script>

<style scoped>
.canvas-ground {
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;

}

.side-bar {
  display: flex;
  flex-direction: column;
  border: 2px solid plum;
  padding: 10px;
}
</style>


