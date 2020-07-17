<template>
  <v-container class="align-start pa-0 pb-2 flex-column" fluid>
    <v-img src="@/assets/image/inv/bg_index.png" class="align-end">
      <v-img
        src="@/assets/image/inv/title_index.png"
        class="ma-auto"
        width="70%"
        height="10%"
      ></v-img>
    </v-img>

    <v-card class="rounded mt-0 ma-auto" width="95%">
      <v-list class="pa-2" id="hiddenScroll">
        <v-list-item :class="listItemStyle">
          <v-list-item-content :class="listItemStyle">
            1、为推进“互联网+营销服务”，方便电力用户，国网上海电力推出电费增值税专用发票微信预约领取服务，实现专票“线上预约、线下领取”，服务对象为本市具备增值税一般纳税人资格的电力用户。
          </v-list-item-content>
        </v-list-item>
        <v-list-item :class="listItemStyle">
          <v-list-item-content :class="listItemStyle">
            <p class="ma-0">
              2、在进行线上预约前，请您首先携带<a
                href="_blank"
                style="color: #f27b46;text-decoration: underline;"
                >企业授权委托书</a
              >，办理人员身份证原件前往所在地区电力营业厅办理信息认证。
            </p>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :class="listItemStyle">
          <v-list-item-content :class="listItemStyle">
            3、如您的预约手机号、领票身份证、电费账单户名、开票信息等发生变更，请至电力营业厅办理更正手续。
          </v-list-item-content>
        </v-list-item>
        <v-list-item :class="listItemStyle">
          <v-list-item-content :class="listItemStyle">
            4、请根据预约通知及时在预约领票日当天进行取票，并有1次修改取票时间的机会。若逾期未领取，则视作违约，违约累计3次，将暂停6个月的线上取票资格，如需开通需重新至营业厅进行认证。
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-item>
          <v-list-item-content class="pa-0">
            <v-divider class="pa-1"></v-divider>
            <v-btn class="rounded fontColor borderColor"
              >我已知晓，下一步</v-btn
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
#hiddenScroll {
  overflow-x: hidden;
  overflow-y: scroll;
}

.fontColor {
  color: #347a71;
}

.borderColor {
  border: solid;
  border-color: #01a29a;
  border-width: 1px;
  background-color: #e2f6f5 !important;
  color: #01a29a;
}

@media screen and (min-height: 500px) {
  #hiddenScroll {
    height: 240px;
  }
}

@media screen and (min-height: 720px) {
  #hiddenScroll {
    height: 100%;
  }
}
</style>

<script>
export default {
  name: 'InvIndex',
  data() {
    return {
      listItemStyle: 'pa-1 fontColor',
    }
  },
}
</script>
