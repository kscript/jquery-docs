<template>
  <div class="view-home">
    <el-container class="main-container" :class="{'show-menu': showMenu}">
      <el-header>
        <el-row type="flex">
          <el-col class="layout-left" size="12">
          </el-col>
          <el-col class="layout-right" size="12">
            <a href="/">
              <i class="fd-icon fd-icon-github"></i>
            </a>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="sub-container">
        <el-aside :width="asideW + 'px'">
        <span class="menu-button">
          <el-button type="type" size="mini" @click="showMenu = true">
            <i class="fd-icon" :class="showMenu? 'fd-icon-wuxupailie' : 'fd-icon-zuoduiqi'"></i>
          </el-button>
        </span>
        <div class="menu-mask" @click="showMenu = !showMenu"></div>
        <v-deformation
          class="deformation-el"
          :x="0"
          :w="asideW"
          :draggable="2"
          :resizable="2"
          :showHandler="false"
          :move="true"
          size="w"
          axis="x"
          :minw="minw"
          :maxw="maxw"
          @resizing="onResizing">
          <div class="scroll" style="height: 100%;">
          <el-menu
          class="el-menu-vertical-demo"
          text-color="#555"
          text-color2="#fff"
          background-color2="#545c64"
          active-text-color2="#ffd04b"
          @select="selectMenu"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="defaultActive"
          :style="'width: ' + asideW + 'px'"
          >
            <template v-for="(vo, i1) in list">
            <el-submenu
            v-if="vo.children"
            :key="i1"
            :index="String(i1)">
              <template slot="title">
                <i :class="vo.icon" v-if="vo.icon"></i>
                <span class="menu-item-title">
                  {{vo.label}}
                </span>
              </template>
              <el-menu-item-group>
                <el-menu-item 
                  v-for="(v2, i2) in vo.children"
                  :key="i2"
                  :route="v2.path"
                  :index="i1 + '-' + i2"
                  >
                  <span class="menu-item-title">
                    {{v2.label}}
                  </span>
                  </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="String(i1)" :key="i1" :route="vo.path">
              <i :class="vo.icon" v-if="vo.icon"></i>
              <span slot="title" class="menu-item-title">{{vo.label}}</span>
            </el-menu-item>
            </template>
          </el-menu>
          </div>
          </v-deformation>
        </el-aside>
        <el-main>
          <div class="main-view">
            <router-view />
          </div>
          <div class="pagination" :style="'left: ' + asideW + 'px'">
            <el-row type="flex">
              <el-col :span="12">
                <div class="prev-link">
                  <template v-if="prev.path">
                    <div class="label">上一篇: </div>
                    <router-link :to="prev.path">
                      <el-button type="text">{{prev.label}}</el-button>
                    </router-link>
                  </template>
                  <div class="empty" v-else>
                    已经是第一篇啦~~
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="next-link">
                  <template v-if="next.path">
                    <div class="label">下一篇: </div>
                    <router-link :to="next.path" v-if="next.path">
                      <el-button type="text">{{next.label}}</el-button>
                    </router-link>
                  </template>
                  <div class="empty" v-else>
                    已经到底啦~~
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-footer :style="'padding-left:' + asideW + 'px'">
            Copyright &copy;2019 <a class="link" href="//github.com/kscript" target="_blank">kscript</a> 
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import deformation from '../../components/common/deformation.vue'
export default {
  data () {
    return {
      showMenu: false,
      asideW: 240,
      minw: 160,
      maxw: 300,
      isCollapse: false,
      defaultActive: '0',
      timer: 0,
      prev: {},
      next: {},
      list: []
    }
  },
  watch:{
    $route(){
      this.defaultActive = this.getActive()
    }
  },
  computed: {
  },
  components: {
    'v-deformation': deformation
  },
  methods: {
    onResizing (left, top, width, height) {
      this.asideW = width
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.timer = 0
          this.$store.commit('asideW', this.asideW)
        }, 150)
      }
    },
    getList () {
      return this.$store.dispatch('routes')
    },
    selectMenu (index, indexPath, { route }) {
      if (route !== '') {
        if (this.showMenu) {
          this.showMenu = false
        }
        this.$router.push({
          path: route
        })
      }
    },
    getActive () {
      let path = this.$route.path
      let hash = this.$route.hash.slice(1)
      let active = ''
      let prev = {}
      let next = {}
      this.list.forEach((vo, i1) => {
        if (active && next.path) return 
        if (!vo.children) {
          if(active && !next.path) {
            next = vo
          } else {
            let info = vo.path.split('#')
            if (!active && info[0] === path && (!info[1] || info[1] === hash)) {
              active = '' + i1
            }
            if (!active) {
              prev = vo
            }
          }
        } else {
          vo.children.forEach((v2, i2) => {
            if (active && !next.path) {
              next = v2
            } else if (!active || !next.path) {
              let info = v2.path.split('#')
              if (!active && info[0] === path && (!info[1] || info[1] === hash)) {
                active = [i1, i2].join('-')
              }
              if(!active){
                prev = v2
              }
            }
          })
        }
      })
      this.prev = prev
      this.next = next
      return active
    },
    redirect () {
      if (this.$route.fullPath === '/') {
        this.$router.push({
          path: '/viewer',
          hash: '#start'
        })
      }
    }
  },
  created () {
    this.asideW = this.$store.getters.asideW
  },
  mounted () {
    this.getList().then(data => {
      this.list = data
      this.defaultActive = this.getActive() || '0'
      this.redirect()
    })
  }
}
</script>
<style lang="scss" scoped>
$height: 0px;
.menu-button{
  opacity: 0;
}
.menu-mask{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 0;
  z-index: 999;
  opacity: 0;
  background-color: rgba(0,0,0,.5);
  transition: opacity .3s;
}
@media screen and (max-width: 767px){
  .menu-button{
    position: fixed;
    top: .5rem;
    right: .5rem;
    z-index: 999;
    opacity: 1;
    transition: opacity .5s;
  }
  
  .el-aside{
    max-width: 80%;
    width: auto!important;
    position: absolute;
    .scroll{
      left: -100%!important;
      .el-menu{
        width: auto!important;
      }
    }
  }
  .show-menu {
    .menu-button{
      opacity: 0;
      z-index: -1;
    }
    .menu-mask{
      opacity: 1;
      width: 100%;
    }
    .scroll{
      left: 0!important;
    }
  }
  .el-footer{
    padding-left: 0!important;
  }
}
.main-container{
  .el-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1020;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    height: $height;
    line-height: $height;
    display: none;
    .layout-right{
      text-align: right;
      a{
        text-decoration: none;
      }
      .fd-icon{
        color: #666;
        font-size: 24px;
      }
    }
  }
}
.sub-container{
  position: absolute;
  top: $height;
  left: 0;
  min-height: 100%;
  width: 100%;
  z-index: 1000;
}
.el-aside{
  .deformation-el{
    cursor: auto;
    outline: none;
    height: 100%!important;
  }
  .scroll{
    position: fixed;
    top: $height;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: hidden auto;
    border-right: 1px solid #e6e6e6;
    background: #fff;
    transition: left .5s;
    .el-menu{
      border-right: none;
      /deep/ .el-menu-item-group__title{
        display: none;
      }
      /deep/ .el-menu-item,
      /deep/ .menu-item-title{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.el-main{
  padding-bottom: 135px;
  .pagination{
    padding: 30px 10px;
    position: absolute;
    left: auto;
    right: 0;
    bottom: 50px;
    .empty{
      color: #999;
      font-size: 14px;
      line-height: 40px;
    }
    .label{
      display: inline;
    }
    @media screen and (max-width: 767px){
      .label{
        display: block;
        width: 100%;
      }
    }
    .next-link{
      text-align: right;
    }
  }
  .el-footer{
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    text-align: center;
    height: 60px!important;
    line-height: 60px;
    border-top: 1px solid #f6f6f6;
    color: #999;
    .link{
      padding: 0px 5px;
      font-size: 14px;
      color: #999;
      text-decoration: none;
    }
  }
}
</style>


