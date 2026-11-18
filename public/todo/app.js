// The whole app: a list of todos, saved in the browser, redrawn after every change.
const STORAGE_KEY = 'todos'

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')

const form = document.querySelector('#new-todo')
const input = document.querySelector('#title')
const list = document.querySelector('#list')
const count = document.querySelector('#count')

// Apply one change, then save and redraw.
function update(change) {
  change()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  render()
}

function render() {
  list.replaceChildren(...todos.map(todoItem))
  const left = todos.filter(todo => !todo.done).length
  count.textContent = `${left} ${left === 1 ? 'item' : 'items'} left`
}

function todoItem(todo) {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.done
  checkbox.addEventListener('change', () => update(() => { todo.done = checkbox.checked }))

  const title = document.createElement('span')
  title.textContent = todo.title // textContent, not innerHTML: a title can never inject HTML

  const label = document.createElement('label')
  label.append(checkbox, title)

  const remove = document.createElement('button')
  remove.textContent = '×'
  remove.setAttribute('aria-label', `Delete ${todo.title}`)
  remove.addEventListener('click', () => update(() => { todos = todos.filter(t => t !== todo) }))

  const item = document.createElement('li')
  item.classList.toggle('done', todo.done)
  item.append(label, remove)
  return item
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const title = input.value.trim()
  if (!title)
    return
  update(() => todos.push({ title, done: false }))
  input.value = ''
})

render()
