//====================================================================================================================================
// ф-я высчитавания даты из данных получаемых с сервера

export function renderDate(incomDate) { // ф-я для вычесления даты
    let date = new Date(incomDate)
    let result = ''
    if (date.getDate() < 10) {
      result = result + '0'
    }
    result = result + date.getDate() + '.'
    if (date.getMonth() < 9) {
  
      result = result + '0'
    }
    result = result + (date.getMonth() + 1) + '.'
  
    result = result + date.getFullYear()
  
    return result
  }