/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Typography } from '@mui/material';
// import { FaTrash } from 'react-icons/fa6';
// import { MdOutlineContentCopy } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import BRButton from 'ui-component/bizreply/BRButton';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

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

export default CardDetails;
