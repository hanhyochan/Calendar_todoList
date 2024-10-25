import React from 'react';

const Input = ({value, onChange, placeholder, type}) => {
    return (
        <input className='input' 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required
      />
    );
};

export default Input;