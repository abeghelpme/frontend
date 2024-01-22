export const validateTagValue = (tagArray: string[], tagValue: string) => {
  if (tagValue.length < 3) {
    return;
  } //TODO - show error

  if (tagArray.includes(tagValue)) {
    return;
  } //TODO - show error

  if (tagArray.length >= 5) {
    return;
  } //TODO - show error

  return tagValue;
};
