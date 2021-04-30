import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import quadrado from '../assets/quadrado.png'
import circulo from '../assets/circulo.png'
import flor from '../assets/flor.png'
import fogo from '../assets/fogo.png'
import raizes from '../assets/raizes.png'
import chamas from '../assets/chamas.png'


const images = [
  [{ src: circulo, name: "circulo" }, { src: quadrado, name: "quadrado" }],
  [{ src: fogo, name: "fogo" }, { src: flor, name: "flor" }],
  [{ src: chamas, name: "chamas" }, { src: raizes, name: "raizes" }]

]

const types = {
  BACKGROUND: 0,
  ELEMENT: 1,
  ELEMENT2: 2,
  OTHER: 3
}


const MENU_OPTIONS = [
  {
    name: "Background",
    type: types.BACKGROUND,
  },
  {
    name: "Elemento 1",
    type: types.ELEMENT,
  },
  {
    name: "Elemento 2",
    type: types.ELEMENT2,
  },
  {
    name: "Outros",
    type: types.OTHER,
  },
]

function App() {
  const [selectedType, selectType] = useState(0)

  const [layers, setLayers] = useState(MENU_OPTIONS.map(_ => null))




  const useStyles = makeStyles({
    canvas: {
      border: "1px solid",
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


  const handleImageClick = (e) => {
    // console.log(e.target)
    const newLayers = layers.map((l, i) => {
      if (l) console.log("L ALT", l.alt)
      if (l) console.log("TARGET ALT", e.target.alt)
      if (l) console.log(l.alt === e.target.alt)


      if (l && l.id === e.target.id) {
        return null
      }
      else if (selectedType === i) {
        return e.target.cloneNode(true)
      } else {
        return l
      }
    }
    )
    console.log({ newLayers })
    setLayers(newLayers)
    // setLayers(layers.map(v => v.name === getType(e) ? { name: v.name, image: e.target } : v))
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
    // console.log("Layers: ", layers)
    console.log("Images: ", images)
    console.log("selectedType: ", selectedType)

  }

  function drawLayers() {
    console.log("Drawing Layers")
    let canvas = document.getElementById("canvas")
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    // console.log({ layers })
    layers.forEach(layer => layer && ctx.drawImage(layer, 0, 0))
  }


  useEffect(drawLayers, [layers])

  return (
    <div className={classes.app}>
      <div className={classes.buttons}>
        {
          MENU_OPTIONS.map(opt =>
            <Button onClick={_ => selectType(opt.type)}>{opt.name}</Button>)
        }
        <Button onClick={handleExport}>Export</Button>
      </div>
      <div className={classes.images}>
        {
          images[selectedType]
            .map(v => {
              return <img src={v.src} alt={`sigil-img`} id={`${v.name}${v.layer}`} className={classes.image} onClick={handleImageClick} />
            })
        }
      </div>
      <canvas className={classes.canvas} id="canvas" width="800" height="800" />
    </div>
  );
}

export default App;
