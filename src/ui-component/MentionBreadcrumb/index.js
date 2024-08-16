/* eslint-disable jsx-a11y/alt-text */
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
import PostFilter from './PostFilter';
import BRButton from 'ui-component/bizreply/BRButton';
import { IconSettings } from '@tabler/icons';
import { Typography } from '@mui/material';
// import ManageMentions from './ManageMentions';

export default function MentionBreadcrumb({ setSelectedKeyword, loading }) {
    return (
        <>
            {/* <ManageMentions /> */}
            <Breadcrumb title="Keyword">
                <BRButton
                    variant="outlined"
                    sx={{ width: '210px', height: '40px' }}
                    childSx={{ width: '100%', fontSize: '160x', fontWeight: 500 }}
                    grandChildSx={{ width: '100%' }}
                >
                    <Typography
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: '160x',
                            fontWeight: 500
                        }}
                    >
                        <IconSettings size={16} color="#0C22E5" />
                        Manage mentions
                    </Typography>
                </BRButton>
                <AllProjects />
                <PostFilter {...{ setSelectedKeyword, loading }} />
            </Breadcrumb>
        </>
    );
}
