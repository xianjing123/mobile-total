<template>
  <div>
    <Header>任务管理</Header>
    <mt-navbar v-model="selected" id="nav">
      <mt-tab-item id="1">新任务</mt-tab-item>
      <mt-tab-item id="2">执行中</mt-tab-item>
      <mt-tab-item id="3">已完成</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div
          class="task_list"
          v-for="item in tesklist"
          :key="item.id"
          @click="gotoDetails(item.id)"
        >
          <img :src="item.img" alt />
          <span class="title">{{item.title}}</span>
          <span class="date_tit">{{item.tiem_tit}}</span>
          <span class="date">{{item.data}}</span>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="page-cell" :key="contentKey">
          <!-- <div class="page-title">Cell Swipe</div> -->

          <mt-cell-swipe
            class="task_list"
            :key="index"
            v-for="(n,index) in tesklist"
            :right="content"
            id="task"
          >
            <img :src="n.img" alt />
            <span class="title">{{n.title}}</span>
            <span class="date_tit">{{n.tiem_tit}}</span>
            <span class="date">{{n.data}}</span>
          </mt-cell-swipe>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div class="task_list" v-for="item in tesklist" :key="item.id">
          <img :src="item.img" alt />
          <span class="title">{{item.title}}</span>
          <span class="date_tit">{{item.tiem_tit}}</span>
          <span class="date">{{item.data}}</span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  data() {
    return {
      selected: "1",
      content: [
        {
          content: "巡检上报",
          style: {
            background: "#F25643",
            color: "#fff",
            width: "1.8rem",
            height: "1.45rem",
            linehright: "1.45rem"
          },
          handler: () => deleteSection(index)
        },
        {
          content: "任务详情",
          style: {
            background: "#3296FA",
            color: "#fff",
            width: "1.8rem",
            height: "1.45rem",
            linehright: "1.45rem"
          },
          handler: () => deleteSection(index)
        }
      ],
      contentKey: 2,
      tesklist: [
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        },
        {
          img: "/imgs/logo.jpg",
          title: "即时任务",
          tiem_tit: "派单时间",
          data: "2019-12-13 12:45:21"
        }
      ]
    };
  },
  components: {
    Header
  },
  mounted() {},
  updated() {
    this.contentKey = 3;
  },
  methods: {
    deleteSection(index) {
      console.log(index);
    },
    gotoDetails(id) {
      this.$router.push({ path: "/taskdetail/" + id });
    }
  }
};
</script>
<style lang="scss" scoped>
.task_list {
  width: 100%;
  height: 1.45rem;
  position: relative;
  border-bottom: 1px solid #c5c7c8;

  img {
    width: 0.89rem;
    height: 0.89rem;
    border-radius: 50%;
    position: absolute;
    top: 0.24rem;
    left: 0.32rem;
  }
  .title {
    font-size: 0.28rem;
    position: absolute;
    top: 0.5rem;
    left: 1.46rem;
  }
  .date_tit {
    font-size: 0.22rem;
    color: #7d8185;
    position: absolute;
    top: 0.32rem;
    right: 0.32rem;
  }
  .date {
    font-size: 0.22rem;
    color: #7d8185;
    position: absolute;
    bottom: 0.38rem;
    right: 0.32rem;
  }
}
</style>