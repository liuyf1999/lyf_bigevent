$(function () {

  // 跳转到注册
  $("#link_reg").on('click', function () {
    $(".login-box").hide();
    $(".reg-box").show();
    $(".reg-box [name=uname]").val('')
    $(".reg-box [name=pwd]").val('')
    $(".reg-box [name=repwd]").val('')
  })

  // 跳转到登录
  $("#link_login").on('click', function () {
    $(".reg-box").hide();
    $(".login-box").show();
    $(".login-box [name=uname]").val($(".reg-box [name=uname]").val())
    $(".login-box [name=pwd]").val($(".reg-box [name=pwd]").val())
  })

  // 监听注册表单提交事件
  $("#form_reg").on('submit', function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=uname]").val(),
      password: $("#form_reg [name=pwd]").val()
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
    var data = {
      username: $("#form_login [name=uname]").val(),
      password: $("#form_login [name=pwd]").val()
    }
    $.post('/api/login', data, function (res) {
      layer.msg(res.message);
    })
  })
  // 账号密码输入框限制条件
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能有空格'],
    repwd: function (value) {
      var pw = $("#form_reg [name=pwd]").val();
      if (pw !== value) {
        return '两次密码不一致'
      }
    }
  })
})