export interface PaginatedInput {
    page: number;
    countPerPage: number;
}

export interface DateRange {
    date1: Date;
    date2: Date;
}

export interface GetById {
    input: { id: string };
}
