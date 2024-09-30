import moment from 'moment';

export default ({ data = [] }) => {
    const maped = data.map((item) => {
        if (item?.createdAt) {
            item.createdAt = moment(item.createdAt);
        }
        return item;
    });
    return maped.sort((a, b) => {
        if (a.createdAt === null && b.createdAt === null) return 0;
        if (a.createdAt === null) return 1;
        if (b.createdAt === null) return -1;
        return b.createdAt - a.createdAt;
    });
};
