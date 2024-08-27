import { Box, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { toast } from 'react-toastify';

export default function () {
    const { dbUser } = useAuth();
    function checkoutClosed(data) {
        console.log(data);
        toast('Your purchase has been cancelled, we hope to see you again soon!', {
            autoClose: 3000,
            type: 'info'
        });
    }
    const openCheckout = (plan_id) => {
        window.Paddle.Checkout.open({
            product: plan_id,
            email: dbUser.email,
            passthrough: dbUser,
            // successCallback: checkoutComplete,
            closeCallback: checkoutClosed
        });
    };
    return (
        <Box>
            <Button onClick={() => openCheckout('pri_01j6927kh2tgcm45tg0gn662rv')}>Subs</Button>
        </Box>
    );
}
