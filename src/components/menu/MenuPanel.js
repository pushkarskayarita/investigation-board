import React from 'react';
import UploadForm from '../upload/UploadForm';
import style from './MenuPanel.css';
import UploadedPicturesList from '../upload/UploadedPicturesList';

const MenuPanel = () => {
    return (
        <div className={style.container}>
            <UploadForm />
            <UploadedPicturesList />
        </div>
    );
};

export default MenuPanel;
