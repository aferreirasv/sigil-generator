import React, { useEffect, useMemo, useState } from 'react'
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import quadrado from '../assets/quadrado.png'
import circulo from '../assets/circulo.png'
import flor from '../assets/flor.png'
import fogo from '../assets/fogo.png'

function App() {
  const [selectedTier, selectTier] = useState("")
  const [layers, setLayers] = useState([
    { name: "circle", image: null },
    { name: "element", image: null },
    { name: "element2", image: null },
    { name: "others", image: null }
  ])
  const images = [
    { type: "circle", src: circulo },
    { type: "circle", src: quadrado },
    { type: "element", src: fogo },
    { type: "element", src: flor },
    { type: "element2", src: fogo },
    { type: "element2", src: flor },
  ]
  const useStyles = makeStyles({
    canvasCircle: {
      border: "1px solid",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 0
    },
    canvasElement: {
      border: "1px solid",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 1
    },
    canvasElement2: {
      border: "1px solid",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 2
    },
    canvasOthers: {
      border: "1px solid",
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: 3
    },
    images: {

    },
    image: {
      width: 120,
      height: 120
    }
  })
  const classes = useStyles()

  const handleCircle = (e) => {
    selectTier("circle")
  }
  const handleElement = (e) => {
    selectTier("element")
  }
  const handleElement2 = (e) => {
    selectTier("element2")
  }
  const handleOthers = (e) => {
    selectTier("others")
  }

  const getType = e => e.target.alt.split("-")[2]

  const handleImageClick = (e) => {
    console.log(e.target)
    console.log(getType(e))
    setLayers(layers.map(v => v.name === getType(e) ? { name: v.name, image: e.target } : v))
  }

  const handleExport = (e) => {
    // let canvas = document.getElementById("canvas-circle")
    // let image = canvas.toDataURL("image/png")
    // var link = document.createElement("a");
    // link.setAttribute('download', `Sigil${Math.floor(Math.random() * 10000)}`);
    // link.href = image;
    // document.body.appendChild(link);
    // link.click();
    // link.remove();
    console.log("Layers: ", layers)
    console.log("Images: ", images)
    console.log("selectedTier: ", selectedTier)

  }
  function drawLayers() {
    console.log("Drawing Layers")
    let canvas = document.getElementById("canvas")
    console.log("canvas", canvas)
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    layers.forEach(layer => layer.image ? ctx.drawImage(layer.image, 0, 0) : null)
  }
  useEffect(drawLayers, [layers])
  return (
    <div className={classes.app}>
      <div className={classes.buttons}>
        <Button onClick={handleCircle}>Circulo</Button>
        <Button onClick={handleElement}>Elemento 1 </Button>
        <Button onClick={handleElement2}>Elemento 2</Button>
        <Button onClick={handleOthers}>Outros</Button>
        <Button onClick={handleExport}>Export</Button>
      </div>
      <div className={classes.images}>
        {
          images
            .filter((v => v.type === selectedTier))
            .map(v => <img src={v.src} alt={`sigil-img-${v.type}`} className={classes.image} onClick={handleImageClick} />)
        }
      </div>
      <canvas className={classes.canvas} id="canvas" width="800" height="800" />
    </div>
  );
}

export default App;
