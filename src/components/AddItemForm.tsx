import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Input} from "./Input";
import {Button} from "./Button";


type AddItemFormPropsType = {
    callback: ( valueTitle: string) => void;

}
const AddItemForm: React.FC<AddItemFormPropsType> = ({ callback}) => {
    const [valueTitle, setValueTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    function handleAddTask() {
        if (valueTitle.trim() !== '') {
            callback( valueTitle.trim())
            setValueTitle('')
        } else {
            setError('Title is required!!!')
        }
    }

    function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
        setValueTitle(e.currentTarget.value)
    }

    function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            handleAddTask()
        }
    }

    return (
        <div>
            <Input
                value={valueTitle}
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
                className={error ? 'error' : 'error-message'}

            />
            <Button
                name={'add'}
                callback={handleAddTask}
                className={'add-button'}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}

export default AddItemForm;