import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export default function BasicTimePicker({ time, setTime }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <TimePicker
          label=""
          ampm={false}
          onChange={(time) =>
            setTime(`${time.$H}:${time.$m.toString().padStart(2, "0")}`)
          }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
