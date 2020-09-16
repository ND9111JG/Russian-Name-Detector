[![Russian-Name-Detector Logo](https://storage.yandexcloud.net/actid-storage/russian-name-detector/logo.png?1)](https://github.com/ND9111JG/Russian-Name-Detector/)

Определять имя, фамилию, отчество и пол в строчке стало еще проще!
Добро пожаловать в ***Russian Name Detector***.

Поддержка от NodeJS 8 версии.  

Как говорится: дай мне строчку, я дам объект с тем что смог распарсить.

✓ "иван кузнецов" - мальчик, имя Иван, фамилия Кузнецов!  
✓ "игорь" - мальчик, имя Игорь!  
✓ "василисова женя" - девочка, имя Женя, фамилия Василисова!  
✓ "саша катков" - мальчик, имя Саша, фамилия Катков!  
✓ "alexander kuznetsov" - мальчик, имя Alexander, фамилия Kuznetsov!  
✓ "илья ilyich" - мальчик, имя Илья, отчество Ilyich!  
✓ "наташа" - девочка, имя Наташа!   


Поехали!

## Оглавление
* [Начало работы](#как-с-этим-работать)
* [Создание экземпляра парсера](#создайте-экзепляр-парсера)
* [Распознавание](#распознавание)
* Разработчики: [git@ND9111JG](https://github.com/ND9111JG/) & [git@powerdot](https://github.com/powerdot/)


## Как с этим работать

Установите npm-модуль в директории вашего проекта, это очень просто.  
```bash
npm i russian-name-detector
```

## Создайте экзепляр парсера  
  
Базовый модуль:
```javascript
var nameDetector = require("russian-name-detector")();
```

Модуль с функцией транскрипции (через Google Translate Api):
```javascript
var nameDetector = require("russian-name-detector")({
  google_api_key: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
});
```
Модуль с функцией транскрипции понадобится чтобы корректно обработать имя, написанное на латинице, например, "Sasha Lulakov" в "Саша Лулаков".  
Для это понадобится API-ключ от Google Переводчика, [посмотри документацию гугла](https://cloud.google.com/translate/docs/setup) как его получить.  
**Без ключа модуль не сможет определять имена, написаные на латинице.**

## Распознавание 

Модуль асинхронный, поэтому использование **await** и асинхронных функций является обязательным.  
Всё настолько легко, что
```javascript
let data = await nameDetector("илья 123 ильич");
```
Нам возвращается объект со следующими ключами:
* name - имя (*string / undefined*)
* middlename - отчество (*string / undefined*)
* surname - фамилия (*string / undefined*)
* sex - пол (*string ["m", "f"] / false*)  

Например:
```json
{
  "name": "Илья", // Имя
  "middlename": "Ильич", // Отчество
  "surname": undefined, // Фамилия
  "sex": "m" // Пол
}
```

### Парсим практически любые строчки!

Проверь:

```javascript
var nameDetector = require("russian-name-detector")({
  google_api_key: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
});

(async ()=>{
  let arr = [];
  arr.push( await nameDetector("саша куликов") );
  /*
  {
    "name": "Саша",
    "middlename": undefined,
    "surname": "Куликов",
    "sex": "m"
  }
  */

  arr.push( await nameDetector("цеценюк курашива альбертовна") );
  /*
  {
    "name": "Курашива",
    "middlename": "Альбертовна",
    "surname": "Цеценюк",
    "sex": "f"
  }
  */
 
  arr.push( await nameDetector("yulia_komaROva") );
  /*
  {
    "name": "Yulia",
    "middlename": undefined,
    "surname": "Komarova",
    "sex": "f"
  }
  */
 
  arr.push( await nameDetector("ilyich ilya") );
  /*
  {
    "name": "Ilya",
    "middlename": "Ilyich",
    "surname": undefined,
    "sex": "m"
  }
  */

  arr.push( await nameDetector("alexander1234442женьков    ") );
  /*
  {
    "name": "Alexander",
    "middlename": undefined,
    "surname": "Женьков",
    "sex": "m"
  }
  */

  arr.push( await nameDetector(".павел?//дуров!") );
  /*
  {
    "name": "Павел",
    "middlename": undefined,
    "surname": "Дуров",
    "sex": "m"
  }
  */

  console.log(arr);
})()
```