import React from 'react';

function Poster(props) {
    return (
        <div
            style={{
                background: '#889898',
                width: '100%',
                paddingBottom: '100%',
            }}
        >
            {props.name}
        </div>
    );
}

export default Poster;
