import React from "react";
import type { ColumnInterface, ColumnType } from "./types";
import TaskCard from "./Card";

interface IProps {
  column: ColumnInterface;
  onDragStart: (
    taskId: string,
    sourceColumnId: ColumnType,
    index: number,
  ) => void;
  onDrop: (targetColumnId: ColumnType, index: number) => void;
}

const KanbanBoardColumn = (props: IProps) => {
  const { column } = props;

  return (
    <section
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => props.onDrop(column.id, column.tasks.length)}
      aria-labelledby={`column-${column.id}`}
      className="kanban-column"
    >
      <h2 id={`column-${column.id}`}>{column.title}</h2>
      <ul>
        {column.tasks.map((task, idx) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              index={idx}
              columnId={column.id}
              onDragStart={props.onDragStart}
              onDrop={props.onDrop}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default KanbanBoardColumn;
