"use client";

import { useState } from "react";
import Spreadsheet from "react-spreadsheet";

export default function App() {
  const [data, setData] = useState([
    [{ value: "Code" }, { value: "Name" }, { value: "Mobile Number" }],
    [{ value: "Strawberry" }, { value: "Cookies" }, { value: "499006391825" }],
  ]);
  return <Spreadsheet data={data} onChange={setData} />;
}
