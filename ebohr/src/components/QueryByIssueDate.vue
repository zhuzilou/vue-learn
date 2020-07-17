<template>
  <v-container fluid>
    <v-alert type="error" dismissible v-model="alertError">{{
      errorMsg
    }}</v-alert>
    <!-- justify="space-between" 与 class="justify-space-between" 效果相同 -->
    <v-row>
      <v-col>
        <v-select
          :items="itemsYear"
          solo
          label="年"
          v-model="selectedYear"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="itemsMonth"
          solo
          label="月"
          v-model="selectedMonth"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="itemsDay"
          solo
          label="日"
          v-model="selectedDay"
        ></v-select>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-tooltip top>
          <template v-slot:activator="{}">
            <v-btn @click="query" color="primary">
              <!-- <v-icon large>mdi-code-tags</v-icon> -->
              {{ btnText }}
            </v-btn>
          </template>
          <span>{{ btnText }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="tableHeaders"
          :items="tableItems"
          hide-default-footer
          class="elevation-1"
          item-key="id"
          loading="true"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'QueryByIssueDate',
  props: {
    btnText: String,
    tableHeaders: Array,
    reqUrl: String,
  },
  data() {
    return {
      alertError: false,
      errorMsg: '异常信息',
      itemsYear: ['2020', '2019', '2018'],
      itemsMonth: [],
      itemsDay: [],
      selectedYear: '',
      selectedMonth: '',
      selectedDay: '',
      tableItems: [],
    }
  },
  created() {
    this.initMonthDay(this.itemsMonth, 12)
    this.initMonthDay(this.itemsDay, 31)
  },
  methods: {
    initMonthDay(items, length) {
      for (let i = 0; i < length; i++) {
        let item = i + 1
        if (item < 10) {
          items[i] = '0' + item
        } else {
          items[i] = '' + item
        }
      }
    },
    query() {
      console.log(this.selectedYear, this.selectedMonth, this.selectedDay)
      axios
        .get(this.reqUrl)
        .then((resp) => {
          console.log(resp)
          if ('1' == resp.data.flag) {
            this.tableItems = resp.data.data
          } else {
            this.errorMsg = resp.data.message
            this.alertError = true
          }
        })
        .catch((error) => {
          console.log(error)
          this.errorMsg = "Network error, please try it later."
          this.alertError = true
        })
    },
  },
}
</script>
