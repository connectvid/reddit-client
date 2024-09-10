import { ButtonGroup, Button } from '@mui/material';
import GradinentText from 'ui-component/GradinentText';

const SubscriptionToggleButton = ({ selected, setSelected }) => {
    const notSelectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#000',
        backgroundColor: '#fff',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none'
    };
    const selectedStyle = {
        borderRadius: '25px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'blue',
        backgroundColor: '#f1f1f1',
        textTransform: 'none',
        padding: '6px 12px',
        border: 'none'
    };

    return (
        <ButtonGroup
            disableElevation
            style={{ dixplay: 'flex', gap: '10px', width: '100%', padding: '10px', background: '#fff', borderRadius: '50px' }}
        >
            <Button
                sx={{ flex: 1 }}
                onClick={() => setSelected('lifetime')}
                style={selected === 'lifetime' ? selectedStyle : notSelectedStyle}
            >
                {selected === 'lifetime' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Billed Lifetime</GradinentText>
                ) : (
                    <span>Billed Lifetime</span>
                )}
            </Button>
            <Button
                sx={{ flex: 1 }}
                onClick={() => setSelected('monthly')}
                style={selected === 'monthly' ? selectedStyle : notSelectedStyle}
            >
                {selected === 'monthly' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Billed Monthly</GradinentText>
                ) : (
                    <span>Billed Monthly</span>
                )}
            </Button>
            <Button sx={{ flex: 1 }} onClick={() => setSelected('yearly')} style={selected === 'yearly' ? selectedStyle : notSelectedStyle}>
                {selected === 'yearly' ? (
                    <GradinentText sx={{ fontWeight: 'bold', fontSize: '16px' }}>Billed Yearly</GradinentText>
                ) : (
                    <span>Billed Yearly</span>
                )}
            </Button>
        </ButtonGroup>
    );
};

export default SubscriptionToggleButton;
