/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
import { IconEdit, IconTrash } from '@tabler/icons';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import redditFeeds from 'assets/images/demoWebsite.png';
import BRButton from 'ui-component/bizreply/BRButton';
import { MENTION_PATH } from 'config';

export default function ({ navigate, editProject, deleteProject, ...item }) {
    const {
        thumbnail = redditFeeds,
        brandName,
        domain,
        shortDescription,
        _id,
        platforms,
        Suggestedkeywords,
        negativeKeywords,
        keywords
    } = item;
    console.log(item, 'item');
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 0, m: 0 }}>
                <CardContent sx={{ p: 0, fontWeight: '500', m: 0 }}>
                    <Box sx={{ position: 'relative', p: 1.5 }}>
                        <img src={thumbnail} alt="Reddit Feeds" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: 25, right: 25, gap: 1 }}>
                            <Typography
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '35px',
                                    width: '35px',
                                    alignItems: 'center',
                                    bottom: '30px',
                                    right: '30px',
                                    // right: '70px',
                                    background: ' #DDDDDD',
                                    color: '#6E7478',
                                    borderRadius: '50%'
                                }}
                                onClick={() => deleteProject(_id)}
                            >
                                <IconTrash size={20} />
                            </Typography>
                            <Typography
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '35px',
                                    width: '35px',
                                    alignItems: 'center',
                                    bottom: '30px',
                                    right: '30px',
                                    background: ' #DDDDDD',
                                    color: '#6E7478',
                                    borderRadius: '50%'
                                }}
                                onClick={() =>
                                    editProject({
                                        brandName,
                                        domain,
                                        shortDescription,
                                        platforms,
                                        _id,
                                        Suggestedkeywords: Suggestedkeywords?.map?.((keywordObj) => ({
                                            _id: keywordObj._id,
                                            title: keywordObj.title
                                        })),
                                        negativeKeywords,
                                        keywords
                                    })
                                }
                            >
                                <IconEdit size={20} />
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: '#6E7478' }}>Brand Name :</Typography>
                            <Typography>{brandName.length > 50 ? `${brandName.substring(0, 50)}...` : brandName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: '#6E7478' }}>Domain :</Typography>
                            <Typography>{domain.length > 50 ? `${domain.substring(0, 50)}...` : domain}</Typography>
                        </Box>
                        <Box sx={{ display: '', justifyContent: 'space-between' }}>
                            <Typography sx={{ color: '#6E7478', mb: 2 }}>Description :</Typography>
                            <Typography sx={{ height: '40px' }}>
                                {shortDescription.length > 100 ? `${shortDescription.substring(0, 100)}...` : shortDescription}
                            </Typography>
                        </Box>
                    </Box>
                    <BRButton
                        sx={{ height: '40px', marginTop: '25px', width: '90%', marginLeft: '5%' }}
                        variant="contained"
                        onClick={() => navigate(`${MENTION_PATH}?dp=${_id}`)}
                    >
                        Browse Mentions
                    </BRButton>
                </CardContent>
            </Card>
        </Grid>
    );
}
