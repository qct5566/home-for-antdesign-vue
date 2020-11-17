<template>
  <div class="head-menu">
    <div class="menu_conten">
      <div class="menu_left"></div>
      <ul class="menu_center">
        <li
          v-for="(menu, index) in currentMenu"
          :key="menu.path"
          :class="{ sel: menuCur == index, up_icon: menu.children }"
        >
          <a href="javascript:;" @click="jump(menu)">{{ menu.meta.title }}</a>
          <div class="sec_menu" v-if="menu.children">
            <a
              href="javascript:;"
              v-for="child in menu.children"
              :key="child.path"
              @click="jump(child)"
            >{{ child.meta.title }}</a
            >
          </div>
        </li>
      </ul>
      <div class="menu_right">
        <button class="btn">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    menuCur: {
      type: String,
      default: '0'
    }
  },
  computed: {
    ...mapGetters(['currentMenu'])
  },
  methods: {
    jump (item) {
      this.$router.push({ path: item.path })
    }
  }
}
</script>
