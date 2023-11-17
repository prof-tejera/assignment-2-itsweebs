import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";
import Panel from "../components/generic/Panel";
import Button from "../components/generic/Button";
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import DisplayTime from "../components/generic/DisplayTime";
import DisplayRounds from "../components/generic/DisplayRounds";
import Input from "../components/generic/Input";



const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <Container>
      <div>
        <Title>Documentation</Title>
        <DocumentComponent
          title="Loading spinner "
          component={<Loading />}
          propDocs={[
            {
              prop: "size",
              description: "Changes the size of the loading spinner",
              type: "string",
              defaultValue: "medium",
            },
          ]}
        />
        <DocumentComponent
          title="Panel"
          component={<Panel className="control-panel">Sample Content</Panel>}
          propDocs={[
            {
              prop: "children",
              description: "Contents contained inside the panel",
              type: "node",
              defaultValue: "n/a",
            },
            {
              prop: "className",
              description: "Assigns a class name for additional styling purposes",
              type: "string",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Button"
          component={<Button label="Sample Button" icon={faPlay} onClick={() => console.log('Button clicked!')} />}
          propDocs={[
            {
              prop: "label",
              description: "Label for the button if no icon is provided",
              type: "string",
              defaultValue: "none",
            },
            {
              prop: "icon",
              description: "Icon to be displayed on the button",
              type: "object",
              defaultValue: "none",
            },
            {
              prop: "className",
              description: "Assigns a class name for additional styling purposes",
              type: "string",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Display Time"
          component={<DisplayTime>01:30</DisplayTime>}
          propDocs={[
            {
              prop: "children",
              description: "Contents contained inside Display Time",
              type: "node",
              defaultValue: "n/a",
            },
          ]}
        />
        <DocumentComponent
          title="Display Rounds"
          component={<DisplayRounds text="Round 1 of 2" />}
          propDocs={[
            {
              prop: "text",
              description: "Displays the tracked rounds",
              type: "string",
              defaultValue: "none",
            },
          ]}
        />
        <DocumentComponent
          title="Input"
          component={<Input label="Sample Label" />}
          propDocs={[
            {
              prop: "label",
              description: "Label text for the input field",
              type: "string",
              defaultValue: "n/a",
            },
            {
              prop: "pattern",
              description: "Pattern to validate the input",
              type: "string",
              defaultValue: "MM:SS",
            },
            {
              prop: "maxLength",
              description: "Maximum allowed length for the input",
              type: "number",
              defaultValue: "5",
            },
          ]}
        />
      </div>
    </Container>


  );
};

export default Documentation;
