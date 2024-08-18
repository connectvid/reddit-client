import { Box, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import BRButton from 'ui-component/bizreply/BRButton';
import emptyImage from 'assets/images/projects.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROJECT_PATH } from 'config';
import { toggleProjectCreateModalCtrl } from 'features/project/projectActions';

export default function () {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const isSamePath = pathname === PROJECT_PATH;
    const btnTxt = isSamePath ? `Create a new project` : 'Please go to project page!';
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', width: { sx: '60%', md: '50%' }, mx: 'auto', mt: 6 }}>
                <img src={emptyImage} alt="Empty" />
                <Typography sx={{ fontSize: '20px', fontWeight: 500, textAlign: 'center', my: 4 }}>
                    {`Currently you don’t have any projects. Let’s create a project and 
start your journey with BizReply 🚀 `}
                </Typography>
                <BRButton
                    sx={{
                        height: '40px',
                        width: '260px',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#fff',
                        textAlign: 'center',
                        mx: 'auto'
                    }}
                    variant="contained"
                    onClick={() => {
                        if (isSamePath) {
                            toggleProjectCreateModalCtrl()();
                        } else {
                            navigate(`${PROJECT_PATH}${search ? `?dp=${search}` : ''}`, { replace: true });
                            // toggleProjectCreateModalCtrl()();
                        }
                    }}
                >
                    <IconPlus size={20} /> {btnTxt}
                </BRButton>
            </Box>
        </Box>
    );
}
