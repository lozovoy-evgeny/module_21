const btn = document.querySelector('.j-btn');

// Получаем данные
const useRequest = () => {
  return fetch('https://jsonplaceholder.typicode.com/users/3/todos'/* , options */)
    .then((response) => { return response.json() })
    .then((json) => { return json })
}


//При клике ищем пользователя с нужным id, если нашли выводим задачи
btn.addEventListener('click', async () => {
  let idUser = document.getElementsById("input")[0].value;

  let count = 0;
  
  requestResult.map(function (key) {
    if (key.userId == idUser) {
      if (key.completed == true) {
        addLiСompletedTask(key.title);
      } else {
        addLiUnfulfilledTask(key.title);
      }
    } else {
      count++;
    }
    if (count == requestResult.length) {
      errorId();
    }    
  })
});

//Функция для вывода выполненной задачи
function addLiСompletedTask(task) {
  let li = document.createElement('li');
  li.innerHTML = `<s>${task}</s>`;
  ol.append(li); 
}

// Функция для вывода невыполненной задачи
function addLiUnfulfilledTask(task) {
  let li = document.createElement('li');
  li.innerHTML = `${task}`;
  ol.append(li); 
}

// Функция для вывода сообщения при отсутствии id
function errorId() {
  let div = document.createElement('div');
  div.setAttribute('id', 'error');
  div.className = "error";
  div.innerHTML = "Пользователь с указанным id не найден";
  ol.before(div);
}