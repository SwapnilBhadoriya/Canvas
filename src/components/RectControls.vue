<template>
    <div class="container d-flex justify-content-center flex-column">
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
        <label>Transparent:</label>
        <input type="range" min="0" max="1" step="0.1" v-model="rectProps.transparent" @change="transparent()">
        <label>
            Shape-height:
        </label>
        <input type="number" v-model="rectProps.height" @input="updateRect" />
        <label>
            Shape-width:
        </label>
        <input type="number" v-model="rectProps.width" @input="updateRect" />
        <label>
            Shape-Curve-X:
        </label>
        <input type="number" v-model="rectProps.rx" @input="updateRect" />
        <label>
            Shape-Curve-Y:
        </label>
        <input type="number" v-model="rectProps.ry" @input="updateRect" />
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
                transparent: '',
                rx: this.rectangle.get('rx'),
                ry: this.rectangle.get('ry'),
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
                rx: parseInt(this.rectProps.rx),
                ry: parseInt(this.rectProps.ry)
            });
            this.rectangle.canvas.renderAll();
        },
        hexToRgb(hex) {
            return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
                ;
        },
        transparent() {
            // console.log(this.rectProps.transparent)
            const fill = this.hexToRgb(this.rectProps.fill)
            this.rectangle.set({
                fill: `rgb(` + fill[0] + `, ` + fill[1] + `, ` + fill[2] + `,` + this.rectProps.transparent + `)`,
            });
            this.rectangle.canvas.renderAll();
        },

    }
};
</script>
  
<style scoped></style>
