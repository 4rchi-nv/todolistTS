import type { Todo } from '../types.ts'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className={todo.completed ? 'todo is-done' : 'todo'}>
      <label className="todo__check">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span className="todo__title">{todo.title}</span>
      </label>
      <button
        type="button"
        className="todo__delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Удалить «${todo.title}»`}
      >
        Удалить
      </button>
    </li>
  )
}
