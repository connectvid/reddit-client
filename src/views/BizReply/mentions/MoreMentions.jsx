/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import BRButton from 'ui-component/bizreply/BRButton';
import { CircularProgress, Typography } from '@mui/material';
import postSorting from 'utils/postSorting';

const MoreMentions = ({ setMoreLoading, setMentionsDataObj, selectedKeyword, moreLoading, firstKeyword }) => {
    const { getAccessToken } = useAuth();

    const {
        selectedPlatform // projectCreated
    } = useSelector((state) => state.project);

    const loadMore = async () => {
        const keyword = selectedKeyword?._id ? selectedKeyword : firstKeyword;
        // console.log({ selectedKeyword });
        if (!keyword?._id || !selectedPlatform) {
            toast.warning(`Failed to load more posts. Please refresh and try again.`);
            return;
        }
        const body = { keywordId: keyword._id, platform: selectedPlatform };
        setMoreLoading?.(true);
        try {
            const token = await getAccessToken();
            const {
                data: { items }
            } = await axios.post(`mentions/load-more`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (items?.length) {
                setMentionsDataObj?.((p) => {
                    if (selectedPlatform) {
                        const allData = [...p[selectedPlatform], ...items];
                        p[selectedPlatform] = postSorting({ data: allData });
                    } else {
                        const allData = [...p, ...items];
                        p = postSorting({ data: allData });
                    }
                    return p;
                });
            }

            setMoreLoading?.(false);
        } catch (e) {
            console.log(e);
            toast.warning(errorMsgHelper(e));
            setMoreLoading?.(false);
        }
    };
    const isDisabled = moreLoading || !selectedPlatform;
    // const isDisabled = selectedKeyword?.title === 'All Keywords' || moreLoading || !selectedPlatform;
    return (
        <Typography title={selectedKeyword?.title === 'All Keywords' && `Please choose a keyword`}>
            <BRButton
                onClick={loadMore}
                disabled={isDisabled}
                variant="outlined"
                sx={{ width: '210px', height: '40px', opacity: isDisabled ? 0.5 : 1 }}
                grandChildSx={{ width: '100%', textAlign: 'center', display: 'block' }}
            >
                Refresh {(moreLoading && <CircularProgress sx={{ maxWidth: '12px', maxHeight: '12px', ml: 1 }} />) || ''}
            </BRButton>
        </Typography>
    );
};

export default MoreMentions;
