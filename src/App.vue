<template>
  <div class="canvas-ground">
    <div class="side-bar">
      <button class='btn btn-dark m-1' @click="addText">Add Text</button>
      <button class='btn btn-dark m-1' @click="addRectangle">Add Box</button>
      <!-- <button class='btn btn-dark m-1' @click="addLogo">Add Image/Logo</button>
      <button class='btn btn-dark m-1' @click="logJson">Save</button> -->


    </div>
    <div class="editor m-1 p-1 border border-3 border-primary rounded-2">
      <canvas id="canvas"></canvas>
    </div>
    <div v-if="textbox" class="propertyControls">
      <TextController :textbox="textbox"></TextController>
    </div>
    <div v-if="rectangle">
    <RectController :rectangle="rectangle"></RectController>
    </div>
  </div>
</template>
<script>
import { fabric } from 'fabric';
import TextController from './components/TextControls.vue';
import RectController from './components/RectControls.vue';


export default {
  components: { TextController, RectController },
  computed: {
    textbox: function () {
      return this.textboxId;
    },
    rectangle:function(){
      return this.rectangleId;
    }
  },
  data: function () {
    return {
      canvas: null,
      selectedObject: null,
      textObjects: [],
      rectObjects: [],
      textboxId: '',
      rectangleId: '',

    }
  },
  mounted: function () {
    const canvas = new fabric.Canvas('canvas', { backgroundColor: 'white', height: 800, width: 600 });
    this.canvas = canvas;


    this.canvas.on('mouse:down', (e) => {
      this.textboxId = null;
      this.rectangleId = null;
      if(e.target.type){}
      const selected = e.target;
      this.textboxId = selected;
      console.log(this.textbox)
    });

    this.canvas.preserveObjectStacking = true;

  },
  methods: {
    addRectangle: function () {
      const rectangle = new fabric.Rect({
        fill: '#06538e',
        width: 125,
        height: 125,
      })
      this.rectObjects.push(rectangle);
      this.canvas.add(rectangle);
    },
    addText: function () {
      const text = new fabric.Textbox('Sample Text', {
        left: 100,
        top: 100,
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'black',
        backgroundColor: 'transparent',
        selectable: true,
        id: 'textObj' + this.textObjects.length
      })
      this.textObjects.push(text)
      this.canvas.add(text)
      // console.log(this.textObjects);
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
  border: 5px solid plum;
  padding: 10px;
}
</style>


