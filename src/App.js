import {useCallback, useState} from "react";

import {Button, TextInput, Title, Tooltip, Text, Alert} from '@mantine/core';
import PeriodComboBox from "./PeriodComboBox";
import {IconQuestionMark} from '@tabler/icons-react';
import CpuDataChart from "./DataChart";
import ExplanationPaper from "./ExplanationPepar";
import IntervalInput from "./IntervalInput";
import {IconInfoCircle} from '@tabler/icons-react';

import {timePeriods} from "./utils";


function App() {
  const [submittedValues, setSubmittedValues] = useState({
    interval: 30,
    timePeriod: '',
    ipAddress: '',
  });
  const [error, setError] = useState({
    interval: null,
    timePeriod: null,
    ipAddress: null,
    data: null,
  });
  const [data, setData] = useState([]);


  const handleTimePeriodChange = useCallback((value) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      interval: prevState.timePeriod === '' ? prevState.interval : 30,
      timePeriod: value,
    }));
    setError(prevState => ({
      ...prevState,
      timePeriod: null,
    }))
  }, [error]);

  const handleIntervalChange = useCallback((interval) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      timePeriod: prevState.interval === 30 ? prevState.timePeriod : '',
      interval: interval,
    }));
    setError(prevState => ({
      ...prevState,
      interval: null,
    }))
  }, []);

  const handleIPAddressChange = useCallback((ipAddress) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      ipAddress: ipAddress,
    }));
    setError(prevState => ({
      ...prevState,
      ipAddress: null,
    }))
  }, []);

  const isFormValid = useCallback(
    () => {
      let isInitialize = true;
      if (Object.values(submittedValues).every(
        (value) => value !== null && value !== "" && value !== 0
      ) === false) isInitialize = false;

      const intervalRegex = /^[1-9][0-9]*$/;
      const isIntervalValid = intervalRegex.test(submittedValues.interval);
      setError(prevState => ({
        ...prevState,
        interval: isIntervalValid ? null : 'Invalid interval value',
      }));

      setError(prevState => ({
        ...prevState,
        timePeriod: submittedValues.timePeriod === "" ? 'Invalid interval value' : null,
      }));

      const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const isIPAddressValid = ipRegex.test(submittedValues.ipAddress);
      setError(prevState => ({
        ...prevState,
        ipAddress: isIPAddressValid ? null : 'Invalid IP address',
      }));
      return isInitialize && isIntervalValid && isIPAddressValid;
    }, [submittedValues]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      const roundedPeriodValue = submittedValues.interval % 60 === 0 || submittedValues.interval < 60 ? submittedValues.interval : submittedValues.interval - submittedValues.interval % 60;
      try {
        const url = `http://127.0.0.1:8000/?period=${encodeURIComponent(roundedPeriodValue)}&delta=${encodeURIComponent(timePeriods[submittedValues.timePeriod])}&instance_ip=${encodeURIComponent(submittedValues.ipAddress)}`;
        const response = await fetch(url);
        const data = await response.json(); // Parse the JSON response
        console.log(data);
        if (data.data) {
          setData(data.data.Datapoints);
          setError(prevState => ({
            ...prevState,
            data: null
          }));
        } else {
          setError(prevState => ({
            ...prevState,
            data: data.error && data.error.includes('InvalidParameterCombination') ? data.error : error.message
          }));
        }

      } catch (error) {

      }
    }
  }, [isFormValid, submittedValues])


  return (
    <div className="app">

      <Title order={1} mb={"20px"}>AWS instance CPU usage</Title>
      <div className={"form-grid"}>
        <form className={"form"} onSubmit={handleSubmit}>
          <IntervalInput
            setInterval={handleIntervalChange}
            interval={submittedValues.interval}
            timePeriod={submittedValues.timePeriod}
            error={error.interval}
          />
          <PeriodComboBox
            setTimePeriod={handleTimePeriodChange}
            interval={submittedValues.interval}
            timePeriod={submittedValues.timePeriod}
            error={error.timePeriod}
          />
          <div>
            <TextInput
              label="IP Address"
              description="Insert the IP address of the AWS instance"
              placeholder="IP address"
              withAsterisk
              value={submittedValues.ipAddress}
              onChange={e => handleIPAddressChange(e.currentTarget.value)}
              error={!!error.ipAddress}
              rightSection={
                <Tooltip multiline w={"200px"} position="bottom" shadow="md"
                         color="#748ffc"
                         label={"Enter a valid IP address (e.g., 192.168.1.1) to identify the AWS instance."}>
                  <IconQuestionMark
                    stroke={2}/>
                </Tooltip>
              }
            />
            {error.ipAddress && <Text c="red" mt={"5px"} size={"13px"}>{error.ipAddress}</Text>}
          </div>
          <center>
            <Button type="submit" mt="md" radius={"md"} color="indigo" w={"150px"}>
              Submit
            </Button>
          </center>
        </form>
        <ExplanationPaper/>
      </div>
      {!error.data && <CpuDataChart data={data} error={error.data} timePeriod={submittedValues.timePeriod}/>}
      {error.data &&
        <Alert mt={"20px"} variant="outline" color="red" title="error" icon={<IconInfoCircle/>}>
          {error.data}
        </Alert>}
    </div>
  );
}

export default App;
