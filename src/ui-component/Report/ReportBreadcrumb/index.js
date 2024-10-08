/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from '../../Breadcrumb';
import { IconPlus } from '@tabler/icons';
import { toast } from 'react-toastify';

export default function ({ handleModal, remainingCredit = { reports: 0 } }) {
    return (
        <Breadcrumb title="Report Builder (Beta)">
            <BRButton
                sx={{ height: '40px', width: '230px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={() => {
                    if (remainingCredit?.reports) {
                        handleModal();
                    } else {
                        toast('You dont have enough credit to create a report', { autoClose: 2500, type: 'warning' });
                    }
                }}
            >
                <IconPlus size={20} /> Create a new Report
            </BRButton>
        </Breadcrumb>
    );
}
