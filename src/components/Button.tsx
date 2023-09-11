import React, {ReactNode} from 'react';
import "./Button.css"

type ButtonPropsType = {
    name?: string;
    children?: ReactNode;
    className?: string;
    callback: ()=>void;
}

export const Button: React.FC<ButtonPropsType> = (
    {
        name,
        children,
        className,
        callback
    }
) => {

    function handleOnClick() {
        callback()
    }
    return (
        <>
            <button className={className} onClick={handleOnClick}>{children} {name}</button>
        </>
    )
}