/* eslint-disable jsx-a11y/alt-text */
// import ReportDownload from 'views/BizReply/reply/ReportDownload';
import Breadcrumb from '../Breadcrumb';
import AllProjects from 'ui-component/Project/AllProjects';
// import PostFilter from './PostFilter';
// import ManageMentions from './ManageMentions';

export default function ReplyBreadcrumb({ brandName, mentionsData }) {
    // {
    // setSelectedKeyword,
    // loading
    // selectedKeyword,
    // setMentionsDataObj,
    // setMoreLoading,
    // moreLoading
    // }
    return (
        <>
            {/* <ManageMentions /> */}

            <Breadcrumb title="Replies">
                {/* <BRButton
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
                </BRButton> */}
                {/* <ReportDownload {...{ brandName, mentionsData }} /> */}
                <AllProjects />
                {/* <PostFilter {...{ setSelectedKeyword, loading }} /> */}
            </Breadcrumb>
        </>
    );
}
