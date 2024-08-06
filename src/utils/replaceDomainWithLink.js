export default (text) => {
    const domainPattern = /\[(.*?)\]\(https?:\/\/(.*?)\)/g;
    return text.replace(domainPattern, (match, p1, p2) => {
        return p2.toLowerCase();
    });
};
