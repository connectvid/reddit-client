import { Box, Typography } from '@mui/material';
import { FaCheck } from 'react-icons/fa6';

const KeywordSelection = ({ options, selectedKeywords, handleKeywordSelection }) => {
    return (
        <Box style={{ marginBottom: '10px' }}>
            <Typography variant="subtitle2" sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }}>
                Keywords
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap', // Allow items to wrap onto the next line
                    gap: 1, // Space between items
                    mt: 1,
                    width: '100%' // Full width of the container
                }}
            >
                {options.map((keyword, index) => {
                    return (
                        <Box
                            key={index}
                            component="div"
                            sx={{
                                cursor: 'pointer',
                                // p: 1, // Add some padding for better spacing
                                display: 'flex',
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                flex: '0 0 calc(50% - 8px)', // Each item takes approximately 50% minus gap space
                                boxSizing: 'border-box' // Include padding in width calculation
                            }}
                            onClick={() => {
                                // console.log(keyword);
                                handleKeywordSelection?.(keyword.title);
                            }}
                        >
                            <Typography sx={{}}>
                                {selectedKeywords?.includes(keyword.title) ? (
                                    <Typography
                                        component="span"
                                        sx={{
                                            height: '14px',
                                            width: '14px',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
                                        }}
                                    >
                                        <FaCheck size={10} color="#fff" />
                                    </Typography>
                                ) : (
                                    <Typography
                                        sx={{
                                            border: '1px solid #667185',
                                            background: '#fff',
                                            height: '14px',
                                            width: '14px',
                                            baorderRadius: '3px'
                                        }}
                                    />
                                )}
                            </Typography>
                            <Typography style={{ marginLeft: '10px', marginTop: '-3px' }}>{keyword.title}</Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default KeywordSelection;

// /* eslint-disable jsx-a11y/click-events-have-key-events */
// /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// /* eslint-disable no-undef */
// /* eslint-disable import/no-extraneous-dependencies */
// import { Autocomplete, Box, Modal, Typography } from '@mui/material';
// import { FaCheck } from 'react-icons/fa6';
// import SocialIcons from 'views/BizReply/SocialIcons';

// const KeywordSelection = ({ selectedKeywords, handleKeywordSelection }) => {
//     const options = [
//         { title: 'test1' },
//         { title: 'test2' },
//         { title: 'test3' },
//         { title: 'test4' },
//         { title: 'test5' },
//         { title: 'test6' },
//         { title: 'test7' }
//     ];
//     return (
//         <Box sx={{}}>
//             <Typography
//                 variant="subtitle2"
//                 sx={{ color: 'black', fontSize: '16px', fontWeight: 'bold' }} // Set font size and bold
//             >
//                 Keywords
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, width: '100%' }}>
//                 {options.map((keyword, index) => {
//                     return (
//                         <Box
//                             key={index}
//                             component="div"
//                             sx={{
//                                 cursor: 'pointer',
//                                 p: 0,
//                                 // border: `1px solid ${selectedKeywords?.includes(keyword.title) ? '#0C22E5' : '#CCD3D9'}`,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center',
//                                 // borderRadius: '10px',
//                                 // position: 'relative',
//                                 // flex: '0 0 50%'
//                                 width: '50%'
//                             }}
//                             onClick={() => {
//                                 handleKeywordSelection?.(keyword.title);
//                             }}
//                         >
//                             {/* <Typography sx={{ position: 'absolute', top: '-5px', right: '-5px' }}>
//                                 {selectedKeywords?.includes(keyword.title) ? (
//                                     <Typography
//                                         component="span"
//                                         sx={{
//                                             height: '14px',
//                                             width: '14px',
//                                             borderRadius: '4px',
//                                             display: 'flex',
//                                             justifyContent: 'center',
//                                             alignItems: 'center',
//                                             background: 'linear-gradient(92.84deg, #0C22E5 0%, #2A98D5 96.82%)'
//                                         }}
//                                     >
//                                         <FaCheck size={10} color="#fff" />
//                                     </Typography>
//                                 ) : (
//                                     <Typography
//                                         sx={{
//                                             border: '1px solid #667185',
//                                             background: '#fff',
//                                             height: '14px',
//                                             width: '14px',
//                                             baorderRadius: '3px'
//                                         }}
//                                     />
//                                 )}
//                             </Typography> */}
//                             <Typography>{keyword.title}</Typography>
//                         </Box>
//                     );
//                 })}
//             </Box>
//         </Box>
//     );
// };

// export default KeywordSelection;
