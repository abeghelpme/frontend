const parseJSON = <TResult>(value: string | undefined | null) => {
  if (value == null) {
    return null;
  }

  return JSON.parse(value) as TResult;
};

export { parseJSON };
