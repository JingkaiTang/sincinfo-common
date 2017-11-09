let util = {}

util.iconList = [
  'flag',
  'star',
  'heart',
  'gear-a'
]

util.choice = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

util.randomIcon = function () {
  return util.choice(util.iconList)
}

export default util
