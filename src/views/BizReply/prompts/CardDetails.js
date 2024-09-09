/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
import Prompt from 'assets/images/svgIcons/prompt.svg';
import Character from 'assets/images/svgIcons/character.svg';
import Tone from 'assets/images/svgIcons/tone.svg';
import Language from 'assets/images/svgIcons/language.svg';

const CardDetails = ({ language, tone, reply_character_limit, description, name, expand = false }) => {
    const str = description;

    // const str = expand allowDescriptionLength,
    // ? description
    // : description?.length > allowDescriptionLength
    // ? `${description.substring(0, allowDescriptionLength)}`
    // : description;
    return (
        <Box>
            <Box sx={{ display: 'flex', mb: 2 }}>
                <img src={Prompt} alt="Prompt" style={{ width: '20px' }} />
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', ml: 2 }}>Prompt Name: {name}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <Box
                    sx={{
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#000',
                        mb: 2,
                        background: '#f4f8fd',
                        border: '1px solid #0C22E5',
                        borderRadius: '8px',
                        flex: '1',
                        height: '100%',
                        padding: '8px',
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    <img src={Language} alt="Prompt" style={{ width: '20px', marginTop: '-18px' }} />
                    <Box>
                        <Typography
                            sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '12px', marginBottom: '8px' }}
                        >
                            Language
                        </Typography>
                        <Typography>{language}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#000',
                        mb: 2,
                        background: '#f4f8fd',
                        border: '1px solid #0C22E5',
                        borderRadius: '8px',
                        flex: '1',
                        height: '100%',
                        padding: '8px',
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    <img src={Tone} alt="Prompt" style={{ width: '20px', marginTop: '-18px' }} />
                    <Box>
                        <Typography
                            sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '12px', marginBottom: '8px' }}
                        >
                            Tone
                        </Typography>
                        <Typography>{tone}</Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#000',
                        mb: 2,
                        background: '#f4f8fd',
                        border: '1px solid #0C22E5',
                        borderRadius: '8px',
                        flex: '1',
                        height: '100%',
                        padding: '8px',
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    <img src={Character} alt="Prompt" style={{ width: '20px', marginTop: '-18px' }} />
                    <Box>
                        <Typography
                            sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '12px', marginBottom: '8px' }}
                        >
                            Character
                        </Typography>
                        <Typography>{reply_character_limit}</Typography>
                    </Box>
                </Box>
            </Box>

            <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', mb: 0.5 }}>Description:</Typography>
            <Box
                sx={{
                    fontWeight: 300,
                    fontSize: '16px',
                    color: '#3A3D41',
                    lineHeight: '24px',
                    height: expand ? '' : '173px',
                    overflow: 'hidden'
                }}
            >
                {str.split('\n').map((item, i) => {
                    console.log(item);
                    return (
                        <Box
                            key={i}
                            sx={
                                {
                                    // color: '#f4f8fd',
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
