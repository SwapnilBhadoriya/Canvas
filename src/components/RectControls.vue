<template>
    <div class="container bg-secondary m-1 mt-2 d-flex justify-content-center flex-column">
        <h2>Rectangle Controls</h2>
        <label>
            Border-width:
        </label>
        <input type="number" v-model="rectProps.strokeWidth" @input="updateRect" />
        <label>
            Border-color:
        </label>
        <input type="color" v-model="rectProps.stroke" @input="updateRect" />
        <label>
            Shape-color:
        </label>
        <input type="color" v-model="rectProps.fill" @input="updateRect" />
        <label>
            Shape-height:
        </label>
        <input type="number" v-model="rectProps.height" @input="updateRect" />
        <label>
            Shape-width:
        </label>
        <input type="number" v-model="rectProps.width" @input="updateRect" />
        <button v-on:click="transparent">Transparent</button>



    </div>
</template>
  
<script>
import { fabric } from 'fabric';

export default {
    name: "Rect_Controls",
    props: {
        rectangle: '',
        canvas: ''
    },
    data() {
        return {
            rectProps: {
                fill: this.rectangle.get('fill'),
                stroke: this.rectangle.get('stroke'),
                strokeWidth: this.rectangle.get('strokeWidth'),
                height: this.rectangle.get('height'),
                width: this.rectangle.get('width'),
            }
        };
    },
    methods: {
        updateRect() {
            this.rectangle.set({
                fill: this.rectProps.fill,
                stroke: this.rectProps.stroke,
                strokeWidth: parseInt(this.rectProps.strokeWidth),
                height: parseInt(this.rectProps.height),
                width: parseInt(this.rectProps.width),
            });
            this.rectangle.canvas.renderAll();
        },
        transparent() {
            this.rectangle.set({
                fill: 'transparent',
            });
            this.rectangle.canvas.renderAll();
        }
    }
};
</script>
  
<style scoped></style>
