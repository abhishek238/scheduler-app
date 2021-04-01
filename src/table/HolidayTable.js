import React from 'react'
import moment from 'moment';

const HolidayTable = ({holidays, deleteHoliday}) => (
    <table>
        <thead>
        <tr>
            <th width={'80%'}>Every</th>
            <th width={'20%'}>Actions</th>
        </tr>
        </thead>
        <tbody>
        {holidays.length > 0 ? (
            holidays.map((holiday, i) => (
                <tr key={i}>
                    <td>
                        {holiday.description}
                        {(holiday.type === 'DATE') ? ` (${moment(holiday.value).format("Do MMM  YYYY - dddd")})` : null}
                    </td>
                    <td>
                        <button className="button muted-button red" onClick={() => deleteHoliday(i)}
                        >Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>No holidays added yet!</td>
            </tr>
        )}
        </tbody>
    </table>
)

export default HolidayTable;