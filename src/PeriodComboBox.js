import {useState, useEffect, useCallback} from 'react';
import {Input, InputBase, Combobox, useCombobox, ScrollArea, Text} from '@mantine/core';
import {getTimePeriodsByInterval} from './utils'


export default function PeriodComboBox({setTimePeriod, timePeriod, error, interval}) {
  const [timePeriodOptions, setTimePeriodOptions] = useState([]);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const handlePeriodChange = useCallback((val) => {
    setTimePeriod(val);
    combobox.closeDropdown();
  }, [combobox, setTimePeriod])

  useEffect(() => {
    const options = getTimePeriodsByInterval(interval); // Fetch options based on interval
    setTimePeriodOptions(
      options.map((value, index) => (
        <Combobox.Option key={index} value={value}>
          {value}
        </Combobox.Option>
      ))
    );
  }, [interval]);

  return (
    <div>
      <Combobox
        label="Time Period"
        store={combobox}
        withAsterisk
        onOptionSubmit={handlePeriodChange}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            description={"Specify the total time period to display on the chart."}
            pointer
            rightSection={<Combobox.Chevron/>}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
            error={!!error}
          >
            {timePeriod || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" mah={200}>
              {timePeriodOptions}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {error && <Text c="red" mt={"5px"} size={"13px"}>{error}</Text>}
    </div>
  );
}