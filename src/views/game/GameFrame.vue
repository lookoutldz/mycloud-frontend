<template>
  <div class="game-container">
    <el-row>
      <el-col :span="24" class="talk-bar game-box">
        <div class="clickable">[公告] 网络聊天文明倡议</div>
        <div class="clickable">[世界] 小只因：☞ 收 ☆100☆ 级以上🏀，不限量，带价私聊</div>
        <div class="clickable">[世界] 小只因：☞ 收 ☆100☆ 级以上🏀，不限量，带价私聊</div>
        <div class="clickable">[系统] 您的好友【杰哥】上线啦~</div>
        <div class="clickable">[好友] 小胖：我在威尼斯美食街做好了大肠刺身，就等你啦快来♥︎</div>
      </el-col>
    </el-row>
    <el-divider>
      <el-icon><star-filled /></el-icon>
    </el-divider>
    <el-row>
      <el-col :span="12" class="main-zone game-box">
        <div class="title">-【威尼斯 铁匠铺】-</div>
        <div>叮叮当当...</div>
        <div>火红的光影与嘈杂的声音充斥着整个工坊</div>
        <div>这里是匠人门挥洒铁锤与汗水的圣地</div>
        <div class="clickable">❗️老铁匠</div>
        <div class="clickable">年轻学徒</div>
        <div class="clickable">年长学徒</div>
        <div class="clickable">返回</div>
        <div class="sys-text">附近的人</div>
        <div class="clickable"><span>van♂︎</span>, <span>滑动便阻器</span>, <span>大磨王二弟</span>, <span>更多...</span></div>
      </el-col>
      <el-col :span="12" class="map-zone game-box">
        <div class="title">-【城内地图】-</div>
        <div>
          <el-row :gutter="20">
            <el-col :span="6" class="map-block clickable">北城门</el-col>
            <el-col :span="6" class="map-block clickable">商业街</el-col>
            <el-col :span="6" class="map-block clickable">美食街</el-col>
            <el-col :span="6" class="map-block clickable">警察局</el-col>
            <el-col :span="6" class="map-block clickable">广场</el-col>
            <el-col :span="6" class="map-block clickable">皇宫</el-col>
            <el-col :span="6" class="map-block clickable">银行</el-col>
            <el-col :span="6" class="map-block clickable">居民区</el-col>
            <el-col :span="6" class="map-block clickable">福利院</el-col>
            <el-col :span="6" class="map-block">铁匠铺</el-col>
            <el-col :span="6" class="map-block clickable">鸡扬街</el-col>
            <el-col :span="6" class="map-block clickable">酒馆</el-col>
            <el-col :span="6" class="map-block clickable">东城门</el-col>
            <el-col :span="6" class="map-block clickable">花园</el-col>
            <el-col :span="6" class="map-block clickable">珠宝店</el-col>
            <el-col :span="6" class="map-block clickable">爱情桥</el-col>
            <el-col :span="6" class="map-block clickable">市场</el-col>
            <el-col :span="6" class="map-block clickable">教堂</el-col>
            <el-col :span="6" class="map-block clickable">西城门</el-col>
            <el-col :span="6" class="map-block clickable">研究院</el-col>
            <el-col :span="6" class="map-block clickable">监狱</el-col>
            <el-col :span="6" class="map-block clickable">占星屋</el-col>
            <el-col :span="6" class="map-block clickable">★码头</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="bag-zone game-box">
        <el-scrollbar height="100%">
          <div style="margin: 0;">
            <el-tabs type="card" style="margin: 0; padding: 0;">
              <el-tab-pane label="状态">
                <div>
                  <div style="margin: 0">
                    <el-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    <span style="display: inline-block; margin-left: 5px" >詯__鈊巳丄锁</span>
                    <span style="display: inline-block; margin-left: 5px">（Lv.69）</span>
                  </div>
                  <div>头戴：小破帽</div>
                  <div>肩披：国王的新衣</div>
                  <div>下身：超人裤</div>
                  <div>脚踏：人字拖</div>
                  <div>项链：大金链子</div>
                  <div>指环：+地魔の左戒</div>
                  <div>指环：+地魔の右戒</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="装备">
                <div></div>
              </el-tab-pane>
              <el-tab-pane label="物品">
                <div style="margin: 0;">
                  <div class="clickable">苹果x30</div>
                  <div class="clickable">奶瓶x30</div>
                  <div class="clickable">小龙虾x1</div>
                  <div class="clickable">体力宝x1</div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="系统">Task</el-tab-pane>
            </el-tabs>
          </div>
        </el-scrollbar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {StarFilled} from "@element-plus/icons-vue";

export default defineComponent({
  components: {StarFilled},
})
</script>

<style scoped>
.game-container {
  border-radius: 6px;
  background-color: white;
  opacity: 0.9;
}
.game-box {
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 6px;
}
.game-box div {
  margin-top: 3px;
  margin-left: 10px;
}

.talk-bar {
  height: 16vh;
}

.main-zone {
  height: 38vh;
  font-size: 16px;
}
.main-zone div {
  margin-top: 5px;
}
.main-zone .title {
  font-size: 24px;
  margin: 8px;
}
.main-zone .sys-text {
  margin: 12px 10px 0 10px;
  font-weight: bold;
}

.map-zone {
}
.map-zone .title {
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
}
.map-block {
  text-align: center;
}

.bag-zone {
  height: 30vh;
}

.clickable {
  color: blue;
  text-decoration: underline;
}

</style>