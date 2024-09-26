const { default: SocialIcon } = require('./SocialIcon');

const ShowSocialIcons = ({ platforms }) => {
    return (
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', marginLeft: '20px' }}>
            {platforms.map((platform) => (
                <div key={platform} style={{ marginLeft: '-15px' }}>
                    <SocialIcon key={platform} platform={platform} />
                </div>
            ))}
        </div>
    );
};

export default ShowSocialIcons;
