import { filterSetFields } from '@/utils'

export default {
  data () {
    return {
      form: this.$form.createForm(this),
      submitLoading: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
        // lg: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
        // lg: { span: 17 }
      }
    }
  },
  props: {},
  computed: {},
  methods: {
    filterSetFields (detailForm = {}) {
      const fieldsValue = this.form.getFieldsValue()
      const model = filterSetFields(fieldsValue, detailForm)
      this.form.setFieldsValue(model)
    }
  }
}
