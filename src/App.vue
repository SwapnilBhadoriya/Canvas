<template>
  <div class="canvas-ground">
    <div class="side-bar">
      <button class="btn btn-dark m-1" @click="show = !show ; box = false; img = false">Text</button>
      <button class="btn btn-dark m-1" @click="show = false; box = !box; img = false">Shape</button>
      <button class="btn btn-dark m-1" @click="img = !img ; box = false; show = false">Image/Logo</button>
      <button class="btn btn-dark m-1" @click="logJson">Save</button>
      <button class="btn btn-dark m-1" @click="logPrint">Print</button>
    </div>
    <div class="side-bar" v-if="show">
      <button class="btn btn-dark m-1" @click="newText">Add Text</button>
      <button class="btn btn-dark m-1" @click="addEntity">Entity Address</button>
      <button class="btn btn-dark m-1" @click="addcustomer">Customer Address</button>
      <button class="btn btn-dark m-1" @click="addinvoice">Invoice Details</button>
      <button class="btn btn-dark m-1" @click="addTable">Table</button>
      <button class="btn btn-dark m-1" @click="addTotal">Total</button>
      <button class="btn btn-dark m-1" @click="addNote">Note</button>
    </div>
    <div class="side-bar" v-if="box">
      <button class="btn btn-dark m-1" @click="addRectangle">Add Rectangle Box</button>
    </div>
    <div class="side-bar" v-if="img">
      <button class="btn btn-dark m-1" @click="addImage(customer_img)">Customer Logo</button>
      <button class="btn btn-dark m-1" @click="addImage(entity_img)">Entity Logo</button>
    </div>
    <div class="editor m-1 p-1">
      <canvas id="canvas"></canvas>
    </div>
    <div>
      <Text-Controller v-if="textbox" :canvas="canvas" :textbox="textbox" :key="textboxId.id"></Text-Controller>
      <Rect-Controller v-if="rectangle" :canvas="canvas" :rectangle="rectangle" :key="rectangleId.id"></Rect-Controller>
      <h2 v-if="image">Image</h2>
      <br>
      <div v-if="this.canvas_controller">
        <h2>CANVAS</h2>
        <label>BackGround-Color : </label>
        <input type="color" v-model="canvasbg" @input="updateCanvas" />
      </div>

      <button class="btn btn-primary m-1" v-if="this.activeObject !== null" height="60" style="margin-left:100px;"
        @click="sendSelectedObjectFront">
        Send Front </button>
      <button class="btn btn-primary m-1" v-if="this.activeObject !== null" height="60" style="margin-left:100px;"
        @click="sendSelectedObjectBack">
        Send Back </button>
      <br>
      <button class="btn btn-danger m-1" v-if="this.activeObject !== null" v-on:click="delt"><svg
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill"
          viewBox="0 0 16 16">
          <path
            d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
        </svg></button>
      <br>

    </div>

    <div>

    </div>
  </div>
</template>

<script>
import { fabric } from "fabric";
import TextController from "./components/TextControls.vue";
import RectController from "./components/RectControls.vue";
import LogoImg from "./assets/logo.png";

