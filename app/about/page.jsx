import Link from 'next/link'

const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await res.json()
  return data
}

export default async function Home() {
  const todos = await fetchTodos()
  return (
    <main>
      <Link href='/'>Back to home</Link>
      <h1>About page</h1>

      {todos.map((todo, index) => (
        <h3 key={index}>{todo.title}</h3>
      ))}
    </main>
  )
}
