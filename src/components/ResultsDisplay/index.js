import React, { Fragment } from 'react';

const ResultsDisplay = props => {

    return (
        <Fragment >
            <div style={{display: 'flex',flexWrap: 'wrap', width: '100%', height:'100%', justifyContent: 'center', color:'white'}}>
            <h3 style={{width:'100%', textAlign:'center'}}>You have {props.time} left</h3>
            <table >
                <tr>
                    <th>Question</th>
                    <th>Result</th>
                </tr>

                {props.res.map((res, j) => {
                    return (
                        <tr>
                            <td>{j + 1}</td>
                            <td>{res ? <span>&#9989;</span> : <span>&#10060;</span>}</td>
                        </tr>

                    )
                })}
            </table>
            <h3 style={{width:'100%', textAlign:'center'}}>Your rating is {props.rate}%</h3>
            </div>
        </Fragment>
    );
}
export default ResultsDisplay;