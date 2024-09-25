import fb from '../../../../assets/images/social/fb.webp';
import quora from '../../../../assets/images/social/quora.png';
import insta from '../../../../assets/images/social/insta.png';
import reddit from '../../../../assets/images/social/reddit.png';
import linkedin from '../../../../assets/images/social/linkedin.png';
import pinterest from '../../../../assets/images/social/pinterest.png';
import tiktok from '../../../../assets/images/social/tiktok.png';
import twitter from '../../../../assets/images/social/twitter.png';

export default function ({ platform }) {
    // if (platform === 'reddit.com')
    //     return (
    //         <img
    //             src={reddit}
    //             alt="reddit"
    //             style={{
    //                 // background: '#ff4500',
    //                 padding: '5px',
    //                 height: '28px',
    //                 width: '28px',
    //                 borderRadius: '50%',
    //                 color: '#fff'
    //             }}
    //         />
    //     );
    if (platform === 'reddit.com') return <img src={reddit} alt="reddi" style={{ height: '28px', width: '28px', color: '#b82b27' }} />;
    if (platform === 'quora.com') return <img src={quora} alt="quora" style={{ height: '28px', width: '28px', color: '#b82b27' }} />;
    if (platform === 'twitter.com') return <img src={twitter} alt="twitter" style={{ height: '28px', width: '28px', color: '#17a3f1' }} />;
    if (platform === 'linkedin.com')
        return <img src={linkedin} alt="linkedin" style={{ height: '28px', width: '28px', color: '#006699' }} />;
    if (platform === 'tiktok.com') return <img src={tiktok} alt="tiktok" style={{ height: '28px', width: '28px', color: '#FE2C55' }} />;
    if (platform === 'facebook.com') return <img src={fb} alt="fb" style={{ height: '28px', width: '28px', color: '#006699' }} />;
    if (platform === 'instagram.com') return <img src={insta} alt="insta" style={{ height: '28px', width: '28px', color: '#cd486b' }} />;
    if (platform === 'pinterest.com')
        return <img src={pinterest} alt="pinterest" style={{ height: '28px', width: '28px', color: '#e8443d' }} />;
    return <></>;
}
