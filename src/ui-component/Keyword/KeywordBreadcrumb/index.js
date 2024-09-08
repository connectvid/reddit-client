/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from 'ui-component/Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
import { IconPlus } from '@tabler/icons';

export default function ({ handleModal }) {
    return (
        <Breadcrumb title="Keyword">
            <AllProjects />
            <BRButton
                sx={{ height: '40px', width: '230px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={handleModal}
            >
                <IconPlus size={20} /> Create a new keyword
            </BRButton>
        </Breadcrumb>
    );
}
