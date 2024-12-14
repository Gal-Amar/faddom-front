import {Blockquote, Text, List, Anchor} from '@mantine/core';
import {IconInfoCircle} from '@tabler/icons-react';

export default function ExplanationPaper() {
  const icon = <IconInfoCircle enableBackground={"false"}/>;

  return (
    <Blockquote color="blue" p={"25px"} h={"fit-content"} icon={icon} iconSize={30}>
      <Text size={"sm"}>
        The information you are asking for comes from AWS CloudWatch.
        <br/>These are the rules:
      </Text>
      <List size={"sm"}>
        <List.Item>
          Data points with a period of less than 60 seconds are available for 3 hours.
        </List.Item>
        <List.Item>
          Data points with a period of 60 seconds (1 minute) are available for 15 days.
        </List.Item>
        <List.Item>
          Data points with a period of 300 seconds (5 minutes) are available for 63 days.
        </List.Item>
        <List.Item>
          Data points with a period of 3600 seconds (1 hour) are available for 455 days (15 months).
        </List.Item>
      </List>
      <Text mt={"10px"} size={"sm"}>
        In addition The maximum number of data points per call is 1,440. Requests for more will result in an error.
      </Text>
      <Text mt={"10px"} size={"sm"}>
        The information is taken from: <Anchor
        href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_GetMetricData.html"}>CloudWatch
        Concepts</Anchor>
      </Text>
    </Blockquote>
  );
}
