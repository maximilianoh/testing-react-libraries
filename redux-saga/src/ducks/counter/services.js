import defaultAxios from 'axios'


const axios = defaultAxios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {'Content-Type': 'application/json'}
});

// Get All Todos
export const getAllTodos = async () => {
  try {
    const todos = await axios.get('todos?_limit=5');
    return todos.data;
  } catch(err) {
    return console.error(err);
  }
}
  