import { Autocomplete, Box, TextField } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';
import { useSelector } from 'react-redux';

const PostFilter = ({ placeholder = 'Choose Your Keyword', setSelectedKeyword, loading, keywordsWidth = '210px' }) => {
    const {
        project
        // createKeywordSuccess
        // selectedPlatform // projectCreated
    } = useSelector((state) => state.project);

    const keywords = project?.Suggestedkeywords;
    const defaultKeyword = { title: 'All Keywords' };
    return (
        <Box>
            {(!loading && keywords?.length && (
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={[defaultKeyword, ...keywords]}
                    sx={{
                        width: keywordsWidth
                    }}
                    popupIcon={<IconChevronDown size={20} />}
                    defaultValue={defaultKeyword}
                    getOptionLabel={(item) => item.title}
                    onChange={(_, v) => {
                        const title = v || defaultKeyword;
                        setSelectedKeyword(title);
                    }}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            fullWidth
                            {...params}
                            sx={{
                                height: '40px',
                                input: {
                                    px: '20px!important',
                                    py: `1px!important`
                                },
                                fieldset: {
                                    borderRadius: '10px',
                                    borderColor: '#CCD3D9 !important'
                                }
                            }}
                            placeholder={placeholder}
                        />
                    )}
                />
            )) ||
                ''}
        </Box>
    );
};
export default PostFilter;