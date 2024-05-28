import { useState } from "react";

export function useEditing(initialState = false) {
  const [isEditing, setIsEditing] = useState(initialState);

  const startEditing = () => setIsEditing(true);
  const stopEditing = () => setIsEditing(false);
  const toggleEditing = () => setIsEditing((prev) => !prev);

  return { isEditing, startEditing, stopEditing, toggleEditing };
}
