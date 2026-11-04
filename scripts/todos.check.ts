import assert from 'node:assert/strict'
import { createTodo, filterTodos, parseTodos, ruCount } from '../src/lib/todos.ts'

const todo = createTodo('  Купить хлеб  ', '1')
assert.deepEqual(todo, { id: '1', title: 'Купить хлеб', completed: false })
assert.equal(createTodo('   ', '2'), null)
assert.equal(createTodo('', '3'), null)
assert.equal(createTodo('\n\t', '4'), null)

const todos = [
  { id: '1', title: 'A', completed: false },
  { id: '2', title: 'B', completed: true },
]
assert.deepEqual(
  filterTodos(todos, 'active').map((item) => item.id),
  ['1'],
)
assert.deepEqual(
  filterTodos(todos, 'completed').map((item) => item.id),
  ['2'],
)
assert.equal(filterTodos(todos, 'all').length, 2)

const raw = JSON.stringify([
  { id: '1', title: 'Ok', completed: false },
  { id: 2, title: 'Bad id', completed: false },
  { title: 'No id', completed: true },
  'nope',
])
assert.deepEqual(parseTodos(raw), [{ id: '1', title: 'Ok', completed: false }])
assert.deepEqual(parseTodos('{'), [])
assert.deepEqual(parseTodos(null), [])
assert.deepEqual(parseTodos('42'), [])

assert.equal(ruCount(1, 'активная', 'активные', 'активных'), '1 активная')
assert.equal(ruCount(2, 'активная', 'активные', 'активных'), '2 активные')
assert.equal(ruCount(5, 'активная', 'активные', 'активных'), '5 активных')
assert.equal(ruCount(11, 'активная', 'активные', 'активных'), '11 активных')
assert.equal(ruCount(21, 'активная', 'активные', 'активных'), '21 активная')

console.log('todos.check: ok')
