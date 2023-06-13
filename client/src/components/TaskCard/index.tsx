import { Box, Button, Card, CardContent, Typography } from "@mui/material";

type TaskCardProps = {
  title: string;
  description: string;
  onDelete: () => Promise<void>;
};

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  onDelete,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Box mt={2}>
          <Button variant="outlined" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
