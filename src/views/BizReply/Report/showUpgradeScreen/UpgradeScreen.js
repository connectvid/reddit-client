import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import gridPreviewImage from '../../../../assets/images/gridPreview.png';

import BRButton from 'ui-component/bizreply/BRButton';

const UpgradeScreen = () => {
    const navigate = useNavigate();
    const handreUpgradeButton = () => {
        navigate('/subscription');
    };
    return (
        <Box>
            <Box
                sx={{
                    // maxWidth: '800px',
                    width: '100%',
                    position: 'relative',
                    '&::after': {
                        position: 'absolute',
                        content: '""',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        background: 'rgba(0,0,0,0.4)',
                        borderRadius: '10px'
                        // zIndex: 999
                    }
                }}
            >
                <BRButton
                    sx={{
                        position: 'absolute',
                        width: '300px',
                        height: '100px',
                        zIndex: 999,
                        top: '0 !important',
                        right: '0 !important',
                        left: '0 !important',
                        bottom: '0 !important',
                        fontSize: '15px',
                        margin: 'auto'
                    }}
                    variant="contained"
                    onClick={handreUpgradeButton}
                >
                    Please Upgrade to agency plan to access `&quot;`reports`&quot;` feature
                </BRButton>
                <Box
                    sx={{
                        background: '#fff',
                        p: 3,
                        mt: 4,
                        borderRadius: '10px',
                        width: '100%'
                    }}
                >
                    <img style={{ width: '100%' }} src={gridPreviewImage} alt="reports preview" />
                </Box>
            </Box>
        </Box>
    );
};

export default UpgradeScreen;