export default {
  components: { 'Text-Controller': TextController, 'Rect-Controller': RectController },
  data() {
    return {
      canvas: null,
      textObjects: [],
      rectObjects: [],
      textboxId: "",
      canvasbg: '',
      canvas_controller: true,
      rectangleId: "",
      imageId: "",
      box: false,
      img: false,
      entity_img: 'https://static.ambitionbox.com/assets/v2/images/rs:fit:1280:960:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL2FyZ3Vzb2Z0LmpwZw.png',
      customer_img: 'https://pbs.twimg.com/profile_images/1453818753880190978/HqrrEcrI_400x400.png',
      group: {},
      show: false,
      entity_address: {
        name: "Argusoft",
        address: "Gandhinagar",
        email: "argusoftmain@argusoft.com",
        contact: "9999999999"
      },
      customer_address: {
        name: "Meta",
        address: "US",
        email: "meta@gmail.com",
        contact: "8787878787"
      },
      invoice_details: {
        no: "23451",
        date: "24 Aug 2023",
        due: "15 Sept 2023"
      },
      total: {
        subtotal: "$230",
        tax: "25%",
        total: "$150"
      },
      table: {
        services: ['front-end', 'back-end', 'QA'],
        quantity: ['2', '1', '3'],
        prices: ['3500', '4000', '5000']
      },
      // del: false,
      activeObject: null

    };
  },
  computed: {
    textbox() {
      return this.textboxId;
    },
    rectangle() {
      return this.rectangleId;
    },
    image() {
      return this.imageId;
    }
  },
  mounted() {
    const canvas = new fabric.Canvas("canvas", {
      backgroundColor: "white",
      height: 800,
      width: 600,
    });
    this.canvas = canvas;

    this.canvas.on("mouse:down", (e) => {
      // this.del = true
      // console.log(e.target)

      if (!e.target) {
        this.canvas_controller = true;
        this.textboxId = null;
        this.rectangleId = null;
        this.imageId = null;
        return;
      }
      this.canvas_controller = false;
      this.activeObject = e.target;
      if (e.target.type === "rect") {
        this.textboxId = null;

        this.rectangleId = e.target;
        this.imageId = null;
      } else if (e.target.type === "textbox") {
        // console.log('text-box')
        this.rectangleId = null;
        this.textboxId = e.target;
        this.imageId = null;
      } else if (e.target.type === "image") {
        this.textboxId = null;
        this.rectangleId = null;
        this.imageId = e.target;
      }
    });
    this.canvas.preserveObjectStacking = true;
    this.canvas.on("selection:cleared", () => {
      // this.del = false
      this.textboxId = null;
      this.rectangleId = null;
      this.activeObject = null;
    });
  },
  methods: {
    updateCanvas() {
      this.canvas.set({ backgroundColor: this.canvasbg })
      this.canvas.renderAll()
    },
    addRectangle() {
      this.show = false;
      const rectangle = new fabric.Rect({
        fill: "#06538e",
        width: 525,
        height: 125,
        zIndex: 1,
        stroke: 'black',
        strokeWidth: 3,
        hasBorder: true,
        rx: 0,
        ry: 0,
        id: "rectObj" + this.rectObjects.length,
      });
      this.rectObjects.push(rectangle);
      this.canvas.add(rectangle);
      // console.log(rectangle);
    },

    addEntity() {
      var element = this.entity_address.name + `\n` + this.entity_address.address +
        `\n` + this.entity_address.contact + `\n` + this.entity_address.email;
      this.addText(element, "entity", 230, 25, 370, 'normal')
    },
    addcustomer() {
      var element = this.customer_address.name + `\n` + this.customer_address.address +
        `\n` + this.customer_address.contact + `\n` + this.customer_address.email;
      this.addText(element, "customer", 230, 120, 40, 'normal')
    },

    addinvoice() {
      var element = `INVOICE NO. : ` + this.invoice_details.no + `\nINVOICE DATE : ` + this.invoice_details.date +
        `\nINVOICE DUE : ` + this.invoice_details.due;
      this.addText(element, "invoice", 230, 130, 370, 'normal')

    },

    addTable() {
      var element = 'S.No.';
      this.addText(element, "sno", 100, 300, 50, 'bold')

      element = ''
      for (let index = 1; index <= this.table.services.length; index++) {
        element += index + '\n\n';
      }
      this.addText(element, "serial", 100, 350, 50, 'normal')

      element = 'Service';

      this.addText(element, "service_header", 100, 300, 180, 'bold')

      element = '';
      for (let index = 0; index < this.table.services.length; index++) {
        element += this.table.services[index] + '\n\n';
      }

      this.addText(element, "service", 100, 350, 180, 'normal')

      element = 'QTY';
      this.addText(element, "qty_header", 100, 300, 380, 'bold')

      element = '';
      for (let index = 0; index < this.table.quantity.length; index++) {
        element += this.table.quantity[index] + '\n\n';
      }

      this.addText(element, "qty", 100, 350, 380, 'normal')

      element = 'Prices';
      this.addText(element, "prices_header", 100, 300, 480, 'bold')

      element = '';
      for (let index = 0; index < this.table.prices.length; index++) {
        element += this.table.prices[index] + '\n\n';
      }

      this.addText(element, "price", 100, 350, 480, 'normal')

    },
    addTotal() {
      var element = 'Sub-Total : ' + '\n\nTax : ' + '\n\nTotal : ';
      this.addText(element, "total_header", 100, 500, 10, 'bold')
      element = this.total.subtotal + '\n\n' + this.total.tax + '\n\n' + this.total.total;
      this.addText(element, "total", 100, 500, 100, 'normal')
    },
    addNote() {
      var element = 'Note : ';
      this.addText(element, "note", 500, 700, 30, 'normal')

    },

    newText() {
      this.addText('Text Box', 'newtext', 100, 10, 10, 'normal')
    },
    addText(element, id, width, top, left, fontWeight) {
      const text_value = new fabric.Textbox(element, {
        fontFamily: "Arial",
        fontSize: 16,
        fill: "black",
        backgroundColor: "transparent",
        selectable: true,
        width,
        zIndex: 2,
        top,
        left,
        id,
        underline: false,
        fontWeight,
        textAlign: 'left'
        // borderColor: 'blue',
        // padding: 2
      });
      this.textObjects.push(text_value);
      this.canvas.add(text_value);
      // const text_color = new fabric.Textbox("color", {
      //   fontFamily: "Arial",
      //   fontSize: 24,
      //   fill: "black",
      //   backgroundColor: "transparent",
      //   selectable: true,
      //   zIndex: 2,
      //   top: 0,
      //   left: 70,
      //   id: "textObj" + this.textObjects.length,
      // });
      // this.textObjects.push(text_color);
      // this.canvas.add(text_color);
      // // this.group = new fabric.Group([text_value, text_color])
      // // this.canvas.add(this.group);
      // user.forEach(element => {
      //   const text_value = new fabric.Textbox(element.value, {
      //     fontFamily: "Arial",
      //     fontSize: 24,
      //     fill: "black",
      //     backgroundColor: "transparent",
      //     selectable: true,
      //     zIndex: 2,
      //     top: 40 + user.indexOf(element) * 40,
      //     id: "textObj" + this.textObjects.length,
      //   });
      //   this.textObjects.push(text_value);
      //   this.canvas.add(text_value);
      //   const text_color = new fabric.Textbox(element.color, {
      //     fontFamily: "Arial",
      //     fontSize: 24,
      //     fill: "black",
      //     backgroundColor: "transparent",
      //     selectable: true,
      //     zIndex: 2,
      //     top: 40 + user.indexOf(element) * 40,
      //     left: 70,
      //     id: "textObj" + this.textObjects.length,
      //   });
      //   this.textObjects.push(text_color);
      //   this.canvas.add(text_color);
      //   // this.group = new fabric.Group([text_value, text_color])
      //   // this.canvas.add(this.group);


      // });
      // console.log(this.textObjects)
    },
    addImage: function (img) {
      this.show = false;
      const image = new window.Image();
      image.src = img;
      image.onload = () => {
        let imgInstance = new fabric.Image(image, {
          left: 0,
          top: 0,
        });
        imgInstance.scaleToWidth(this.canvas.getWidth() / 4);
        this.canvas.add(imgInstance);
      };
    },
    sendSelectedObjectFront() {
      this.activeObject.bringToFront();
    },
    sendSelectedObjectBack() {
      this.canvas.sendToBack(this.activeObject);
    },
    delt() {
      this.canvas.remove(this.activeObject);
    },
    logPrint() {
      // var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
      // var pdf = new jsPDF();

      // pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.save("download.pdf");
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
  background-color: white;
  /* background-image: url("https://t3.ftcdn.net/jpg/03/01/35/54/360_F_301355492_a8MJpnsU9oS1M05g7dXDuY1v9RsIvcWL.jpg"); */
  border-radius: 25px;
  margin: 5px;
  height: 420px;
  padding: 20px;
}</style>
