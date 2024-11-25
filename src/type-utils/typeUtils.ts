export type ValueOf<T> = T[keyof T];

export type ConvertToStringValues<T> = {
  [K in keyof T]: string;
};
