import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import BRAC from 'views/BizReply/BRAC';

const PostFilter = ({ placeholder = 'Choose Keyword', setSelectedKeyword, loading, initFirstPage }) => {
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
                <BRAC
                    {...{
                        title: placeholder,
                        placeholder: 'Select keyword',
                        options: [defaultKeyword, ...keywords],
                        getOptionLabel: (item) => item.title,
                        disableClearable: true,
                        disablePortal: true,
                        defaultValue: defaultKeyword,
                        wrapperSx: {
                            minWidth: '280px'
                        },
                        onChange: (_, v) => {
                            const title = v || defaultKeyword;
                            setSelectedKeyword(title);
                            initFirstPage?.();
                        }
                    }}
                />
                // <Autocomplete
                //     disablePortal
                //     id="combo-box-demo"
                //     options={[defaultKeyword, ...keywords]}
                //     sx={{
                //         width: keywordsWidth
                //     }}
                //     popupIcon={<IconChevronDown size={20} />}
                //     defaultValue={defaultKeyword}
                //     getOptionLabel={(item) => item.title}
                //     onChange={(_, v) => {
                //         const title = v || defaultKeyword;
                //         setSelectedKeyword(title);
                //         initFirstPage?.();
                //     }}
                //     disableClearable
                //     renderInput={(params) => (
                //         <TextField
                //             fullWidth
                //             {...params}
                //             sx={{
                //                 height: '40px',
                //                 input: {
                //                     px: '20px!important',
                //                     py: `1px!important`
                //                 },
                //                 fieldset: {
                //                     borderRadius: '10px',
                //                     borderColor: '#CCD3D9 !important'
                //                 }
                //             }}
                //             placeholder={placeholder}
                //         />
                //     )}
                // />
            )) ||
                ''}
        </Box>
    );
};
export default PostFilter;
