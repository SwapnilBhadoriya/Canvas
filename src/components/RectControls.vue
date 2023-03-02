<template>
    <div class="container d-flex justify-content-center flex-column">
        <h2>Rectangle Controls</h2>
        <input type="color" v-model="rectProps.fill" @input="updateRect" />
        <input type="color" v-model="rectProps.stroke" @input="updateRect" />
        <input type="number" v-model="rectProps.strokeWidth" @input="updateRect" />
    </div>
</template>
  
<script>
import { fabric } from 'fabric';

export default {
    props: {
        rectangle: '',
    },
    data() {
        return {
            rectProps: {
                fill: this.rectangle.get('fill'),
                stroke: this.rectangle.get('stroke'),
                strokeWidth: this.rectangle.get('strokeWidth'),
            }
        };
    },
    methods: {
        updateRect() {
            this.rectangle.set({
                fill: this.rectProps.fill,
                stroke: this.rectProps.stroke,
                strokeWidth: parseInt(this.rectProps.strokeWidth),
            });
            this.rectangle.canvas.renderAll();
        },
    }
};
</script>
  
<style scoped>

</style>
