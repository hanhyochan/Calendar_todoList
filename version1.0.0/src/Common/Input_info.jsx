import React from 'react';

const Input_info = ({value, onChange, placeholder, type}) => {
    return (
        <input className='Input_info' 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required
      />
    );
};

export default Input_info;