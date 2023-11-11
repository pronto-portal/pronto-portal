import React from "react";
import { Collapsable } from "../Collapsable";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import TablePagination from "@mui/material/TablePagination";
import { ModelsTable } from "../ModelsTable";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { PaginationState } from "../../hooks/usePaginationState";
import { ModelsTableProps } from "../../types/PropTypes/ModelTableProps";
import Typography from "@mui/material/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

interface ModelDirectoryLayoutProps<T extends {}> extends PaginationState {
  titleText: string;
  totalRowCount: number;
  isLoading?: boolean;
  actions?: React.ReactNode;
  renderFilters?: React.ReactNode;
  tableProps: ModelsTableProps<T>;
}

export const ModelDirectoryLayout = <T extends {}>({
  titleText,
  actions,
  renderFilters,
  isLoading,
  page,
  setPage,
  totalRowCount,
  countPerPage,
  setCountPerPage,
  tableProps,
}: ModelDirectoryLayoutProps<T>) => {
  return (
    <Box height="100%" width={1}>
      {!isLoading && tableProps.data ? (
        <Stack
          direction="column"
          flexWrap="nowrap"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: "100%", height: "100%" }}
          spacing={1}
        >
          {!isLoading &&
          tableProps.data.length &&
          renderFilters !== undefined ? (
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
          ) : null}
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            {actions}
          </Stack>
          {tableProps.data.length ? (
            <>
              <Box
                sx={{
                  width: "100%",
                  flex: 1,
                  overflowY: "auto",
                }}
              >
                <ModelsTable {...tableProps} />
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
            </>
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              direction="column"
            >
              <InfoOutlined
                sx={{
                  color: "warning.main",
                  width: "4rem",
                  height: "4rem",
                }}
              />
              <Typography variant="h4" textAlign="center" color="warning.main">
                No {titleText} found
              </Typography>
            </Stack>
          )}
        </Stack>
      ) : (
        <LinearProgress sx={{ width: "100%", height: "100%" }} />
      )}
    </Box>
  );
};
