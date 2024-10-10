import { Box, Typography } from '@mui/material';
import { IconChevronDown, IconChevronUp, IconCircleX, IconPencil } from '@tabler/icons';

export default function ({
    open,
    options,
    aiModelsString,
    handleSelectedModel,
    aiImages,
    handleAPIKeyEdit,
    handleAPIKeyEditCancel,
    handleToggle,
    selectedModel,
    selectedItemSx,
    aiModelsGroup,
    needAddAIkey,
    handleClose
}) {
    return (
        <Box sx={{ position: 'relative', mt: 3 }}>
            {open ? (
                <ModelList
                    {...{ aiImages, aiModelsString, handleAPIKeyEdit, handleAPIKeyEditCancel, handleSelectedModel, open, options }}
                />
            ) : (
                ''
            )}
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
                // onClick={handleToggle}
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
                            transition: '0.4s all ease-in-out',
                            width: '100%',
                            ...selectedItemSx
                        }}
                        onClick={handleToggle}
                        tabIndex={0}
                        onBlur={() => {
                            if (open) {
                                setTimeout(() => {
                                    handleClose?.();
                                }, 500);
                            }
                        }}
                    >
                        <img src={aiImages?.[selectedModel?.modelGroupName]} alt={selectedModel?.model} style={{ maxWidth: '20px' }} />
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1, width: '100%' }}>
                            {selectedModel?.model} ({selectedModel?.modelGroupName === 'OpenAi' ? 'OpenAI' : selectedModel?.modelGroupName})
                        </Typography>
                    </Box>
                ) : (
                    <Typography
                        onClick={handleToggle}
                        sx={{
                            fontSize: '14px',
                            fontWeight: 400,
                            ml: 1,
                            width: '100%',
                            height: '42px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        Choose language model
                    </Typography>
                )}
                {aiModelsGroup[selectedModel?.modelGroupName] ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {needAddAIkey ? (
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEditCancel}>
                                <IconCircleX size={18} />
                            </Typography>
                        ) : (
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEdit}>
                                <IconPencil size={18} />
                            </Typography>
                        )}
                    </Box>
                ) : (
                    ''
                )}
                {/* {aiModelsString?.includes?.(selectedModel?.model) ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEdit}>
                            <IconPencil size={18} />
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEditCancel}>
                            <IconCircleX size={18} />
                        </Typography>
                    </Box>
                ) : (
                    ''
                )} */}
                <Typography onClick={handleToggle} sx={{ fontSize: '14px', fontWeight: 400, ml: 1, display: 'flex', alignItems: 'center' }}>
                    {!open ? <IconChevronDown /> : <IconChevronUp />}
                </Typography>
            </Box>
        </Box>
    );
}

const ModelList = ({ open, options, aiModelsString, handleSelectedModel, aiImages }) => (
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
        {options?.map?.((item) => (
            <Box
                key={item.value}
                sx={{
                    display: 'flex',
                    height: '42px',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 3,
                    cursor: 'pointer',
                    '&:hover': {
                        background: 'rgba(0,0,0,0.1)'
                    },
                    background: aiModelsString?.includes?.(item.model) ? 'rgba(0,0,0,0.05)' : '',
                    transition: '0.4s all ease-in-out'
                }}
                // onClick={() => handleSelectedModel(item)}
            >
                <Box
                    onClick={() => handleSelectedModel(item)}
                    sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}
                >
                    <img src={aiImages?.[item?.modelGroupName]} alt={item.model} style={{ maxWidth: '20px' }} />
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }}>
                        {item.model} ({item?.modelGroupName === 'OpenAi' ? 'OpenAI' : item?.modelGroupName})
                    </Typography>
                </Box>
                {/* {aiModelsString?.includes?.(item.model) ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEdit}>
                            <IconPencil size={18} />
                        </Typography>
                        <Typography sx={{ fontSize: '14px', fontWeight: 400, ml: 1 }} onClick={handleAPIKeyEditCancel}>
                            <IconCircleX size={18} />
                        </Typography>
                    </Box>
                ) : (
                    ''
                )} */}
            </Box>
        ))}
    </Box>
);
