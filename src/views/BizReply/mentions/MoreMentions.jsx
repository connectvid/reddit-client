/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import useAuth from 'hooks/useAuth';
import { useSelector } from 'react-redux';
import axios from 'utils/axios';
import { toast } from 'react-toastify';
import errorMsgHelper from 'utils/errorMsgHelper';
import BRButton from 'ui-component/bizreply3/BRButton';
import { CircularProgress, Typography } from '@mui/material';

const MoreMentions = ({ setMoreLoading, setMentionsDataObj, selectedKeyword, moreLoading }) => {
    const { getAccessToken } = useAuth();

    const {
        selectedPlatform // projectCreated
    } = useSelector((state) => state.project);

    const loadMore = async () => {
        if (!selectedKeyword?._id || !selectedPlatform) {
            toast.error(`Someting going wrong!`);
            return;
        }
        const body = { keywordId: selectedKeyword._id, platform: selectedPlatform };
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
                    p[selectedPlatform] = [...p[selectedPlatform], ...items];
                    return p;
                });
            }

            setMoreLoading?.(false);
        } catch (e) {
            console.log(e);
            toast.error(errorMsgHelper(e));
            setMoreLoading?.(false);
        }
    };
    const isDisabled = selectedKeyword?.title === 'All' || moreLoading || !selectedPlatform;
    return (
        <Typography title={selectedKeyword?.title === 'All' && `Please choose a keyword`}>
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