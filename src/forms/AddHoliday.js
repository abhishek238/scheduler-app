import React, {useState} from 'react'

const AddHoliday = (props) => {

    const initialFormState = {type: 'DAY', value: 'Monday', description: ''};
    const dayList = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    const [holiday, setHoliday] = useState(initialFormState)

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setHoliday({...holiday, [name]: value})
    }

    return (
        <form style={{minHeight: '434px'}}
              onSubmit={(event) => {
                  event.preventDefault()
                  if (!holiday.type || !holiday.value) return

                  props.addHoliday(holiday)
                  setHoliday(initialFormState)
              }}
        >

            <div style={{minHeight: '80px', paddingTop: '42px'}}>
                <div style={{float: 'left', marginRight: '10px', paddingRight: '10px'}}>
                    <input type="radio" name="type" id={'type_day'}
                           value={'DAY'}
                           checked={holiday.type === 'DAY'}
                           onChange={handleInputChange}/>
                    <label htmlFor="type_day" style={{display: 'inline'}}> On Every Weekday</label>
                </div>
                <div style={{marginRight: '10px', paddingRight: '10px'}}>
                    <input type="radio" name="type" id={'type_date'}
                           value={'DATE'}
                           checked={holiday.type === 'DATE'}
                           onChange={handleInputChange}/>
                    <label htmlFor="type_date" style={{display: 'inline'}}> On Specific Date</label>
                </div>
            </div>

            {(holiday.type === 'DAY') ?
                (
                    <>
                        <label htmlFor="value">Day:</label>
                        <select name="value" id="value" value={holiday.value} onChange={handleInputChange}>
                            {dayList.map((day) => <option key={day} value={day}>{day}</option>)}
                        </select>
                    </>
                ) : (
                    <>
                        <label htmlFor="value">Holiday On:</label>
                        <input type="date" id="value" name="value" value={holiday.value} onChange={handleInputChange}/>

                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" value={holiday.description}
                               onChange={handleInputChange}/>
                    </>
                )}

            <div style={{marginTop: '12px'}}>
                <button>Add Holiday</button>
            </div>
        </form>
    )
}

export default AddHoliday