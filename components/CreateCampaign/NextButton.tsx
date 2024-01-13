import Button from "../primitives/Button/button";

type NextButtonProps = {
  targetForm: string;
  text?: string;
};

function NextButton({ targetForm, text = "Continue" }: NextButtonProps) {
  return (
    <Button
      form={targetForm}
      type="submit"
      variant="primary"
      className="m-[1.6rem_2.4rem] ml-auto block rounded-[6px] bg-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-semibold"
    >
      {text}
    </Button>
  );
}

export default NextButton;
