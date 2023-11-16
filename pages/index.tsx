import Input from "@/components/primitives/Form/Input";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLInputElement | null>(null);

  return (
    <div className={"px-4"}>
      <h1>WELCOME TO ABEG HELP!!</h1>
      <Input ref={ref} placeholder={"Enter Email"} type={"password"} />
    </div>
  );
}
