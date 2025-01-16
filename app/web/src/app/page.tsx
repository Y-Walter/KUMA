"use client";

import TaskList from "@/components/TaskList";
import TaskMatrix from "@/components/TaskMatrix";
import TaskModal from "@/components/TaskModal";
import { Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: "1", title: "タスク 1", category: "urgentImportant" },
    { id: "2", title: "タスク 2", category: "notUrgentImportant" },
    { id: "3", title: "タスク 3", category: "urgentNotImportant" },
    { id: "4", title: "タスク 4", category: "notUrgentNotImportant" },
  ]);

  const [isListView, setIsListView] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // タスク追加ロジック
  const handleAddTask = (newTask: {
    title: string;
    description: string;
  }) => {
    const taskWithId = {
      id: `${Date.now()}`,
      ...newTask,
      category: "notUrgentNotImportant", // デフォルトカテゴリ
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "24px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        タスク管理アプリ
      </Typography>

      {/* ビューモード切り替えボタン */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button
          variant={isListView ? "contained" : "outlined"}
          onClick={() => setIsListView(true)}
        >
          リストビュー
        </Button>
        <Button
          variant={!isListView ? "contained" : "outlined"}
          onClick={() => setIsListView(false)}
        >
          マトリックスビュー
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModalOpen(true)}
        >
          タスクを追加
        </Button>
      </div>

      {/* ビューの切り替え */}
      {isListView ? (
        <TaskList tasks={tasks} setTasks={setTasks} />
      ) : (
        <TaskMatrix tasks={tasks} setTasks={setTasks} />
      )}

      {/* タスク追加モーダル */}
      <TaskModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
    </Container>
  );
}
