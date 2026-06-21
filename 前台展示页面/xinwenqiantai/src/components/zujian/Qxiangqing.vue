<template>
  <Qdaohang></Qdaohang>
<div class="detail-page">
  <div class="detail-container">
    
    <div class="article-header">
      <div class="back-btn" @click="router.back()">← 返回</div>
      <h1 class="article-title">{{ dangqianxinwen?.biaoTi }}</h1>
      <div class="article-meta">
        <div class="author-info">
          <div class="author-avatar"></div>
          <div class="author-text">
            <div class="author-name">科技前沿</div>

            <div class="publish-info">{{ dangqianxinwen?.riQi }} · {{ store.formatTime(dangqianxinwen?.riQi) }} · 已阅读 {{ dangqianxinwen?.yueduLiang }} 次</div>
          </div>
        </div>
        <div class="article-actions">
          <span class="action-btn">关注</span>
        </div>
      </div>
    </div>

    
    <div class="article-lead">
     {{ dangqianxinwen?.jianJie }}
    </div>

    
    <div class="article-body">
      <p class="body-text">{{ dangqianxinwen?.neiRong }}</p>
      
      <p class="body-text">本届大会设置了人工智能、量子计算、新能源技术、生物医药、航天科技五大核心展区。在人工智能展区，多家国内头部企业展示了最新的大模型应用成果。其中，某企业推出的多模态通用大模型支持文本、图像、音频、视频的全场景理解与生成，性能指标在多个国际基准测试中位列第一。</p>
      
      <div class="body-image">
        <div class="img-placeholder">
          <div class="img-icon"><img :src="dangqianxinwen?.tuPian"></div>
        </div>
      </div>

      <!-- <p class="body-text">量子计算领域同样亮点纷呈。我国科研团队在本届大会上首次公开展示了自主研发的千比特级超导量子计算机原型机，标志着我国在量子计算硬件领域迈入国际第一梯队。与会专家指出，量子计算有望在药物研发、密码学、金融建模等领域带来颠覆性变革。</p>

      <p class="body-text">新能源展区集中展示了固态电池、钙钛矿太阳能电池、绿氢制备等前沿技术的最新进展。一家头部新能源企业发布了能量密度突破500Wh/kg的全固态电池样品，引发业界广泛关注。据透露，该产品预计在2027年实现小批量量产，届时将大幅提升电动汽车的续航里程。</p>

      <div class="body-quote">
        <div class="quote-line"></div>
        <div class="quote-text">"科技创新是一场没有终点的马拉松，唯有坚持不懈、久久为功，才能在全球科技竞争中占据主动权。" —— 大会主旨报告</div>
      </div>

      <p class="body-text">航天科技展区同样人头攒动。中国航天科技集团展示了新一代载人飞船、月球科研站模型以及火星采样返回任务方案。现场工作人员透露，我国计划在2028年前后实施首次载人登月任务，目前各项准备工作正在有序推进。</p>

      <p class="body-text">大会期间还将举办30余场分论坛和专题研讨会，涵盖AI伦理与治理、数字经济创新发展、绿色低碳技术等热点议题。多位参会企业代表表示，本届大会不仅是一个展示成果的平台，更是一个促进国际合作、推动技术交流的重要窗口。</p> -->
    </div>

    
    <div class="article-declare">
      声明：本文内容仅供参考，不构成任何投资建议。文中所述观点仅代表作者个人立场，与本平台无关。
    </div>

    
    <div class="article-footer">
      <!-- <div class="footer-tags">
        <span class="ftag">人工智能</span>
        <span class="ftag">科技创新</span>
        <span class="ftag">量子计算</span>
        <span class="ftag">新能源</span>
      </div> -->
      <div class="footer-bar">
        
        <div class="fbar-item" @click="dianzan">
          <span class="fbar-icon heart-icon" :class="{ active: isLiked }">&#9829;</span>
          <span>点赞</span>
        </div>
        
        <div class="fbar-item" @click="shoucang">
          <span class="fbar-icon star-icon" :class="{ active: isShouCanged }">&#9733;</span>
          <span>收藏</span>
        </div>
        <div class="fbar-item" @click="store.showComments = true">
          <span class="fbar-icon">💬</span>
          <span>{{ store.commentCount }}评论</span>
        </div>
        <div class="fbar-item">
          <span class="fbar-icon">↗️</span>
          <span>分享</span>
        </div>
      </div>
    </div>

    
    <Cepinglun />

    
    <Pinglun />

    
    <div class="related-section">
      <div class="related-title">相关推荐</div>
      <div class="related-list">
        <div class="related-item">
          <div class="related-img"></div>
          <div class="related-text">AI芯片市场格局生变，国产替代进程加速推进</div>
        </div>
        <div class="related-item">
          <div class="related-img"></div>
          <div class="related-text">全球首款商用固态电池正式交付，续航突破1000公里</div>
        </div>
        <div class="related-item">
          <div class="related-img"></div>
          <div class="related-text">量子计算商用化提速，金融领域率先受益</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router/index.ts'
import useStore from '../pina/index.ts' 
import Qdaohang from './Qdaohang.vue';
import Pinglun from './pinglun.vue';
import Cepinglun from './cepinglun.vue';
const store = useStore();
const route = useRoute()
import http from '../axios/index.ts';


