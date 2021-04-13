import React from 'react'
import { Input } from 'react-native-elements';

interface Props {
    useDate: [string, React.Dispatch<React.SetStateAction<string>>]
}

const DateInput = (props: Props) => {

    const [date, setDate] = props.useDate;

    const checkValue = (str: string, max: number) => {
        if (str.charAt(0) !== '0' || str == '00') {
            var num = parseInt(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;
            
            str = num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
                    ? '0' + num : num.toString();
        }
        return str;
    }
    const dateInputChangeHandler = (input: string) => {
        if (RegExp(/\D\/$/).test(input)) 
            input = input.substr(0, input.length - 3);

        const values = input.split('/').map((v) => v.replace(/\D/g, ''));

        if (values[0]) values[0] = checkValue(values[0], 31);
        if (values[1]) values[1] = checkValue(values[1], 12);
        
        const output = values.map((v, i) => v.length == 2 && i < 2 ? v + '/' : v);
        setDate(output.join('').substr(0, 14));
    }

    return (
        <Input
            keyboardType="number-pad"
            maxLength={10}
            placeholder="DD/MM/YYYY"
            onChangeText={dateInputChangeHandler}
            value={date} />
    )
}

export default DateInput
