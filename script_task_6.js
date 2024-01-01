const btn = document.querySelector('.j-btn');
const resultNode = document.querySelector('.j-result');
// Проверка на число и диапазон
function checkRange (min, max, value) {
    if (isNaN(value)){
        return true;
    }
    if ((value < min) || (value > max)) {
        return true;
    } else {
        return false;
    }
}

// Функции для вывода ошибок ввода
function addErrorRangePage() {
    let div = document.getElementById('answer-error');
    div.innerHTML = `Номер страницы вне диапазона от 1 до 10`;
}

function addErrorRangeLimit() {
    let div = document.getElementById('answer-error');
    div.innerHTML = `Лимит вне диапазона от 1 до 10`;
}

function addErrorRange() {
    let div = document.getElementById('answer-error');
    div.innerHTML = `Номер страницы и лимит вне диапазона от 1 до 10`;
}

//Функции чистки экрана от прошлого содержимого
function deleteError() {
  let div = document.getElementById('answer-error');
  div.innerHTML = ``;
}

function deleteImg() {
  let div = document.getElementById('result');
  div.innerHTML = ``;
}

// Функция проверки ввода пользователя
function checkError (pageNamber, limit) {
    if (checkRange(1, 10, pageNamber) && checkRange(1, 10, limit)) {
        addErrorRange();
        return false;
    } else if (checkRange(1, 10, pageNamber)) {
        addErrorRangePage();
        return false;
    } else if (checkRange(1, 10, limit)) {
        addErrorRangeLimit();
        return false;
    } else {
        return true;
    }
}

// Вывод на экран картинок
function displayResult(apiData) {
  let cards = '';

  for (let i=0, iLen=apiData.length; i<iLen; i++) {
    const cardBlock = `
      <div class="card">
        <img
          src="${apiData[i].url}"
          class="card-image"
        />
        <p>${apiData[i].title}</p>
      </div>
    `;
    cards = cards + cardBlock;
  }

  resultNode.innerHTML = cards;
}

//Осуществление запроса на сервер
function useRequest(page, limit, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.slingacademy.com/v1/sample-data/photos?offset=${page}&limit=${limit}`, true);
  
  xhr.onload = function() {
    if (xhr.status != 200) {
      console.log('Статус ответа: ', xhr.status);
    } else {
      localStorage.setItem("page=", page);
      localStorage.setItem("limit=", limit);
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result.photos);
      }
    }
  };
  
  xhr.onerror = function() {
    console.log('Ошибка! Статус ответа: ', xhr.status);
  };
  
  xhr.send();
};

//Слушатель 
btn.addEventListener('click', async () => {
    deleteError();
    deleteImg();
    let pageNamber = document.getElementById("pageNamber").value;
    let limit = document.getElementById("limit").value;
    pageNamber = Number(pageNamber);
    limit = Number(limit);

    if (checkError(pageNamber, limit)) {
      useRequest(pageNamber,limit, displayResult);
    }
});

//Функция последнего успешного запроса
function lastGetResult() {
  lastLimit = localStorage.getItem("limit=");
  lastPage = localStorage.getItem("page=");
  if ((lastPage && lastLimit) != null) {
    useRequest(lastPage,lastLimit, displayResult);
  }
};

lastGetResult();
