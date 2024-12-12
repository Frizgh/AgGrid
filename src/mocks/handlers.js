import { http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from 'uuid'

let users = {}
let parameters = {}

const loadUsersFromLocalStorage = () => {
  const storedUsers = localStorage.getItem('users')
  if (storedUsers) {
    users = JSON.parse(storedUsers)
  }
}

const saveUsersToLocalStorage = () => {
  localStorage.setItem('users', JSON.stringify(users))
}

loadUsersFromLocalStorage()

export const handlers = [
  http.post('/api/register', async ({ request }) => {
    const { email, password } = await request.json()
    if (!email || !password) {
      return new HttpResponse(
        JSON.stringify({ error: 'Missing email or password' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const userId = uuidv4()
    users[userId] = { userId, email, password }
    saveUsersToLocalStorage()

    return new HttpResponse(
      JSON.stringify({ message: 'User registered successfully', userId }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }),

  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json()
    if (!email || !password) {
      return new HttpResponse(
        JSON.stringify({ error: 'Missing email or password' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    const user = Object.values(users).find(
      (user) => user.email === email && user.password === password
    )

    if (user) {
      const token = uuidv4()
      users[user.userId].token = token
      saveUsersToLocalStorage()
      return new HttpResponse(JSON.stringify({ token }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `token=${token}; Max-Age=3600; Secure; HttpOnly`,
        },
      })
    } else {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  }),

  http.post('/api/check-auth', async ({ request }) => {
    const { token } = await request.json()
    const user = Object.values(users).find((user) => user.token === token)
    if (user) {
      return new HttpResponse(JSON.stringify({ auth: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      return new HttpResponse(JSON.stringify({ auth: false }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  }),

  http.post('/api/parameters', async ({ request }) => {
    const { row, col } = await request.json()

    if (!Array.isArray(row) || !Array.isArray(col)) {
      return new HttpResponse(
        JSON.stringify({ error: 'Invalid data format.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    parameters = { row, col }

    localStorage.setItem('parameters', JSON.stringify(parameters))

    return new HttpResponse(
      JSON.stringify({ message: 'Parameters saved successfully!' }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }),
]
