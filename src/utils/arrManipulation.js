/* eslint-disable no-restricted-syntax */
function removeRedundantFields(data) {
    data.forEach((item) => {
        // Iterate over each key in the main object
        for (const key in item) {
            // Check if the key exists in the extra object
            if (item.extra && item.extra[key] === item[key]) {
                // Delete the key from the extra object
                delete item.extra[key];
            }
        }
    });
    return data;
}

export default ({ headings, rows }) => {
    const leads = [];
    const entries = Object.entries(headings);
    for (const row of rows) {
        const extra = JSON.parse(JSON.stringify(row));
        const item = {};
        for (const [k, v] of entries) {
            item[k] = row[v];
            // delete extra[v];
        }
        item.extra = extra;
        leads.push(item);
    }
    // return removeRedundantFields(leads);
    return leads;
};
