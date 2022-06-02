/*
Create a web page using React to display a draggable shape in the middle of the screen.  
The shape should change color as it moves from the center to the edge of the screen.
-Allow user to choose the type of shape and a sequence of changing colors from a dropdown list.

*/
import React, {useState, useEffect, useRef} from 'react'
import Select from 'react-select';

const DragDropComponent = () => {

    const shapeRef = useRef()

    const shapeMovementDetails = useRef({active: false, currentX: 0, currentY : 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0})

    const [selectedShape, setSelectedShape] = useState(null)
    // would be a classname 
    const [styling, setStyling] = useState('')
    const [selectedColors, setSelectedColors] = useState([])

   useEffect(() => {
    let shape = shapeRef.current
    console.log('how often does this useeffect run')

    const enableDrag = (e) => {
      console.log('i m mousedown event: ', e)
      shapeMovementDetails.current.initialX = e.clientX - shapeMovementDetails.current.xOffset
      shapeMovementDetails.current.initialY = e.clientY - shapeMovementDetails.current.yOffset
      if (e.target === shape){
        shapeMovementDetails.current.active = true
      }
  }

  const disableDrag = (e) => {
    console.log('i m mouseup event: ', e)
    shapeMovementDetails.current.initialX =  shapeMovementDetails.current.currentX
    shapeMovementDetails.current.initialY =  shapeMovementDetails.current.currentY
    shapeMovementDetails.current.active = false
    }
    //moved it here to stop recalculation at every mousemove event trigerred
    let colorChoice = selectedColors.map(colorObj => colorObj.value)

  let generateRandomColorAtAveryMove = () => {

      // let colorChoice = selectedColors.map(colorObj => colorObj.value)

      return colorChoice[Math.floor(Math.random()*colorChoice.length)]
      
  }


const drag = (e) => {
  // console.log('i m drag event: ', e)
  if ( shapeMovementDetails.current.active) {
  e.preventDefault()
  
  shapeMovementDetails.current.currentX = e.clientX - shapeMovementDetails.current.initialX
  shapeMovementDetails.current.currentY = e.clientY - shapeMovementDetails.current.initialY

  shapeMovementDetails.current.xOffset = shapeMovementDetails.current.currentX
  shapeMovementDetails.current.yOffset = shapeMovementDetails.current.currentY

  shape.style.transform = "translate3d(" + shapeMovementDetails.current.currentX + "px, " + shapeMovementDetails.current.currentY + "px, 0)"
  shape.style.backgroundColor =  generateRandomColorAtAveryMove()

  }
}


      shape.addEventListener("mousedown", enableDrag, false)
      shape.addEventListener("mouseup", disableDrag, false)
      shape.addEventListener("mousemove", drag, false)

    return () => {
      shape.removeEventListener("mousedown", enableDrag)
      shape.removeEventListener("mouseup", disableDrag)
      shape.removeEventListener("mousemove", drag)
    }

   },[selectedColors])



useEffect(() => {
    if(selectedShape === 'circle'){
        setStyling('circle')
    }else if(selectedShape === 'rectangle'){
        setStyling('rectangle')
    }

}, [selectedShape])

const shapeOptions = [
    { value: 'circle', label: 'circle' },
    { value: 'rectangle', label: 'rectangle' },
  ];

const colorOptions = [
  {value: 'red', label: 'red'},
  {value: 'green', label: 'green'},
  {value: 'orange', label: 'orange'},
  {value: 'blue', label: 'blue'}
]


    return(<>
    <div>   
   <h4>Select shape </h4>
   <Select
          onChange={(e) => setSelectedShape(e.label)}
          options={shapeOptions}
        />
   <h4>Select colors (could be more than one) </h4>
    <Select
          isMulti={true}
          onChange={(e) => setSelectedColors(e)}
          options={colorOptions}
        />    
  
  </div>
 <div ref={shapeRef} className={styling}></div>
      </>
  )


}
export default DragDropComponent