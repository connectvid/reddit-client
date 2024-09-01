import moment from 'moment';

export default ({ data = [] }) => {
    const maped = data.map((item) => {
        if (item?.postAt) {
            item.postAt = moment(item.postAt);
        }
        return item;
    });
    return maped.sort((a, b) => {
        if (a.postAt === null && b.postAt === null) return 0;
        if (a.postAt === null) return 1;
        if (b.postAt === null) return -1;
        return b.postAt - a.postAt;
    });
};
