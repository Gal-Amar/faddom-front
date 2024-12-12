import {useState, useEffect} from 'react';
import {Input, InputBase, Combobox, useCombobox, ScrollArea, Text} from '@mantine/core';


const timePeriodOptions = [
  "Last 1 minute",
  "Last 5 minutes",
  "Last 15 minutes",
  "Last 30 minutes",
  "Last 1 hour",
  "Last 3 hours",
  "Last 6 hours",
  "Last 12 hours",
  "Last 24 hours",
  "Last 2 days",
  "Last 7 days",
  "Last 14 days",
  "Last 30 days",
];

export default function PeriodComboBox({onChange, error}) {
  const [periodValue, setPeriodValue] = useState(null);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  console.log("error", error);

  const comboBoxOptions = timePeriodOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <div>
      <Combobox
        label="Time Period"
        store={combobox}
        withAsterisk
        onOptionSubmit={(val) => {
          setPeriodValue(val);
          onChange(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            description={"Specify the total time period (in seconds) to display on the chart."}
            pointer
            rightSection={<Combobox.Chevron/>}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
            error={!!error}
          >
            {periodValue || <Input.Placeholder>Pick value</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize type="scroll" mah={200}>
              {comboBoxOptions}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {error && <Text c="red" mt={"5px"} size={"13px"}>{error}</Text>}
    </div>
  );
}