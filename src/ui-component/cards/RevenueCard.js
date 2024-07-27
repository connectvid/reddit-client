import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';

// =============================|| REVENUE CARD ||============================= //

const RevenueCard = ({
    primary,
    secondary,
    content,
    iconPrimary,
    color,
    primaryIconSx = {},
    primarySx = {},
    secondarySx = {},
    contentSx = {},
    cardSx = {},
    cardContentSx = {}
}) => {
    const theme = useTheme();
    const matchDownXs = useMediaQuery(theme.breakpoints.down('sm'));

    const IconPrimary = iconPrimary;
    const primaryIcon = iconPrimary ? <IconPrimary /> : null;

    return (
        <Card sx={{ background: color, position: 'relative', color: '#fff', ...cardSx }}>
            <CardContent sx={{ ...cardContentSx }}>
                <Typography
                    variant="body2"
                    sx={{
                        position: 'absolute',
                        right: 13,
                        top: 14,
                        color: '#fff',
                        // '&> svg': { width: 100, height: 100, opacity: '0.5' },
                        // [theme.breakpoints.down('sm')]: {
                        //     top: 13,
                        //     '&> svg': { width: 80, height: 80 }
                        // },
                        ...primaryIconSx
                    }}
                >
                    {primaryIcon}
                </Typography>
                <Grid container direction={matchDownXs ? 'column' : 'row'} spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="inherit" sx={{ ...primarySx }}>
                            {primary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h3" color="inherit" sx={{ ...secondarySx }}>
                            {secondary}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" color="inherit" sx={{ ...contentSx }}>
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

RevenueCard.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    content: PropTypes.string,
    iconPrimary: PropTypes.object,
    primaryIconSx: PropTypes.object,
    primarySx: PropTypes.object,
    secondarySx: PropTypes.object,
    contentSx: PropTypes.object,
    cardSx: PropTypes.object,
    cardContentSx: PropTypes.object,
    color: PropTypes.string
};

export default RevenueCard;
