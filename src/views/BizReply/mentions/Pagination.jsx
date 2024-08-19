import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
// import MoreMentions from './MoreMentions';

export default function ({ data = [], postsPerPage = 2, setCurrentPosts, currentPage, setCurrentPage, recall }) {
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    React.useEffect(() => {
        const currentPosts = data?.slice?.(indexOfFirstPost, indexOfLastPost) || [];
        setCurrentPosts(currentPosts);
    }, [indexOfFirstPost, indexOfLastPost, recall]);
    const totalPages = Math.ceil(data.length / postsPerPage);
    // Handle Previous button click
    const handlePrevClick = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    // Handle Next button click
    const handleNextClick = () => {
        setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
    };
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'end' }}>
            {/* <MoreMentions /> */}
            {/* {...{ selectedKeyword, setMentionsDataObj, setMoreLoading, moreLoading, firstKeyword }} */}
            <CustomButton handleClick={handlePrevClick} disabled={currentPage === 1} direction="left" />
            <CustomButton handleClick={handleNextClick} disabled={currentPage === totalPages} direction="right" />
        </Box>
    );
}

function CustomButton({ handleClick, disabled = false, direction = 'left' }) {
    const { palette } = useTheme();
    return (
        <Typography
            sx={{
                background: palette.secondary.light,
                height: '48px',
                width: '48px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: disabled ? 0.5 : 1,
                cursor: 'pointer'
            }}
            onClick={() => !disabled && handleClick()}
            disabled={disabled}
        >
            <Typography
                component="span"
                sx={{
                    background: '#fff',
                    height: '46px',
                    width: '46px',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {direction === 'left' ? <FaAngleLeft size={14} color="#0C22E5" /> : <FaAngleRight size={14} color="#0C22E5" />}
            </Typography>
        </Typography>
    );
}
