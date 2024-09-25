import moment from 'moment';

const DateRangeDisplay = ({ values }) => {
    const { dateRange } = values || {};
    const { from, to } = dateRange || {};

    // Check if both dates are available and are valid Moment objects
    if (!from || !to || !moment.isMoment(from) || !moment.isMoment(to) || !from.isValid() || !to.isValid()) {
        return <span>Please select a valid date range.</span>;
    }

    // Format dates using Moment.js
    const startDate = from.format('YYYY-MM-DD');
    const endDate = to.format('YYYY-MM-DD');

    return (
        <span>
            {startDate} - {endDate}
        </span>
    );
};

export default DateRangeDisplay;
