/* eslint-disable no-lone-blocks */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Box, Typography } from '@mui/material';
import Prompt from 'assets/images/svgIcons/prompt.svg';
import Character from 'assets/images/svgIcons/character.svg';
import Tone from 'assets/images/svgIcons/tone.svg';
import Language from 'assets/images/svgIcons/language.svg';
import { IconTrash } from '@tabler/icons';

const CardDetails = ({ language, tone, reply_character_limit, description, name, expand = false, handleDelete }) => {
    const str = description;

    // const str = expand allowDescriptionLength,
    // ? description
    // : description?.length > allowDescriptionLength
    // ? `${description.substring(0, allowDescriptionLength)}`
    // : description;

    // src  title       subtitle
    // Language, Language language
    // Tone Tone tone
    // style={{ width: '20px', marginTop: '-22px' }} 2
    // Character, Character, reply_character_limit
    return (
        <Box>
            <Box sx={{ display: 'flex', mb: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex' }}>
                    <img src={Prompt} alt="Prompt" style={{ width: '20px' }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#000', ml: 2 }}>Prompt Name: {name}</Typography>
                </Box>
                <Typography
                    onClick={handleDelete}
                    sx={{
                        // border: '1px solid #0c22e5',
                        // height: '40px',
                        // width: '95px',
                        // borderRadius: '10px',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        display: 'flex',
                        cursor: 'pointer'
                    }}
                >
                    <IconTrash style={{ color: '#6E7478' }} size={20} />
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <Tags {...{ src: Language, title: 'Language', subtitle: language }} />
                <Tags {...{ src: Tone, title: 'Tone', subtitle: tone, srcStyle: { width: '18px', marginTop: '-8px' } }} />
                <Tags
                    {...{
                        src: Character,
                        title: 'Character',
                        subtitle: reply_character_limit,
                        srcStyle: { width: '14px', marginTop: '-8px' }
                    }}
                />
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

const Tags = ({ src, srcStyle = {}, title, subtitle }) => {
    return (
        <Box
            sx={{
                fontWeight: 700,
                fontSize: '16px',
                color: '#000',
                mb: 2,
                background: '#f4f8fd',
                border: '1px solid #0C22E5',
                borderRadius: '8px',
                // flex: '1',
                width: '100%',
                height: '100%',
                padding: '8px',
                // display: 'flex',
                gap: 0.5
                // alignItems: 'center'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <img src={src} alt="Prompt" style={{ width: '20px', ...srcStyle }} />
                <Typography sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '10px', marginBottom: '8px' }}>
                    {title}
                </Typography>
            </Box>
            <Typography sx={{ fontSize: '12.5px', textAlign: 'right' }}>{subtitle}</Typography>
        </Box>
    );
};

{
    /* <Box
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
                gap: '5px',
                alignItems: 'center'
            }}
        >
            <img src={src} alt="Prompt" style={{ width: '20px', marginTop: '-22px', ...srcStyle }} />
            <Box>
                <Typography sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '12px', marginBottom: '8px' }}>
                    {title}
                </Typography>
                <Typography>{subtitle}</Typography>
            </Box>
        </Box> */
}
{
    /* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
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
        gap: '5px',
        alignItems: 'center'
    }}
>
    <img src={Language} alt="Prompt" style={{ width: '20px', marginTop: '-22px' }} />
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
    <img src={Tone} alt="Prompt" style={{ width: '20px', marginTop: '-22px' }} />
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
    <img src={Character} alt="Prompt" style={{ width: '14px', marginTop: '-22px' }} />
    <Box>
        <Typography
            sx={{ color: '#6E7478', fontWeight: '300', textTransform: 'uppercase', fontSize: '12px', marginBottom: '8px' }}
        >
            Character
        </Typography>
        <Typography>{reply_character_limit}</Typography>
    </Box>
</Box>
</Box> */
}
