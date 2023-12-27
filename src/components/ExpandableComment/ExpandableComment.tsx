import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplyIcon from '@mui/icons-material/Reply';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Comment } from '../../types/ObjectTypes';

interface CommentProps {
    comment: Comment;
}

export const ExpandableComment: React.FC<CommentProps> = ({ comment }) => {
    const [expandReplies, setExpandReplies] = useState(false);
    const [expandNewReply, setExpandnewReply] = useState(false);
    const [newReply, setNewReply] = useState('');
    const replies = comment.replies;

    return (
        <Card>
            <CardHeader
                title={<Typography variant='h6'>{comment.title}</Typography>}
                avatar={<Avatar>{comment.author.firstName[0]}</Avatar>}
                subheader={comment.author.firstName + ' ' + comment.author.lastName}
            />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    {comment.content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
                    <Button onClick={() => setExpandnewReply(!expandNewReply)}>
                        <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly'>
                            <ReplyIcon />
                            <Typography variant='body2' color='text.secondary'>
                                reply
                            </Typography>
                        </Stack>
                    </Button>
                    <Button onClick={() => setExpandReplies(!expandReplies)}>
                        <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-evenly'>
                            <Typography variant='body2' color='text.secondary'>
                                {replies.length} replies
                            </Typography>
                            <ExpandMoreIcon />
                        </Stack>
                    </Button>
                </Stack>
            </CardActions>
            <Collapse in={expandNewReply} unmountOnExit>
                <CardContent sx={{ paddingLeft: 5, borderLeft: `1px solid ${grey[100]}` }}>
                    <Stack direction='column' spacing={1} alignItems='flex-end' justifyContent='flex-start'>
                        <TextField
                            id='outlined-multiline-static'
                            label='Reply'
                            multiline
                            rows={4}
                            defaultValue='Default Value'
                            variant='outlined'
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                        />
                        <Button variant='contained'>Submit</Button>
                    </Stack>
                </CardContent>
            </Collapse>
            <Collapse in={expandReplies} unmountOnExit>
                <CardContent sx={{ paddingLeft: 5, borderLeft: `1px solid ${grey[100]}` }}>
                    {replies.map((reply) => (
                        <ExpandableComment comment={reply} key={reply.id} />
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};
