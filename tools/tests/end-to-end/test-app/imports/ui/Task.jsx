import React, { useState, useEffect } from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  useEffect(() => {
    setEditText(task.text);
  }, [task.text]);

  const handleEdit = () => setIsEditing(true);

  const handleEditChange = (e) => setEditText(e.target.value);

  const submitEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onEdit(task._id, trimmed);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(task.text); // cancela edição
    }
  };

  const handleBlur = () => {
    submitEdit();
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleEditChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
          style={{ width: "90%" }}
        />
      ) : (
        <span onDoubleClick={handleEdit} style={{ flexGrow: 1, cursor: "pointer" }}>
          {task.text}
        </span>
      )}
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
