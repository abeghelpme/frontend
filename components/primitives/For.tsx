type ForProps<TArray extends unknown[]> =
  | {
      each: TArray;
      children?: "Hey, Sorry but you've already used the render prop, so the children prop is redundant";
      render: (item: TArray[number], index: number) => React.ReactNode;
    }
  | {
      each: TArray;
      children: (item: TArray[number], index: number) => React.ReactNode;
      render?: "Hey, Sorry but you've already used the children prop, so the render prop is redundant";
    };

function For<TArrayProp extends unknown[]>(props: ForProps<TArrayProp>) {
  const { each: listOfItems, render, children } = props;

  const JSXElementList = listOfItems.map((item, index) => {
    if (typeof children === "function") {
      return children(item, index);
    }

    return render(item, index);
  });

  return JSXElementList;
}

export default For;
