import { Box, Typography } from '@mui/material';
import { IconPlus } from 'tabler-icons';
import BRButton from 'ui-component/bizreply/BRButton';
import emptyImage from 'assets/images/projects.png';

export default function ({
    handleModal,
    buttonTitle = 'Create a new keyword',
    description = 'Currently don’t have any keywords yet. Let’s create keyword'
}) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', width: { sx: '60%', md: '50%' }, mx: 'auto', mt: 6 }}>
                <img src={emptyImage} alt="Empty" />
                <Typography sx={{ fontSize: '20px', fontWeight: 500, textAlign: 'center', my: 4 }}>{description}</Typography>
                <BRButton
                    sx={{
                        height: '40px',
                        minWidth: '246px',
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#fff',
                        textAlign: 'center',
                        mx: 'auto'
                    }}
                    variant="contained"
                    onClick={handleModal}
                >
                    <IconPlus size={20} /> {buttonTitle}
                </BRButton>
            </Box>
        </Box>
    );
}
