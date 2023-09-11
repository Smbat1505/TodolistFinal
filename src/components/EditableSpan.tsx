import React, {ChangeEvent, KeyboardEvent, useState} from 'react';


type EditableSpanPropsType = {
    oldTitle: string;
    onChange: (newTitle: string) => void;
}
export const EditableSpan: React.FC<EditableSpanPropsType> = ({oldTitle, onChange}) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(oldTitle);
    console.log(newTitle)

    const handleEdit = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateTitle()
        }


    }

    const activateViewMode = () => {
        setEditMode(false);
        onChange(newTitle);
    }

    const updateTitle = () => {
      onChange(newTitle)
    }
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    };

    function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleEdit()
        }
    }

    return (
        editMode ? <input value={newTitle} onChange={handleOnChange} onKeyDown={handleOnKeyDown} onBlur={handleEdit} autoFocus/> :
            <span onDoubleClick={handleEdit}>{oldTitle}</span>
    );
};
