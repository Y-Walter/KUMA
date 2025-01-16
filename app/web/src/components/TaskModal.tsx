import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type React from "react";
import { useState } from "react";

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: { title: string; description: string }) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave({ title, description });
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>新規タスク</DialogTitle>
      <DialogContent>
        <TextField
          label="タイトル"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
        />
        <TextField
          label="説明"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSave} variant="contained">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
