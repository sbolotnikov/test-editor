import React, {useState, useEffect } from 'react';
import Cloudinary from './Cloudinary';
function GetText(props) {
    // component collecting answer option and image link for it, passing it to parent(GetAnswers)
    const [answerText, setAnswerText] = useState(props.answer.text);
    const [imgLink, setImgLink] = useState(props.answer.img);
    const [checkBox, setCheckBox] = useState();
    const getImgUrl = (url) => {
        // on change url
        document.querySelector("#mainImg").value = url;
        setImgLink(url);
        sendBack(answerText, url);
    }
    function changeInput(e) {
        // on change answer
        setAnswerText(e.target.value)
        sendBack(e.target.value, imgLink);
    }
    function changeImage(e) {
        setImgLink(e.target.value);
        sendBack(answerText, e.target.value);
    }
    function sendBack(a, b) {
    // sending props back
        let choice = {
            text: a,
            img: b,
            num: props.num
        };
        props.onChange(choice);
    }
    useEffect(() => {
        //  setting text and link for one answering option and updating on props change
        setAnswerText(props.answer.text);
        if (props.answer.img.length > 0) {
            setCheckBox(true);
            document.querySelector("#check_"+props.num+props.cor).checked=true
            setImgLink(props.answer.img);
        } else {
            document.querySelector("#check_"+props.num+props.cor).checked=false
            setCheckBox(false);
        }
    }, [props.answer]);
    return (
            <div >
                <textarea style={{ width: '100%', borderRadius: '.25rem', borderColor: 'lightgray' }} value={answerText} onChange={e => changeInput(e)} />
                <label style={{ color: 'black', width: '100%' }}>
                    <input type="checkbox" id={"check_" + props.num+props.cor} onChange={e => setCheckBox(document.querySelector("#check_"+props.num+props.cor).checked)} />
                check to add image link</label>
                {checkBox && <div >
                    <input type="text" style={{ width: '100%', opacity: checkBox, borderRadius: '.25rem', borderColor: 'lightgray' }} value={imgLink} onChange={e => changeImage(e)} />
                    <Cloudinary style={{ width: "200px", objectFit: "cover", margin: "10px" }} getImgUrl={getImgUrl} />
                    <img src={imgLink} style={{width:'19%'}} alt='thumbnail'/>
                </div>}
            </div>
    );
}
export default GetText;