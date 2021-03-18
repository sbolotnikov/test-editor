import React, {useState} from 'react';
import Axios from 'axios'
// import {Image, Video, Transformation, CloudinaryContext} from 'cloudinary-react';


function Cloudinary(props) {
    const [imageSelected, setImageSelected]=useState('');
    const pictureUpload=(event)=> {
       const formData= new FormData();
       formData.append('file', imageSelected);
       formData.append('upload_preset',process.env.REACT_APP_CLOUD_PRESET);
       Axios.post(
           "https://api.cloudinary.com/v1_1/"+process.env.REACT_APP_CLOUDNAME+"/image/upload",
           formData
       )
       .then(response=>{
        setImageSelected("");
        console.log(response.data.url)
        console.log(event.target.parentElement.previousSibling.value)
        event.target.parentElement.previousSibling.value=""; 
        props.getImgUrl(response.data.url);
        })
        .catch(e=>{console.log('Fail to upload image')})
    }

    return(
        <div>
            <input type='file' onChange={(event)=>setImageSelected(event.target.files[0])}/>
            <div className="cloudinary-button" onClick={(e)=>{pictureUpload(e)}}><h5 style={{cursor: "pointer", textAlign:"center"}}>Upload Image</h5></div>
        </div>
    )
}

export default Cloudinary;