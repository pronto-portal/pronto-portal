import { User } from "./User";

export interface BaseComment {
  id: string;
  title?: string;
  content: string;
  author: User;
  authorId: string;
  rating?: number;
  createdAt: Date;
  edited: boolean;
  editedAt?: Date;
  deleted: boolean;
  likes: number;
  dislikes: number;
}

export interface Comment extends BaseComment {
  replies: Comment[];
}
