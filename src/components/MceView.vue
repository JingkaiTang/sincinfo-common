<template>
  <div>
    <textarea  id="tinymceEditer"></textarea>
  </div>
</template>

<script>

import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/print'
import 'tinymce/plugins/table'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/media'
import 'tinymce/plugins/save'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/paste'
export default {
  props: ['value'],
  watch: {
    value: function () {
      tinymce.get('tinymceEditer').setContent(this.value)
    }
  },
  mounted () {
    const that = this
    tinymce.init({
      mode: 'exact',
      selector: '#tinymceEditer',
      theme: 'modern',
      language_url: 'http://ozefqhgx0.bkt.clouddn.com/langs/zh_CN.GB2312.js',
      branding: false,
      elementpath: false,
      menubar: 'edit insert view format table tools',
      skin_url: 'http://ozefqhgx0.bkt.clouddn.com/skins/lightgray',
      width: 800,
      height: 400,
      cleanup: false,
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor imagetools',
        'insertdatetime media  save table contextmenu',
        'emoticons paste textcolor colorpicker textpattern imagetools'
      ],
      toolbar1: 'newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image ',
      autosave_interval: '20s',
      image_advtab: true,
      table_default_styles: {
        width: '100%',
        border: '1px solid black',
        'border-collapse': 'collapse'
      },
      init_instance_callback: function (editor) {
        editor.on('Change', function (e) {
          that.$emit('input', tinymce.get('tinymceEditer').getContent())
        })
      },
      content_css: ['http://ozefqhgx0.bkt.clouddn.com/css/mce.css']
    })
  },
  destroyed () {
    tinymce.get('tinymceEditer').destroy()
  }
}
</script>
