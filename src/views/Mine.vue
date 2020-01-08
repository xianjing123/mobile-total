<template>
  <div>
    <Header>个人中心</Header>
    <div class="header_01">
      <img class="img_1" src="/imgs/bg_1.png" alt />
      <div class="bg"></div>
      <img class="img_2" src="imgs/header.png" alt />
      <span>{{mine.username}}</span>
    </div>
    <mt-cell
      style="border-bottom:1px solid rgba(197, 199, 200, 1)"
      title="联系电话"
      :value="mine.phoneNum"
    ></mt-cell>
    <mt-cell
      style="border-bottom:1px solid rgba(197, 199, 200, 1)"
      title="所属部门"
      :value="mine.departmentNames.toString()"
    ></mt-cell>
    <mt-cell to="/updetepassword/" title="密码" is-link value="*******"></mt-cell>
    <div class="me_btn" @click="logout">退出登录</div>
  </div>
</template>

<script>
import Header from "../components/Header";
import { removeCookie } from "../components/cookie";
import { getCookie } from "../components/cookie";
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      mine: []
    };
  },
  components: {
    Header
  },
  methods: {
    logout() {
      removeCookie("token");
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get(this.$store.state.urls + "/security/subject/selectSubjectById", {
        headers: {
          Authorization: this.token
        }
      })
      .then(res => {
        console.log(res);
        this.mine = res.data.data;
        // this.newtasklist = res.data.data.records;
      });
  },
  created() {
    this.token = getCookie("token");
  }
};
</script>
<style lang="scss" scoped>
.header_01 {
  width: 100%;
  height: 4.04rem;
  //   background: url(/imgs/bg_1.png) no-repeat;
  //   background-size: 100%;
  //   filter: blur(5px);
  //   z-index: -1;
  position: relative;
  .img_1 {
    width: 100%;
    height: 100%;
    filter: blur(5px);
  }
  .bg {
    width: 100%;
    height: 100%;
    background: #000;
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0.5;
  }
  .img_2 {
    width: 1.92rem;
    height: 1.92rem;
    position: absolute;
    top: 0.98rem;
    left: 2.8rem;
  }
  span {
    font-size: 0.3rem;
    color: #fff;
    position: absolute;
    bottom: 0.52rem;
    left: 3.46rem;
  }
}
.me_btn {
  width: 90%;
  height: 0.96rem;
  background: rgba(50, 150, 250, 1);
  box-shadow: 0px 6px 20px rgba(50, 150, 250, 0.52);
  opacity: 1;
  border-radius: 6px;
  position: fixed;
  bottom: 13%;
  left: 5%;
  text-align: center;
  line-height: 0.96rem;
  color: #fff;
  font-size: 0.36rem;
}
</style>