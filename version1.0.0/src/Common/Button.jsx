import React from 'react';

const Button = ({children, handleOnClick}) => {
    return (
        <button 
        className='btn'
        type="submit"
        onClick={handleOnClick}
        >{children}</button>
    );
};

export default Button;