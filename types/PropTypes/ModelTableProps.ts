import React from "react";

export type NestedRow<T> = {
  [key in keyof T]?: React.ReactNode;
};

export type NestedRowActions<T> = (data: T) => NestedRow<T>;

export interface ModelsTableProps<T extends {}> {
  data: T[];
  omitFields?: string[];
  omitExpandFields?: string[];
  expandObjects?: boolean;
  expandObjectDepth?: number;
  depth?: number;
  baseRowActions?: React.ReactNode;
  nestedRowActions?: NestedRowActions<T>;
  rowActions?: React.ReactNode;
}
