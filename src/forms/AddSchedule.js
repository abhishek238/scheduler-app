import React, {useState} from 'react'
import moment from "moment";

const AddSchedule = (props) => {

    const initialFormState = {
        starts_at: moment().format('YYYY-MM-DD'),
        frequency: 'days',
        type: 'DATE',
        ends_at: '',
        number_of_occurrence: 5
    };

    const frequencyList = [
        {value: 'days', 'label': 'Daily'},
        {value: 'weeks', 'label': 'Weekly'},
        {value: 'months', 'label': 'Monthly'},
        {value: 'years', 'label': 'Yearly'},
        {value: 'one-time', 'label': 'One Time'}
    ];

    const [schedule, setSchedule] = useState(initialFormState)

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setSchedule({...schedule, [name]: value})
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                if (!schedule.starts_at || !schedule.frequency) return
                props.createSchedule(schedule)
            }}
        >
            <label htmlFor="starts_at">Starts At:</label>
            <input type="date" id="starts_at" name="starts_at" value={schedule.starts_at} onChange={handleInputChange}/>

            <label htmlFor="frequency">Frequency:</label>
            <select name="frequency" id="frequency" value={schedule.frequency} onChange={handleInputChange}>
                {frequencyList.map((frequency) => <option key={frequency.value}
                                                          value={frequency.value}>{frequency.label}</option>)}
            </select>

            <div style={{paddingTop: '12px'}}>
                <div style={{float: 'left', marginRight: '10px', paddingRight: '10px'}}>
                    <input type="radio" name="type" id={'type_date'}
                           value={'DATE'}
                           checked={schedule.type === 'DATE'}
                           onChange={handleInputChange}/>
                    <label htmlFor="type_date" style={{display: 'inline'}}> Ends after date</label>
                </div>
                <div style={{marginRight: '10px', paddingRight: '10px'}}>
                    <input type="radio" name="type" id={'type_occurrence'}
                           value={'OCCURRENCE'}
                           checked={schedule.type === 'OCCURRENCE'}
                           onChange={handleInputChange}/>
                    <label htmlFor="type_occurrence" style={{display: 'inline'}}> Ends after occurrence</label>
                </div>
            </div>

            {(schedule.type === 'DATE') ?
                (
                    <>
                        <label htmlFor="ends_at">Ends At:</label>
                        <input type="date" id="ends_at" name="ends_at" value={schedule.ends_at}
                               onChange={handleInputChange}/>
                    </>
                ) : (
                    <>
                        <label htmlFor="number_of_occurrence">Number of occurrences:</label>
                        <input type="number" id="number_of_occurrence" name="number_of_occurrence"
                               value={schedule.number_of_occurrence}
                               onChange={handleInputChange}/>
                    </>
                )}

            <p style={{fontSize: '12px', margin: 0, padding: 0}}>Note: When `Ends at` or `Number of occurrences` is not
                provided, it will create schedule till end of current year!</p>

            <div style={{marginTop: '12px'}}>
                <button>Create Schedule</button>
            </div>
        </form>
    )
}

export default AddSchedule