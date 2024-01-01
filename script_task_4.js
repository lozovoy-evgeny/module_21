const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let randomNumber = Math.random() * (100 - 1) + 1;
        if (!(Math.floor(randomNumber % 2))) {
            resolve();
        } else {
            reject();
        }
        myPromise
            .then((result) => {
                console.log(`Завершено успешно. Сгенерированное число — ${randomNumber}`);
            })
            .catch((error) => {
                console.log(`Завершено с ошибкой. Сгенерированное число — ${randomNumber}`);
            })
    }, 100);
}); 
