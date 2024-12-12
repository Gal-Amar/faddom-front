import {useState} from "react";
import './app.css';
import {Button, TextInput, Title} from '@mantine/core';
import {useForm} from '@mantine/form';

const timePeriodOptions = [
    {label: "Last 1 minute", value: "1m"},
    {label: "Last 5 minutes", value: "5m"},
    {label: "Last 15 minutes", value: "15m"},
    {label: "Last 30 minutes", value: "30m"},
    {label: "Last 1 hour", value: "1h"},
    {label: "Last 3 hours", value: "3h"},
    {label: "Last 6 hours", value: "6h"},
    {label: "Last 12 hours", value: "12h"},
    {label: "Last 24 hours", value: "24h"},
    {label: "Last 2 days", value: "2d"},
    {label: "Last 7 days", value: "7d"},
    {label: "Last 14 days", value: "14d"},
    {label: "Last 30 days", value: "30d"},
];

function App() {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState(null);
    const [submittedValues, setSubmittedValues] = useState('');

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            name: '',
            email: '',
        },
    });
    return (
        <div className="App">
            <header className="App-header">
                <Title order={1}>AWS instance CPU usage</Title>
                <form onSubmit={form.onSubmit((values) => setSubmittedValues(JSON.stringify(values, null, 2)))}>
                    <TextInput
                        type="number"
                        label="Period"
                        placeholder="Insert wanted period"
                        mt="md"
                        key={form.key('age')}
                        {...form.getInputProps('age')}
                    />
                    <Button type="submit" mt="md">
                        Submit
                    </Button>
                </form>
            </header>
        </div>
    );
}

export default App;
