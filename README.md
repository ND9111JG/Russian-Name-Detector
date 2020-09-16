# GenderTask
Определение пола человека

## Задача
Нужно сделать функцию, которой мы даём строчку, и которая возвращает:
* -1 - Пол не определён
* 0 - Мужской пол
* 1 - Женский пол

### Например:
```js
// Грубо говоря функция, код которой еще нужно будет написать
function detectGender(str){
  ...
}

// определяем пол:
detectGender("Илья");                 // 0
detectGender("Илья Рычагов");         // 0
detectGender("Илья Ильич Рычагов");   // 0
detectGender("Саша");                 // -1
detectGender("Саша Кулаков");         // 0
detectGender("Саша Владимирович");    // 0
detectGender("Саша Кузьмина");        // 1
detectGender("Саша Яценко");          // -1
detectGender("Яценко Саша Ильинишна");// 1
detectGender("Кулавидзе Женя");       // -1
detectGender("Евгения Кулавидзе");    // 1
detectGender("Федотова Женя");        // 1
detectGender("Федотов Женя");         // 0

/* Функция должна так же правильно читать строки, которые:
- пишутся маленькими бувами "илья рычагов"
- пишутся большими буквами "САША ВЛАДИМИРОВИЧ"
- понимать где имя, фамилия и отчество (и есть ли вообще): 
  "илья рычагов" -> имя:илья, фамилия:рычагов, отчество:нет
- уметь определять пол не только по имени, но ещё и по дополнительным штукам как фамилия или отчество
- уметь определять с лишними пробелами: "илья ", " саша  куприн  "
- уметь читать с лишними знаками: "илья. "
*/
```

## В подмогу идут 2 модуля.
* sexDefiner.js, которая определяет пол по русскому имени (наша собственная разработка)
* Petrovich.js, которая определяет пол по фамилии (https://github.com/petrovich/petrovich-js)

## На чём тестируем?
Вот массив, где записаны строки и что должна выдавать функция в будущем:
```
let tests = [
  {str: 'Илья', result:0},
  {str: 'саша', result:-1},
  {str: 'саша кулаков', result:0},
  {str: 'еГОР', result:0},
  {str: 'лвыпьи кулаков', result:0},
  {str: 'мвалвл рычагова', result:1},
  {str: 'кнутов женя', result:0},
  {str: 'пискунова саша', result:1},
  {str: 'цеценюк гена', result:0},
  {str: 'цеценюк вика', result:1},
  {str: 'саша цеценюк', result:-1},
  {str: 'гивергидзе женя абрамович', result:0},
  {str: 'куштапали саша арнольдовна', result:1},
  {str: 'арнольдовна саша', result:1},
  {str: 'александра', result:1},
  {str: 'александр', result:0},
  {str: ' женя нипкина', result:1},
  {str: '   нипикитин саша  ', result:0},
  {str: 'женя . васильев', result:0}
]
```
