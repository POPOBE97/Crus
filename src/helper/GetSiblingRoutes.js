function getSiblingRoutes (routes, currentPath) {
  var que = [routes[0]]

  while (que.length > 0) {
    const r = que.shift()

    if (Object.hasOwnProperty.call(r, 'path') && r.path === currentPath.path) {
      // found the path
      return r.parent.children
    } else {
      // did not find the path
      if (Object.hasOwnProperty.call(r, 'children')) {
        r.children.forEach(child => {
          que.push(child)
        })
      }
    }
  }
};

module.exports = getSiblingRoutes
