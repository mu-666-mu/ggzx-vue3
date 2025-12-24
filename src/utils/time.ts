// 封装时间格式化的方法
// 获取当前小时，返回对应的时间段问候语
export const getTimeHour = () => {
  let msg = ''
  const hour = new Date().getHours()
  if (hour < 12) {
    msg = 'Good morning'
  } else if (hour < 18) {
    msg = 'Good afternoon'
  } else {
    msg = 'Good evening'
  }
  return msg
}
