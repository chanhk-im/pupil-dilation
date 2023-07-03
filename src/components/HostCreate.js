import React from 'react';
import './HostCreate.css';

function HostCreate() {
    return (
        <div className="host-create-container">
            <div className="host-create-left">
                <img
                    className="image-upload"
                    src="/images/logo.svg"
                    alt="업로드"
                />
            </div>
            <div className="host-create-right">
                <div className="host-create-right-1">
                    <input
                        className="host-create-title"
                        type="text"
                        placeholder="공연 제목 입력"
                    />
                </div>
                <div className="host-create-right-2">
                    <div className='host-create-right-2-left'></div>
                </div>
                <div className="host-create-right-3"></div>
                <div className="host-create-right-4"></div>
            </div>
        </div>
    );
}

export default HostCreate;
