/* eslint-disable jsx-a11y/alt-text */
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
import PostFilter from './PostFilter';
// import MoreMentions from 'views/BizReply/mentions/MoreMentions';
import BRButton from 'ui-component/bizreply/BRButton';
import { Typography } from '@mui/material';
import { IconSettings } from '@tabler/icons';
import AllPrompts from 'ui-component/Prompt/AllPrompts';

export default function ({
    setSelectedKeyword,
    loading,
    // selectedKeyword,
    // setMentionsDataObj,
    // setMoreLoading,
    // moreLoading,
    // firstKeyword,
    // handleModal,
    handleASModal,
    initFirstPage
}) {
    return (
        <>
            <Breadcrumb
                title="Mentions"
                sx={{ display: { lg: 'flex', md: 'block' }, gap: '6px' }}
                contentSx={{ gap: '6px' }}
                titleSx={{ mb: { lg: 0, xs: 2 }, textAlign: { lg: 'left', xs: 'center' } }}
            >
                {/* <MoreMentions {...{ selectedKeyword, setMentionsDataObj, setMoreLoading, moreLoading, firstKeyword }} /> */}
                <AllPrompts width="260px" />
                <AllProjects width="260px" />
                <PostFilter
                    {...{
                        setSelectedKeyword,
                        loading,
                        initFirstPage,
                        width: '275px'
                        // wrapperSx: { minWidth: '180px', border: 0, background: 'transparent' }
                    }}
                />
                <BRButton
                    variant="outlined"
                    sx={{ width: '170px', height: '40px' }}
                    childSx={{ width: '100%', fontSize: '160x', fontWeight: 500 }}
                    grandChildSx={{ width: '100%' }}
                    onClick={handleASModal}
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
                        <IconSettings size={16} color="#0C22E5" style={{ marginRight: '3px' }} />
                        Advanced settings
                    </Typography>
                </BRButton>
                {/* <BRButton
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
                </BRButton> */}
            </Breadcrumb>
        </>
    );
}
