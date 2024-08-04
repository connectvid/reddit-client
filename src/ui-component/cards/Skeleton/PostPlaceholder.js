// material-ui
import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

// ==============================|| SKELETON - EARNING CARD ||============================== //

const PostPlaceholder = () => (
    <Card>
        <CardContent>
            <Grid container direction="column">
                <Grid item>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Skeleton variant="rectangular" width={88} height={20} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={120} height={20} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" sx={{ my: 2 }} height={25} width="80%" />
                </Grid>
                <Grid item>
                    <Skeleton variant="rectangular" height={40} />
                </Grid>
                <Grid item sx={{ mt: 2 }}>
                    <Grid container alignItems="center" gap={2}>
                        <Grid item>
                            <Skeleton variant="rectangular" width={130} height={35} sx={{ borderRadius: '5px' }} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={25} height={25} sx={{ borderRadius: '50%' }} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rectangular" width={110} height={35} sx={{ borderRadius: '5px' }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default PostPlaceholder;
