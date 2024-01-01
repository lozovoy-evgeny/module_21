const parser = new DOMParser();

const xmlString = `
    <list>
    <student>
        <name lang="en">
            <first>Ivan</first>
            <second>Ivanov</second>
        </name>
        <age>35</age>
        <prof>teacher</prof>
    </student>
    <student>
        <name lang="ru">
            <first>Петр</first>
            <second>Петров</second>
        </name>
        <age>58</age>
        <prof>driver</prof>
    </student>
    </list>`;

const xmlDOM = parser.parseFromString(xmlString, "text/xml");

// получаем всех студентов
let elementStudent = xmlDOM.querySelectorAll("student");

// Функция для парсинга всех объектов
function parserElement() {

    // Результирующий объект
    let result = [];

    //Для всех студентов делаем объект
    for (let student of elementStudent) {
        let nameNode = student.querySelector("name");
        let firstNode = nameNode.querySelector("first");
        let secondNode = nameNode.querySelector("second");
        let ageNode = student.querySelector("age");
        let profNode = student.querySelector("prof");

        let langAttr = nameNode.getAttribute('lang');

        let parserStudent = {
            name: firstNode.textContent + " " + secondNode.textContent,
            age: ageNode.textContent,
            prof: profNode.textContent,
            lang: langAttr 
        }

        // Вносим студентов в результат
        result.push(parserStudent);
    }
    return result;
}

console.log(parserElement(elementStudent));