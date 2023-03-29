<template>
    <div class="container d-flex justify-content-center flex-column">
        <h2>Text Controls</h2>
        <label>Font-Color</label>
        <input type="color" v-model="textProps.fill" @input="updateText" />
        <label>Font- Transparency:</label>
        <input type="range" min="0" max="1" step="0.1" v-model="textProps.filltransparent" @change="transparent('fill')">
        <label>Font-Family</label>
        <select v-model="textProps.fontFamily" @change="updateText">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
        </select>
        <label>Font-Size</label>
        <input type="number" v-model="textProps.fontSize" @input="updateText" />
        <label>Font-Style</label>
        <div class="d-flex flex-row">
            <button class='btn btn-dark m-1' @click="toggleBold">B</button>
            <button class='btn btn-dark m-1' @click="toggleItalic">I</button>
            <button class='btn btn-dark m-1' @click="toggleUnderline">U</button>
        </div>
        <div class="d-flex flex-row">
            <label>Text-Align</label>
            <button class='btn btn-light m-1' @click="align('left')"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" fill="currentColor" class="bi bi-text-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg></button>
            <button class='btn btn-light m-1' @click="align('center')"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" fill="currentColor" class="bi bi-text-center" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg></button>
            <button class='btn btn-light m-1' @click="align('right')"><svg xmlns="http://www.w3.org/2000/svg" width="16"
                    height="16" fill="currentColor" class="bi bi-text-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                </svg></button>
        </div>
        <label>Text-Box Color</label>
        <input type="color" v-model="textProps.backgroundColor" @input="updateText" />
        <label>Box - Transparency:</label>
        <input type="range" min="0" max="1" step="0.1" v-model="textProps.bgtransparent" @change="transparent('bg')">

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
                textAlign: this.textbox.get('textAlign'),
                zIndex: 2,
                bgtransparent: '',
                filltransparent: ''
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
                zIndex: this.textProps.zIndex,
                textAlign: this.textProps.textAlign
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
        align(val) {
            this.textProps.textAlign = val;
            this.updateText();
        },
        hexToRgb(hex) {
            return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                , (m, r, g, b) => '#' + r + r + g + g + b + b)
                .substring(1).match(/.{2}/g)
                .map(x => parseInt(x, 16))
                ;
        },
        transparent(field) {
            if (field === 'bg' && this.textProps.backgroundColor != 'transparent') {
                const fill = this.hexToRgb(this.textProps.backgroundColor)
                this.textbox.set({
                    backgroundColor: `rgb(` + fill[0] + `, ` + fill[1] + `, ` + fill[2] + `,` + this.textProps.bgtransparent + `)`,
                });
            }
            if (field === 'fill') {
                const fill = this.hexToRgb(this.textProps.fill)
                this.textbox.set({
                    fill: `rgb(` + fill[0] + `, ` + fill[1] + `, ` + fill[2] + `,` + this.textProps.filltransparent + `)`,
                });
            }
            this.textbox.canvas.renderAll();
        },
    }
};
</script>
  
<style scoped></style>
  