import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpgradeScreen = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/subscription');
    };
    return (
        <div>
            <h1>please upgrade your plan to agency plan to access this feature</h1>
            <h1>please upgrade your plan to agency plan to access this feature</h1>
        </div>
    );
};

export default UpgradeScreen;
