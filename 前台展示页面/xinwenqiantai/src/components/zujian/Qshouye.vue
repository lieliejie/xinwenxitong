<template>
<div class="wechat-home">
  
  <Qdaohang />

  
  <div class="banner-wrapper">
    <swiper
      :modules="modules"
      :slides-per-view="1"
      :space-between="10"
      :loop="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :pagination="{ clickable: true, bulletClass: 'dot', bulletActiveClass: 'dot-active' }"
      class="banner-swiper"
    >
    
    
    
    
    
    <!-- :autoplay="{ delay: 3000, disableOnInteraction: false }" 
     设置自动播放，间隔3秒，交互时不暂停 -->
    
     
      
       
      <swiper-slide v-for="item in bianLiang" :key="item.id">
        
        <div class="banner-card">
          <div class="banner-badge">{{ item.badge || '重磅' }}</div>
          <div class="banner-title">{{ item.biaoTi }}</div>
          <div class="banner-sub">{{ item.fuBiaoTi }}</div>
        </div>
      </swiper-slide>
    </swiper>
  </div>

  
  <div class="content-area">
          <Qkapian></Qkapian>
    <div class="side-panel">
     <Qfangkuai></Qfangkuai>
      <div class="panel-card">
       <Qfangkuai2></Qfangkuai2>
      </div>
      <div class="panel-card">
          <Qfangkuai3></Qfangkuai3>
      </div>
    </div>
  </div>
  <Qdibu></Qdibu>
</div>
</template>
<script setup >
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import Qkapian from './Qkapian.vue'
import Qfangkuai from './Qfangkuai.vue'
import Qfangkuai2 from './Qfangkuai2.vue'
import Qfangkuai3 from './Qfangkuai3.vue'
import Qdaohang from './Qdaohang.vue'
import useStore from '../pina'
import { ref } from 'vue'
import Qdibu from './Qdibu.vue'
let store = useStore()


const modules = [Autoplay, Pagination]



const bianLiang = [
  {
    id: 1,
    badge: '重磅',
    biaoTi: "2026 全球科技峰会盛大开幕，多项前沿成果首次公开亮相",
    fuBiaoTi: "人工智能、量子计算等领域迎来突破性进展"
  },
  {
    id: 2,
    badge: '热点',
    biaoTi: "新一代智能穿戴设备发布，健康监测能力全面升级",
    fuBiaoTi: "实时心率、血糖无创检测、睡眠分析功能全面上线"
  },
  {
    id: 3,
    badge: '推荐',
    biaoTi: "开发者云服务限时折扣，新用户首年低至 3 折",
    fuBiaoTi: "云服务器、对象存储、数据库全部参与活动"
  }
];
</script>


<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.wechat-home {
  background: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  transition: background 0.3s;
}


.banner-wrapper {
  width: 1050px;
  margin: 0 auto ;
}
.banner-swiper {
  border-radius: 12px;
  overflow: hidden;
}
.banner-card {
  width: 100%;
  height: 260px;
  background: linear-gradient(135deg, #0d6b3d 0%, #07c160 50%, #00d66f 100%);
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-badge {
  position: absolute;
  top: 24px;
  left: 56px;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(10px);
  color: #fff;
  font-size: 12px;
  padding: 4px 14px;
  border-radius: 12px;
  letter-spacing: 2px;
}
.banner-title {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  line-height: 1.5;
  margin-bottom: 12px;
  max-width: 700px;
}
.banner-sub {
  font-size: 15px;
  color: rgba(255,255,255,0.65);
  max-width: 600px;
}








:deep(.swiper-pagination) {
  position: static;      
  margin-top: 16px;      
}


:deep(.dot) {
  width: 8px;            
  height: 8px;           
  border-radius: 50%;    
  background: var(--text-muted);   
  display: inline-block; 
  margin: 0 4px;         
  transition: all 0.3s;  
  opacity: 1;            
}


:deep(.dot-active) {
  width: 24px;           
  border-radius: 4px;    
  background: var(--primary-color);   
}


.quick-entry {
  max-width: 1100px;
  margin: 24px auto;
  padding: 0 24px;
  display: flex;
  gap: 0;
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px 0;
  transition: background 0.3s;
}
.entry-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}
.entry-item:hover {
  transform: translateY(-2px);
}
.entry-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.entry-hot { background: var(--tag-bg); }
.entry-news { background: var(--tag-bg); }
.entry-video { background: var(--tag-bg); }
.entry-live { background: var(--tag-bg); }
.entry-topic { background: var(--tag-bg); }
.entry-label {
  font-size: 12px;
  color: var(--text-secondary);
  transition: color 0.3s;
}


.content-area {
 max-width: 1100px;
  margin: 0 auto 40px;
  padding: 0 24px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-top: 20px
}

.side-panel {
  width: 300px;
  flex-shrink: 0;
}

.panel-card {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  transition: background 0.3s;
}
.panel-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 14px;
  transition: color 0.3s, border-color 0.3s;
}
</style>
