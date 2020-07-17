<template>
    <QueryByIssueDate
      btnText="查询单日发行量"
      reqUrl="../../static/test/channel_job.json"
      :tableHeaders="tableHeaders"
    ></QueryByIssueDate>
</template>

<script>
import QueryByIssueDate from '../components/QueryByIssueDate'
export default {
  name: 'Home',
  components: {
    QueryByIssueDate,
  },
  data: () => ({
    tableHeaders: [
      {
        text: '数据发行时间',
        align: 'start',
        value: 'issueDateStr',
      },
      { text: '渠道', value: 'channel' },
      { text: '计划发行', value: 'circulation' },
      { text: '成功', value: 'success' },
      { text: '失败', value: 'failed' },
    ],
  }),
  created() {},
  methods: {},
}
</script>
