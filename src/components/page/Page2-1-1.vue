<template>
  <div class="body">
    <div style="margin-top:5px;">
      <Form :label-width="100" class="search-group">
        <Row>
          <Col span="5">
            <FormItem label="考场名称">
              <Input v-model="filter.exam_activity_name"></Input>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="日期起始">
              <DatePicker v-model="filter.date_from" type="date" style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
          <Col span="5">
            <FormItem label="日期结束">
              <DatePicker v-model="filter.date_to" type="date" style="width: 100%"></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="btn-line" style="margin: -10px 0 10px 0;">
      <Button type="primary" icon="ios-search-strong">查询</Button>
    </div>
    <Table :columns="header" :data="exam_list"></Table>
    <Row type="flex" justify="center" style="margin: 10px 0 10px 0;">
      <Col>
        <Page :total="100" show-total show-sizer show-elevator></Page>
      </Col>
    </Row>
    <div class="page-no">No.1004012</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      header: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          width: 60
        },
        {
          title: '考试活动名称',
          key: 'exam_activity_name',
          width: 320
        },
        {
          title: '考试日期',
          width: 240,
          render: (h, p) => {
            return h('div', `${p.row.date_from}至${p.row.date_to}`)
          }
        },
        {
          title: '当前阶段',
          key: 'stage_name',
          width: 120
        },
        {
          title: '操作',
          align: 'center',
          //  fixed: 'right', // 这个fixed之后会使CPU忙,还会抖动 估计是一个bug
          render: (h, p) => {
            return h('GapButtonGroup',
              {
                props: {
                  group: p.row.group,
                  grid: 6
                }
              }
            )
          }
        }
      ],
      exam_list: [],
      filter: {
        exam_activity_name: '',
        date_from: '',
        date_to: ''
      },
      groups: {
        exam_activity_detail: (exam) => {
          return {
            name: '考试活动明细',
            action: () => {
              this.$router.push({ name: 'examActivityDetail' })
              console.log(this)
            }
          }
        },
        accept_exam: (exam) => {
          return {
            name: '承接考试',
            action: () => {
              console.log(exam)
            }
          }
        },
        cancel_exam: (exam) => {
          return {
            name: '撤销考试',
            action: () => {
              this.$router.push({ name: 'cancelExam' })
            }
          }
        },
        exam_fee: (exam) => {
          return {
            name: '考试费用',
            action: () => {
              this.$router.push({ name: 'examFee' })
            }
          }
        },
        exam_status: (exam) => {
          return {
            name: '查看考试状态',
            action: () => {
              this.$router.push({ name: 'examStatus' })
            }
          }
        },
        supervisor_info: (exam) => {
          return {
            name: '督考信息',
            action: () => {
              this.$router.push({ name: 'supervisorInfo' })
            }
          }
        },
        supervisor_sign_in: (exam) => {
          return {
            name: '督考签到',
            action: () => {
              this.$router.push({ name: 'supervisorSignIn' })
            }
          }
        },
        exam_management_data_download: (exam) => {
          return {
            name: '考务资料下载',
            action: () => {
              this.$router.push({ name: 'examManagementDataDownload' })
            }
          }
        },
        invigilate_assess: (exam) => {
          return {
            name: '监考考核',
            action: () => {
              this.$router.push({ name: 'invigilateAssess' })
            }
          }
        },
        invigilate_info: (exam) => {
          return {
            name: '监考信息',
            action: () => {
              this.$router.push({ name: 'invigilateInfo' })
            }
          }
        },
        exam_state_report: (exam) => {
          return {
            name: '考试状态上报',
            action: () => {
              this.$router.push({ name: 'stateMonitoringReport' })
            }
          }
        },
        seats_order_download: (exam) => {
          return {
            name: '座次表下载',
            action: () => {
              this.$router.push({ name: 'seatinArrangementDownload' })
            }
          }
        },
        exam_data_download: (exam) => {
          return {
            name: '考试数据下载',
            action: () => {
              this.$router.push({ name: 'studentDataPacketsDownload' })
            }
          }
        },
        exam_paper_and_secret_key_download: (exam) => {
          return {
            name: '试卷/密钥下载',
            action: () => {
              this.$router.push({ name: 'examPaperAndSecretKeyDownload' })
            }
          }
        },
        photo_compare: (exam) => {
          return {
            name: '照片对比',
            action: () => {
              this.$router.push({ name: 'photoCompare' })
            }
          }
        },
        exam_data_upload: (exam) => {
          return {
            name: '考试数据上传',
            action: () => {
              this.$router.push({ name: 'importStateData' })
            }
          }
        },
        site_comments: (exam) => {
          return {
            name: '考点评价查询',
            action: () => {
              this.$router.push({ name: 'siteComments' })
            }
          }
        },
        supervisor_comment: (exam) => {
          return {
            name: '督考评价',
            action: () => {
              this.$router.push({ name: 'supervisorComment' })
            }
          }
        }
      }
    }
  },
  methods: {

    fakeData () {
      const stages = [
        '意向征询',
        '考场申报',
        '考前实施',
        '考试中',
        '考后评价',
        '费用结算'
      ]
      let n = 10
      for (let i = 0; i < n; i++) {
        let exam = {
          id: i,
          exam_activity_name: '陕西省2017年上半年会计从业考试',
          date_from: '2017-02-02',
          date_to: '2017-03-03',
          stage: i % 5,
          stage_name: stages[i % 5]
        }
        exam.group = this.getButtonGroup(exam)
        this.exam_list.push(exam)
      }
    },
    getButtonGroup (exam) {
      const g = (keys) => {
        return keys.map(key => this.groups[key](exam))
      }
      switch (exam.stage) {
        case 0:
          return g([
            'exam_activity_detail',
            'accept_exam'
          ])
        case 1:
          return g([
            'exam_activity_detail',
            'cancel_exam',
            'exam_fee'
          ])
        case 2:
          return g([
            'exam_activity_detail',
            'exam_status',
            'exam_fee',
            'supervisor_info',
            'supervisor_sign_in',
            'exam_management_data_download',
            'invigilate_assess',
            'exam_state_report',
            'seats_order_download',
            'exam_data_download',
            'exam_paper_and_secret_key_download',
            'photo_compare',
            'exam_data_upload'

          ])
        case 3:
          return g([
            'exam_activity_detail',
            'exam_status',
            'exam_fee',
            'supervisor_info',
            'exam_management_data_download',
            'invigilate_info',
            'exam_state_report',
            'seats_order_download',
            'exam_data_download',
            'exam_paper_and_secret_key_download',
            'photo_compare',
            'exam_data_upload'
          ])
        case 4:
          return g([
            'exam_activity_detail',
            'exam_status',
            'exam_fee',
            'supervisor_info',
            'exam_management_data_download',
            'invigilate_info',
            'exam_state_report',
            'seats_order_download',
            'site_comments',
            'supervisor_comment'
          ])
      }
    }
  },
  created () {
    this.fakeData()
  }
}
</script>
