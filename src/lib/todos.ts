import type { Todo, TodoFilter } from '../types.ts'

export const STORAGE_KEY = 'zaloghub.todos'

export function createTodo(title: string, id: string): Todo | null {
  const normalized = title.trim()
  if (!normalized) return null
  return { id, title: normalized, completed: false }
}

export function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    record.id.length > 0 &&
    typeof record.title === 'string' &&
    typeof record.completed === 'boolean'
  )
}

export function parseTodos(raw: string | null): Todo[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isTodo)
  } catch {
    return []
  }
}

export function filterTodos(todos: readonly Todo[], filter: TodoFilter): Todo[] {
  if (filter === 'active') return todos.filter((todo) => !todo.completed)
  if (filter === 'completed') return todos.filter((todo) => todo.completed)
  return [...todos]
}

export function ruCount(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10
  const mod100 = count % 100
  const word =
    mod10 === 1 && mod100 !== 11
      ? one
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? few
        : many
  return `${count} ${word}`
}
