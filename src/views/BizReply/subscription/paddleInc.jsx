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
    const paddleSubsObj = {
        settings: {
            theme: 'light'
        },
        items: [
            {
                priceId: 'pri_01j6927kh2tgcm45tg0gn662rv',
                quantity: 1
            }
            // {
            //     priceId: 'pri_01gs59p7rcxmzab2dm3gfqq00a',
            //     quantity: 1
            // }
        ],
        customData: {
            // utm_medium: 'social',
            // utm_source: 'linkedin',
            // utm_content: 'launch-video',
            // integration_id: 'AA-123'
            ...dbUser
        },
        customer: {
            email: dbUser.email,
            address: {
                countryCode: 'US'
            }
        }
    };
    console.log(checkoutClosed);
    const openCheckout = (plan_id) => {
        // window.Paddle.Checkout.open({
        //     product: plan_id,
        //     email: dbUser.email,
        //     passthrough: dbUser,
        //     // successCallback: checkoutComplete,
        //     closeCallback: checkoutClosed
        // });
        window.Paddle.Checkout.open(paddleSubsObj);
    };
    return (
        <Box>
            <Button onClick={() => openCheckout('pri_01j6927kh2tgcm45tg0gn662rv')}>Subs</Button>
        </Box>
    );
}
