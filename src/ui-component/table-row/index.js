import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { IconEye } from '@tabler/icons';
import { Link } from 'react-router-dom';

const TableRow = ({ _id, scrapeReference, totalScraped, createdAt, status, importType, StartScrap }) => (
    <Box
        sx={{
            fontSize: '17px',
            borderBottom: '1px solid rgba(255,255,255,.4)',
            paddingY: 2,
            display: 'grid',
            // justifyContent: 'space-between'
            gridTemplateColumns: { md: 'repeat(6, 1fr)', sm: 'repeat(1, 1fr)' },
            textAlign: { sm: 'center', xs: 'center' },
            'p.MuiTypography-root': {
                lineHeight: { sm: 3, xs: 3 }
            }
        }}
    >
        <Typography>{scrapeReference}</Typography>
        <Typography>{importType}</Typography>
        <Typography>{totalScraped}</Typography>
        <Typography>{createdAt}</Typography>
        <Typography>{status}</Typography>
        <Box sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
            <Link to={`/single-campaigns/${_id}/${importType}`} style={{ display: 'flex', alignItems: 'center' }}>
                <IconEye />
            </Link>{' '}
            &nbsp; &nbsp;
            {StartScrap && <StartScrap {...{ id: _id, status }} />}
        </Box>
    </Box>
);
export default TableRow;
