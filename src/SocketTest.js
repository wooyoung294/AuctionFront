import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
const SocketTest = () => {
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue)=>{
        setValue(newValue);
    }

    const todayDate = new Date();
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Uncontrolled picker"
                        defaultValue={dayjs('2022-04-17T15:30')}
                        minutesStep={10}
                    />
            </LocalizationProvider>
        </div>
    );
};

export default SocketTest;
