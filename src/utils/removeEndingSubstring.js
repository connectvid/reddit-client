export default (str, ending = '/') => {
    const regex = new RegExp(`${ending}$`);
    if (regex.test(str)) {
        str = str.replace(regex, '');
    }

    return str;
};
