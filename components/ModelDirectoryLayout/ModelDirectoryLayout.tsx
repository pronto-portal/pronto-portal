import React from "react";
import { Collapsable } from "../Collapsable";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TablePagination from "@mui/material/TablePagination";
import { ModelsTable } from "../ModelsTable";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { PaginationState } from "../../hooks/usePaginationState";

interface ModelDirectoryLayoutProps<T extends {}> extends PaginationState {
  titleText: string;
  data: T[];
  totalRowCount: number;
  isLoading?: boolean;
  renderFilters?: React.ReactNode;
  omitFields?: string[];
}

export const ModelDirectoryLayout = <T extends {}>({
  titleText,
  data,
  renderFilters,
  isLoading,
  page,
  setPage,
  totalRowCount,
  countPerPage,
  setCountPerPage,
  omitFields,
}: ModelDirectoryLayoutProps<T>) => {
  return (
    <Collapsable
      title={titleText}
      sx={{
        width: "100%",
      }}
      sxDetails={{
        maxHeight: "60vh",
        height: "60vh",
      }}
    >
      {!isLoading && data ? (
        <Stack
          direction="column"
          flexWrap="nowrap"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: "100%", height: "100%" }}
          spacing={1}
        >
          {renderFilters !== undefined && (
            <Box sx={{ width: "100%", flex: 0.25 }}>
              <Collapsable
                sx={{
                  width: "100%",
                  backgroundColor: grey[100],
                  boxShadow: "none",
                  borderWidth: 0,
                }}
                sxSummary={{
                  height: "auto",
                }}
                sxDetails={{
                  height: "100%",
                }}
                title="Filters"
              >
                {renderFilters}
              </Collapsable>
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
            }}
          >
            <ModelsTable data={data} omitFields={omitFields} />
          </Box>
          <Box sx={{ width: "100%", flex: 0.25 }}>
            <TablePagination
              component="div"
              page={page}
              onPageChange={(_, page) => setPage(page)}
              count={totalRowCount}
              rowsPerPage={countPerPage}
              onRowsPerPageChange={(e) =>
                setCountPerPage(parseInt(e.target.value, 10))
              }
            />
          </Box>
        </Stack>
      ) : (
        <LinearProgress sx={{ width: "100%", height: "100%" }} />
      )}
    </Collapsable>
  );
};
