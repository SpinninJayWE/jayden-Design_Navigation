
// 判断是否为空对象 要考虑传过来的值可能是null或者undefined
function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object
}
