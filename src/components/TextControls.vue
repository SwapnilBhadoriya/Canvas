<template>
    <div class="container d-flex justify-content-center flex-column">
        <h2>Text Controls</h2>
        <input type="color" v-model="textProps.fill" @input="updateText" />
        <select v-model="textProps.fontFamily" @change="updateText">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
        </select>
        <input type="number" v-model="textProps.fontSize" @input="updateText" />
        <div class="d-flex flex-row">
            <button class='btn btn-dark m-1' @click="toggleBold">B</button>
            <button class='btn btn-dark m-1' @click="toggleItalic">I</button>
            <button class='btn btn-dark m-1' @click="toggleUnderline">U</button>
        </div>

        <input type="color" v-model="textProps.backgroundColor" @input="updateText" />

    </div>
</template>
  
<script>
import { fabric } from 'fabric';

export default {
    mounted: function () {
        this.updateText();
    },
    props: {
        textbox: '',
    },
    data() {
        return {
            textProps: {
                fill: this.textbox.get('fill'),
                fontFamily: this.textbox.get('fontFamily'),
                fontSize: this.textbox.get('fontSize'),
                fontWeight: this.textbox.get('fontWeight'),
                fontStyle: this.textbox.get('fontStyle'),
                underline: this.textbox.get('underline'),
                backgroundColor: this.textbox.get('backgroundColor'),
                zIndex: 2
            }
        };
    },
    methods: {
        updateText() {
            this.textbox.set({
                fill: this.textProps.fill,
                fontFamily: this.textProps.fontFamily,
                fontSize: parseInt(this.textProps.fontSize),
                fontWeight: this.textProps.fontWeight,
                fontStyle: this.textProps.fontStyle,
                underline: this.textProps.underline,
                backgroundColor: this.textProps.backgroundColor,
                zIndex: this.zIndex
            });
            this.textbox.canvas.renderAll();
        },
        toggleBold() {
            this.textProps.fontWeight = this.textProps.fontWeight === 'bold' ? 'normal' : 'bold';
            this.updateText();
        },
        toggleItalic() {
            this.textProps.fontStyle = this.textProps.fontStyle === 'italic' ? 'normal' : 'italic';
            this.updateText();
        },
        toggleUnderline() {
            this.textProps.underline = !this.textProps.underline
            this.updateText();
        },

    }
};
</script>
  
<style scoped></style>
  