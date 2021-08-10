$(function () {
  // 退回login后,清楚本地存储数据
  localStorage.removeItem('token')
  // 跳转到注册
  $("#link_reg").on('click', function () {
    $(".login-box").hide();
    $(".reg-box").show();
    $(".reg-box [name=username]").val('')
    $(".reg-box [name=password]").val('')
    $(".reg-box [name=repwd]").val('')
  })

  // 跳转到登录
  $("#link_login").on('click', function () {
    $(".reg-box").hide();
    $(".login-box").show();
    $(".login-box [name=username]").val($(".reg-box [name=username]").val())
    $(".login-box [name=password]").val($(".reg-box [name=password]").val())
  })

  // 账号密码输入框限制条件
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能有空格'],
    repwd: function (value) {
      var pw = $("#form_reg [name=password]").val();
      if (pw !== value) {
        return '两次密码不一致'
      }
    }
  })

  // 监听注册表单提交事件
  $("#form_reg").on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val()
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status === 0) {
        $("#link_login").click();
      }
      layer.msg(res.message);
    })
  })

  // 监听登录表单提交事件
  $("#form_login").on('submit', function (e) {
    e.preventDefault();
    // 使用serialize()快速得到表单的值,表单的name要与接口的属性名一致,不然会报错
    $.post('/api/login', $(this).serialize(), function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg(res.message);
      localStorage.setItem('token', res.token)
      location.href = '/index.html'
    })
  })
})