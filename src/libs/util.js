let util = {}

util.iconList = [
  'home',
  'search',
  'flag',
  'star',
  'heart',
  'heart-broken',
  'gear-a',
  'gear-b',
  'toggle-filled',
  'toggle',
  'settings',
  'wrench',
  'hammer',
  'edit',
  'trash-a',
  'trash-b',
  'document',
  'document-text',
  'clipboard',
  'scissors',
  'funnel',
  'bookmark',
  'email'
]

util.choice = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

util.randomIcon = () => {
  return util.choice(util.iconList)
}

util.checkIcon = (item) => {
  if (item && !item.icon) {
    item.icon = util.randomIcon()
  }
}

export default util
