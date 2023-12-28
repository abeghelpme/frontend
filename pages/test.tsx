import BaseLayout from "@/layouts/base-layout";

const Test = () => {
  return (
    <BaseLayout>
      <div className="bg-red-500 flex-1">Test</div>
    </BaseLayout>
  );
};

export default Test;

Test.protect = true;
