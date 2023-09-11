import React, {ChangeEvent, KeyboardEvent} from 'react';
import {log} from "util";


type InputPropsType = {
    type?: string | undefined;
    className?: string;
    checked?: boolean | undefined;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>)=>void;

    // name: string;
}
export const Input: React.FC<InputPropsType> = (
    {
        type,
        className,
        checked,
        value,
        onChange,
        onKeyDown
    }
) => {
    return (
        <>
            <input
                type={type}
                className={className}
                checked={checked}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </>
    )
}