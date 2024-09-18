import { Box, Typography } from '@mui/material';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { OPEN_AI_MODELS, STRAICO_MODELS } from 'data';
import React from 'react';

export default function ({ selectedModel, setSelectedModel }) {
    const openAi = 'ai-logo/open-ai.png';
    // const gemini = 'ai-logo/gemini.png';
    const straico = 'ai-logo/straico.svg';
    const options = [
        ...OPEN_AI_MODELS.map((item) => ({ label: item, model: item, modelGroupName: 'OpenAi', iconSrc: openAi })),
        ...STRAICO_MODELS.map((item) => ({ label: item, model: item, modelGroupName: 'Straico', iconSrc: straico }))
    ];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen((p) => !p);
    const handleSelectedModel = (model) => {
        setSelectedModel(model);
        handleClose();
    };

    return (
        <Box>
            <Box sx={{ position: 'relative', mt: 3 }}>
                <Box
                    sx={{
                        overflowY: 'scroll',
                        height: '254px',
                        maxWidth: '100%',
                        position: 'absolute',
                        bottom: '58px',
                        background: '#fff',
                        width: '100%',
                        boxShadow: '0px 16px 50px 0px #12052242',
                        borderRadius: '10px',
                        display: open ? 'block' : 'none'
                    }}
                >
                    {options.map((item) => (
                        <Box
                            key={item.value}
                            sx={{
                                display: 'flex',
                                height: '42px',
                                alignItems: 'center',
                                px: 3,
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'rgba(0,0,0,0.1)'
                                },
                                transition: '0.4s all ease-in-out'
                            }}
                            onClick={() => handleSelectedModel(item)}
                        >
                            <img src={item.iconSrc} alt={item.model} style={{ maxWidth: '20px' }} />
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }}>{item.model}</Typography>
                        </Box>
                    ))}
                </Box>
                <Typography sx={{ fontSize: '16px', fontWeight: 700, color: '#000', mb: 2 }}>Choose language model</Typography>
                <Box
                    sx={{
                        border: '1px solid #6E7478',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '10px',
                        justifyContent: 'space-between',
                        px: 2,
                        cursor: 'pointer'
                    }}
                    onClick={handleToggle}
                >
                    {/* <Box sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }}></Box> */}
                    {selectedModel ? (
                        <Box
                            sx={{
                                display: 'flex',
                                height: '42px',
                                alignItems: 'center',
                                px: 2,
                                cursor: 'pointer',

                                transition: '0.4s all ease-in-out'
                            }}
                        >
                            <img src={selectedModel.iconSrc} alt={selectedModel.model} style={{ maxWidth: '20px' }} />
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }}>{selectedModel.model}</Typography>
                        </Box>
                    ) : (
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }}>Choose language model</Typography>
                    )}
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1, display: 'flex', alignItems: 'center' }}>
                        {!open ? <IconChevronDown /> : <IconChevronUp />}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
