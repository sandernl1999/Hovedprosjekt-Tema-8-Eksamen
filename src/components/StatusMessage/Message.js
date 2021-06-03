import React from "react";

/**
  * Denne komponenten render respons-meldinger slik som error og suksess.
 */

const Message = ({message, setMessage, type}) => {
    return (
        <div style={type === 'error' ? {backgroundColor: "red", padding: "10px", borderRadius: "5px 5px 5px 5px"} : {backgroundColor: "green", padding: "10px"}}>
			<div style={{ color: "white", fontSize: 14}}>
				<label>{message}</label>
				<span style={{marginLeft: "120px", cursor: "pointer", fontSize: "18px"}} onClick={()=>setMessage("")}>x</span>
			</div>            
		</div>
    )
}

export default Message;