import getLayout from "@/lib/utils/normalLayout";

const Test = () => {
  return <div className="flex-1 bg-red-500">Test</div>;
};

export default Test;

Test.protect = true;

Test.getLayout = getLayout;
