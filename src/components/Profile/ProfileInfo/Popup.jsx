import React from 'react'
import s from './ProfileInfo.module.css'
const Popup = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={s.popup}>
            <div className={s.popupContent}>
                <span className={s.close} onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};


export default Popup