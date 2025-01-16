import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  Box,
  Card,
  CardContent,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import type React from "react";
import type { Task } from "./types";

interface TaskMatrixProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const categories = [
  { id: "urgentImportant", title: "緊急かつ重要" },
  { id: "notUrgentImportant", title: "緊急ではないが重要" },
  { id: "urgentNotImportant", title: "緊急だが重要ではない" },
  { id: "notUrgentNotImportant", title: "緊急でも重要でもない" },
];

const TaskMatrix: React.FC<TaskMatrixProps> = ({ tasks, setTasks }) => {
  // ドラッグ完了時の処理
  const onDragEnd = (result: {
    source: { index: number; droppableId: string };
    destination: { index: number; droppableId: string } | null;
  }) => {
    const { source, destination } = result;

    // ドロップ先がない場合（外にドラッグした場合）
    if (!destination) return;

    // 同じカテゴリにドロップした場合
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // タスクの移動ロジック
    const updatedTasks = [...tasks];
    const [removedTask] = updatedTasks.splice(source.index, 1);
    removedTask.category = destination.droppableId;
    updatedTasks.splice(destination.index, 0, removedTask);

    setTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid2 container spacing={2}>
        {categories.map((category) => (
          <Grid2 component={Box} key={category.id}>
            <Paper elevation={3} style={{ padding: "16px", height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                {category.title}
              </Typography>
              <Droppable droppableId={category.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minHeight: "200px",
                      padding: "8px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "4px",
                    }}
                  >
                    {tasks
                      .filter((task) => task.category === category.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                marginBottom: "8px",
                                ...provided.draggableProps.style,
                              }}
                            >
                              <CardContent>
                                <Typography>{task.title}</Typography>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </DragDropContext>
  );
};

export default TaskMatrix;
