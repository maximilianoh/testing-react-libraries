import defaultAxios from 'axios'


/*const axios = defaultAxios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  headers: {'Content-Type': 'application/json'}
});*/

// Get All Todos
const getAllTodos = async () => {
  try {
    const todos = await defaultAxios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return todos.data;
  } catch(err) {
    return console.error(err);
  }
}

const services = {
  getAllTodos
};

export default services