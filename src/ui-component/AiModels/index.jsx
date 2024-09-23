import { Box } from '@mui/material';
import { GEMINI_MODELS, OPEN_AI_MODELS, STRAICO_MODELS } from 'data';
import React from 'react';
import { useSelector } from 'react-redux';
import BRInput2 from 'ui-component/bizreply/BRInput2';
import ModelSelect from './ModelSelect';

export default function ({
    selectedModel,
    setSelectedModel,
    selectedItemSx = {},
    aIkey,
    setAIkey,
    needAddAIkey,
    setNeedAddAIkey,
    setActionType
}) {
    const {
        aiModel: { aiModelsGroup, aiModelsString }
    } = useSelector((s) => s);
    const openAi = 'ai-logo/open-ai.png';
    const gemini = 'ai-logo/gemini.png';
    const straico = 'ai-logo/straico.svg';
    const aiImages = {
        OpenAi: openAi,
        Straico: straico,
        Gemini: gemini
    };
    const options = [
        ...OPEN_AI_MODELS.map((item) => ({ label: item, model: item, modelGroupName: 'OpenAi' })),
        ...GEMINI_MODELS.map((item) => ({ label: item, model: item, modelGroupName: 'Gemini' })),
        ...STRAICO_MODELS.map((item) => ({ label: item, model: item, modelGroupName: 'Straico' }))
    ];
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleToggle = () => setOpen((p) => !p);
    console.log({ needAddAIkey });

    const handleSelectedModel = (model) => {
        if (aiModelsGroup[model?.modelGroupName] && !aiModelsString?.includes?.(model?.model)) {
            setActionType?.('update');
        } else if (aiModelsGroup[model?.modelGroupName] && aiModelsString?.includes?.(model?.model) && !needAddAIkey) {
            setActionType?.('');
        }
        setSelectedModel(model);
        handleClose();
    };

    const handleAPIKeyEdit = () => {
        setNeedAddAIkey?.(true);
        if (aiModelsGroup[selectedModel?.modelGroupName] && aiModelsString?.includes?.(selectedModel?.model)) {
            setActionType?.('');
            // setAIkey(Date.now().toString());
        } else {
            setActionType?.('update');
            setAIkey(Date.now().toString());
        }
        handleClose();
    };
    const handleAPIKeyEditCancel = () => {
        setNeedAddAIkey?.(false);
        setAIkey('');
        handleClose();
    };
    return (
        <Box>
            <ModelSelect
                {...{
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
                    needAddAIkey
                }}
            />
            {needAddAIkey ? (
                <Box
                    sx={{
                        mt: 2
                        // border: '1px solid #6E7478',
                        // height: '48px',
                        // display: 'flex',
                        // alignItems: 'center',
                        // borderRadius: '10px',
                        // justifyContent: 'space-between',
                        // px: 2,
                        // cursor: 'pointer'
                    }}
                    // onClick={handleToggle}
                >
                    <BRInput2
                        placeholder="Enter API Key"
                        fullWidth
                        required
                        value={aIkey}
                        name="aIkey"
                        label="AI key"
                        onChange={({ target: { value = '' } }) => {
                            setAIkey(value);
                        }}
                    />
                </Box>
            ) : (
                ''
            )}
        </Box>
    );
}
