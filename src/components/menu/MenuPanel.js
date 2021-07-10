import React from 'react';
import UploadForm from '../upload/UploadForm';
import style from './MenuPanel.css';
import UploadedPicturesList from '../upload/UploadedPicturesList';

const MenuPanel = ({ containerRef }) => {
    return (
        <div className={style.container}>
            <UploadForm />
            <UploadedPicturesList containerRef={containerRef} />
        </div>
    );
};

export default MenuPanel;
