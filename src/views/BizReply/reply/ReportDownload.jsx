import BRButton from 'ui-component/bizreply/BRButton';

function csvDownload({ headerObj = {}, data = [], fileNeme = '' }) {
    const header = Object.keys(headerObj);
    // console.log(Object.keys(headerObj), header);

    function escapeCSVValue(value) {
        if (value === null || value === undefined) {
            value = '';
        } else if (typeof value === 'string') {
            // Escape quotes by doubling them
            value = value.replace(/"/g, '""');
            // Wrap the value in quotes if it contains commas, quotes, or newlines
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                value = `"${value}"`;
            }
        }
        return value;
    }

    const csvData = [Object.values(headerObj)]; // Start with header

    data.forEach((row) => {
        const csvRow = header.map((field) => {
            const cell = row[field];
            // const cell = row.find((item) => item[field] !== undefined);
            const value = cell ?? '';
            // const value = cell ? cell[field] : '';
            return escapeCSVValue(value);
        });
        csvData.push(csvRow);
    });

    // Convert array of arrays to CSV string
    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    // console.log(csvContent);

    // // Create a Blob and download the CSV file
    const blob = new Blob([csvContent], {
        type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileNeme}.csv`;
    link.click();
}

export default function ({ mentionsData = [], brandName }) {
    return (
        <>
            {(mentionsData?.length && (
                <BRButton
                    variant="containd"
                    sx={{ width: '100px', color: '#fff', height: '40px' }}
                    // cursor: mentionsData?.length ? 'not-allow' : 'pointer'
                    disabled={!mentionsData?.length}
                    onClick={() => {
                        // post title
                        // 2. snippet (shot description)
                        // 3. submited reply (reply)
                        // 4. date of reply
                        // 5. post link
                        // 6. keyword
                        // 7. social (platform)
                        if (mentionsData?.length) {
                            const headerObj = {
                                title: 'title',
                                snippet: 'Short Description',
                                reply: 'reply',
                                updatedAt: 'Date of Reply',
                                link: 'Post Link',
                                keyword: 'keyword',
                                platform: 'platform'
                            };
                            csvDownload({ fileNeme: brandName, headerObj, data: mentionsData });
                        }
                    }}
                >
                    Download
                </BRButton>
            )) ||
                ''}
        </>
    );
}
