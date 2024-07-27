/* eslint-disable one-var */
/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable consistent-return */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';
// import { debounce } from 'lodash';
import { IconThumbUp } from '@tabler/icons';
import GridTable from './GridTable';
import SearchArea from './SearchArea';
import LeadArea from './LeadArea';
import LeadFiltering from './LeadFiltering';

// const defaultLeads = {
//     pk: `ffsfa`,
//     username: 'fsdkf',
//     full_name: `fsdfd`,
//     is_private: 'fksdjkfsdj',
//     is_verified: `fffsd`,
//     profile_pic_url: `osfjsdfkjsd`,
//     pk_id: `fsdjfks`
// };
const Audience = () => {
    const [loading, setLoading] = React.useState(false);
    const [searchQry, setSearchQry] = React.useState('');
    const [searchBy, setSearchBy] = React.useState();
    const [isFilterd, setIsFilterd] = React.useState(false);
    const [leads, setLeads] = React.useState([]);
    const [filteredLeads, setFilterLeads] = React.useState([]);
    // const [leadIDs, setLeadIDs] = React.useState([]);
    const [dataItems, setDataItems] = React.useState([]);
    const [nextPageId, setNextPageId] = React.useState('');
    const [apiUrl, setApiUrl] = React.useState('');
    const { getAccessToken } = useAuth();

    const searchHander = async ({ sq = searchQry, sb = searchBy, npd = nextPageId, aurl = apiUrl }) => {
        const token = await getAccessToken();
        try {
            const searchObj = { search_str: sq, search_by: sb, ...(npd ? { next_page: npd } : {}) };

            if (!sq) return;
            setLeads([]);
            setLoading(true);

            const {
                data: { items = [], next_page_id }
            } = await axios.post(`audiences/${aurl}`, searchObj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log({ items });
            if (items?.length) {
                if (nextPageId) {
                    setLeads((p) => [...p, ...items]);
                    setFilterLeads((p) => [...p, ...items]);
                } else {
                    setLeads(items);
                    setFilterLeads(items);
                }
                // setSearchQry('');
            }
            setDataItems?.([]);
            if (next_page_id) {
                setNextPageId?.(next_page_id);
            } else if (nextPageId) {
                setNextPageId?.('');
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

    const columns = [
        {
            field: 'comment_count',
            minWidth: 120,
            headerName: 'Comment count',
            align: 'center',
            headerAlign: 'center',
            sortable: false
        },

        {
            field: 'like_count',
            minWidth: 120,
            headerName: 'Like count',
            align: 'center',
            headerAlign: 'center',
            sortable: false
        },

        {
            field: 'caption_text',
            minWidth: 200,
            headerName: 'Caption text',
            align: 'center',
            headerAlign: 'center',
            sortable: false
        },
        {
            field: 'actions',
            flex: 0.5,
            align: 'center',
            headerAlign: 'center',
            headerName: 'Act',
            minWidth: 50,
            sortable: false,
            renderCell: ({ row: { code } }) => (
                <Box sx={{ textAlign: 'center', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    {/* <div style={{ cursor: 'pointer' }} onClick={() => deleteAccount(row._id)}>
                        <IconTrash />
                    </div> */}
                    <Button
                        onClick={() => {
                            const sq = `https://www.instagram.com/p/${code}`,
                                sb = 'media_url',
                                aurl = 'media-url';

                            setSearchQry(sq);
                            setSearchBy(sb);
                            setApiUrl(aurl);
                            searchHander({ sb, sq, aurl });
                        }}
                    >
                        <IconThumbUp />
                    </Button>
                </Box>
            )
        }
    ];

    return (
        <>
            <Card sx={{ mb: 5 }}>
                <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h2" style={{ marginRight: 'auto' }}>
                        Audience
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ width: `100%`, position: `relative` }}>
                <SearchArea
                    {...{
                        nextPageId,
                        loading,
                        searchQry,
                        searchBy,
                        setSearchBy,
                        setNextPageId,
                        setSearchQry,
                        setLoading,
                        setLeads,
                        setFilterLeads,
                        dataItems,
                        setDataItems,
                        apiUrl,
                        setApiUrl,
                        searchHander
                    }}
                />
                {(!loading && dataItems?.length && (
                    <Box
                        sx={{ position: `absolute`, top: `55px`, width: `485px`, left: `30%`, bgcolor: `#fff`, borderRadius: `5px` }}
                        className="hashtag_view_table"
                    >
                        <GridTable {...{ columns, items: dataItems, sx: { minHeight: { sm: '5vh', md: '5vh' } }, hideFooter: true }} />
                    </Box>
                )) ||
                    ''}
            </Box>
            <LeadFiltering {...{ leads, haveLeads: Boolean(leads?.length), filteredLeads, setFilterLeads, setIsFilterd }} />
            {!loading && filteredLeads.length > 0 && <LeadArea {...{ setFilterLeads, filteredLeads }} />}
            {loading && (
                <Box styel={{ textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </Box>
            )}
        </>
    );
};

export default Audience;
