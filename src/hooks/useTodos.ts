import { useEffect, useState } from 'react'
import { createTodo, parseTodos, STORAGE_KEY } from '../lib/todos.ts'
import type { Todo } from '../types.ts'

function readTodos(): Todo[] {
  try {
    return parseTodos(localStorage.getItem(STORAGE_KEY))
  } catch {
    return []
  }
}

function writeTodos(todos: readonly Todo[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch {
    // Quota or private mode: the list still works until reload.
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(readTodos)

  useEffect(() => {
    writeTodos(todos)
  }, [todos])

  function addTodo(title: string): boolean {
    const todo = createTodo(title, crypto.randomUUID())
    if (!todo) return false
    setTodos((current) => [todo, ...current])
    return true
  }

  function toggleTodo(id: string) {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  return { todos, addTodo, toggleTodo, deleteTodo }
}
