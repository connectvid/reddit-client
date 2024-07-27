/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const MessageTemplates = () => {
    const [loading, setLoading] = useState(false);
    console.log({ loading });
    const handleChange = () => {};
    const inputFields = [
        {
            title: `Intors`,
            name: `intros`,
            fields: [
                {
                    defaultValue: `Hey there,`
                },
                {
                    defaultValue: `Hello (user.firstname),`
                },
                {
                    defaultValue: `Hi{user.firstname),`
                },
                {
                    defaultValue: `Good day (user.firstname),`
                }
            ]
        },
        {
            title: `Bodies`,
            name: `bodies`,
            fields: [
                {
                    defaultValue: `this is an automated cold outreach message sent with AutolGDM.`
                },
                {
                    defaultValue: `did you know that this messages was automatically created & sent to you with`
                },
                {
                    defaultValue: `this is an Al generated message to inform you about our new tool.`
                }
            ]
        },
        {
            title: `Outros`,
            name: `outros`,
            fields: [
                {
                    defaultValue: `Try it out yourself, just go to AutoIGDM.com`
                },
                {
                    defaultValue: `It's free to use and you can try it yourself on AutoIGDM.com`
                }
            ]
        }
    ];
    return (
        <Box>
            <Box sx={{ width: { lg: `90%` }, mx: `auto` }}>
                <Typography variant="h2" sx={{ my: 3 }}>
                    Message Templates
                </Typography>
                <Box sx={{ border: `1px solid #ddd`, borderRadius: `5px`, p: 3, bgcolor: `#fff` }}>
                    <Box sx={{ display: { lg: `flex`, md: `flex`, sm: 'block', gap: 5 } }}>
                        {inputFields.map(({ name, title, fields }) => (
                            <Box key={name} sx={{ mt: 3, display: 'block', width: `100%` }}>
                                <Typography variant="h4" sx={{ mb: 2 }}>
                                    {title}
                                </Typography>
                                <Box sx={{ mt: 3, display: 'block' }}>
                                    {fields?.map?.(({ defaultValue }, k) => (
                                        <TextField
                                            sx={{ mb: 2 }}
                                            multiline
                                            rows={2}
                                            fullWidth
                                            type="number"
                                            label={title}
                                            placeholder={`Enter ${title}...`}
                                            name={`${name}.${k}`}
                                            defaultValue={defaultValue}
                                            onChange={handleChange}
                                        />
                                    ))}

                                    <Typography sx={{ textAlign: `center` }}>
                                        <Button variant="outlined">+ One more</Button>
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    {/* <Typography sx={{ textAlign: `right`, mt: 2 }}>
                        <Button variant="contained" sx={{ cursor: `pointer` }}>
                            Save
                        </Button>
                    </Typography> */}
                </Box>
            </Box>
        </Box>
    );
};

export default MessageTemplates;
