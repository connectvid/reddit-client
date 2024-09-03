/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import { IconPlus } from '@tabler/icons';
import Breadcrumb from 'ui-component/Breadcrumb';

export default function ({ handleModal }) {
    return (
        <Breadcrumb title="Prompts">
            <BRButton
                sx={{ height: '40px', width: '230px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={handleModal}
            >
                <IconPlus size={20} /> Create a new Prompt
            </BRButton>
        </Breadcrumb>
    );
}
