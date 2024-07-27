/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { v4 as uuidv4 } from 'uuid';

const MessageTemplates = ({ intros, setIntros, bodies, setBodies, outros, setOutros }) => {
    const handleChange = (e, type, index) => {
        const { name, value } = e.target;
        if (type === 'intro') {
            const updatedIntros = intros.map((intro, i) => (i === index ? { ...intro, [name]: value } : intro));
            setIntros(updatedIntros);
        } else if (type === 'body') {
            const updatedBodies = bodies.map((body, i) => (i === index ? { ...body, [name]: value } : body));
            setBodies(updatedBodies);
        } else if (type === 'outro') {
            const updatedOutros = outros.map((outro, i) => (i === index ? { ...outro, [name]: value } : outro));
            setOutros(updatedOutros);
        }
    };

    const handleAddMore = (type) => {
        if (type === 'intro') {
            setIntros([...intros, { id: uuidv4(), defaultValue: '' }]);
        } else if (type === 'body') {
            setBodies([...bodies, { id: uuidv4(), defaultValue: '' }]);
        } else if (type === 'outro') {
            setOutros([...outros, { id: uuidv4(), defaultValue: '' }]);
        }
    };

    const handleDelete = (type, index) => {
        if (type === 'intro') {
            const updatedIntros = intros.filter((_, i) => i !== index);
            setIntros(updatedIntros);
        } else if (type === 'body') {
            const updatedBodies = bodies.filter((_, i) => i !== index);
            setBodies(updatedBodies);
        } else if (type === 'outro') {
            const updatedOutros = outros.filter((_, i) => i !== index);
            setOutros(updatedOutros);
        }
    };

    return (
        <Box>
            <Box>
                <Box sx={{ width: { lg: '90%' }, mx: 'auto', mt: 10 }}>
                    <Typography variant="h2" sx={{ my: 3 }}>
                        Message Templates
                    </Typography>
                    <Box sx={{ border: '1px solid #ddd', borderRadius: '5px', p: 3, bgcolor: '#fff' }}>
                        <Box sx={{ display: { lg: 'flex', md: 'flex', sm: 'block', gap: 5 } }}>
                            <Box sx={{ mt: 3, display: 'block', width: '100%' }}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    Intros
                                </Typography>
                                <Box sx={{ mt: 3, display: 'block' }}>
                                    {intros.map(({ id, defaultValue }, k) => (
                                        <Box key={id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <TextField
                                                sx={{ flex: 1, mr: 1 }}
                                                multiline
                                                rows={2}
                                                fullWidth
                                                label="Intro"
                                                placeholder="Enter intro..."
                                                name="defaultValue"
                                                defaultValue={defaultValue}
                                                onChange={(e) => handleChange(e, 'intro', k)}
                                            />
                                            <IconButton onClick={() => handleDelete('intro', k)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" onClick={() => handleAddMore('intro')}>
                                            + One more
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3, display: 'block', width: '100%' }}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    Bodies
                                </Typography>
                                <Box sx={{ mt: 3, display: 'block' }}>
                                    {bodies.map(({ id, defaultValue }, k) => (
                                        <Box key={id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <TextField
                                                sx={{ flex: 1, mr: 1 }}
                                                multiline
                                                rows={2}
                                                fullWidth
                                                label="Body"
                                                placeholder="Enter body..."
                                                name="defaultValue"
                                                defaultValue={defaultValue}
                                                onChange={(e) => handleChange(e, 'body', k)}
                                            />
                                            <IconButton onClick={() => handleDelete('body', k)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" onClick={() => handleAddMore('body')}>
                                            + One more
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 3, display: 'block', width: '100%' }}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    Outros
                                </Typography>
                                <Box sx={{ mt: 3, display: 'block' }}>
                                    {outros.map(({ id, defaultValue }, k) => (
                                        <Box key={id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <TextField
                                                sx={{ flex: 1, mr: 1 }}
                                                multiline
                                                rows={2}
                                                fullWidth
                                                label="Outro"
                                                placeholder="Enter outro..."
                                                name="defaultValue"
                                                defaultValue={defaultValue}
                                                onChange={(e) => handleChange(e, 'outro', k)}
                                            />
                                            <IconButton onClick={() => handleDelete('outro', k)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Typography sx={{ textAlign: 'center' }}>
                                        <Button variant="outlined" onClick={() => handleAddMore('outro')}>
                                            + One more
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        {/* <Typography sx={{ textAlign: 'right', mt: 2 }}>
                            <Button variant="contained" sx={{ cursor: 'pointer' }}>
                                Save
                            </Button>
                        </Typography> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default MessageTemplates;
