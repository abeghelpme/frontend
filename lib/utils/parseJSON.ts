const parseJSON = <TResult>(value: string | undefined | null) => {
  if (value == null) {
    return null;
  }

  return JSON.parse(value) satisfies TResult as TResult;
};

export { parseJSON };
