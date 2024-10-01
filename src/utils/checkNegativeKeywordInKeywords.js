export default function ({ keywords = [], negativeKeyword = '' }) {
    // Split negative keywords and check if any matches in keywords array
    const matchedExistingKeyword = keywords.filter((KW) =>
        negativeKeyword.split(' ').some((naKey) => KW.toLowerCase().includes(naKey.toLowerCase()))
    );
    return {
        matchedExistingKeyword
    };
}
