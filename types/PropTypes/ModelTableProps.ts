import React from "react";

export type NestedRow<T> = {
  [key in keyof T]?: React.ReactNode;
};

export type NestedRowActions<T> = (data: T) => NestedRow<T>;

export type FieldFormatters<T> = {
  [key in keyof T]?: (
    field: T[key]
  ) => T[keyof T] | React.ReactNode | number | string | string[] | boolean;
};

export interface ModelsTableProps<T extends {}> {
  data: T[];
  omitFields?: string[];
  omitExpandFields?: string[];
  expandObjects?: boolean;
  expandObjectDepth?: number;
  depth?: number;
  baseRowActions?: React.ReactNode;
  nestedRowActions?: NestedRowActions<T>;
  rowActions?: (data: T) => React.ReactNode;
  fieldFormatters?: FieldFormatters<T>;
}
