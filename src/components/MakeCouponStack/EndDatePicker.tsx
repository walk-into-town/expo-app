import React from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SubTitle } from '../../atoms'
import { TuseState } from '@types';

interface Props {
    useEndDate: TuseState<Date>,
}

const EndDatePicker = (props: Props) => {
    const [endDate, setEndDate] = props.useEndDate;

    return (
        <>
            <SubTitle style={{ marginTop: 20 }}>쿠폰 만기 날짜</SubTitle>
            <DateTimePicker
                value={endDate}
                display="spinner"
                onChange={(_: any, selectedDate: any) => setEndDate(selectedDate || endDate)}
                minimumDate={new Date()}
            />
        </>
    )
}

export default EndDatePicker
