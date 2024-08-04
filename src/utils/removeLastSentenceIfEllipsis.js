/* eslint-disable no-plusplus */
export default (text = '') => {
    // const regex = /([.!?])[^.!?]*\s*\.\.\.$/;
    // return text.replace(regex, '$1').trim();
    // Check if the string ends with ellipsis
    if (text.endsWith('...') || text.endsWith('…')) {
        // Define an array of sentence-ending punctuation marks
        const sentenceEndings = ['.', '?', '!'];
        // Iterate backwards from the position before the ellipsis
        for (let i = text.length - 4; i >= 0; i--) {
            if (sentenceEndings.includes(text[i])) {
                // Return the text up to and including the found punctuation mark
                return text.substring(0, i + 1).trim();
            }
        }
    }
    // Return the original text if it doesn't end with ellipsis or no ending punctuation mark is found
    return text;
};
