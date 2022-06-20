import * as React from "react"
import "./Chip.css"


export function Chip({ label = "", isActive = false , inclick = () => {} }) {

  //let buttonClassName = isActive ? "chip active": "chip" ;
  //const [isActive, setActive] = useState(false);

  return (
    <button className = {isActive ? "chip active": "chip"} onClick= {inclick} >
      <p className="label">{label}</p>
      <span className="close" role="button">{`X`}</span>
    </button>
  )
  }

export default Chip
