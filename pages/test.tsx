import BaseLayout from "@/layouts/base-layout";

const Test = () => {
  return (
    <BaseLayout>
      <div className="flex-1 bg-red-500">Test</div>
    </BaseLayout>
  );
};

export default Test;

Test.protect = true;
