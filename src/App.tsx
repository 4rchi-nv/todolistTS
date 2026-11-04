import { useState } from 'react'
import { TodoFilters } from './components/TodoFilters.tsx'
import { TodoForm } from './components/TodoForm.tsx'
import { TodoList } from './components/TodoList.tsx'
import { useTodos } from './hooks/useTodos.ts'
import { filterTodos, ruCount } from './lib/todos.ts'
import type { TodoFilter } from './types.ts'

const EMPTY_TEXT: Record<TodoFilter, string> = {
  all: 'Список пуст. Добавьте первую задачу.',
  active: 'Активных задач нет.',
  completed: 'Выполненных задач нет.',
}

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()
  const [filter, setFilter] = useState<TodoFilter>('all')

  const activeCount = todos.filter((todo) => !todo.completed).length
  const visibleTodos = filterTodos(todos, filter)

  return (
    <main className="app">
      <header className="app__header">
        <p className="app__eyebrow">ZalogHub</p>
        <h1>Задачи</h1>
        <p className="app__summary">
          {ruCount(activeCount, 'активная', 'активные', 'активных')}
          {' · '}
          {ruCount(todos.length - activeCount, 'выполненная', 'выполненные', 'выполненных')}
        </p>
      </header>

      <TodoForm onAdd={addTodo} />
      <TodoFilters
        value={filter}
        counts={{
          all: todos.length,
          active: activeCount,
          completed: todos.length - activeCount,
        }}
        onChange={setFilter}
      />
      <TodoList
        todos={visibleTodos}
        emptyText={EMPTY_TEXT[filter]}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </main>
  )
}
