import React from 'react'
import Select from 'react-select'


const customStyles = {
    // using Select library allows to select multiple categories for the test
    menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 20,
    }),
    option: (provided, state) => ({
        ...provided,
        borderBottom: '1px dotted pink',
        color: state.isSelected ? 'red' : 'blue',
        padding: 20,
    }),
    control:styles => ({ ...styles, backgroundColor: 'white' }),

    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';

        return { ...provided, opacity, transition };
    }
}


function CustomSelect({style,label,options,onChange,value,isMulti}){
    return <div style={style}>
        {label}
        <Select styles={customStyles} isMulti={isMulti} closeMenuOnSelect={true} isSearchable  options={options} onChange={onChange} value={value}/>
    </div>
}

export default CustomSelect;