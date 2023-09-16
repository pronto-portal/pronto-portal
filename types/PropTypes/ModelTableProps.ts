export interface ModelsTableProps<T extends {}> {
  data: T[];
  omitFields?: string[];
  expandObjects?: boolean;
  expandObjectDepth?: number;
  depth?: number;
}
