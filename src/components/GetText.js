import React, { Fragment, useState, useEffect } from 'react';
import Cloudinary from './Cloudinary';
function GetText(props) {
    const [answerText, setAnswerText] = useState(props.answer.text);
    const [imgLink, setImgLink] = useState(props.answer.img);
    const [checkBox, setCheckBox] = useState();
    const getImgUrl = (url) => {
        document.querySelector("#mainImg").value = url;
        setImgLink(url);
        sendBack(answerText, url);
    }
    function changeInput(e) {
        setAnswerText(e.target.value)
        sendBack(e.target.value, imgLink);
    }
    function changeImage(e) {
        setImgLink(e.target.value);
        console.log(imgLink)
        sendBack(answerText, e.target.value);
    }
    function changeCheck(e) {
        (checkBox === 0) ? setCheckBox(1) : setCheckBox(0);
    }
    function sendBack(a, b) {
        let choice = {
            text: a,
            img: b,
            num: props.num
        };
        props.onChange(choice);
    }
    useEffect(() => {
        setAnswerText(props.answer.text);
        if (props.answer.img.length > 0) {
            setCheckBox(1);
            setImgLink(props.answer.img);
        } else {
            setCheckBox(0);
        }
    }, [props.answer]);
    return (
            <div >
                <textarea style={{ width: '100%' }} id={"answer_" + props.num} value={answerText} onChange={e => changeInput(e)} />
                <label style={{ color: 'black', width: '100%' }}>
                    <input type="checkbox" id={"check_" + props.num} onChange={e => changeCheck(e)} checked={(checkBox === 1) ? 'checked' : ''} />
                check to add image link</label>
                {checkBox && <div>
                    <input type="text" id={"pic_" + props.num} style={{ width: '80%', opacity: checkBox }} value={imgLink} onChange={e => changeImage(e)} />
                    <Cloudinary style={{ width: "200px", objectFit: "cover", margin: "10px" }} getImgUrl={getImgUrl} />
                </div>}
            </div>
    );
}
export default GetText;