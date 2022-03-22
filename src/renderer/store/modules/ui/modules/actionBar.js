export default {
  namespaced: true,
  state: () => ({
    key: {
      a: {
        label: '确认',
        visible: false
      },
      b: {
        label: '取消',
        visible: false
      },
      x: {
        label: '更多',
        visible: false
      },
      y: {
        label: '刷新',
        visible: false
      }
    }
  }),
  mutations: {
    setVisibleForKey (state, {
      key,
      visible
    }) {
      state.key[key].visible = visible
    },
    setLabelForKey (state, {
      key,
      label
    }) {
      state.key[key].label = label
    }
  }
}
