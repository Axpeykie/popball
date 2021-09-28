<template>
  <div class="container">
    <div>123</div>
    <div v-for="point in list" :id="point.code" :key="point.code" class="point" v-show="show"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { validFloat, newAtan } from '@/utils/index'
import { Ball } from '@/interface/index'

export default defineComponent({
  setup() {
    const list = ref([
      {
        code: 'a',
        originX: 20,
        originY: 10,
        v: 15,
        direction: 37,
        radius: 10,
        m: 5
      },
      {
        code: 'b',
        originX: 50,
        originY: 100,
        v: 3,
        direction: 270,
        radius: 10,
        m: 5
      },
      {
        code: 'c',
        originX: 850,
        originY: 70,
        v: 9,
        direction: 40,
        radius: 50,
        m: 5
      },
      {
        code: 'd',
        originX: 420,
        originY: 200,
        v: 11,
        direction: 20,
        radius: 30,
        m: 5
      },
      {
        code: 'e',
        originX: 600,
        originY: 460,
        v: 15,
        direction: 310,
        radius: 70,
        m: 5
      },
      {
        code: 'f',
        originX: 600,
        originY: 660,
        v: 15,
        direction: 90,
        radius: 30
      },
      {
        code: 'g',
        originX: 200,
        originY: 660,
        v: 10,
        direction: 270,
        radius: 30
      }
    ])
    const account = 0
    const r = 0
    const d = 2 * r

    const h = window.innerHeight
    const w = window.innerWidth
    if (d * d * account > w * h || d >= w || d >= h) {
      console.log('not enough!')
    }
    const globalObj: { [key: string]: Ball } = {}

    const show = ref<Boolean>(false)
    const lockMap = new Map()
    class Factory implements Ball {
      code: String

      originX: number

      originY: number

      v: number

      direction: number

      radian: number

      vectorX: number

      vectorY: number

      animateObj: any

      id: any

      element: any

      radius: number

      m: number

      Vg: number

      locationX: number

      locationY: number

      go: Function

      play: Function

      stop: Function

      constructor(pointData: any) {
        this.code = pointData.code
        this.originX = pointData.originX // 起始位置X
        this.originY = pointData.originY // 起始位置Y

        this.v = pointData.v // 合速度
        this.direction = pointData.direction // 起始方向
        this.radius = pointData.radius // 半径
        this.radian = ((2 * Math.PI) / 360) * this.direction
        this.vectorX = this.v * validFloat(Math.cos(this.radian)) // X轴分速度
        this.vectorY = this.v * validFloat(Math.sin(this.radian)) // Y轴分速度
        this.locationX = this.originX // x轴坐标
        this.locationY = this.originY // y轴坐标
        this.m = (4 * Math.PI * this.radius ** 3) / 3
        this.Vg = 1 // 重力分速度

        this.go = () => {
          this.id = setInterval(() => {
            const { vectorX: Vx1, vectorY: Vy1, locationX: x1, locationY: y1 } = this
            globalObj[pointData.code] = this

            const slide = [
              {
                left: `${x1}px`,
                bottom: `${y1}px`
              },
              {
                left: `${x1 + Vx1}px`,
                bottom: `${y1 + Vy1}px`
              }
            ]

            const animateOptions = {
              duration: 100,
              fill: 'forwards'
            }

            this.animateObj = this.element.animate(slide, animateOptions)

            this.locationX += this.vectorX
            this.locationY += this.vectorY
          }, 100)
        }

        this.play = () => {
          this.go()
        }

        this.stop = () => {
          this.animateObj.pause()
          clearInterval(this.id)
        }

        this.element = document.querySelector(`#${pointData.code}`)
        this.element.addEventListener('mouseover', this.stop)
        this.element.addEventListener('mouseout', this.play)
        this.element.style.width = `${this.radius * 2}px`
        this.element.style.height = `${this.radius * 2}px`
      }
    }

    const init = () => {
      list.value.forEach((pointData) => {
        const point = new Factory(pointData)
        point.go()
      })
      show.value = true
      setInterval(() => {
        const keyList = Object.keys(globalObj).sort()

        for (let i = 0; i < keyList.length; i += 1) {
          const key1 = keyList[i]

          const r1 = globalObj[key1].radius
          const x1 = globalObj[key1].locationX
          const y1 = globalObj[key1].locationY
          const Vx1 = globalObj[key1].vectorX
          const Vy1 = globalObj[key1].vectorY
          const v1 = globalObj[key1].v
          const m1 = globalObj[key1].m

          // globalObj[key1].go()

          if (x1 + r1 >= window.innerWidth) {
            globalObj[key1].vectorX = -Math.abs(globalObj[key1].vectorX)
          } else if (x1 - r1 <= 0) {
            globalObj[key1].vectorX = Math.abs(globalObj[key1].vectorX)
          }

          if (y1 + r1 >= window.innerHeight) {
            globalObj[key1].vectorY = -Math.abs(globalObj[key1].vectorY)
          } else if (y1 - r1 <= 0) {
            globalObj[key1].vectorY = Math.abs(globalObj[key1].vectorY) + globalObj[key1].Vg
          }

          for (let j = i + 1; j < keyList.length; j += 1) {
            const key2 = keyList[j]

            const r2 = globalObj[key2].radius
            const x2 = globalObj[key2].locationX
            const y2 = globalObj[key2].locationY
            const Vx2 = globalObj[key2].vectorX
            const Vy2 = globalObj[key2].vectorY
            const v2 = globalObj[key2].v
            const m2 = globalObj[key2].m

            if ((x1 - x2) ** 2 + (y1 - y2) ** 2 <= (r1 + r2) ** 2) {
              if (lockMap.get(globalObj[key1].code) === globalObj[key2].code) {
                const [jj] = keyList.splice(j, 1)
                keyList.splice(i, 0, jj)
                i += 1
                continue
              }
              console.log('boom!!!')
              const radBoom = validFloat(newAtan(y2 - y1, x2 - x1))
              const mRadBoom = radBoom + Math.PI / 2

              const radV1 = validFloat(newAtan(Vy1, Vx1))

              const radV2 = validFloat(newAtan(Vy2, Vx2))
              // 以自身圆心到对方圆心为正方向

              const absMv1 = v1 * validFloat(Math.cos(mRadBoom - radV1))
              const absMv2 = v2 * validFloat(Math.cos(mRadBoom - radV2))

              const mVx1 = absMv1 * validFloat(Math.cos(mRadBoom))
              const mVy1 = absMv1 * validFloat(Math.sin(mRadBoom))

              const mVx2 = absMv2 * validFloat(Math.cos(mRadBoom))
              const mVy2 = absMv2 * validFloat(Math.sin(mRadBoom))

              const tmp1 = radBoom - radV1
              const tmp2 = radBoom - radV2
              const befV1 = v1 * validFloat(Math.cos(tmp1))
              const befV2 = v2 * validFloat(Math.cos(tmp2))
              // console.log('befV1->', befV1)
              // console.log('befV2->', befV2)

              const aftV1 = (befV1 * (m1 - m2)) / (m1 + m2) + (befV2 * 2 * m2) / (m1 + m2)
              const aftV2 = (befV1 * (2 * m1)) / (m1 + m2) + (befV2 * (m2 - m1)) / (m1 + m2)

              // console.log('aftV1->', aftV1)
              // console.log('aftV2->', aftV2)

              const absX1 = aftV1 * validFloat(Math.cos(radBoom))
              const absY1 = aftV1 * validFloat(Math.sin(radBoom))

              const absX2 = aftV2 * validFloat(Math.cos(radBoom))
              const absY2 = aftV2 * validFloat(Math.sin(radBoom))

              globalObj[key1].vectorX = absX1 + mVx1
              globalObj[key1].vectorY = absY1 + mVy1
              globalObj[key1].v =
                (globalObj[key1].vectorX ** 2 + globalObj[key1].vectorY ** 2) ** 0.5

              globalObj[key2].vectorX = absX2 + mVx2
              globalObj[key2].vectorY = absY2 + mVy2
              globalObj[key2].v =
                (globalObj[key2].vectorX ** 2 + globalObj[key2].vectorY ** 2) ** 0.5

              lockMap.set(globalObj[key1].code, globalObj[key2].code)

              const [jj] = keyList.splice(j, 1)
              keyList.splice(i, 0, jj)
              i += 1
              continue
            }
            if (lockMap.get(globalObj[key1].code) === globalObj[key2].code) {
              lockMap.delete(globalObj[key1].code)
            }
          }
        }
        Object.keys(globalObj).forEach((key) => {
          globalObj[key].vectorY -= globalObj[key].Vg
        })
      }, 100)
    }
    onMounted(() => {
      init()
    })
    return {
      list,
      show
    }
  }
})
</script>

<style lang="less">
.container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.point {
  position: absolute;

  background-color: rgb(219, 30, 30);
  border-radius: 50%;
  transform: translate(-50%, 50%);
}
</style>
