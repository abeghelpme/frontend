import Input from "@/components/primitives/Form/Input";

export default function Home() {
  return (
    <div className={"px-4"}>
      <h1>WELCOME TO ABEG HELP!!</h1>
      <Input disabled placeholder={"Enter Email"} type={"password"} />
    </div>
  );
}
