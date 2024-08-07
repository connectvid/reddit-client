export default (text) => {
    // Define regex patterns to match various input formats
    // const patterns = [
    //     /\[(.*?)\]\(https?:\/\/(.*?)\)/gi, // Matches [Example](https://Example.com) or [Example] (https://Example.com)
    //     /(\w+)\s?\(https?:\/\/(.*?)\)/gi, // Matches Example(https://Example.com) or Example (https://Example.com)
    //     /(\w+)\s?https?:\/\/(.*?)(\s|$)/gi, // Matches Example https://Example.com
    //     /(\w+)\s?(\w+\.\w+)/gi // Matches Example Example.com or Example (Example.com)
    // ];

    // Replace matched patterns with the extracted domain, ensuring it is in lower case
    // patterns.forEach((pattern) => {
    //     text = text.replace(pattern, (match, p1, p2) => {
    //         return p2.toLowerCase();
    //     });
    // });
    const domainPattern = /\[(.*?)\]\(https?:\/\/(.*?)\)/g;
    return text.replace(domainPattern, (match, p1, p2) => {
        return p2.toLowerCase();
    });
};

/**export default (text) => {
    const domainPattern = /\[(.*?)\]\(https?:\/\/(.*?)\)/g;
    return text.replace(domainPattern, (match, p1, p2) => {
        return p2.toLowerCase();
    });
};
 */
