import React, { useEffect, useState } from 'react'

const ProfileStatusWithHooks = (props) => { // локальный стейт живет имеено в классовой компоненте так обьект он есть и он живет и в нем можно что то хранить, в функц. визвалась потом исчезла
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)


    }
    {
        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status || '------'} </span>
                    </div>
                }
                {editMode &&
                    <div>
                        <input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status}></input>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatusWithHooks
