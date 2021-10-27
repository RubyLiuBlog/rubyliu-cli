function getNum (max,size) {
  let result = []
  let dataSource = Array(max).fill(0).map((v,i) => i + 1)
  while (result.length < size){
    const index = Math.floor(Math.random() * dataSource.length)
    result.push(dataSource[index])
    dataSource.splice(index,1)
  }
  return result.sort((a,b) => a-b)
}
function getSportNum (n) {
  while ( n > 0 ) {
    console.log(`\n体彩大乐透：${require('chalk').red(getNum(35,5))} ${require('chalk').cyan(getNum(12,2))}`)
    n--
  }

}
function getWelfare (n) {
  while ( n > 0 ) {
    console.log(`\n双色球：${require('chalk').red(getNum(33,6))} ${require('chalk').cyan(getNum(16,1))}`)
    n--
  }
}
function getAll (n) {
  console.log('\n------------------------------------------双色球------------------------------------')
  getWelfare(n)
  console.log('\n------------------------------------------大乐透------------------------------------')
  getSportNum(n)
}
module.exports = (action,value) => {
  switch (action) {
    case 'sports': {
      getSportNum(value);
      break;
    }
    case 'welfare': {
      getWelfare(value);
      break;
    }
    case 'all': {
      getAll(value);
      break;
    }
    default: {
      console.log('please input rbuyliu lt -h for help');
      break;
    }
  }
}