/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputAdornment,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
import axios from 'utils/axios';

const SearchArea = ({
    nextPageId,
    loading,
    searchQry,
    searchBy,
    setSearchBy,
    setNextPageId,
    setSearchQry,
    setLoading,
    setDataItems,
    apiUrl,
    setApiUrl,
    searchHander,
    setLeads
}) => {
    const allSearchTypes = [
        { label: `Media Url`, value: `media_url`, api_url: `media-url` },
        { label: `User followers`, value: `user_followers`, api_url: `user-followers` },
        { label: `User following`, value: `user_following`, api_url: `user-following` },
        { label: `Hashtag`, value: `hashtag`, api_url: `hashtag` }
    ];
    const { getAccessToken } = useAuth();

    const multiSearchHander = async () => {
        const token = await getAccessToken();
        try {
            if (!searchQry) return;
            setLeads([]);
            setLoading(true);
            const searchObj = { search_str: searchQry, search_by: searchBy, ...(nextPageId ? { next_page: nextPageId } : {}) };
            // console.log({ searchObj, nextPageId });
            const {
                data: { items = [], next_page_id }
            } = await axios.post(`audiences/${apiUrl}`, searchObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log({ items });
            // if (items?.length) {
            //     if (nextPageId) setDataItems((p) => [...p, ...items]);
            //     else setDataItems(items);
            //     // setSearchQry('');
            // }
            setDataItems(items);
            if (next_page_id) {
                setNextPageId(next_page_id);
            } else if (nextPageId) {
                setNextPageId('');
            }
        } catch (e) {
            const status = e?.response?.status || 500;
            let message = `Something Went Wrong!`;
            if (status < 500) {
                message = e?.response?.data?.message || e.message;
            }
            toast.error(message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const changeHandler = ({ target: { value } }) => {
        setSearchQry(value);
    };

    return (
        <Box sx={{}}>
            <Box sx={{ width: '40%', m: `0 auto` }}>
                <TextField
                    id="outlined-start-adornment"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment
                                onClick={() => {
                                    if (loading || !searchBy || !searchQry) return;

                                    if (searchBy === 'hashtag') {
                                        multiSearchHander({});
                                    } else {
                                        searchHander({});
                                    }
                                }}
                                sx={{ cursor: loading || !searchBy || !searchQry ? `not-allowed` : `pointer` }}
                                position="end"
                            >
                                {loading ? (
                                    <CircularProgress sx={{ width: `23px !important`, height: `23px !important` }} />
                                ) : (
                                    <IconSearch style={{ opacity: loading || !searchBy || !searchQry ? 0.2 : 1 }} />
                                )}
                            </InputAdornment>
                        )
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={changeHandler}
                    // onChange={debounce(changeHandler, 400)}
                    type="search"
                    label="Enter search input"
                    placeholder=" "
                />
                {(nextPageId && (
                    <Button
                        disabled={loading}
                        onClick={() => {
                            if (nextPageId) {
                                searchHander({ target: { value: searchQry } });
                            }
                        }}
                        variant="contained"
                    >
                        {/* {nextPageId} */}
                        Next
                    </Button>
                )) ||
                    ''}
            </Box>
            <Box>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Search Type</FormLabel>
                    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                        {allSearchTypes.map((item) => (
                            <FormControlLabel
                                key={item.value}
                                onChange={({ target: { value } }) => {
                                    setSearchBy(value);
                                    setApiUrl(item.api_url);
                                    if (nextPageId) {
                                        setNextPageId(``);
                                    }
                                }}
                                required
                                control={<Radio />}
                                {...item}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SearchArea;
