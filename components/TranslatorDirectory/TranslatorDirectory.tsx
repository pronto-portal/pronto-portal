import React from "react";
import { Collapsable } from "../Collapsable";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { TranslatorDirectorySearch } from "./TranslatorDirectorySearch";
import { useFilteredTranslators } from "../../contextProviders/FilteredTranslatorsProvider";
import TablePagination from "@mui/material/TablePagination";
import { ModelsTable } from "../ModelsTable";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";

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
      }}
    >
      {!isLoading && translators ? (
        <Stack
          direction="column"
          flexWrap="nowrap"
          flexDirection="column"
          justifyContent="space-between"
          sx={{ width: "100%", height: "100%" }}
          spacing={1}
        >
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
              <TranslatorDirectorySearch />
            </Collapsable>
          </Box>
          <Box
            sx={{
              width: "100%",
              flex: 1,
              overflowY: "auto",
            }}
          >
            <ModelsTable data={translators} />
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
