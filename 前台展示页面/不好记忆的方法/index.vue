<template>

常用参数	     一句话解释
slidesPerView	每屏显示几个图？比如 1 个、3 个。
spaceBetween	图与图之间的间距，单位是像素。
direction	滚动方向，默认是水平(horizontal)，想竖向滚动就改成 vertical。

</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'   // ← 组件
import { Autoplay, Pagination } from 'swiper/modules'  // ← 功能模块
import 'swiper/css'              // ← Swiper 默认样式
import 'swiper/css/pagination'   // ← 分页圆点样式

</script>