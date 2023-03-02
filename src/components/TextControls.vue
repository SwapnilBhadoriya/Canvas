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
    props: {
        textbox: '',
        //   textprops:{}
    },
    data() {
        return {
            textProps: {
                fill: this.textbox.get('fill'),
                fontFamily: this.textbox.get('fontFamily'),
                fontSize: 20,
                fontWeight: 'normal',
                fontStyle: 'normal',
                textDecoration: '',
                backgroundColor: ''
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
                textDecoration: this.textProps.textDecoration,
                backgroundColor: this.textProps.backgroundColor
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
            this.textProps.textDecoration = this.textProps.textDecoration === 'underline' ? false : true;
            this.updateText();
        }
    }
};
</script>
  
<style scoped>

</style>
  