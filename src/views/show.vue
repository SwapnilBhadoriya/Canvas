<template>
    <div>
        <canvas id="canvas1"></canvas>
        <!-- <button v-on:click="logPrint">Print</button> -->
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
            var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
            var pdf = new jsPDF({ format: [212, 159] });

            pdf.addImage(imgData, 'JPEG', 0, 0);
            pdf.save("invoice.pdf");
        }
    },
    mounted() {
        // console.log(this.json.objects)
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