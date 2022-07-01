import React from 'react'
import Card from 'shared/Card';

const CardManagement = ({management}) => {
    return (
        <div className={`bg-green-100 roun shadow py-2 px-3`}>
            <p>{management.observations}</p>
        </div>
    );
};

export default CardManagement