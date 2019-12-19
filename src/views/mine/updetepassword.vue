<template>
  <div>
    <Header>修改密码</Header>
    <div class="updete">
      <mt-field
        style="border-bottom:1px solid rgba(197, 199, 200, 1)"
        label="原密码"
        placeholder="Input username"
        v-model="username"
      ></mt-field>
      <mt-field
        style="border-bottom:1px solid rgba(197, 199, 200, 1)"
        label="新密码"
        placeholder="Input password"
        type="password"
        v-modal="password"
      ></mt-field>
      <mt-field
        style="border-bottom:1px solid rgba(197, 199, 200, 1)"
        label="确认新密码"
        placeholder="Input password"
        type="password"
        v-modal="password"
      ></mt-field>
    </div>
    <div class="me_btn">保存密码</div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { Header }
};
</script>

<style scoped lang="scss">
.updete {
  width: 100%;
  height: 3.28rem;
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
