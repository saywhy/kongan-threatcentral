var myApp = angular.module("myApp", []);
myApp.controller("offlineUpdateCtrl", function (
    $scope,
    $http,
    $filter,
    $sce,
    $httpParamSerializerJQLike
) {
    $scope.init = function () {
        $scope.get_list()
        $scope.Repeat([1, 2, 3, 2, 1, 2, 3, 3, 4, 5, 5])
    }
    // 获取列表
    $scope.get_list = function () {
        $http({
            method: "get",
            url: "/offline-update/list",
        }).then(function (data) {
            console.log(data.data);
            if (data.data.status == "success") {
                $scope.list = data.data.data
            }
            if (data.data.status == "fail") {
                zeroModal.error(data.data.errorMessage);
            }
        });
    }

    function Repeat(arr) {
        var ary = arr;
        var nary = ary;
        var count = 0;
        var obj = {};
        for (var i = 0; i < ary.length; i++) {
            for (var j = 0; j < nary.length; j++) {
                if (ary[i] == nary[j]) {
                    count += 1;
                    obj[ary[i]] = count;
                }
            }
            count = 0;
        }
        console.log(JSON.stringify(obj));
        for (var k in obj) {
            console.log(k + '出现了' + obj[k] + '次');
        }
        return obj;
    }
    console.log(1112121);
    $(function () {
        var $list = $("#thelist"); //这几个初始化全局的百度文档上没说明，好蛋疼。
        var $btn = $("#ctlBtn"); //开始上传
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: false,
            chunkSize: 10 * 1024 * 1024,
            // swf文件路径
            swf: './webuploader-0.1.5/Uploader.swf',
            threads: 3, //上传并发数。允许同时最大上传进程数。
            // 文件接收服务端。
            server: '/offline-update/upload-package',
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker',
            // formData:{id:'11'}, //文件上传请求的参数表，每次发送都会发送此对象中的参数。
            chunked: true, //开启分片上传
            threads: 3, //上传并发数
            // fileNumLimit:1,//验证文件总数量, 超出则不允许加入队列。
            duplicate: true, //去重， 根据文件名字、文件大小和最后修改时间来生成hash Key.
            method: 'POST',
        });
        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            $list.empty();
            // webuploader事件.当选择文件后，文件被加载到文件队列中，触发该事件。等效于 uploader.onFileueued = function(file){...} ，类似js的事件定义。
            $list.append('<div id="' + file.id + '" class="item">' +
                '<h5 class="info" style="font-size:14px;">' + file.name + '</h5>' +
                '<p class="state">等待上传...</p>' +
                '</div>');
            $scope.filename = file;
            // console.log($list[0].children);
            $scope.$apply(function () {
                $scope.upload = false; //开始上传按钮
            })
        });
        // 当有文件被移除后触发
        uploader.on('fileDequeued', function (file) {
            console.log('del');
        });
        //当uploader被重置时候触发
        uploader.on('reset', function (file) {
            console.log('reset');
        });
        //当文件上传成功时触发。接收返回值
        uploader.on('uploadSuccess', function (file, response) {
            console.log(response);
            if (response.status == 'success') {
                zeroModal.success('上传成功');
                $scope.get_list()
                $scope.$apply(function () {
                    $scope.upload = true; //开始上传按钮
                    $scope.update = false; //更新按钮
                })
            } else {
                zeroModal.error(response.errorMessage);
                $scope.$apply(function () {
                    $scope.upload = true; //开始上传按钮
                    $scope.update = true; //更新按钮
                })
            }
            zeroModal.close($scope.loading);
            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            $('#' + file.id).addClass('upload-state-done');
            // console.log(file.id);
            // console.log(uploader.getStats());//获取文件统计信息。
            //successNum 上传成功的文件数,progressNum 上传中的文件数,cancelNum 被删除的文件数
            //invalidNum 无效的文件数,uploadFailNum 上传失败的文件数,.queueNum 还在队列中的文件数,interruptNum 被暂停的文件数
            // uploader.destroy();//销毁 webuploader 实例
            uploader.removeFile(file, true);
            uploader.reset(); //重置uploader。目前只重置了队列。
            // $list.empty();
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                    '</div>' +
                    '</div>').appendTo($li).find('.progress-bar');
            }
            $li.find('p.state').text('上传中');
            $percent.css('width', percentage * 100 + '%');
        });


        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            $('#' + file.id).find('p.state').text('上传出错');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            $('#' + file.id).find('.progress').remove();
            $('#' + file.id).find('p.state').text('已上传');
        });
        $btn.on('click', function () {
            $scope.$apply(function () {
                $scope.upload = true; //开始上传按钮
                $scope.update = true; //更新按钮
            })
            // console.log('选择文件');
            if ($(this).hasClass('disabled')) {
                // console.log('12121212121');
                return false;
            }
            // console.log($scope.filename);

            if ($scope.filename.name.split('.')[1] != 'json') {
                // sdk.tar.gz、df.tar.gz或reg.tar.gz
                zeroModal.error('请上传.json格式的文件');
            } else if ($scope.filename.name.split('.')[0] != 'BotnetCAndCURLsDF' &&
                $scope.filename.name.split('.')[0] != 'IPReputationDF' &&
                $scope.filename.name.split('.')[0] != 'MaliciousHashDF_MD5' &&
                $scope.filename.name.split('.')[0] != 'MaliciousHashDF_SHA1' &&
                $scope.filename.name.split('.')[0] != 'MaliciousHashDF_SHA256' &&
                $scope.filename.name.split('.')[0] != 'MaliciousURLsDF' &&
                $scope.filename.name.split('.')[0] != 'MobileMaliciousHashDF_MD5' &&
                $scope.filename.name.split('.')[0] != 'MobileMaliciousHashDF_SHA1' &&
                $scope.filename.name.split('.')[0] != 'MobileMaliciousHashDF_SHA256' &&
                $scope.filename.name.split('.')[0] != 'PhishingURLsDF'
            ) {
                zeroModal.show({
                    width: '600px',
                    height: '220px',
                    content: '请上传文件名为BotnetCAndCURLsDF、IPReputationDF、MaliciousHashDF_MD5、MaliciousHashDF_MD5、MaliciousHashDF_SHA1、MaliciousHashDF_SHA256、MaliciousURLsDF、MobileMaliciousHashDF_MD5、MobileMaliciousHashDF_SHA1、MobileMaliciousHashDF_SHA256或PhishingURLsDF的文件',
                    ok: true
                });
            } else {
                $scope.loading = zeroModal.loading(4);

                uploader.upload($scope.filename);
            }
        });
        $('#picker').on('click', function () {
            console.log('选择文件');
            uploader.reset(); //重置uploader。目前只重置了队列。
        });





    });

    $scope.init()
});