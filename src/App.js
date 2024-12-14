import {useCallback, useState} from "react";
import {Button, TextInput, Title, Tooltip, Text} from '@mantine/core';
import PeriodComboBox from "./PeriodComboBox";
import {IconQuestionMark} from '@tabler/icons-react';
import CpuDataChart from "./DataChart";
import ExplanationPaper from "./ExplanationPepar";
import IntervalInput from "./IntervalInput";


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
  });
  const [data, setData] = useState([
    {
      date: 'Mar 22',
      Apples: 2890,
      Oranges: 2338,
      Tomatoes: 2452,
    },
    {
      date: 'Mar 23',
      Apples: 2756,
      Oranges: 2103,
      Tomatoes: 2402,
    },
    {
      date: 'Mar 24',
      Apples: 3322,
      Oranges: 986,
      Tomatoes: 1821,
    },
    {
      date: 'Mar 25',
      Apples: 3470,
      Oranges: 2108,
      Tomatoes: 2809,
    },
    {
      date: 'Mar 26',
      Apples: 3129,
      Oranges: 1726,
      Tomatoes: 2290,
    },
  ]);


  const handleTimePeriodChange = useCallback((value) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      interval: prevState.timePeriod === '' ? prevState.interval : 30,
      timePeriod: value,
    }));
    error.timePeriod = null;
  }, []);

  const handleIntervalChange = useCallback((interval) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      timePeriod: prevState.interval === 30 ? prevState.timePeriod : '',
      interval: interval,
    }));
    error.interval = null;
  }, []);

  const handleIPAddressChange = useCallback((ipAddress) => {
    setSubmittedValues((prevState) => ({
      ...prevState,
      ipAddress: ipAddress,
    }));
    error.ipAddress = null;
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
    }, [error, submittedValues]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("submitted", submittedValues);

    const roundedPeriodValue = submittedValues.interval % 60 === 0 || submittedValues.interval < 60 ? submittedValues.interval : submittedValues.interval - submittedValues.interval % 60;
    setSubmittedValues(prevState => ({
      ...prevState,
      interval: roundedPeriodValue,
    }))
    if (!isFormValid()) {
      console.log("invalid form");
    }
    // setSubmittedValues(JSON.stringify(setSubmittedValues, null, 2));
  }, [submittedValues])


  return (
    <div className="app">

      <Title order={1} mb={"20px"}>AWS instance CPU usage</Title>
      <div className={"form-grid"}>
        <form className={"form"} onSubmit={handleSubmit}>
          debugger;
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
      <CpuDataChart data={data}/>

    </div>
  );
}

export default App;
