import { filter, isEmpty, isNil, pathOr, values } from 'ramda';

/**
 * @param validatedSchema - error schema that needsto check whether it contains error or not
 */
export default (validatedSchema: any) => {
  const schemaValidatedValues = values(validatedSchema);
  const isErrorFound = filter(
    (schemaValidatedValue: any) =>
      pathOr(false, ['hasError'], schemaValidatedValue),
    schemaValidatedValues,
  );
  if (isEmpty(isErrorFound) || isNil(isErrorFound)) {
    return false;
  }
  return true;
};
