$(function () {
    getUserInfo();

    $("#btnLogout").on('click', function () {
        layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function () {
            // 1.清空本地存储的token
            localStorage.removeItem('token')
            // 2.跳转到登陆页面
            location.href = '/login.html'
        });
    })
})
var data = {};
// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data)
            data = res.data
        },
        async: false
    })
    return data;

}

// 渲染用户头像
function renderAvatar(user) {
    // 1.获取用户名称
    var name = user.nickname || user.username
    // 2.设置欢迎字样
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.渲染用户头像

    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 3.2 渲染文本头像
        $(".layui-nav-img").hide();
        // 将字符串装换为大写
        var first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}