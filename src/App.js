import {useState, useEffect} from 'react';
import moment from 'moment';

import AddSchedule from "./forms/AddSchedule";
import AddHoliday from "./forms/AddHoliday";
import HolidayTable from "./table/HolidayTable";
import DueDateTable from "./table/DueDateTable";

const App = () => {

    const initialDueDates = [];
    const initialHolidays = [
        {type: 'DAY', value: 'Saturday', description: 'Saturday'},
        {type: 'DAY', value: 'Sunday', description: 'Sunday'},
        {type: 'DATE', value: '2021-04-02', description: 'Good Friday'},
    ];

    const [schedule, setSchedule] = useState({});
    const [holidays, setHolidays] = useState(initialHolidays);
    const [dueDates, setDueDates] = useState(initialDueDates);

    useEffect(() => {
        createSchedule(schedule);
    }, [holidays]);

    // determines from the saved holidays, if the dates is a holiday!!
    const isHoliday = (momentDate) => {
        const holidaysOnDays = holidays.filter(({type}) => type === 'DAY').map(h => h.value);
        const holidaysOnDates = holidays.filter(({type}) => type === 'DATE').map(h => h.value);

        const doesExistsOnDays = holidaysOnDays.indexOf(momentDate.format('dddd')) > -1;
        const doesExistsOnDates = holidaysOnDates.indexOf(momentDate.format('YYYY-MM-DD')) > -1;

        return doesExistsOnDays || doesExistsOnDates;
    }

    // generates due dates based on the param passed!
    const generateDueDates = ({starts_at, frequency, type, ends_at, number_of_occurrence}) => {
        const result = [];
        if (!starts_at || !frequency || !type) return result;
        if ((type === 'DATE' && !ends_at) || (type === 'OCCURRENCE' && !number_of_occurrence)) {
            type = 'DATE';
            ends_at = moment().endOf('year').format('YYYY-MM-DD');
        }

        let nextOccurrenceIncreased = 0;

        if (type === 'OCCURRENCE') {
            Array.apply(null, {length: number_of_occurrence}).forEach((o, i) => {

                if(frequency === 'one-time' && i !== 0) return;

                let nextDueDate = moment(starts_at);
                nextOccurrenceIncreased = 0;
                if (i !== 0) {
                    nextDueDate = moment(starts_at).add(i + nextOccurrenceIncreased, frequency);
                }
                while (isHoliday(nextDueDate)) {
                    nextOccurrenceIncreased++;
                    nextDueDate = nextDueDate.add(1, 'days');
                }
                result.push(nextDueDate.format('YYYY-MM-DD'));
            });
        } else {

            let nextDueDate = moment(starts_at);
            let i = 0;
            while (moment(nextDueDate).unix() < moment(ends_at).unix()) {

                if(frequency === 'one-time' && i !== 0) break;

                nextOccurrenceIncreased = 0;
                if (i !== 0) {
                    nextDueDate = moment(starts_at).add(i + nextOccurrenceIncreased, frequency);
                    if (moment(nextDueDate).unix() > moment(ends_at).unix()) {
                        break;
                    }
                }

                while (isHoliday(nextDueDate)) {
                    nextOccurrenceIncreased++;
                    nextDueDate = nextDueDate.add(1, 'days');
                }

                result.push(nextDueDate.format('YYYY-MM-DD'));
                i++;
            }
        }

        return result;
    }

    const createSchedule = (schedule) => {
        setSchedule(schedule);
        const createdDueDates = generateDueDates(schedule)
        setDueDates(createdDueDates);
    }

    const addHoliday = (holiday) => {
        const isExisting = holidays.find(h => h.value === holiday.value);
        if (isExisting) return;

        if (holiday.type === 'DAY') {
            holiday['description'] = holiday.value;
        }
        setHolidays([...holidays, holiday]);
    }

    const deleteHoliday = (i) => {
        setHolidays(holidays.filter((obj, j) => i !== j));
    }

    return (
        <div className="container">
            <h1 style={{fontWeight: '700'}}>Scheduler App</h1>
            <div className="flex-row">
                <div className="flex-large">
                    <div>
                        <h3>Create Schedule</h3>
                        <AddSchedule createSchedule={createSchedule}/>
                    </div>
                    <h3>Due Dates</h3>
                    <div style={{maxHeight: '300px', overflow: 'scroll'}}>
                        <DueDateTable dueDates={dueDates}/>
                    </div>
                </div>
                <div className="flex-large">
                    <h3>Add Holiday</h3>
                    <AddHoliday addHoliday={addHoliday}/>
                    <div>
                        <h3>Holidays</h3>
                        <HolidayTable holidays={holidays} deleteHoliday={deleteHoliday}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;