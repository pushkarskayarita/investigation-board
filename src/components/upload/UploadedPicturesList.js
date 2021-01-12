import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadedPictures } from '../../utils/loaded';
import style from './Upload.css';
import UploadListItem from './UploadListItem';

const UploadedPicturesList = (props) => {
    const { pictures } = props;
    const blobURLS = [];

    useEffect(() => {
        return () => {
            blobURLS.forEach((url) => {
                URL.revokeObjectURL(url);
            });
        };
    }, [pictures]);

    return (
        <>
            {pictures.length > 0 ? (
                <ul className={style.gallery}>
                    {pictures.map((id) => {
                        const imageSrc = loadedPictures[id]
                            ? URL.createObjectURL(loadedPictures[id])
                            : '';
                        blobURLS.push(imageSrc);

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
                <div style={{ padding: '20px' }}>Choose picture to upload</div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return { pictures: state.picturesData.pictures };
};

export default connect(mapStateToProps)(UploadedPicturesList);
