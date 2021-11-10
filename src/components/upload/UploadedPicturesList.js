import React from 'react';
import { connect } from 'react-redux';
import { loadedPictures } from '../../utils/loaded';
import style from './Upload.css';
import UploadListItem from './UploadListItem';

const UploadedPicturesList = (props) => {
    const { pictures } = props;

    return (
        <>
            {pictures.length > 0 ? (
                <ul aria-label="loaded pictures" className={style.gallery}>
                    {pictures.map((id) => {
                        const imageSrc = loadedPictures[id]
                            ? URL.createObjectURL(loadedPictures[id])
                            : '';

                        return loadedPictures[id] ? (
                            <UploadListItem
                                key={id}
                                id={id}
                                imageSrc={imageSrc}
                            />
                        ) : null;
                    })}
                </ul>
            ) : (
                <div>No loaded images</div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        pictures: state.picturesData.pictures,
    };
};

export default connect(mapStateToProps)(UploadedPicturesList);
