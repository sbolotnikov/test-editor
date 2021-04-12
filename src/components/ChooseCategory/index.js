import React, { Fragment, useEffect } from 'react';
import "./style.scss";
const ChooseCategory = props => {


    useEffect(() => {
        for (let i = 0; i <props.answers.length; i++) {
            document.querySelector("#category_" + i).checked = false;
            if (props.checkedMarks.indexOf(i) >= 0) document.querySelector("#category_" + i).checked = true;
        }
        console.log(props.answers)
    },[]);
    function checkingMulti(e) {
        if (props.type === 1) {
            for (let i = 0; i < props.answers.length; i++) {
                document.querySelector("#category_" + i).checked = false;

            }
            document.querySelector("#" + e.target.id).checked = true;
        }
        let choice = [];
        for (let i = 0; i < props.answers.length; i++) {
            if (document.querySelector("#category_" + i).checked === true) {
                choice.push(i);
            }
        }
        props.onChange(choice);
    }

    return (
        <Fragment>
                <section className="categoriesSection" >
                    {props.answers.map((answerOption, j) => {
                        return (
                            <label className="option_item" key={"labelCat" + j} style={{width:'47%',maxHeight:'150px', maxWidth:'180px', margin:'5px'}}>
                                <input type="checkbox" className="checkOut" key={"inputCat" + j} id={"category_" + j} value={j} onChange={e => checkingMulti(e)} />
                                <div className="option_inner" style={{ backgroundImage: `url(${answerOption.img})`, backgroundRepeat: 'no-repeat', backgroundSize: '25% 25%',backgroundPosition: 'right top' }}>
                                    <div className="tickmark" key={"divCat" + j}> </div>
                                    <div className="name2" key={"div2Cat" + j} style={{width:"13ch"}}>{answerOption.text}</div>
                                </div>
                            </label>
                        )
                    })}
                </section>
        </Fragment>
    );
}
export default ChooseCategory;