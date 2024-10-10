import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import BRAC from 'views/BizReply/BRAC';

const PostFilter = ({
    placeholder = 'Choose Keyword',
    setSelectedKeyword,
    loading,
    initFirstPage,
    width,
    sx = {},
    wrapperSx = {},
    defaultKeyword
}) => {
    const {
        project
        // createKeywordSuccess
        // selectedPlatform // projectCreated
    } = useSelector((state) => state.project);

    const keywords = project?.Suggestedkeywords;
    const defaultValue = { title: 'All Keywords' };
    const dK = defaultKeyword || defaultValue;
    return (
        <Box>
            {(!loading && keywords?.length && (
                <BRAC
                    {...{
                        title: placeholder,
                        placeholder: 'Select keyword',
                        options: [defaultValue, ...keywords],
                        getOptionLabel: (item) => item.title,
                        disableClearable: true,
                        disablePortal: true,
                        defaultValue: dK,
                        wrapperSx: {
                            minWidth: width,
                            ...wrapperSx
                        },
                        onChange: (_, v) => {
                            const title = v || defaultValue;
                            setSelectedKeyword(title);
                            initFirstPage?.();
                        },
                        sx: { ...sx }
                    }}
                />
            )) ||
                ''}
        </Box>
    );
};
export default PostFilter;
