import type { Todo } from '../types.ts'
import { TodoItem } from './TodoItem.tsx'

type TodoListProps = {
  todos: readonly Todo[]
  emptyText: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, emptyText, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty">{emptyText}</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
