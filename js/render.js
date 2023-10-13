// ф-я для отрисовки одной шапки таблицы

function renderTableHeaders() {
    let tBody = document.getElementById('table-body')
  
    let tableRow = document.createElement('tr')
    tableRow.classList.add('table__row', 'heading')
  
    let firstColumn = document.createElement('td')
    firstColumn.classList.add('row__item', 'heading__item-1')
  
    let secondColumn = document.createElement('td')
    secondColumn.classList.add('row__item', 'heading__item-2')
  
    let threedColumn = document.createElement('td')
    threedColumn.classList.add('row__item', 'heading__item-3')
  
    let fourthColumn = document.createElement('td')
    fourthColumn.classList.add('row__item', 'heading__item-4')
  
    let tableHeaderTextContentFirst = document.createElement('span')
    tableHeaderTextContentFirst.classList.add('table__text-content')
    tableHeaderTextContentFirst.textContent = 'Код'
  
  
    let tableHeaderTextContentSecond = document.createElement('span')
    tableHeaderTextContentSecond.classList.add('table__text-content')
    tableHeaderTextContentSecond.textContent = 'Еденица'
  
  
    let tableHeaderTextContentThreed = document.createElement('span')
    tableHeaderTextContentThreed.classList.add('table__text-content')
    tableHeaderTextContentThreed.textContent = 'Валюта'
  
  
  
    let tableHeaderTextContentFourth = document.createElement('span')
    tableHeaderTextContentFourth.classList.add('table__text-content')
    tableHeaderTextContentFourth.textContent = 'Курс базовой валюты'
  
    firstColumn.append(tableHeaderTextContentFirst)
    secondColumn.append(tableHeaderTextContentSecond)
    threedColumn.append(tableHeaderTextContentThreed)
    fourthColumn.append(tableHeaderTextContentFourth)
  
    tBody.appendChild(tableRow)
    tableRow.appendChild(firstColumn)
    tableRow.appendChild(secondColumn)
    tableRow.appendChild(threedColumn)
    tableRow.appendChild(fourthColumn)
  
  
  }
  
  
  // ф-я для отрисовки одной строки с валютой
  
  function getValuteItem (valute, valuteListArray) {
  
    let valuteObj = valuteListArray[valute] // для удобства работы выделяем объект
    let tBody = document.getElementById('table-body')
  
    let tableRow = document.createElement('tr')
    tableRow.classList.add('table__row')
  
    let firstColumn = document.createElement('td')
    firstColumn.classList.add('row__item', 'row__item-1')
  
    let secondColumn = document.createElement('td')
    secondColumn.classList.add('row__item', 'row__item-2')
  
    let threedColumn = document.createElement('td')
    threedColumn.classList.add('row__item', 'row__item-3')
  
    let fourthColumn = document.createElement('td')
    fourthColumn.classList.add('row__item', 'row__item-4')
  
    let tableTextContentFirst = document.createElement('span')
    tableTextContentFirst.classList.add('table__text-content')
    
    // создаем враппер и вложения для первой ячейки 
    let tableWrapper = document.createElement('div')
    tableWrapper.classList.add('table__wrapper', 'flag')
  
    let flagIcon = document.createElement('img')
    flagIcon.classList.add('flag__icon')
    // вставляем картинку в зависимости от значения valuteObj.CharCode
    flagIcon.src = `img/${valuteObj.CharCode}-flag.svg`
    // if (valuteObj.CharCode === 'XDR') flagIcon.style.display = 'none'
    // XDR - без флага
  
  
    let flagText = document.createElement('span')
    flagText.classList.add('flag__text')
    flagText.textContent = valuteObj.CharCode
  
    
    tableWrapper.append(flagIcon)
    tableWrapper.append(flagText)
  
    tableTextContentFirst.append(tableWrapper)
  
  
    let tableTextContentSecond = document.createElement('span')
    tableTextContentSecond.classList.add('table__text-content')
    tableTextContentSecond.textContent = valuteObj.Nominal
  
  
    let tableTextContentThreed = document.createElement('span')
    tableTextContentThreed.classList.add('table__text-content')
    tableTextContentThreed.textContent = valuteObj.Name
  
  
  
    let tableTextContentFourth = document.createElement('span')
    tableTextContentFourth.classList.add('table__text-content')
    tableTextContentFourth.textContent = valuteObj.Value
  
    firstColumn.append(tableTextContentFirst)
    secondColumn.append(tableTextContentSecond)
    threedColumn.append(tableTextContentThreed)
    fourthColumn.append(tableTextContentFourth)
  
    tBody.appendChild(tableRow)
    tableRow.appendChild(firstColumn)
    tableRow.appendChild(secondColumn)
    tableRow.appendChild(threedColumn)
    tableRow.appendChild(fourthColumn)
  }
  
  // отрисовываю полностью тпблицу
  // Экспортируем данную ф-ю в файл main.ja
  export function renderValuteTable(valuteListArray) {
    for (let item in valuteListArray) {
      // потом черес css при разрешении > 1024 отсекаю лишние шапки
      renderTableHeaders()
      getValuteItem (item , valuteListArray)
    }
  }