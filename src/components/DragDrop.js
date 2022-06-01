/*
Create a web page using React to display a draggable shape in the middle of the screen.  
The shape should change color as it moves from the center to the edge of the screen.
-Allow user to choose the type of shape and a sequence of changing colors from a dropdown list.

*/
import React, {useState, useEffect} from 'react'

const DragDropComponent = () => {

    const [selectedShape, setSelectedShape] = useState(null)
    // would be a classname 
    const [styling, setStyling] = useState('')

    const handleSelect = (e) => {
        console.log(e.target.value)
        setSelectedShape(e.target.value)
    }
    console.log('i am setselected shape', selectedShape)

   

useEffect(() => {

    console.log('do i run everytime')
    if(selectedShape === 'circle'){
        setStyling('circle')
    }else if(selectedShape === 'triangle'){
        setStyling('triangle')
    }

}, [selectedShape])


    return(<>
        <form>
  <label for="cars">Choose a shape:</label>
   <select onChange={handleSelect} name="shape_selector" id="cars">
    <option value=""></option>
    <option value="circle">Circle</option>
    <option value="triangle">Triangle</option> 
  </select>
  <br /><br />
  <input type="submit" value="Submit" />
        </form>
        <div className={styling}></div>
      </>
  )


}
export default DragDropComponent