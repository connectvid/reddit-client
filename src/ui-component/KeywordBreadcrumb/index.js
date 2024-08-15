/* eslint-disable jsx-a11y/alt-text */
import BRButton from 'ui-component/bizreply/BRButton';
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { KEYWORD_PATH } from 'config';
import { IconPlus } from '@tabler/icons';

export default function KeywordBreadcrumb({ handleModal }) {
    // const { search } = useLocation();
    // const navigate = useNavigate();
    return (
        <Breadcrumb title="Keyword">
            <AllProjects />
            <BRButton
                sx={{ height: '40px', width: '226px', fontWeight: 500, fontSize: '16px', color: '#fff' }}
                variant="contained"
                onClick={handleModal}
            >
                <IconPlus size={20} /> Create a new keyword
            </BRButton>
        </Breadcrumb>
    );
}
