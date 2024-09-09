/* eslint-disable jsx-a11y/alt-text */
// import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { changePrompt } from 'features/prompt/promptActions';
import BRAC from 'views/BizReply/BRAC';

export default function ({ projectListWidth = '280px' }) {
    const { prompts, selectedPrompt } = useSelector((s) => s.prompt);
    const options = prompts?.map?.(({ name: label, _id }) => ({ label, _id }));
    return (
        <>
            {options?.length ? (
                <BRAC
                    {...{
                        title: 'Choose prompt',
                        placeholder: 'Select Prompt',
                        options,
                        disableClearable: true,
                        defaultValue: options?.find?.((item) => item._id === selectedPrompt._id),
                        wrapperSx: {
                            width: projectListWidth
                        },
                        onChange: (_, data) => {
                            const id = data?._id;
                            if (id) {
                                changePrompt(id)();
                            }
                            return data;
                        }
                    }}
                />
            ) : (
                ''
            )}
        </>
    );
}
