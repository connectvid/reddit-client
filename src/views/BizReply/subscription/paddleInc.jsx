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
            userId: dbUser._id,
            uid: dbUser.uid,
            name: dbUser.name,
            email: dbUser.email
        },
        customer: {
            email: dbUser.email,
            name: dbUser.name
            // id:dbUser.paddleId
            // address: {
            //     countryCode: 'US'
            // }
        }
    };
    // console.log(paddleSubsObj, 'paddleSubsObj');
    const openCheckout = (plan_id) => {
        // window.Paddle.Checkout.open({
        //     product: plan_id,
        //     email: dbUser.email,
        //     passthrough: dbUser,
        //     // successCallback: checkoutComplete,
        //     closeCallback: checkoutClosed
        // });
        console.log(paddleSubsObj);
        window.Paddle.Checkout.open(paddleSubsObj);
    };
    return (
        <Box>
            <Button onClick={() => openCheckout('pri_01j6927kh2tgcm45tg0gn662rv')}>Subs</Button>
        </Box>
    );
}
