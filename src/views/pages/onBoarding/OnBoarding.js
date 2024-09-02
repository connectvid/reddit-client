import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';
import React from 'react';

export default function () {
    React.useEffect(() => {
        toggleProjectCreateModalCtrl()();
    }, []);

    return <></>;
}
