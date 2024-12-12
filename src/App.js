import {useState} from "react";
import {Button, TextInput, Title, Tooltip, Text, rem} from '@mantine/core';
import {useForm} from '@mantine/form';
import PeriodComboBox from "./PeriodComboBox";
import {IconQuestionMark} from '@tabler/icons-react';


function App() {
  const [submittedValues, setSubmittedValues] = useState('');

  const handleTimePeriodComboboxChange = (value) => {
    form.setFieldValue('timePeriod', value);
  }

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      interval: '',
      timePeriod: '',
      IPAddress: '',
    },

    validate: {
      interval: (value) => {
        const intervalRegex = /^[0-9]{1,5}$/;
        return intervalRegex.test(value) ? null : 'Invalid interval value';
      },
      timePeriod: (value) => {
        return value === '' ? 'Invalid time period value' : null;
      },
      IPAddress: (value) => {
        const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        return ipRegex.test(value) ? null : 'Invalid IP address';
      },
    },
  });
  console.log(form.getValues())
  return (
    <div className="app">
      <header>
        <Title order={1}>AWS instance CPU usage</Title>
        <form onSubmit={form.onSubmit((values) => {
          setSubmittedValues(JSON.stringify(values, null, 2));
          console.log("hey", values);
        })}>
          <TextInput
            label="Period"
            description="Set the interval (in seconds) between data points on the chart"
            placeholder="Insert wanted period"
            withAsterisk
            mt="md"
            mb="md"
            key={form.key('interval')}
            {...form.getInputProps('interval')}
            rightSection={
              <Tooltip multiline w={"170px"} position="bottom" shadow="md"
                       color="rgba(240, 134, 134, 1)"
                       label={"Enter the desired time period in seconds, for example: 3600 equivalent to 1 hour."}>
                <IconQuestionMark
                  stroke={2}/>
              </Tooltip>
            }
          />

          <PeriodComboBox
            onChange={handleTimePeriodComboboxChange}
            {...form.getInputProps('timePeriod')}
            key={form.key('timePeriod')}
            error={form.errors.timePeriod}/>

          <TextInput
            label="IP Address"
            description="Insert the IP address of the AWS instance"
            placeholder="Insert IP address"
            withAsterisk
            mt="md"
            mb="md"
            key={form.key('IPAddress')}
            {...form.getInputProps('IPAddress')}
            rightSection={
              <Tooltip multiline w={"170px"} position="bottom" shadow="md"
                       color="rgba(240, 134, 134, 1)"
                       label={"Enter a valid IP address (e.g., 192.168.1.1) to identify the AWS instance."}>
                <IconQuestionMark
                  stroke={2}/>
              </Tooltip>
            }
          />
          <center>
            <Button type="submit" mt="md" radius={"md"} color="indigo" w={"150px"}>
              Submit
            </Button>
          </center>
        </form>
      </header>
    </div>
  );
}

export default App;
