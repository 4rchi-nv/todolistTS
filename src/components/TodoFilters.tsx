import type { TodoFilter } from '../types.ts'

const FILTERS: { id: TodoFilter; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'active', label: 'Активные' },
  { id: 'completed', label: 'Выполненные' },
]

type TodoFiltersProps = {
  value: TodoFilter
  counts: Record<TodoFilter, number>
  onChange: (filter: TodoFilter) => void
}

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  return (
    <div className="filters" role="group" aria-label="Фильтр задач">
      {FILTERS.map((filter) => {
        const selected = filter.id === value
        return (
          <button
            key={filter.id}
            type="button"
            className={selected ? 'filters__button is-active' : 'filters__button'}
            aria-pressed={selected}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
            <span className="filters__count">{counts[filter.id]}</span>
          </button>
        )
      })}
    </div>
  )
}
