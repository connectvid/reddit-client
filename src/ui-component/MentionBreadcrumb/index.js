/* eslint-disable jsx-a11y/alt-text */
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
import PostFilter from './PostFilter';
// import MoreMentions from 'views/BizReply/mentions/MoreMentions';
import BRButton from 'ui-component/bizreply/BRButton';
import { Typography } from '@mui/material';
import { IconSettings } from '@tabler/icons';
import AllPrompts from 'ui-component/Prompt/AllPrompts';

export default function MentionBreadcrumb({
    setSelectedKeyword,
    loading,
    // selectedKeyword,
    // setMentionsDataObj,
    // setMoreLoading,
    // moreLoading,
    // firstKeyword,
    handleModal
}) {
    return (
        <>
            <Breadcrumb title="Mentions">
                {/* <MoreMentions {...{ selectedKeyword, setMentionsDataObj, setMoreLoading, moreLoading, firstKeyword }} /> */}
                <AllPrompts />
                <BRButton
                    variant="outlined"
                    sx={{ width: '210px', height: '40px' }}
                    childSx={{ width: '100%', fontSize: '160x', fontWeight: 500 }}
                    grandChildSx={{ width: '100%' }}
                    onClick={handleModal}
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
