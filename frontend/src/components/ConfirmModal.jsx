import React from "react";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button className="button-edit-modal" onClick={onConfirm}>Yes</button>
                <button className="button-delete-modal" onClick={onCancel}>No</button>
            </div>
        </div>
    );
};

export default ConfirmModal;