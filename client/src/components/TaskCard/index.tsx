import { Box, Card, CardContent, Container, Typography } from "@mui/material";

type TaskCardProps = {
  title: string;
  description: string;
};

export const TaskCard: React.FC<TaskCardProps> = ({ title, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

