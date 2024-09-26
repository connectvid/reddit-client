/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from '../../Breadcrumb';
import { IconPlus } from '@tabler/icons';
import { toast } from 'react-toastify';

export default function ({ setShowCreateModal, remainingCredit = { reports: 0 } }) {
    return (
        <Breadcrumb title="Report">
            <BRButton
                sx={{ height: '40px', width: '230px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={() => {
                    if (remainingCredit?.reports) {
                        setShowCreateModal(true);
                    } else {
                        toast('You dont have enough credit to create a report', { autoClose: 2500, type: 'warning' });
                    }
                }}
            >
                <IconPlus size={20} /> Create a new Prompt
            </BRButton>
        </Breadcrumb>
    );
}
