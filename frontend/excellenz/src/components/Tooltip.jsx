import React from 'react';

const Tooltip = ({ children, text }) => {
    return (
        <div title={text} style={{ display: 'inline-block', width: '100%' }}>
            {children}
        </div>
    );
};

export default Tooltip;