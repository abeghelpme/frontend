import Button from "../primitives/Button/button";

type NextButtonProps = {
  text?: string;
};

function NextButton({ text = "Continue" }: NextButtonProps) {
  return (
    <div className="w-full border-t-[1px] border-t-formBtn p-[1.6rem_2.4rem]">
      <Button
        type="submit"
        variant="primary"
        className="ml-auto block rounded-[6px] bg-formBtn p-[0.8rem_1.2rem] text-[1.2rem] font-semibold"
      >
        {text}
      </Button>
    </div>
  );
}

export default NextButton;
