import { useState, type FormEvent } from 'react'

type TodoFormProps = {
  onAdd: (title: string) => boolean
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const canSubmit = title.trim().length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (onAdd(title)) setTitle('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="todo-form__label" htmlFor="todo-title">
        Новая задача
      </label>
      <div className="todo-form__row">
        <input
          id="todo-title"
          className="todo-form__input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Что нужно сделать?"
          autoComplete="off"
          maxLength={200}
        />
        <button className="todo-form__submit" type="submit" disabled={!canSubmit}>
          Добавить
        </button>
      </div>
    </form>
  )
}
