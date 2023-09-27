import React, {memo, ReactNode} from 'react';
import "./Button.css"

type ButtonPropsType = {
    name?: string;
    children?: ReactNode;
    className?: string;
    callback: () => void;
}

export const Button: React.FC<ButtonPropsType> = memo((
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

    console.log('Button')

    return (
        <>
            <button className={className} onClick={handleOnClick}>{children} {name}</button>
        </>
    )
})