<template>
  <div>
    <Header>任务管理</Header>
    <mt-navbar v-model="selected" id="nav" ref="nav">
      <mt-tab-item id="1">新任务</mt-tab-item>
      <mt-tab-item id="2">执行中</mt-tab-item>
      <mt-tab-item id="3">已完成</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <div
          class="task_list"
          v-for="(item,index1) in newtasklist"
          :key="index1"
          @click="gotoDetails(item)"
        >
          <img :src="item.img" alt />
          <span class="title">{{item.type}}</span>
          <span class="date_tit">派单时间</span>
          <span class="date">{{item.cycleExecuteTime}}</span>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="page-cell" :key="contentKey">
          <!-- <div class="page-title">Cell Swipe</div> -->
          <div v-for="(n,index) in newtasklist2" :key="index">
            <mt-cell-swipe
              class="task_list"
              :right="[(n.type=='巡检任务'?{
              content:'巡检上报',
              style:{
                background:'#F25643',color: '#fff',width: '1.8rem',height: '1.45rem',linehright: '1.45rem',
              },
              handler: () => deleteSection(n.id)
            }:{}),
            {
              content:'任务详情',
              style:{
                background:'#3296FA',color: '#fff',width: '1.8rem',height: '1.45rem',linehright: '1.45rem',
              },
              handler: () => deleteSection1(n)
            }
            ]"
              id="task"
            >
              <img :src="n.img" alt />
              <span class="title">{{n.type}}</span>
              <span class="date_tit">派单时间</span>
              <span class="date">{{n.createTime}}</span>
            </mt-cell-swipe>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div
          class="task_list"
          v-for="(item,index2) in newtasklist3"
          :key="index2"
          @click="successbtn(item.id)"
        >
          <img :src="item.img" alt />
          <span class="title">{{item.type}}</span>
          <span class="date_tit">派单时间</span>
          <span class="date">{{item.createTime}}</span>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Header from "../components/Header";
import axios from "axios";
import { getCookie } from "../components/cookie";
export default {
  data() {
    return {
      selected: "1",
      contentKey: 2,
      newtasklist: [],
      newtasklist2: [],
      newtasklist3: [],
      token: "",
      show: true
    };
  },
  components: {
    Header
  },
  mounted() {
    axios
      .get(this.$store.state.urls + "way/inspectionRecord/selectTaskAll", {
        params: {
          status: "新任务"
        },
        headers: {
          Authorization: this.token
        }
      })
      .then(res => {
        console.log(res);
        this.newtasklist = res.data.data;
      });
    axios
      .get(this.$store.state.urls + "way/inspectionRecord/selectTaskAll", {
        params: {
          status: "进行中"
        },
        headers: {
          Authorization: this.token
        }
      })
      .then(res => {
        console.log(res);
        this.newtasklist2 = res.data.data;
      });

    axios
      .get(this.$store.state.urls + "way/inspectionRecord/selectTaskAll", {
        params: {
          status: "已完成"
        },
        headers: {
          Authorization: this.token
        }
      })
      .then(res => {
        console.log(res);
        this.newtasklist3 = res.data.data;
      });
  },
  updated() {
    if (this.selected === "2") {
      this.contentKey = 3;
    }
  },
  methods: {
    deleteSection(id) {
      this.$router.push({ path: "/doingdetail/" + id });
      // console.log(index);
    },
    deleteSection1(n) {
      if (n.type == "巡检任务") {
        this.$router.push({ path: "/xundetail/" + n.id });
      } else {
        this.$router.push({ path: "/waydetail/" + n.id });
      }

      // console.log(index);
    },
    gotoDetails(item) {
      localStorage.setItem("type", item.type);
      this.$router.push({ path: "/taskdetail/" + item.id });
    },
    successbtn(id) {
      this.$router.push({ path: "/successdeyail/" + id });
    }
  },
  created() {
    this.token = getCookie("token");
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