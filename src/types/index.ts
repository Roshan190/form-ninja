export type FormNinjaConfig = {
  validate: {
    [key: string]: ValidatorFunction;
  };
};

export type SetValueConfig = {
  shouldValidate: boolean;
};

export type ValidatorFunction = (
  value: any,
  attributeValue?: any
) => { message: string } | undefined;
