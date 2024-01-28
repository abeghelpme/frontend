import {layoutForAuthPages} from '@/lib/utils/AuthPagesLayout';

const Test = () => {
	return <div className="flex-1 bg-red-500">Test</div>;
};

export default Test;

Test.protect = true;

Test.getLayout = layoutForAuthPages;
