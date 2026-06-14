import React from 'react';

const Tooltip = ({ children, text }) => {
    return (
        <div title={text} style={{ display: 'contents' }}>
            {children}
        </div>
    );
};

export default Tooltip;