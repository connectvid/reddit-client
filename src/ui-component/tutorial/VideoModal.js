/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Dialog } from '@mui/material';

export default function VideoModal({ isModalOpen, setIsModalOpen }) {
    return (
        <Dialog
            onClose={() => setIsModalOpen(false)}
            open={isModalOpen}
            sx={{
                '.MuiPaper-root.MuiPaper-elevation': {
                    width: { xs: '95%', sm: '85%', md: '75%', },
                    maxWidth: '100%',
                    // height: { xs: '60%', sm: '65%', md: '75%', },
                }
            }}
        >
            <iframe
                // width={hw?.width || '560'}
                width="100%"
                // height={hw?.height || '315'}
                // height="100%"
                src="https://www.youtube.com/embed/fJxIcP5eTgI"
                title="YouTube video player"
                allowFullScreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
                allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture fullscreen"
            />
        </Dialog>
    );
}
