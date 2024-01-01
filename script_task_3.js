let currentDate = new Date ();

function cookieDate (Date) {
    let year = String(currentDate.getFullYear());
    let month = String(currentDate.getMonth() + 1);
    let day = String(currentDate.getDate());
    let hours = String(currentDate.getHours());
    let minutes = String(currentDate.getMinutes());

    let result = `${hours}:${minutes} ${day}.${month}.${year}`;

    return result;
}

userName = localStorage.getItem("user=");

if (userName != null) {
    let date = localStorage.getItem("lastVisit=");
    date = cookieDate(date);

    alert (`Добрый день, ${userName}! Давно не виделись. В последний раз вы были у нас ${date}`);
    localStorage.setItem("lastVisit=", currentDate);
} else {
    var nameVisitor = prompt ('Добро пожаловать! Назовите, пожалуйста, ваше имя');

    localStorage.setItem("user=", nameVisitor);
    localStorage.setItem("lastVisit=", currentDate);
}


