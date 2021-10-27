import React, { useState, useEffect } from 'react';

const Editable = ({
    text,
    type,
    placeholder,
    children,
    childRef,
    ...props
}) => {
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);

    return (
        <div {...props}>
            <div onBlur={() => setEditing(false)}>{children}</div>
        </div>
    );
};

export default Editable;
