import React from "react";
import { Collapsable } from "../Collapsable";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import TablePagination from "@mui/material/TablePagination";
import { ModelsTable } from "../ModelsTable";
import Stack from "@mui/material/Stack";

export const TranslatorDirectory: React.FC = () => {
  const {
    translators,
    isLoading,
    page,
    setPage,
    totalRowCount,
    countPerPage,
    setCountPerPage,
  } = useFilteredTranslators();

  return (
    <Collapsable
      title="Translators"
      sx={{
        width: "100%",
      }}
      sxDetails={{
        maxHeight: "60vh",
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {!isLoading && translators ? (
        <Stack
          direction="column"
          flexWrap="nowrap"
          sx={{ width: "100%", height: "100%" }}
        >
          <Box sx={{ width: "100%", flex: 1 }}>
            <TranslatorDirectorySearch />
          </Box>
          <Box
            sx={{
              width: "100%",
              flex: 1,
            }}
          >
            <ModelsTable data={translators} />
          </Box>
          <Box sx={{ width: "100%", flex: 1 }}>
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
