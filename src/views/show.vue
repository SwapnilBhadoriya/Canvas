<template>
    <div>
        <canvas id="canvas1"></canvas>
        <button v-on:click="logPrint">Print</button>
    </div>
</template>

<script>
import { fabric } from "fabric";
import { jsPDF } from "jspdf";

// Default export is a4 paper, portrait, using millimeters for units

export default {
    props: { json: '' },
    data() {
        return {
            canvas: null,
        }
    },
    methods: {
        logPrint() {
            const stage = this.json
            var pdf = new jsPDF('l', 'px', [this.json.width, this.json.height]);
            pdf.setTextColor('#000000');
            // first add texts

            // this.json.objects.find('Text').forEach((text) => {
            //     const size = text.fontSize() / 0.75; // convert pixels to points
            //     pdf.setFontSize(size);
            //     pdf.text(text.text(), text.x(), text.y(), {
            //         baseline: 'top',
            //         angle: -text.getAbsoluteRotation(),
            //     });
            // });

            // then put image on top of texts (so texts are not visible)
            pdf.addImage(
                stage.toDataURL({ pixelRatio: 2 }),
                0,
                0,
                stage.width(),
                stage.height()
            );

            pdf.save('canvas.pdf');
        }
    },
    mounted() {
        console.log(this.json.objects)
        this.json.objects.forEach(element => {
            return element['selectable'] = false
        });
        // console.log(this.json.objects)
        const canvas = new fabric.Canvas("canvas1",
            // this.json
            {
                backgroundColor: "white",
                height: 800,
                width: 600,
                interactive: false,
            }
        );
        this.canvas = canvas
        this.canvas.loadFromJSON(JSON.stringify(this.json))
    }
}

</script>