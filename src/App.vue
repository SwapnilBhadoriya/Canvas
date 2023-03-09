<template>
  <div class="canvas-ground">
    <div class="side-bar">
      <button class="btn btn-dark m-1" @click="addText">Add Text</button>
      <button class="btn btn-dark m-1" @click="addRectangle">Add Box</button>
      <button class="btn btn-dark m-1" @click="addImage">Add Image/Logo</button>
      <button class="btn btn-dark m-1" @click="logJson">Save</button>
    </div>
    <div class="editor m-1 p-1">
      <canvas id="canvas"></canvas>
    </div>
    <div v-if="textbox">
      <TextController
        :canvas="canvas"
        :textbox="textbox"
        :key="textboxId.id"
      ></TextController>
    </div>
    <div v-if="rectangle">
      <RectController
        :canvas="canvas"
        :rectangle="rectangle"
        :key="rectangleId.id"
      ></RectController>
    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import TextController from "./components/TextControls.vue";
import RectController from "./components/RectControls.vue";
import LogoImg from "./assets/logo.png";

export default {
  components: { TextController, RectController },
  data() {
    return {
      canvas: null,
      textObjects: [],
      rectObjects: [],
      textboxId: "",
      rectangleId: "",
    };
  },
  computed: {
    textbox() {
      return this.textboxId;
    },
    rectangle() {
      return this.rectangleId;
    },
  },
  mounted() {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "white",
      height: 800,
      width: 600,
    });
    this.canvas = canvas;

    this.canvas.on("mouse:down", (e) => {
      if (!e.target) {
        this.textboxId = null;
        this.rectangleId = null;
        return;
      }
      if (e.target.type === "rect") {
        this.textboxId = null;
        this.rectangleId = e.target;
      } else if (e.target.type === "textbox") {
        this.rectangleId = null;
        this.textboxId = e.target;
      }
    });
    this.canvas.preserveObjectStacking = true;
    this.canvas.on("selection:cleared", () => {
      this.textboxId = null;
      this.rectangleId = null;
    });
  },
  methods: {
    addRectangle() {
      const rectangle = new fabric.Rect({
        fill: "#06538e",
        width: 125,
        height: 125,
        zIndex: 1,
        id: "rectObj" + this.rectObjects.length,
      });
      this.rectObjects.push(rectangle);
      this.canvas.add(rectangle);
      console.log(rectangle);
    },
    addText() {
      const text = new fabric.Textbox("Sample Text", {
        fontFamily: "Arial",
        fontSize: 24,
        fill: "black",
        backgroundColor: "transparent",
        selectable: true,
        zIndex: 2,
        id: "textObj" + this.textObjects.length,
      });
      this.textObjects.push(text);
      this.canvas.add(text);
    },
    addImage: function () {
      const image = new window.Image();
      image.src = LogoImg;
      image.onload = () => {
        let imgInstance = new fabric.Image(image, {
          left: 0,
          top: 0,
        });
        imgInstance.scaleToWidth(this.canvas.getWidth() / 4);
        this.canvas.add(imgInstance);
      };
    },
    logJson: function () {
      console.log(this.canvas.toJSON());
    },
  },
};
</script>

<style scoped>
.canvas-ground {
  margin: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.side-bar {
  display: flex;
  flex-direction: column;
  border: 1px solid plum;
  border-radius: 25px;
  margin: 5px;

  padding: 20px;
}
</style>
