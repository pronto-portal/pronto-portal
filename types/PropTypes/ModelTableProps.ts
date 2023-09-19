export interface ModelsTableProps<T extends {}> {
  data: T[];
  omitFields?: string[];
  expandObjects?: boolean;
  expandObjectDepth?: number;
  depth?: number;
  baseRowActions?: React.ReactNode;
  nestedRowActions?: Record<keyof T, React.ReactNode>;
}
