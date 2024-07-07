"use client";
import { useState } from "react";

const OtherComponent = () => {
  console.log("hellor running");
  return <div>hello</div>;
}

export default function Home() {
  console.log("test");
  const [count, setCount] = useState(0);
  return (
    <div>
      <OtherComponent />
      <div onClick={() => setCount(count + 1)}>click me</div>
      {count}
    </div>
  );
}
