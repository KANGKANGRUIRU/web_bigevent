$(function () {

    var layer = layui.layer
    var form = layui.form
    inArtCateList()

    // 获取文章分类列表
    function inArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }

        })
    }

    // 为添加类别的按钮绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialong-add').html()

        })
    })

    //通过代理的形式，为form-add 表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }

                layer.msg('新增分类成功！')
                inArtCateList()
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })


    })

    // 通过代理的形式，为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '.bnt-edit', function () {
        //    弹出文章分类的信息层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialong-edit').html()

        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)

            }
        })
    })

    // 通过代理的形式，为修改的表单绑定submit事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.layui.msg('更新分类数据失败!')
                }
                layer.msg('更新分类数据成功!')
                layer.close(indexEdit)
                inArtCateList()
            }
        })

    })
    // 通过代理的形式，为删除按钮绑定点击事件
   $('tbody').on('click', '.btn-delete', function() {
var id = $(this).attr('data-id')
// 提示用户是否要删除
layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index)
{
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/'+ id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    inArtCateList()
                }

            })


        })
    })
})