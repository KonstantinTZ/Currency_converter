//====================================================================================================================================
// кастомный селект работает с плагином
// запускаю после добавления данных в OPTION

let choicesOne
let choicesTwo

function choisesCall() {
  const selectStyle = document.querySelectorAll('.box__select');

  selectStyle.forEach(el => {
    choicesOne = new Choices(el, {
      searchEnabled: false,
      position: 'auto',
      itemSelectText: ' ',
      allowHTML: true,
    });
    
    choicesTwo = new Choices(el, {
      searchEnabled: false,
      position: 'auto',
      itemSelectText: ' ',
      allowHTML: true,
    });
  })
}

// const element = document.querySelector('.box__input--1');
//   // const choices = new Choices(element);
//   const choices = new Choices(element, {
//     searchEnabled: false,
//           position: 'auto',
//           itemSelectText: ' ',
//           allowHTML: true,
//   });


//====================================================================================================================================
// Получаем данные с API

async function loadCurrencysArrFromServer() {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  return await response.json();
}

// получаем данные с сервера
let data = await loadCurrencysArrFromServer()

//====================================================================================================================================
// Создайте массив объектов клиентов.Добавьте в него объекты клиентов.


let currencysGlobalObj = {}


// обязательная штука, иначе все зависнет
// полученные данные с сервера записываем в массив(основной с которым работаем)
if (data !== '' && data !== null) {
  currencysGlobalObj = data
}





//====================================================================================================================================
// рендерим дату в HTML
// импортируем ф-ю рендеринга даты из './date.js'

import {renderDate} from './date.js'

let incomDate = currencysGlobalObj.Timestamp
document.getElementById('current-date').textContent = renderDate(incomDate)



//====================================================================================================================================
// заполняем валютами Селекты и обрабатываем клики


let valuteListObj = currencysGlobalObj.Valute

let valuteListArray = Object.values(valuteListObj);




function renderOptionList(select, Array) {
  for (const item of Array) {
    let option = document.createElement('option')
    option.classList.add('select__option')
    // ЗАПИСЫВАЕМ ЗНАЧЕНИ СРАЗУ С НОМИНАЛОМ
    option.value = item.Value / item.Nominal
    // хотел сделать дата атрибут для номинала, что бы потом добавить в селект а потом с ним считать
    // option.setAttribute('data-option-nominal', item.Nominal) // не работает с плагино choises
    option.textContent = item.Name + ' ' + item.CharCode
    select.dataset.currencyValue = item.Value

    // select.dataset.currencyNominal = 1
    select.appendChild(option)

  }
}

let firstInput = document.getElementById('form-input-1')
let secondInput = document.getElementById('form-input-2')

let selectOne = document.getElementById('form-select-1')
renderOptionList(selectOne, valuteListArray)

selectOne.addEventListener('change', function () {
  changeSelectDataValue(selectOne)
// пересчитываем при изменнении инпута первого
secondInput.value = currencyCalculation (firstInput.value ,selectOne.getAttribute('data-currency-value'), selectTwo.getAttribute('data-currency-value'))
})

let selectTwo = document.getElementById('form-select-2')
renderOptionList(selectTwo, valuteListArray)

selectTwo.addEventListener('change', function () {
  changeSelectDataValue(selectTwo)
  // пересчитываем при изменнении инпута второго, ПО ТЗ ВТОРОЙ ИНПУТ ЗАБЛОКИРОВАН ДЛЯ ВВОДА
  secondInput.value = currencyCalculation (firstInput.value ,selectOne.getAttribute('data-currency-value'), selectTwo.getAttribute('data-currency-value'))
})

// обновляем данные в датаатрибуте в селекте, т.к. из него потом берем данные для вычеслений
function changeSelectDataValue(select) {
  let value = select.options[select.selectedIndex].value;
  select.dataset.currencyValue = value
}

//вызываю работу плагина ВАЖНО иначе не рвботает
choisesCall()

//====================================================================================================================================
// Работа с полями

firstInput.addEventListener('click', function () {
  firstInput.value = ''
});


function currencyCalculation (input , currencyValue1, currencyValue2 ) {
  let calculation = input * (Number(currencyValue1) / Number(currencyValue2)) // формула кросскурса !
  // отсекаем все лишние символы после запятой, оставляем только 2
  let calcResult = Math.trunc( calculation * 100 ) / 100 
  return calcResult
}


firstInput.addEventListener('keyup', function () {
  // хотел сделать формулу значение из инпута1 * на номинал / курс
  // сделел проще в курс записываю сразу с номиналом (курс / номинал)
  secondInput.value = currencyCalculation (firstInput.value ,selectOne.getAttribute('data-currency-value'), selectTwo.getAttribute('data-currency-value'))
});

//====================================================================================================================================
// рендерим таблицу
// импортируем ф-ю ее из файла render.js


import {renderValuteTable} from './render.js'

renderValuteTable(valuteListArray)




