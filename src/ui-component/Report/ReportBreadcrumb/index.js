/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from '../../Breadcrumb';
import { IconPlus } from '@tabler/icons';

export default function ({ setShowCreateModal }) {
    return (
        <Breadcrumb title="Report">
            <BRButton
                sx={{ height: '40px', width: '230px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={() => setShowCreateModal(true)}
            >
                <IconPlus size={20} /> Create a new Prompt
            </BRButton>
        </Breadcrumb>
    );
}
