$(function () {
  var form = layui.form
  var layer = layui.layer


  $(".layui-form").on("submit", function (e) {
    // 阻止表单默认提交行为
    e.preventDefault();
    $.ajax({
      method: "post",
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg(res.message)
        console.log($('.layui-form'));
        //重置表单
        $(".layui-form")[0].reset();
      }
    })
  })

  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码长度应为6到12位，且不能有空格'],
    samepwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    repwd: function (value) {
      if (value !== $('[name=newPwd').val())
        return '两次密码不一致！'
    }
  })


















  // var form = layui.form

  // form.verify({
  //   pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
  //   samePwd: function(value) {
  //     if (value === $('[name=oldPwd]').val()) {
  //       return '新旧密码不能相同！'
  //     }
  //   },
  //   rePwd: function(value) {
  //     if (value !== $('[name=newPwd]').val()) {
  //       return '两次密码不一致！'
  //     }
  //   }
  // })

  // $('.layui-form').on('submit', function(e) {
  //   e.preventDefault()
  //   $.ajax({
  //     method: 'POST',
  //     url: '/my/updatepwd',
  //     data: $(this).serialize(),
  //     success: function(res) {
  //       if (res.status !== 0) {
  //         return layui.layer.msg('更新密码失败！')
  //       }
  //       layui.layer.msg('更新密码成功！')
  //       // 重置表单
  //       $('.layui-form')[0].reset()
  //     }
  //   })
  // })

























  // $.ajax({
  //   method:'post',
  //   url:'/my/updatepwd',
  //   data:{},

  // })
})