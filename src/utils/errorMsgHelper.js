export default function errorMsgHelper({ response, message }) {
    const msg = response?.data?.message || message;
    const status = response?.status;
    return status > 499 ? `Something Went Wrong!` : msg;
}
