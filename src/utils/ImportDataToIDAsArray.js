/* eslint-disable no-restricted-syntax */
export default (data = []) => {
    const ids = [];
    for (const { id } of JSON.parse(JSON.stringify(data))) {
        if (id) ids.push(id);
    }
    return ids;
};
