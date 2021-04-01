import React from 'react'
import moment from "moment";

const DueDateTable = (props) => (
    <table>
        <tbody>
        {props.dueDates.length > 0 ? (
            props.dueDates.map((dueDate, i) => (
                <tr key={i}>
                    <td>{moment(dueDate).format("Do MMM  YYYY - dddd")}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={3}>All caught up!</td>
            </tr>
        )}
        </tbody>
    </table>
)

export default DueDateTable;