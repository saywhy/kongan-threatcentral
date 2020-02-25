var myApp = angular.module("myApp", []);
myApp.controller("loopholeIntelCtrl", function ($scope, $http, $filter) {
    $scope.init = function () {
        $scope.searchTime = {
            startDate: '',
            // startDate: moment().subtract(90, "days"),
            // endDate: moment(),
            endDate: ''
        };
        $scope.seach_data = {
            source: '',
            stauts: '',
            label_id: [],
            key_word: '',
            level: '',
            startDate: '',
            // startDate: moment().subtract(90, "days").unix(),
            // endDate: moment().unix(),
            endDate: '',
        };
        $scope.status_search = [{
                num: '',
                status: '全部'
            },
            {
                num: '1',
                status: '已发布'
            },
            {
                num: '0',
                status: '未发布'
            }
        ]
        $scope.search_level = [{
                num: '',
                status: '全部'
            },
            {
                num: '高',
                status: '高'
            },
            {
                num: '中',
                status: '中'
            },
            {
                num: '低',
                status: '低'
            }
        ]
        $scope.add_level = [{
                num: '高',
                status: '高'
            },
            {
                num: '中',
                status: '中'
            },
            {
                num: '低',
                status: '低'
            }
        ]
        $scope.pageNow = 1
        $scope.enter_show = true;
        $scope.picker_search();
        $scope.get_loophole_source();
        $scope.get_page();
        $scope.get_nvd();
        $scope.enter();
        $scope.tag_list_if = false;
        $scope.add_source_list_if = false;
        $scope.edit_source_list_if = false;
        $scope.get_page_show = false;
        $scope.label_data = [];
        //------
        $scope.pop_show = {
            add: false,
            add_level_list: false,
            add_tag_category: false,
            add_tag_name: false,
            add_NVD_list: false,
            add_source_list: false,
            add_original_input: true,
            add_old_box: true,
            add_new_box: true,
            edit: false,
            edit_level_list: false,
            edit_tag_category: false,
            edit_tag_name: false,
            edit_NVD_list: false,
            edit_source_list: false,
            edit_original_input: false,
            edit_old_box: true,
        }
        $scope.search_box_ul = {
            source: false,
            stauts: false,
            level: false,
        }
        //=---------
        //前端选中标签展示列表
        $scope.label_checked_list = [];
        //展开\折叠更多
        $scope.toggleCount = 2;
        $scope.toggleStatus = false;
        $scope.get_lab_list()

        $scope.tag_key_add = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.tag_list_scrollTop = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.tag_key_edit = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
        $scope.edit_tag_scrollTop = {
            active_index: -1,
            listHeight: 156,
            listItemHeight: 34,
            list_length: 0
        }
    }
    // 按enter键搜索
    $scope.enter = function () {
        document.onkeydown = function (e) {
            // 兼容FF和IE和Opera
            var theEvent = e || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                //回车执行查询
                $scope.$apply(function () {
                    if ($scope.enter_show) {
                        $scope.get_page(1);
                    }
                });
            }
        };
    };
    // 初始化时间
    $scope.start_time_picker = function () {
        $('#start_time_picker').val('');
        $("#start_time_picker").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "center",
                autoUpdateInput: false,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm"
                }
            },
            function (start, end, label) {
                $("#start_time_picker").data('daterangepicker').autoUpdateInput = true
                $scope.add_item.first_seen_time = start.unix()
            }
        );
    };
    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "right",
                autoUpdateInput: false,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm"
                }
            },
            function (start, end, label) {
                $("#picker_search").data('daterangepicker').autoUpdateInput = true
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
            }
        );
    };
    $scope.picker_edit = function (startDate) {
        $("#picker_edit").daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                timePicker: true,
                timePicker24Hour: true,
                drops: "down",
                opens: "center",
                startDate: startDate,
                locale: {
                    applyLabel: "确定",
                    cancelLabel: "取消",
                    format: "YYYY-MM-DD HH:mm:ss"
                }
            },
            function (start, end, label) {
                $scope.edit_item.first_seen_time = start.unix()
            }
        );
    };
    // 获取情报来源
    $scope.get_loophole_source = function (source) {
        source = source ? source : '';
        $http({
            method: "get",
            url: "/site/loophole-intelligence-sourse",
            params: {
                sourse: source
            }
        }).then(
            function (data) {
                $scope.loop_source = [];
                $scope.loop_source_add = [];
                angular.forEach(data.data, function (item) {
                    var obj = {
                        name: item.sourse,
                        active: false
                    }
                    $scope.loop_source_add.push(obj);
                    $scope.loop_source.push(obj);
                })
                $scope.loop_source.unshift({
                    name: '全部',
                    active: false
                })
            },
            function () {}
        );
    }
    $scope.get_nvd = function () {
        $http({
            method: "get",
            url: "/site/cve-list",
        }).then(
            function (data) {
                $scope.nvd_list = data.data;
            },
            function () {}
        );
    }
    // 获取列表
    $scope.get_page = function (pageNow) {
        pageNow = pageNow ? pageNow : 1;
        $scope.pageNow = pageNow
        // var loading = zeroModal.loading(4);
        var params_data = JSON.stringify($scope.seach_data);
        $scope.params_data = JSON.parse(params_data)
        switch ($scope.params_data.stauts) {
            case '全部':
                $scope.params_data.stauts = ''
                break;
            case '已发布':
                $scope.params_data.stauts = 1
                break;
            case '未发布':
                $scope.params_data.stauts = 0
                break;

            default:
                break;
        }
        if ($scope.params_data.source == '全部') {
            $scope.params_data.source = ''
        }
        if ($scope.params_data.level == '全部') {
            $scope.params_data.level = ''
        }
        $http({
            method: "get",
            url: "/seting/loophole-intelligence-list",
            params: {
                stime: $scope.params_data.startDate,
                etime: $scope.params_data.endDate,
                key_word: $scope.params_data.key_word,
                sourse: $scope.params_data.source,
                status: $scope.params_data.stauts,
                level: $scope.params_data.level,
                label_id: JSON.stringify($scope.params_data.label_id),
                page: pageNow,
                rows: 10,
            }
        }).then(
            function (data) {
                console.log(data);
                // zeroModal.close(loading);
                $scope.pages = data.data;
                if ($scope.get_page_show) {
                    angular.forEach($scope.pages.data, function (item) {
                        if (item.id == $scope.edit_item_data.id) {
                            $scope.edit_item_data = item;
                        }
                    })
                    $scope.enter_show = false;
                    var item_str = JSON.stringify($scope.edit_item_data);
                    $scope.edit_item_str = JSON.parse(item_str);
                    $scope.picker_edit(moment(new Date($scope.edit_item_str.open_time * 1000)));
                    console.log($scope.edit_item_str);
                    $scope.edit_item = {
                        id: $scope.edit_item_str.id,
                        title: $scope.edit_item_str.title,
                        level: '',
                        level_list: [{
                                name: '高危',
                                num: '高危'
                            },
                            {
                                name: '中危',
                                num: '高危'
                            },
                            {
                                name: '低危',
                                num: '高危'
                            },
                        ],
                        reference: [],
                        reference_information: [],
                        affected: [],
                        affected_products: [],
                        NVD: [],
                        nvd_list: $scope.nvd_list,
                        tag: [],
                        label_category: [],
                        first_seen_time: $scope.edit_item_str.open_time,
                        sourse: $scope.edit_item_str.sourse,
                        detail: $scope.edit_item_str.detail,
                        treatment_measures: $scope.edit_item_str.treatment_measures,
                        exist: [],
                    }
                    switch ($scope.edit_item_str.level) {
                        case '高':
                            $scope.edit_item.level = '高危'
                            break;
                        case '中':
                            $scope.edit_item.level = '中危'
                            break;
                        case '低':
                            $scope.edit_item.level = '低危'
                            break;
                        default:
                            break;
                    }
                    if ($scope.edit_item_str.reference_information && $scope.edit_item_str.reference_information != '') {
                        angular.forEach($scope.edit_item_str.reference_information, function (item, index) {
                            var obj = {
                                name: item,
                                icon: false
                            }
                            if (index == $scope.edit_item_str.reference_information.length - 1) {
                                obj.icon = true
                            }
                            $scope.edit_item.reference.push(obj);
                        })
                    } else {
                        $scope.edit_item.reference.push({
                            name: '',
                            icon: true
                        });
                    }
                    // affected: [],
                    //     affected_products: [],
                    if ($scope.edit_item_str.affected_products && $scope.edit_item_str.affected_products.length != 0) {
                        angular.forEach($scope.edit_item_str.affected_products, function (item, index) {
                            var obj = {
                                name: item,
                                icon: false
                            }
                            if (index == $scope.edit_item_str.affected_products.length - 1) {
                                obj.icon = true
                            }
                            $scope.edit_item.affected.push(obj);
                        })
                    } else {
                        $scope.edit_item.affected.push({
                            name: '',
                            icon: true
                        });
                    }
                    // 匹配标签
                    angular.forEach(JSON.parse($scope.edit_item_str.label_id), function (item, index) {
                        if (item != '') {
                            var obj = {
                                category: '',
                                name: '',
                                tag_name_list: [],
                                category_ul: false,
                                name_ul: false,
                                icon: false,
                                id: item
                            }
                            $scope.edit_item.tag.push(obj)
                        }
                    })
                    if ($scope.edit_item.tag.length != 0) {
                        $scope.edit_item.tag[$scope.edit_item.tag.length - 1].icon = true;
                        angular.forEach($scope.edit_item.tag, function (item) {
                            angular.forEach($scope.label_data, function (key) {
                                angular.forEach(key.label, function (k) {
                                    if (k.id == item.id) {
                                        item.tag_name_list = key.label
                                        item.category = k.category_name
                                        item.name = k.label_name
                                    }
                                })

                            })
                        })
                    } else {
                        $scope.edit_item.tag.push({
                            category: '',
                            name: '',
                            tag_name_list: [],
                            category_ul: false,
                            name_ul: false,
                            icon: true,
                            id: '0'
                        })
                    }
                    if ($scope.edit_item_str.nvd && $scope.edit_item_str.nvd.length != 0) {
                        angular.forEach($scope.edit_item_str.nvd, function (item, index) {
                            var obj = {
                                name: item.cve,
                                id: item.id,
                                nvd_ul: false,
                                icon: false
                            }
                            if (index == $scope.edit_item_str.nvd.length - 1) {
                                obj.icon = true
                            }
                            $scope.edit_item.NVD.push(obj)
                        })

                    } else {
                        $scope.edit_item.NVD.push({
                            name: '',
                            id: 0,
                            nvd_ul: false,
                            icon: true
                        })
                    }
                    $scope.pop_show.edit = true;
                    $scope.get_page_show = false;
                }
            },
            function () {}
        );
    }

    //=---- 修改搜索框
    // 搜索框获取焦点
    $scope.search_focus = function (name) {
        switch (name) {
            case 'source':
                $scope.search_box_ul.source = true;
                break;
            case 'stauts':
                $scope.search_box_ul.stauts = true;
                break;
            case 'level':
                $scope.search_box_ul.level = true;
                break;
            default:
                break;
        }

    }
    // 搜索框失去焦点
    $scope.search_blur = function (name) {
        switch (name) {
            case 'source':
                $scope.search_box_ul.source = false;
                break;
            case 'stauts':
                $scope.search_box_ul.stauts = false;
                break;
            case 'level':
                $scope.search_box_ul.level = false;
                break;
            default:
                break;
        }

    }
    // 搜索栏选择
    $scope.search_choose_item = function (data, index, name) {
        switch (name) {
            case 'source':
                $scope.seach_data.source = data
                break;
            case 'stauts':
                $scope.seach_data.stauts = data
                break;
            case 'level':
                $scope.seach_data.level = data
                break;
            default:
                break;
        }
    }
    // 情报录入-弹窗
    $scope.add_loop_box = function (item) {
        $scope.start_time_picker();

        $scope.enter_show = false;
        $scope.pop_show.add = true;
        $scope.add_item = {
            title: '',
            level: '',
            level_list: [{
                    name: '高危',
                    num: '高危'
                },
                {
                    name: '中危',
                    num: '高危'
                },
                {
                    name: '低危',
                    num: '高危'
                },
            ],
            affected: [{
                name: '',
                icon: true
            }],
            affected_products: [],
            reference: [{
                name: '',
                icon: true
            }],
            reference_information: [],
            NVD: [{
                name: '',
                icon: true,
                nvd_ul: false,
            }],
            nvd_list: $scope.nvd_list,
            tag: [{
                category: '',
                name: '',
                tag_name_list: [],
                category_ul: false,
                name_ul: false,
                icon: true,
                id: ''
            }],
            label_category: [],
            first_seen_time: moment().unix(),
            sourse: '',
            detail: '',
            treatment_measures: '',
            exist: [],
        }
    };
    //   取消弹窗
    $scope.add_cancel = function () {
        $scope.pop_show.add = false;
        $scope.enter_show = true;
    };
    //   取消编辑弹窗
    $scope.edit_cancel = function () {
        $scope.pop_show.edit = false;
        $scope.enter_show = true;
    };
    // 添加录入情报
    $scope.add_sure = function () {
        if ($scope.add_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        switch ($scope.add_item.level) {
            case '':
                zeroModal.error('请选择漏洞等级')
                return false
                break;
            case '高危':
                $scope.add_item.level_cn = '高'
                break;
            case '中危':
                $scope.add_item.level_cn = '中'
                break;
            case '低危':
                $scope.add_item.level_cn = '低'
                break;
            default:
                break;
        }
        if ($scope.add_item.sourse == '') {
            zeroModal.error('请选择情报来源')
            return false
        }
        angular.forEach($scope.add_item.tag, function (item, index) {
            if (item.name != '') {
                $scope.add_item.exist.push(item.id * 1)
            }
        })
        angular.forEach($scope.add_item.reference, function (item, index) {
            if (item.name != '') {
                $scope.add_item.reference_information.push(item.name)
            }
        })
        angular.forEach($scope.add_item.affected, function (item, index) {
            if (item.name != '') {
                $scope.add_item.affected_products.push(item.name)
            }
        })
        // var loading = zeroModal.loading(4);
        var NVD_Array = [];
        angular.forEach($scope.add_item.NVD, function (item) {
            if (item.name != '' && item.id) {
                NVD_Array.push({
                    cve: item.name,
                    id: item.id,
                });
            }
        })
        $scope.NVD_Array_cn = $scope.arrayUnique2(NVD_Array, 'id')
        $http({
            method: "post",
            url: "/seting/loophole-intelligence-add",
            data: {
                title: $scope.add_item.title,
                level: $scope.add_item.level_cn,
                open_time: $scope.add_item.first_seen_time,
                sourse: $scope.add_item.sourse,
                affected_products: $scope.add_item.affected_products,
                detail: $scope.add_item.detail,
                treatment_measures: $scope.add_item.treatment_measures,
                nvd: $scope.NVD_Array_cn,
                reference_information: $scope.add_item.reference_information,
                label_id: {
                    exist: $scope.add_item.exist,
                    unexist: []
                }
            }
        }).then(
            function (data) {
                console.log(data);
                // zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("添加成功");
                    $scope.get_loophole_source();
                    $scope.get_page($scope.pageNow);
                    $scope.pop_show.add = false;
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
            },
            function () {}
        );
    };
    // 发布情报
    $scope.release = function (id) {
        // var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/seting/loophole-intelligence-publish",
            data: {
                id: id
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("发布成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page($scope.pageNow);
            },
            function () {}
        );
    }
    // 删除情报
    $scope.delete = function (id) {
        // var loading = zeroModal.loading(4);
        $http({
            method: "delete",
            url: "/seting/loophole-intelligence-del",
            data: {
                id: id
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.success("删除成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page($scope.pageNow);
            },
            function () {}
        );
    }
    // 打开编辑框
    $scope.edit_loop_box = function (item) {
        $scope.get_page_show = true;
        $scope.edit_item_data = item;
        $scope.get_lab_list();
    };
    $scope.edit_sure = function () {
        if ($scope.edit_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        if ($scope.edit_item.sourse == '请选择') {
            zeroModal.error('请选择情报来源')
            return false
        }
        var params_edit = {
            level: '',
            nvd: [],
            label_name: []
        }
        switch ($scope.edit_item.level) {
            case '高危':
                params_edit.level = '高'
                break;
            case '中危':
                params_edit.level = '中'
                break;
            case '低危':
                params_edit.level = '低'
                break;
            default:
                break;
        }
        angular.forEach($scope.edit_item.reference, function (item, index) {
            if (item.name != '') {
                $scope.edit_item.reference_information.push(item.name)
            }
        })
        angular.forEach($scope.edit_item.affected, function (item, index) {
            if (item.name != '') {
                $scope.edit_item.affected_products.push(item.name)
            }
        })
        angular.forEach($scope.edit_item.NVD, function (item, index) {
            if (item.name != '' && item.id) {
                params_edit.nvd.push({
                    cve: item.name,
                    id: item.id,
                });
            }
        })
        $scope.params_edit_cn = []
        $scope.params_edit_cn = $scope.arrayUnique2(params_edit.nvd, 'id')
        angular.forEach($scope.edit_item.tag, function (item, index) {
            if (item.name != '') {
                params_edit.label_name.push(item.name)
            }
        })
        $http({
            method: "put",
            url: "/seting/loophole-intelligence-edit",
            data: {
                id: $scope.edit_item.id,
                title: $scope.edit_item.title,
                level: params_edit.level,
                open_time: $scope.edit_item.first_seen_time,
                sourse: $scope.edit_item.sourse,
                affected_products: $scope.edit_item.affected_products,
                detail: $scope.edit_item.detail,
                treatment_measures: $scope.edit_item.treatment_measures,
                reference_information: $scope.edit_item.reference_information,
                nvd: $scope.params_edit_cn,
                label_name: params_edit.label_name,
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                console.log(data);
                if (data.data.status == 'success') {
                    zeroModal.success("修改成功");
                    $scope.pop_show.edit = false;
                    $scope.get_loophole_source();
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page($scope.pageNow);
            },
            function () {}
        );
    }
    // ---------------录入情报来源
    //获取焦点
    $scope.add_focus = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.add_level_list = true;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.category_ul = false;
                })
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = true;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.name_ul = false;
                })
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = true;
                    }
                })
                $scope.pop_show.add_tag_name = true;
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (key, value) {
                    if (value == index) {
                        key.nvd_ul = true;
                    } else {
                        key.nvd_ul = false;
                    }
                })
                break;
            case 'source':
                $scope.pop_show.add_source_list = true;
                break;
            default:
                break;
        }
    }
    // 失去焦点
    $scope.add_blur = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.add_level_list = false;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = false;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = false;
                    }
                })
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (key, value) {
                    key.nvd_ul = false;
                })
                break;
            case 'source':
                $scope.pop_show.add_source_list = false;
                break;
            default:
                break;
        }
    }
    // 选择列表
    $scope.choose_item = function (data, index, name) {
        switch (name) {
            case 'level':
                $scope.add_item.level = data;
                break;
            case 'source':
                $scope.add_item.sourse = data;
                break;
            case 'tag_category':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.category = data;
                        key.name = '';
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.add_item.tag[index].tag_name_list = key.label
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.add_item.tag, function (key, value) {
                    if (value == index) {
                        key.name = data.label_name;
                        key.id = data.id;
                    }
                })
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (key, value) {
                    if (value == index) {
                        key.name = data;
                    }
                })
                break;
            default:
                break;
        }

    }
    // 增加input框
    $scope.add_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                angular.forEach($scope.add_item.affected, function (item) {
                    item.icon = false;
                })
                $scope.add_item.affected.push({
                    name: '',
                    icon: true
                })
                break;
            case 'reference':
                angular.forEach($scope.add_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.add_item.reference.push({
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.add_item.NVD.push({
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                angular.forEach($scope.add_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.add_item.tag.push({
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true
                })
                break;
            default:
                break;
        }
    }
    // 删除input框
    $scope.delete_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                $scope.add_item.affected.splice(index, 1);
                break;
            case 'reference':
                $scope.add_item.reference.splice(index, 1);
                break;
            case 'NVD':
                $scope.add_item.NVD.splice(index, 1);
                break;
            case 'tag':
                $scope.add_item.tag.splice(index, 1);
                break;
            default:
                break;
        }
    }
    // 触发情报来源输入改变
    $scope.add_source_change = function (item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_loophole_source(item);
    }
    // 按上下按键选择
    $scope.add_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $('#input_source_add').blur();
            $scope.pop_show.add_source_list = false;
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            $scope.add_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            $scope.add_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById('loop_source_add').scrollTop = scrollTop;
    }

    //--------------- 编辑情报
    //获取焦点
    $scope.edit_focus = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.edit_level_list = true;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.category_ul = false;
                })
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = true;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.name_ul = false;
                })
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = true;
                    }
                })
                $scope.pop_show.edit_tag_name = true;
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (key, value) {
                    if (value == index) {
                        key.nvd_ul = true;
                    } else {
                        key.nvd_ul = false;
                    }
                })
                break;
            case 'source':
                $scope.pop_show.edit_source_list = true;
                break;

            default:
                break;
        }
    }
    // 失去焦点
    $scope.edit_blur = function (name, index) {
        switch (name) {
            case 'level':
                $scope.pop_show.edit_level_list = false;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category_ul = false;
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name_ul = false;
                    }
                })
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (key, value) {
                    key.nvd_ul = false;
                })
                break;
            case 'source':
                $scope.pop_show.edit_source_list = false;
                break;
            default:
                break;
        }

    }
    // 选择列表
    $scope.choose_item_edit = function (data, index, name) {
        switch (name) {
            case 'level':
                $scope.edit_item.level = data;
                break;
            case 'source':
                $scope.edit_item.sourse = data;
                break;
            case 'tag_category':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.category = data;
                        key.name = '';
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.edit_item.tag[index].tag_name_list = key.label
                    }
                })
                break;
            case 'tag_name':
                angular.forEach($scope.edit_item.tag, function (key, value) {
                    if (value == index) {
                        key.name = data.label_name;
                        key.id = data.id;
                    }
                })
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (key, value) {
                    if (value == index) {
                        key.name = data;
                    }
                })
                break;
            default:
                break;
        }
    }
    // 增加input框
    $scope.edit_add_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                angular.forEach($scope.edit_item.affected, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.affected.push({
                    name: '',
                    icon: true
                })
                break;
            case 'reference':
                angular.forEach($scope.edit_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.reference.push({
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.NVD.push({
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.tag.push({
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true
                })
                break;
            default:
                break;
        }
    }
    // 删除input框
    $scope.edit_delete_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                $scope.edit_item.affected.splice(index, 1);
                break;
            case 'reference':
                $scope.edit_item.reference.splice(index, 1);
                break;
            case 'NVD':
                $scope.edit_item.NVD.splice(index, 1);
                break;
            case 'tag':
                $scope.edit_item.tag.splice(index, 1);
                break;
            default:
                break;
        }
    }
    // 触发情报来源输入改变
    $scope.edit_source_change = function (item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_loophole_source(item);
    }
    // 按上下按键选择
    $scope.edit_source_mykey = function (e) {
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $('#input_source_edit').blur();
            $scope.pop_show.edit_source_list = false;
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.loop_source_add.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.loop_source_add.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            $scope.edit_item.sourse = $scope.loop_source_add[$scope.tag_key_add.active_index].name;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById('loop_source_edit').scrollTop = scrollTop;
    }

    // 获取标签列表
    $scope.get_lab_list = function () {
        // var loading = zeroModal.loading(4);
        $http({
            method: "get",
            url: "/site/label-list",
        }).then(function (resp) {
                // zeroModal.close(loading);
                if (resp.status == 200) {
                    let result = JSON.parse(resp.data);
                    let labelAttr = [];
                    angular.forEach(result, function (key, value) {
                        if (value == '' || value === null) {
                            value = '未分类标签';
                        } else {
                            value = value.substring(0, value.length - 10);
                        }
                        labelAttr.push({
                            name: value,
                            label: key,
                            label_attr_id: []
                        });
                    });
                    $scope.label_data = labelAttr;
                    console.log($scope.label_data);
                    if ($scope.get_page_show) {
                        $scope.get_page($scope.pageNow);
                    }
                }

            },
            function () {}
        );
    }

    //展开、收起按钮切换事件
    $scope.tog_count_change = function (e) {
        e.preventDefault();
        let length = $scope.label_data.length;
        if (length <= 3) {
            $scope.toggleCount = length;
            $scope.toggleStatus = !$scope.toggleStatus;
        } else {
            let toggle = $scope.toggleCount += 3;
            let tog = Math.ceil(toggle / 3);
            let label = Math.ceil($scope.label_data.length / 3);
            $scope.toggleCount = tog > label ? 2 : toggle;
            $scope.toggleStatus = tog == label ? true : false;
        }
    }

    //标签列表事件高亮切换
    $scope.tog_change_status = function (e, item, it) {
        $(event.target).toggleClass('active');
        let isActive = $(event.target).hasClass('active');
        if (isActive) {
            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    //每个类别的id数组（后端需要）
                    value.label_attr_id.push(it.id);
                    //前端展示的列表数据
                    $scope.label_checked_list.push(it);
                }
            });
        } else {
            angular.forEach($scope.label_data, function (value, key) {
                if (value.name == item.name) {
                    for (let i = 0; i < value.label_attr_id.length; i++) {
                        if (value.label_attr_id[i] == it.id) {
                            value.label_attr_id.splice(i, 1);
                        }
                    }
                    for (let j = 0; j < $scope.label_checked_list.length; j++) {
                        if ($scope.label_checked_list[j].id == it.id) {
                            $scope.label_checked_list.splice(j, 1);
                        }
                    }
                }
            });
        }

        //向后端传递label_id的数组拼接
        var attr = [];
        angular.forEach($scope.label_data, function (value, key) {
            if (value.label_attr_id.length > 0) {
                attr.push(value.label_attr_id);
            }
        });
        //向后端传递的label_id（每个类别的id数组的组合）
        $scope.seach_data.label_id = attr;
        console.log($scope.seach_data.label_id);
    };

    // nvd 增加
    $scope.add_nvd_change = function (name) {
        $scope.get_nvd(name)
        $scope.tag_key_add.active_index = -1;
    }
    $scope.add_nvd_mykey = function (e, item, index) {
        $scope.id = 'nvd' + index
        $scope.input_id = 'input' + index
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $("#" + $scope.input_id).blur();
            angular.forEach($scope.add_item.NVD, function (key, value) {
                if (value == index) {
                    key.nvd_ul = false;
                }
            })
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.nvd_list.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            item.name = $scope.nvd_list[$scope.tag_key_add.active_index].cve;
            item.id = $scope.nvd_list[$scope.tag_key_add.active_index].id;
            console.log(1111);

        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.nvd_list.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            item.name = $scope.nvd_list[$scope.tag_key_add.active_index].cve;
            item.id = $scope.nvd_list[$scope.tag_key_add.active_index].id;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        $scope.id = 'nvd' + index
        document.getElementById($scope.id).scrollTop = scrollTop;
    }
    $scope.add_nvd_focus = function (index, item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_nvd(item.name)
        angular.forEach($scope.add_item.NVD, function (key, value) {
            if (value == index) {
                key.nvd_ul = true;
            } else {
                key.nvd_ul = false;
            }
        })
    }

    $scope.choose_nvd_item = function (item, index) {
        console.log(item);
        angular.forEach($scope.add_item.NVD, function (key, value) {
            if (value == index) {
                key.name = item.cve;
                key.nvd_ul = false;
                key.id = item.id;
            }
        })
    }

    // nvd 编辑
    $scope.edit_nvd_change = function (name) {
        $scope.get_nvd(name)
        $scope.tag_key_add.active_index = -1;
    }
    $scope.edit_nvd_mykey = function (e, item, index) {
        $scope.id = 'nvd_edit' + index
        $scope.input_id = 'input_edit' + index
        var keycode = window.event ? e.keyCode : e.which; //获取按键编码
        if (keycode == 13) {
            $("#" + $scope.input_id).blur();
            angular.forEach($scope.edit_item.NVD, function (key, value) {
                if (value == index) {
                    key.nvd_ul = false;
                }
            })
        } else if (keycode == 40) {
            //下键
            if ($scope.tag_key_add.active_index == ($scope.nvd_list.length - 1)) {
                $scope.tag_key_add.active_index = 0
            } else {
                $scope.tag_key_add.active_index++
            }
            item.name = $scope.nvd_list[$scope.tag_key_add.active_index].cve;
            item.id = $scope.nvd_list[$scope.tag_key_add.active_index].id;
            console.log(1111);

        } else if (keycode == 38) {
            //上键
            if ($scope.tag_key_add.active_index === 0 || $scope.tag_key_add.active_index === -1) {
                $scope.tag_key_add.active_index = $scope.nvd_list.length - 1;
            } else {
                $scope.tag_key_add.active_index--;
            }
            item.name = $scope.nvd_list[$scope.tag_key_add.active_index].cve;
            item.id = $scope.nvd_list[$scope.tag_key_add.active_index].id;
        }
        var scrollTop = 0;
        if ($scope.tag_key_add.listHeight < $scope.tag_key_add.listItemHeight *
            ($scope.tag_key_add.active_index + 1)) {
            scrollTop = $scope.tag_key_add.listItemHeight *
                ($scope.tag_key_add.active_index + 1) - $scope.tag_key_add.listHeight;
        }
        document.getElementById($scope.id).scrollTop = scrollTop;
    }
    $scope.edit_nvd_focus = function (index, item) {
        $scope.tag_key_add.active_index = -1;
        $scope.get_nvd(item.name)
        angular.forEach($scope.edit_item.NVD, function (key, value) {
            if (value == index) {
                key.nvd_ul = true;
            } else {
                key.nvd_ul = false;
            }
        })
    }

    $scope.choose_nvd_item_edit = function (item, index) {
        console.log(item);
        angular.forEach($scope.edit_item.NVD, function (key, value) {
            if (value == index) {
                key.name = item.cve;
                key.nvd_ul = false;
                key.id = item.id;
            }
        })
    }

    $scope.arrayUnique2 = function (arr, name) {
        var hash = {};
        return arr.reduce(function (item, next) {
            hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
            return item;
        }, []);
    }



    $scope.init();

});