const dangqianxinwen = computed(() => {
  return store.newsList.find(item => item.id == route.params.id)
})


let isLiked = ref(false)        
let isShouCanged = ref(false)   

    
    
    

let chaZhuangtai = async () => {
  const userId = localStorage.getItem('userId')   
  const articleId = route.params.id                
  if (!userId || !articleId) return                
  try {
    
    
    let dianzanRes = await http.get('/api/dianzan-status', { params: { userId, articleId } })
    isLiked.value = dianzanRes.data.liked
    
    let shoucangRes = await http.get('/api/shoucang-status', { params: { userId, articleId } })
    isShouCanged.value = shoucangRes.data.shoucanged
  } catch (error) {
    console.log(error)
  }
}







watch(dangqianxinwen, (newVal) => {
  if (newVal) {
    chaZhuangtai()  
  }
})


let dianzan = async ()=>{
  try {
    let res = await http.post('/api/dianzan',{
      userId: localStorage.getItem('userId'),       
      articleId: dangqianxinwen.value.id            
    })
    
    isLiked.value = res.data.liked
  } catch (error) {
    console.log(error)
  }
}




let shoucang = async ()=>{
  try {
    let res = await http.post('/api/shoucang',{
      userId: localStorage.getItem('userId'),
      articleId: dangqianxinwen.value.id
    })
    isShouCanged.value = res.data.shoucanged
  } catch (error) {
    console.log(error)
  }
}
 onMounted(() => {
  chaZhuangtai()
  store.setNewsId(route.params.id)   
 })



 
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }

.detail-page {
  width: 100%;
  min-height: 120vh;
  background: var(--bg-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  transition: background 0.3s;
}

.detail-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px 60px;
  background: var(--card-bg);
  min-height: 100vh;
  transition: background 0.3s;
}


.article-header {
  position: relative;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 24px;
}
.back-btn {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  font-size: 14px;
  color: var(--primary-color);
  padding: 6px 16px;
  border-radius: 20px;
  transition: background 0.2s;
}
.back-btn:hover {
  background: var(--tag-bg);
}
.article-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.5;
  margin-bottom: 20px;
  transition: color 0.3s;
}
.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
  color: var(--btn-text);
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.author-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
  transition: color 0.3s;
}
.publish-info {
  font-size: 12px;
  color: var(--text-muted);
}
.action-btn {
  padding: 6px 20px;
  background: var(--primary-color);
  color: var(--btn-text);
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}
.action-btn:hover {
  background: var(--primary-hover);
}


.article-lead {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding: 20px 24px;
  background: var(--tag-bg);
  border-radius: 8px;
  border-left: 3px solid var(--primary-color);
  margin-bottom: 28px;
  transition: background 0.3s, color 0.3s;
}


.article-body {
  margin-bottom: 32px;
}
.body-text {
  font-size: 17px;
  color: var(--text-color);
  line-height: 2;
  margin-bottom: 22px;
  text-indent: 2em;
  transition: color 0.3s;
}
.body-image {
  margin: 28px 0;
}
.img-placeholder {
  width: 100%;
  height: 400px;
  background: var(--tag-bg);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  transition: background 0.3s;
}
.img-icon {
  height: 100%;
  font-size: 48px;
  
}
.img-placeholder img{

  height: 100%;

}
.img-caption {
  font-size: 13px;
  color: var(--text-muted);
}
.body-quote {
  margin: 28px 0;
  padding: 20px 24px;
  background: var(--card-bg);
  border-radius: 8px;
  display: flex;
  gap: 14px;
  transition: background 0.3s;
}
.quote-line {
  width: 4px;
  background: var(--primary-color);
  border-radius: 2px;
  flex-shrink: 0;
}
.quote-text {
  font-size: 15px;
  color: var(--text-color);
  line-height: 1.8;
  font-style: italic;
}


.article-declare {
  font-size: 12px;
  color: var(--text-muted);
  line-height: 1.6;
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  margin-bottom: 24px;
  transition: color 0.3s, border-color 0.3s;
}


.article-footer {
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}
.footer-tags {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.ftag {
  padding: 4px 14px;
  background: var(--tag-bg);
  color: var(--primary-color);
  font-size: 12px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.ftag:hover {
  background: var(--primary-color);
  color: var(--btn-text);
}
.footer-bar {
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
}
.fbar-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px 20px;
  border-radius: 8px;
  transition: all 0.2s;
}
.fbar-item:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
}
.fbar-icon {
  font-size: 20px;
  color: #ccc;              
  transition: color 0.2s, transform 0.2s;
}
.heart-icon.active {
  color: #ff4081;           
  transform: scale(1.2);    
}
.star-icon.active {
  color: #ff9800;           
}


.related-section {
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--border-color);
}
.related-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 18px;
  transition: color 0.3s;
}
.related-list {
  display: flex;
  gap: 16px;
}
.related-item {
  flex: 1;
  cursor: pointer;
}
.related-img {
  width: 100%;
  height: 120px;
  background: var(--tag-bg);
  border-radius: 8px;
  margin-bottom: 10px;
  transition: background 0.3s;
}
.related-text {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s;
}
.related-item:hover .related-text {
  color: var(--primary-color);
}

</style>
