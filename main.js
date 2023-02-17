const API = 'https://jsonplaceholder.typicode.com'

const getData = async () => {

  fetch(`${API}/users`)

    .then((res) => {
      if (!res.ok) throw new Error('error in api')
      return res.json()
    })
    .then((data) => {
      const userBox = document.createElement('div')

      userBox.className = 'usersBox '
      document.body.prepend(userBox)

      data.forEach((value) => {
        // console.log(value.name)
        const users = document.createElement('button')

        users.className = 'users'
        users.textContent = value.name

        userBox.prepend(users)


        users.addEventListener('click', () => {
          const h1 = document.querySelector('.userTodosWrapper>h1')
          const todoBox = document.querySelector('.todoData')
          const todo = Array.from(document.querySelectorAll('.todoData>p'))

          // //////////////////////////////////////////////////////////

          const wrapper = document.querySelector('.userTodosWrapper')
          wrapper.style.display = 'block'

          const title = document.createElement('h1')
          title.textContent = `Список дел для ${value.name}`
          wrapper.append(title)

          const todoData = document.createElement('div')
          todoData.className = 'todoData'

          wrapper.append(todoData)

          const loader = document.createElement('h1')
          loader.textContent = 'Загрузка приложения...'
          loader.className = 'todoLoader'
          todoData.append(loader)

          // //////////////////////////////////////////////////////////

          showTodos(value.id, value.name)

          h1.remove()
          todoBox.remove()
          todo.forEach((value) => value.remove())
        })
      })
    })
    .catch(() => {
      const err = document.createElement('h1')

      err.textContent = 'Произошла ошибка при попытке загрузить пользователей'
      err.className = 'errInApi'
      document.body.append(err)
    })
    .finally(() => {
      const loader = document.querySelector('.loaderApp')

      loader.remove()
    })
}

getData()

// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////

const showTodos = async (id) => {

  try {
    const response = await fetch(`${API}/users/${id}/todos`)
    const data = await response.json()
    const todoData = document.querySelector('.todoData')
    // console.log(data)

    data.forEach((value) => {

      if (value.completed === true) {
        const todo = document.createElement('p')
        const todoS = document.createElement('s')
        todo.className = 'tasks'

        todoS.textContent = value.title
        // console.log(value.title)
        todo.append(todoS)
        todoData.append(todo)
      }
      else {
        const todo = document.createElement('p')
        todo.className = 'tasks'

        todo.textContent = value.title
        // console.log(value.title)
        todoData.append(todo)
      }
    })
  }
  catch {
    const todoData = document.querySelector('.todoData')

    const err = document.createElement('p')
    err.textContent = 'Произошла ошибка'
    err.className = 'todoError'
    todoData.append(err)
    console.log('err')
  }
  finally {
    const loader = document.querySelector('.todoLoader')
    loader.remove()
  }
}


