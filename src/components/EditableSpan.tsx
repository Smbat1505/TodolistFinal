import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';


type EditableSpanPropsType = {
    oldTitle: string;
    onChange: (newTitle: string) => void;
}
export const EditableSpan: React.FC<EditableSpanPropsType> = memo(({oldTitle, onChange}) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(oldTitle);


    const handleEdit = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateTitle()
        }
    }

    // const activeEditMode = () => {
    //   setEditMode(false);;;
    //   setNewTitle(oldTitle)
    // }
    //
    // const activateViewMode = () => {
    //     setEditMode(false);
    //     onChange(newTitle);
    // }

    const updateTitle = () => {
        onChange(newTitle)
    }
    const handleOnChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    };

    function handleOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleEdit()
        }
    }

    return (
        editMode ? <input value={newTitle} onChange={handleOnChangeTitle} onKeyDown={handleOnKeyDown} onBlur={handleEdit}
                          autoFocus/> :
            <span onDoubleClick={handleEdit}>{oldTitle}</span>
    );
});
