import {useEffect, useState, useCallback} from 'react';
import {NumberInput, Text, Tooltip} from '@mantine/core';
import {getMinMaxIntervalByTimePeriod} from "./utils";
import {IconQuestionMark} from "@tabler/icons-react";


export default function IntervalInput({setInterval, interval, timePeriod, error}) {
  const [minInterval, setMinInterval] = useState(getMinMaxIntervalByTimePeriod(timePeriod).min);
  const [maxInterval, setMaxInterval] = useState(getMinMaxIntervalByTimePeriod(timePeriod).max);

  useEffect(() => {
    const {min, max} = getMinMaxIntervalByTimePeriod(timePeriod);
    setMinInterval(min);
    setMaxInterval(max);
  }, [timePeriod]);

  const handleChange = useCallback((newValue) => {
    setInterval(Number(newValue));
  }, [setInterval]);


  return (
    <div>
      <NumberInput
        label="Period"
        description="Set the interval (in seconds) between chart data points. Seconds will round down to the nearest multiple of 60."
        placeholder="Period"
        rightSection={
          <Tooltip multiline w={"200px"} position="bottom" shadow="md"
                   color="#748ffc"
                   label={
                     <>
                       Enter time in seconds
                       <br/>
                       (e.g., 3600 sec = 1 hour).
                       <br/>
                       Max interval is {maxInterval} sec.
                       <br/>
                       Min interval is {minInterval} sec.
                     </>
                   }
          >
            <IconQuestionMark
              stroke={2}/>
          </Tooltip>
        } withAsterisk
        value={interval}
        onChange={handleChange}
        error={!!error}
        min={minInterval}
        max={maxInterval}

      />
      {error && <Text c="red" mt={"5px"} size={"13px"}>{error}</Text>}
    </div>
  );
}