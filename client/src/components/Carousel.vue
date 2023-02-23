<template>
  <a-carousel autoplay>
    <div>
      <img
        src="https://images.pexels.com/photos/683929/pexels-photo-683929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="https://images.pexels.com/photos/683929/pexels-photo-683929.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="https://images.pexels.com/photos/245208/pexels-photo-245208.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
    <div>
      <img
        src="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt="https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
    </div>
  </a-carousel>
</template>

<script>
export default {
  name: 'Carousel'
}
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 645px;
  line-height: 160px;
  background: #364d79;
  overflow: hidden;
}

img {
  object-fit: cover;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}
</style>
