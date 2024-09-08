/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
import { Box, LinearProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const percentageCal = ({ credit, remaining }) => {
    if (isNaN(remaining)) return 0;
    return ((credit - remaining) / credit) * 100;
};

const RemainingCredits = () => {
    const {
        subscription: { subscription }
    } = useSelector((state) => state);
    const remainingCredit = subscription?.remainingCredit;
    const credit = subscription?.credit;
    // console.log({ credit }, remainingCredit);
    return (
        <Box sx={{ border: '1px solid #3F3A5F', borderRadius: '6px', p: '14px 14px', mb: 3 }}>
            <Typography sx={{ color: '#fff' }}>Credits:</Typography>
            {(remainingCredit &&
                // eslint-disable-next-line array-callback-return
                Object.keys(remainingCredit).map((item) => {
                    if (['keywords', 'projects', 'replies'].includes(item)) {
                        const remaining = remainingCredit[item];
                        const actualCredit = credit?.[item];
                        const percentage = percentageCal({ credit: actualCredit, remaining });
                        const cal = 100 - percentage;
                        return (
                            <Box key={item} sx={{ color: '#fff', mt: 1.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 500, mb: 1 }}>
                                    <Typography sx={{ textTransform: 'uppercase', color: '#6E7478' }}>{item}</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ display: 'flex', fontSize: '12px', fontWeight: 500, color: '#fff' }}>
                                            <Typography>{remaining}</Typography>
                                            <Typography sx={{ mx: '3px' }}>/</Typography>
                                            <Typography sx={{ color: '#6E7478' }}>{actualCredit}</Typography>
                                        </Typography>
                                    </Box>
                                </Box>
                                <LinearProgress
                                    variant="determinate"
                                    value={cal === 0 ? 100 : cal}
                                    sx={{
                                        width: '100%',
                                        background: '#D9D9D933',
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: percentage === 100 ? '#ED6A5E' : '#61C454'
                                        },
                                        height: '5px'
                                    }}
                                />
                            </Box>
                        );
                    }
                })) ||
                ''}
        </Box>
    );
};

export default RemainingCredits;
