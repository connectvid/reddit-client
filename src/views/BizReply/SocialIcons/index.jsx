import { IconBrandReddit, IconBrandTiktok } from '@tabler/icons';
import { LinkedIn, Twitter, Facebook, Instagram, Pinterest } from '@mui/icons-material';
import IconQuora from 'ui-component/icons/IconQuora';

export default function ({ platform }) {
    if (platform === 'reddit.com')
        return (
            <IconBrandReddit
                style={{
                    background: '#ff4500',
                    padding: '5px',
                    height: '28px',
                    width: '28px',
                    borderRadius: '50%',
                    color: '#fff'
                }}
            />
        );
    if (platform === 'quora.com') return <IconQuora style={{ height: '28px', width: '28px', color: '#b82b27' }} />;
    if (platform === 'twitter.com') return <Twitter sx={{ height: '28px', width: '28px', color: '#17a3f1' }} />;
    if (platform === 'linkedin.com') return <LinkedIn sx={{ height: '28px', width: '28px', color: '#006699' }} />;
    if (platform === 'tiktok.com') return <IconBrandTiktok sx={{ height: '28px', width: '28px', color: '#FE2C55' }} />;
    if (platform === 'facebook.com') return <Facebook sx={{ height: '28px', width: '28px', color: '#006699' }} />;
    if (platform === 'instagram.com') return <Instagram sx={{ height: '28px', width: '28px', color: '#cd486b' }} />;
    if (platform === 'pinterest.com') return <Pinterest sx={{ height: '28px', width: '28px', color: '#e8443d' }} />;
    return <></>;
}
