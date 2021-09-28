import { mount } from '@vue/test-utils'
import Home from '../src/views/Home.vue'

describe('基础测试', () => {
  const homeWrapper = mount(Home)
  test('测试是否含有html结构', () => {
    expect(homeWrapper.html()).toContain('<div class="home">home</div>')
  })
})
