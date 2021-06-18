import React from "react"

export default function ZoomImage(props) {
// for simple layout it allows to zoom in to picture in the question displayed

  return (

    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: window.pageYOffset, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '2000', backgroundColor: 'rgba(105,105,105, .7)' }} >
      <div style={{ margin: 'auto', maxWidth: '600px', border: '1px solid gray', borderRadius: '.25rem', padding: '2%'}}>    
          <img src={props.img} style={{ width: '100%', visibility: 'visible' }} alt='zooming in' />
          <div className="closeTag"  onClick={(e) =>{ props.closeModal(true)}}><img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="close" style={{ float:'right', width: 'max(1.2vw,12px)', height: 'max(1.2vw,12px)',color:"red" }} /></div>
      </div>

    </div>

  )
}