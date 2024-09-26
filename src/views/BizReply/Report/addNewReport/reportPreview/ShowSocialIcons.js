import SocialIcon from '../../viewReports/SocialIcon';

const ShowSocialIcons = ({ platforms }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', padding: '5px', overflow: 'auto' }}>
            {platforms.map((platform) => (
                <div key={platform} style={{ marginLeft: '-5px' }}>
                    <SocialIcon key={platform} platform={platform} />
                </div>
            ))}
            {/* {platforms.map((platform) => (
                <div style={{ marginLeft: '-5px' }}>
                    <SocialIcon key={platform} platform={platform} />
                </div>
            ))} */}
        </div>
    );
};

export default ShowSocialIcons;
