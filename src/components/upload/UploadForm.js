import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { uploadPicture } from '../../actions';
import style from './Upload.css';

const UploadForm = (props) => {
    const [fileTitle, setFileTitle] = useState('');
    const [file, setFile] = useState('');
    const inputEl = useRef(null);

    const onChangeHandler = (event) => {
        setFileTitle(event.target.files[0].name);
        setFile(event.target.files[0]);
    };

    return (
        <div>
            <form
                className={style.uploadForm}
                action=""
                onSubmit={(event) => {
                    event.preventDefault();
                    if (fileTitle) {
                        props.uploadPicture({
                            id: fileTitle,
                            title: fileTitle,
                            file,
                        });
                        setFileTitle('');
                    }
                }}
            >
                <label className={style.formTitle} htmlFor="upload">
                    Uploads
                </label>
                <input
                    className={style.hide}
                    id="upload"
                    type="file"
                    onChange={onChangeHandler}
                    ref={inputEl}
                />
                <span>{fileTitle || 'Select file to upload'}</span>
                <button
                    className={`${style.btn} ${style.chose}`}
                    onClick={(event) => {
                        event.preventDefault();
                        console.log(inputEl);
                        inputEl.current.click();
                    }}
                >
                    Choose image
                </button>
                <button
                    className={`${style.btn}  ${
                        fileTitle ? style.active : style.upload
                    }`}
                    type="submit"
                    disabled={!fileTitle}
                >
                    Upload image
                </button>
            </form>
        </div>
    );
};

function mapStateToProps(state) {
    return { pictures: state.picturesData.pictures };
}

export default connect(mapStateToProps, { uploadPicture })(UploadForm);
