import React from "react";
import { ExpandableComment } from "../ExpandableComment";
import { Comment } from "../../types/ObjectTypes";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import { usePaginationState } from "../../hooks/usePaginationState";

interface CommentsSectionProps {
  comments: Comment[];
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  comments,
}) => {
  const { page, setPage, countPerPage } = usePaginationState();

  return (
    <Stack spacing={2}>
      {comments.map((comment) => (
        <Stack key={comment.id} spacing={2}>
          <ExpandableComment comment={comment} />
          <Divider />
        </Stack>
      ))}
      <Pagination
        count={Math.ceil(100 / countPerPage)}
        page={page + 1}
        onChange={(event, value) => setPage(value - 1)}
        color="primary"
      />
    </Stack>
  );
};
