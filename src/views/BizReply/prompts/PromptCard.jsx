/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Card, CardContent, Dialog, Divider, Typography } from '@mui/material';
import { deletePromptAPI } from 'features/prompt/promptActions';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';
// import { FaTrash } from 'react-icons/fa6';
import BRButton from 'ui-component/bizreply/BRButton';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function (props) {
    const { getAccessToken } = useAuth();
    const [expand, setExpand] = React.useState(false);
    const allowDescriptionLength = 394;
    const handleViewDetails = () => setExpand((p) => !p);
    const handleViewDetailsClose = () => setExpand(false);
    const { handleEditor, ...restProps } = props;
    const handleEdit = () => {
        handleEditor?.(restProps);
    };
    const handleDelete = async () => {
        if (!confirm(`Are you sure to delte the prompt!`)) return;
        try {
            const token = await getAccessToken();
            deletePromptAPI(token, restProps._id)();
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <>
            <Dialog open={expand}>
                <Box sx={{ px: 4, py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#000' }}>Details</Typography>
                        <Typography sx={{ cursor: 'pointer' }} onClick={handleViewDetailsClose}>
                            <FaRegTimesCircle size={18} />
                        </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <CardDetails {...restProps} {...{ expand }} />
                </Box>
            </Dialog>
            <Card sx={{ border: '1px solid rgba(0,0,0,0.8)', borderRadius: '12px' }}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <CardDetails {...restProps} {...{ allowDescriptionLength, setExpand }} />
                        <CardFooter {...{ handleViewDetails, handleEdit, handleDelete }} />
                        {/* <Box>
                    <BRButton
                        variant="outlined"
                        sx={{ borderRadius: '6px', height: '38px', mt: 1.5 }}
                        childSx={{ borderRadius: '6px', px: 1.5 }}
                    >
                        <CopyToClipboard text={prompt} onCopy={() => toast.success(`Coppied!`)}>
                            <Typography component="span" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                                <MdOutlineContentCopy color="#0C22E5" /> <Typography ml={0.5}>Copy prompt</Typography>
                            </Typography>
                        </CopyToClipboard>
                    </BRButton>
                </Box> */}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
const CardFooter = ({
    handleViewDetails,
    handleEdit //, handleDelete
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleViewDetails}>
                View Details
            </BRButton>
            <BRButton sx={{ height: '40px', width: '100%' }} variant="contained" onClick={handleEdit}>
                Edit
            </BRButton>

            {/* <Typography onClick={handleDelete} sx={{ cursor: 'pointer' }}>
                <FaTrash size={16} color="red" />
            </Typography> */}
        </Box>
    );
};
const CardDetails = ({ language, tone, reply_character_limit, description, name, expand = false }) => {
    const str = description;

    // const str = expand allowDescriptionLength,
    // ? description
    // : description?.length > allowDescriptionLength
    // ? `${description.substring(0, allowDescriptionLength)}`
    // : description;
    return (
        <Box>
            <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 2 }}>Prompt Name: {name}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 2 }}>Language: {language}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 2 }}>Tone: {tone}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 2 }}>
                    Character Count: {reply_character_limit}
                </Typography>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 0.5 }}>Prompt Description:</Typography>
            <Box
                sx={{
                    fontWeight: 400,
                    fontSize: '16px',
                    color: '#3A3D41',
                    lineHeight: '24px',
                    height: expand ? '' : '173px',
                    overflow: 'hidden'
                    // border: '1px solid #CCD3D9',
                    // p: 2,
                    // borderRadius: '10px',
                    // height: '180px',
                }}
            >
                {/* {expand
                    ? description
                    : description?.length > allowDescriptionLength
                    ? `${description.substring(0, allowDescriptionLength)} ...`
                    : description} */}

                {/* {expand
                    ? description
                    : description?.length > allowDescriptionLength
                    ? `${description.substring(0, allowDescriptionLength).split(`\n`).join('\n')} ...`
                    : description.split(`\n`).join('\n')} */}

                {str.split('\n').map((item, i) => {
                    console.log(item);
                    return (
                        <Box
                            key={i}
                            sx={
                                {
                                    // color: '#000',
                                    // // fontWeight: 500,
                                    // fontSize: '14px',
                                    // lineHeight: '22px'
                                }
                            }
                        >
                            <Typography
                                sx={{
                                    color: '#000',
                                    // fontWeight: 500,
                                    fontSize: '14px',
                                    lineHeight: '24px',
                                    m: 0,
                                    p: 0,
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {item}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

{
    /* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Language:</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>{language}</Typography>
    </Box>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Tone: </Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}> {tone}</Typography>
    </Box>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Character Count:</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>{reply_character_limit}</Typography>
    </Box>
</Box>
 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Language:</Typography> {language}
    </Box>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Tone: </Typography>
        {tone}
    </Box>
    <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000' }}>Character Count:</Typography>
        {reply_character_limit}
    </Box>
</Box>  */
}
