var myApp = angular.module("myApp", ['ngSanitize']);
myApp.controller("loopholeIntelCtrl", function ($scope, $http) {
    $scope.init = function () {
        $scope.add_cve_flag = false;
        $scope.edit_cve_flag = false;

        $scope.searchTime = {
            startDate: '',
            // startDate: moment().subtract(90, "days"),
            // endDate: moment(),
            endDate: ''
        };
        $scope.org_num = 0;

        $scope.edit_item = {
            old_name: '',
            old_id: ''
        };
        $scope.seach_data = {
            source: '',
            stauts: '',
            label_id: [],
            key_word: '',
            level: '全部',
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
                num: '全部',
                status: '全部'
            },
            {
                num: '',
                status: '暂缺'
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
        $scope.page_num = 1;
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
        $scope.add_item.first_seen_time = ''
        // $('#start_time_picker').val('');
        $("#start_time_picker").daterangepicker({
                locale: {
                    "format": 'YYYY-MM-DD',
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    // "customRangeLabel": "自定义",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                // ranges: {
                //     '今日': [moment()],
                // },
                singleDatePicker: true,
                showDropdowns: true,
                "timePicker": false,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
                autoApply: true
            },
            function (start, end, label) {
                $scope.add_item.first_seen_time = start.unix()
            },
        )
        if ($scope.add_item.first_seen_time == '') {
            $('#start_time_picker').val('');
            $('#start_time_picker').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY/MM/DD'));
                $scope.add_item.first_seen_time = picker.startDate.unix()
            });
            $('#start_time_picker').on('cancel.daterangepicker', function (ev, picker) {
                $scope.add_item.first_seen_time = ''
                $('#start_time_picker').val('');
            });
        }
    };
    $scope.picker_search = function () {
        $("#picker_search").daterangepicker({
                autoUpdateInput: false,
                'locale': {
                    "format": 'YYYY-MM-DD',
                    "separator": " - ",
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "fromLabel": "起始时间",
                    "toLabel": "结束时间'",
                    "customRangeLabel": "自定义",
                    "weekLabel": "W",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                ranges: {
                    '最近7天': [moment().subtract(6, 'days'), moment()],
                    '最近30天': [moment().subtract(29, 'days'), moment()],
                    '今年': [moment().startOf('year'), moment()],
                    '去年': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year')
                        .endOf('year')
                    ],
                },
                showDropdowns: true,
                "alwaysShowCalendars": true,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
                autoUpdateInput: false,
            },
            function (start, end, label) {
                $scope.seach_data.startDate = start.unix();
                $scope.seach_data.endDate = end.unix();
                console.log($scope.seach_data.startDate);
                console.log($scope.seach_data.endDate);
            },
        )
        $('#picker_search').on('apply.daterangepicker', function (ev, picker) {
            $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
            $scope.seach_data.startDate = picker.startDate.unix()
            $scope.seach_data.endDate = picker.endDate.unix()
        });
        $('#picker_search').on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('');
            $scope.seach_data.startDate = ''
            $scope.seach_data.endDate = ''
        });
    };

    $scope.picker_edit = function (startDate) {
        $("#picker_edit").daterangepicker({
                locale: {
                    "format": 'YYYY-MM-DD',
                    "applyLabel": "确定",
                    "cancelLabel": "清空",
                    "weekLabel": "W",
                    // "customRangeLabel": "自定义",
                    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                    "firstDay": 1
                },
                // ranges: {
                //     '今日': [moment()],
                // },
                singleDatePicker: true,
                showDropdowns: true,
                "timePicker": false,
                timePickerSeconds: false,
                drops: "down",
                opens: "right",
            },
            function (start, end, label) {
                $scope.edit_item.first_seen_time = start.unix()
            },
        )
        if (startDate == '0') {
            $scope.edit_item.first_seen_time = ''
            $('#picker_edit').val('');
            $('#picker_edit').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD'));
                $scope.edit_item.first_seen_time = picker.startDate.unix()
            });
            $('#picker_edit').on('cancel.daterangepicker', function (ev, picker) {
                $scope.edit_item.first_seen_time = ''
                $('#picker_edit').val('');
            });
        } else {
            //  console.log($scope.edit_item.first_seen_time);
            $('#picker_edit').data('daterangepicker').setStartDate(moment(new Date($scope.edit_item.first_seen_time * 1000)).format('YYYY-MM-DD'));
            $('#picker_edit').data('daterangepicker').setEndDate(moment(new Date($scope.edit_item.first_seen_time * 1000)).format('YYYY-MM-DD'));
            $('#picker_edit').on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('YYYY-MM-DD'));
                $scope.edit_item.first_seen_time = picker.startDate.unix()
            });
        }
    };
    $scope.picker_edit_cancel = function () {
        $scope.edit_item.first_seen_time = ''
        $('#picker_edit').val('');
    }
    $scope.picker_add_cancel = function () {
        $scope.add_item.first_seen_time = ''
        $('#start_time_picker').val('');
    }
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
                        name: $scope.escape2Html(item.sourse),
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
    $scope.get_nvd = function (cve) {
        $http({
            method: "get",
            url: "/site/cve-list",
            params: {
                cve: cve
            }
        }).then(
            function (data) {
                $scope.nvd_list = data.data;
            },
            function () {}
        );
    }
    $scope.escape2Html = function (str) {
        var arrEntities = {
            'lt': '<',
            'gt': '>',
            'nbsp': ' ',
            'amp': '&',
            'quot': '"'
        };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
            return arrEntities[t];
        });
    }
    // 获取列表
    $scope.get_page = function (pageNow) {
        if (pageNow < 1) {
            pageNow = 1;
            $scope.page_num = 1;
        }

        if ($scope.pages && pageNow > $scope.pages.maxPage) {
            pageNow = 1;
            $scope.page_num = 1;
        }
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

        let params_data_level = 'all';
        if ($scope.params_data.level == '全部') {
            params_data_level = 'all';
        } else if ($scope.params_data.level == '暂缺') {
            params_data_level = '';
        } else {
            params_data_level = $scope.params_data.level;
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
                level: params_data_level,
                label_id: JSON.stringify($scope.params_data.label_id),
                page: pageNow,
                rows: 10,
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                $scope.pages = data.data;
                console.log($scope.pages);
                $scope.pages.pageNow = $scope.pages.pageNow * 1
                $scope.pages.maxPage = $scope.pages.maxPage * 1
                angular.forEach($scope.pages.data, function (item) {
                    console.log(item.title);

                    item.title = $scope.escape2Html(item.title)
                    if (item.label_name.length != 0) {
                        item.label_title = item.label_name.join(',')
                        item.label_title = $scope.escape2Html(item.label_title)
                    }
                    item.sourse = $scope.escape2Html(item.sourse)
                    item.detail = $scope.escape2Html(item.detail)
                    item.treatment_measures = $scope.escape2Html(item.treatment_measures)
                    angular.forEach(item.affected_products, function (key, index) {
                        item.affected_products[index] = $scope.escape2Html(key)
                    })
                    angular.forEach(item.reference_information, function (key, index) {
                        item.reference_information[index] = $scope.escape2Html(key)
                    })
                    angular.forEach(item.label_name, function (key, index) {
                        item.label_name[index] = $scope.escape2Html(key)
                    })

                })
                if ($scope.get_page_show) {
                    angular.forEach($scope.pages.data, function (item) {
                        if (item.id == $scope.edit_item_data.id) {
                            $scope.edit_item_data = item;
                        }
                    })
                    $scope.enter_show = false;
                    var item_str = JSON.stringify($scope.edit_item_data);
                    $scope.edit_item_str = JSON.parse(item_str);
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
                                id: item,
                                label_id_attr: [item]
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
                        angular.forEach($scope.label_data, function (item) {
                            var obj = {
                                category: item.name,
                                name: '',
                                tag_name_list: item.label,
                                category_ul: false,
                                name_ul: false,
                                icon: true,
                                id: '0',
                                label_id_attr: []
                            }
                            $scope.edit_item.tag.push(obj)
                        })
                    }
                    if ($scope.edit_item_str.nvd && $scope.edit_item_str.nvd.length != 0) {
                        angular.forEach($scope.edit_item_str.nvd, function (item, index) {
                            if (item.cve) {
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
                            }

                        })

                    } else {
                        $scope.edit_item.NVD.push({
                            name: '',
                            id: 0,
                            nvd_ul: false,
                            icon: true
                        })
                    }
                    $scope.picker_edit(moment(new Date($scope.edit_item_str.open_time * 1000)));
                    $scope.pop_show.edit = true;
                    $scope.get_page_show = false;

                    $scope.init_edit_complete();
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
            tag: [],
            label_category: [],
            first_seen_time: '',
            sourse: '',
            detail: '',
            treatment_measures: '',
            exist: [],
            label_id: []
        }
        angular.forEach($scope.label_data, function (item) {
            var obj = {
                category: item.name,
                name: '',
                tag_name_list: item.label,
                category_ul: false,
                name_ul: false,
                icon: true,
                id: '',
                label_id_attr: []
            }
            $scope.add_item.tag.push(obj)

        })
        $scope.start_time_picker();

        $scope.init_auto_complete();

    };

    $scope.my_add_num = 0;
    $scope.my_edit_num = 0;

    //auto-complete初始化(新增)
    $scope.init_auto_complete = function () {

        setTimeout(function () {

            if ($scope.my_add_num > 0) {

                $('.label_auto_complate').each(function (index, elem) {
                    let instance = $('#label_auto_complate_' + index).autocomplete('instance');
                    if (instance) {
                        $('#label_auto_complate_' + index).unbind('focus').unbind('blur').autocomplete('destroy');
                    }
                });

            }
            $scope.my_add_num++;

            let flag_add = false;

            $('.label_auto_complate').each(function (index, elem) {

                $scope.add_item.tag.filter((items) => {
                    return Object.assign(items, {
                        change_name: items.name,
                        change_attr_id: items.label_id_attr
                    })
                })

                let datas = $scope.add_item.tag[index].tag_name_list;

                datas = datas.filter(function (item) {
                    return item.id != null;
                });

                let new_label = datas.map(data => {
                    return {
                        ...data,
                        label: data.label_name,
                        value: data.label_name
                    }
                });

                $('#label_auto_complate_' + index).autocomplete({
                    appendTo: '.tag_item_' + index,
                    source: new_label,
                    delay: 100,
                    max: 10,
                    autoFocus: false,
                    minLength: 0,
                    autoFill: true,
                    select: function (event, ui) {
                        $scope.add_item.tag[index].label_id_attr.push(ui.item.id);
                        $scope.add_item.tag[index].name = ui.item.label;

                        $scope.add_item.tag[index].change_name = ui.item.label;
                        $scope.add_item.tag[index].change_attr_id = [ui.item.id];

                        flag_add = true;

                        $(this).blur();
                    },
                    /*change: function (event, ui) {
                        let length = $scope.add_item.tag[index].label_id_attr.length;
                        if (length == 0) {
                            $(this).val('');
                            zeroModal.error('您未选中触发的标签名称列表，请选择！');
                            return false;
                        }
                    },
                    search: function (event, ui) {
                        $scope.add_item.tag[index].label_id_attr = [];
                        $scope.add_item.tag[index].name = '';
                    },*/
                }).focus(function () {

                    console.log('我是触发')
                    $scope.add_item.old_name = $scope.add_item.tag[index].name;
                    $scope.add_item.old_id = $scope.add_item.tag[index].label_id_attr;
                    flag_add = false;
                    $(this).autocomplete("search", '');
                    return false;


                }).blur(function () {
                    var myInput = document.getElementById("label_auto_complate_" + index);
                    if (myInput == document.activeElement) {
                        console.log('11112222');
                    } else {
                        if (!flag_add) {
                            if (!$scope.add_item.tag[index].name == '') {
                                zeroModal.error('您未选中触发的标签名称列表，请选择！');
                                $(this).val($scope.add_item.tag[index].change_name);
                                $scope.add_item.tag[index].name = $scope.add_item.tag[index].change_name;
                                $scope.add_item.tag[index].label_id_attr = $scope.add_item.tag[index].change_attr_id;
                            } else {
                                $(this).val('');
                                $scope.add_item.tag[index].name = '';
                                $scope.add_item.tag[index].label_id_attr = [];
                            }
                            flag_add = false;
                            return false;
                        }
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $("<li>" + item.label + "</li>").appendTo(ul);
                };
                let that = this;
                $('#label_auto_complate_' + index + '+.select_down_icon').click(function () {
                    $(that).focus();
                })
            })
        }, 200)
    };
    //auto-complete初始化(编辑)
    $scope.init_edit_complete = function () {

        setTimeout(function () {

            if ($scope.my_edit_num > 0) {

                $('.label_edit_complate').each(function (index, elem) {
                    let instance = $('#edit_auto_complate_' + index).autocomplete('instance');
                    if (instance) {
                        $('#edit_auto_complate_' + index).unbind('focus').unbind('blur').autocomplete('destroy');
                    }
                });

            }
            $scope.my_edit_num++;

            let flag_edit = false;

            $('.label_edit_complate').each(function (index, elem) {

                $scope.edit_item.tag.filter((items) => {
                    return Object.assign(items, {
                        change_name: items.name,
                        change_attr_id: items.label_id_attr
                    })
                })
                let datas = $scope.edit_item.tag[index].tag_name_list;

                datas = datas.filter(function (item) {
                    return item.id != null;
                });

                let new_label = datas.map(data => {
                    return {
                        ...data,
                        label: data.label_name,
                        value: data.label_name
                    }
                });

                $('#edit_auto_complate_' + index).autocomplete({
                    appendTo: '.edit_item_' + index,
                    source: new_label,
                    delay: 100,
                    max: 10,
                    minLength: 0,
                    autoFill: true,
                    select: function (event, ui) {
                        //console.log('111')
                        $scope.edit_item.tag[index].label_id_attr.push(ui.item.id);
                        $scope.edit_item.tag[index].name = ui.item.label;

                        $scope.edit_item.tag[index].change_name = ui.item.label;
                        $scope.edit_item.tag[index].change_attr_id = [ui.item.id];

                        flag_edit = true;

                        $(this).blur();
                    },
                    /*search: function (event, ui) {
                        $scope.edit_item.tag[index].label_id_attr = [];
                        $scope.edit_item.tag[index].name = '';
                    },*/
                }).focus(function () {
                    console.log('我是触发')
                    $scope.edit_item.old_name = $scope.edit_item.tag[index].name;
                    $scope.edit_item.old_id = $scope.edit_item.tag[index].label_id_attr;
                    flag_edit = false;
                    $(this).autocomplete("search", '');
                    return false;
                }).blur(function () {
                    var myInput = document.getElementById("edit_auto_complate_" + index);
                    if (myInput == document.activeElement) {
                        console.log('11112222');
                    } else {
                        if (!flag_edit) {
                            if (!$scope.edit_item.tag[index].name == '') {
                                zeroModal.error('您未选中触发的标签名称列表，请选择！');
                                $(this).val($scope.edit_item.tag[index].change_name);
                                $scope.edit_item.tag[index].name = $scope.edit_item.tag[index].change_name;
                                $scope.edit_item.tag[index].label_id_attr = $scope.edit_item.tag[index].change_attr_id;
                            } else {
                                $(this).val('');
                                $scope.edit_item.tag[index].name = '';
                                $scope.edit_item.tag[index].label_id_attr = [];

                                /*$scope.edit_item.old_name = '';
                                $scope.edit_item.old_id = [];*/
                            }
                            flag_edit = false;
                            return false;
                        }
                    }
                }).data("ui-autocomplete")._renderItem = function (ul, item) {
                    return $("<li>" + item.label + "</li>").appendTo(ul);
                };


                let that = this;

                $('#edit_auto_complate_' + index + '+.select_down_icon').click(function () {
                    $(that).focus();
                })

            })

        }, 200)
    };

    //   取消弹窗
    $scope.add_cancel = function () {
        $('.pop_box_container').scrollTop(0)
        $scope.pop_show.add = false;
        $scope.enter_show = true;
    };
    //   取消编辑弹窗
    $scope.edit_cancel = function () {
        $('.pop_box_container').scrollTop(0)
        $scope.pop_show.edit = false;
        $scope.enter_show = true;
    };
    // 添加录入情报
    $scope.add_sure = function () {
        $scope.add_item.affected_products = [];
        $scope.add_item.reference_information = [];

        var params_edit = {
            label_id_attr: []
        }
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
        if ($scope.add_item.first_seen_time == '') {
            zeroModal.error('请输入公开日期')
            return false
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
        $scope.NVD_Array_cn = $scope.arrayUnique2(NVD_Array, 'id');

        angular.forEach($scope.add_item.tag, function (item, index) {
            if (item.label_id_attr.length > 0) {
                params_edit.label_id_attr = [...params_edit.label_id_attr, ...item.label_id_attr];
            }
        })

        console.log(params_edit.label_id_attr)

        params_edit.label_id_attr = Array.from(new Set(params_edit.label_id_attr));

        //console.log(params_edit.label_id_attr)

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
                label_id: params_edit.label_id_attr
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
            function () {
                console.log(data);
                zeroModal.close(loading);
            }
        );
    };
    // 发布情报
    $scope.release = function (id, num) {
        // var loading = zeroModal.loading(4);
        $http({
            method: "put",
            url: "/seting/loophole-intelligence-publish",
            data: {
                id: id,
                status: num
            }
        }).then(
            function (data) {
                // zeroModal.close(loading);
                if (data.data.status == 'success') {
                    if (num == '1') {
                        zeroModal.success({
                            overlayClose: true,
                            content: '发布成功'
                        });
                    } else {
                        zeroModal.success({
                            overlayClose: true,
                            content: '撤回成功'
                        });
                    }
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
        var W = 552;
        var H = 185;
        var box = null;
        box = zeroModal.confirm({
            content: '删除情报',
            width: W + "px",
            height: H + "px",
            ok: false,
            cancel: false,
            okFn: function () {

            },
        });
    }

    // 删除情报
    $scope.delete = function (id) {
        $scope.id_del = id
        var W = 552;
        var H = 248;
        zeroModal.show({
            title: "是否删除情报",
            content: cate_delete_2,
            width: W + "px",
            height: H + "px",
            unique: '123',
            ok: false,
            cancel: false,
            okFn: function () {},
            onCleanup: function () {
                cate_delete_box_2.appendChild(cate_delete_2);
            }
        });
    }
    $scope.cate_delete_ok = function () {
        var loading = zeroModal.loading(4);
        $http({
            method: "delete",
            url: "/seting/loophole-intelligence-del",
            data: {
                id: $scope.id_del
            }
        }).then(
            function (data) {
                zeroModal.close(loading);
                if (data.data.status == 'success') {
                    zeroModal.closeAll();
                    zeroModal.success("删除成功");
                } else {
                    zeroModal.error(data.data.errorMessage);
                }
                $scope.get_page($scope.pageNow);
            },
            function () {}
        );
    }
    //删除弹窗取消事件
    $scope.cate_delete_cancel = function () {
        zeroModal.closeAll();
    };

    // 打开编辑框
    $scope.edit_loop_box = function (item) {
        console.log(item)
        $scope.get_page_show = true;
        $scope.edit_item_data = item;
        $scope.get_lab_list();
    };
    $scope.edit_sure = function () {
        $scope.edit_item.affected_products = [];
        $scope.edit_item.reference_information = [];
        if ($scope.edit_item.title == '') {
            zeroModal.error('请输入标题')
            return false
        }
        if ($scope.edit_item.first_seen_time == 0 || $scope.edit_item.first_seen_time == '') {
            zeroModal.error('请输入公开时间')
            return false
        }
        if ($scope.edit_item.sourse == '请选择') {
            zeroModal.error('请选择情报来源')
            return false
        }
        var params_edit = {
            level: '',
            nvd: [],
            label_name: [],
            label_id_attr: []

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
                // $scope.edit_item.tag[index].label_id_attr.push(item.name);
            }
            if (item.label_id_attr.length > 0) {
                params_edit.label_id_attr = [...params_edit.label_id_attr, ...item.label_id_attr];
            }
        })
        console.log(params_edit.label_id_attr)
        params_edit.label_id_attr = Array.from(new Set(params_edit.label_id_attr));
        console.log(params_edit.label_id_attr)

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
                label_id: params_edit.label_id_attr,
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
            function () {
                console.log(data);
                zeroModal.close(loading);
            }
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
                $scope.index_add = index
                setTimeout(function () {
                    angular.forEach($scope.add_item.tag, function (key, value) {
                        if (value == $scope.index_add) {
                            key.category_ul = false;
                        }
                    })
                    $scope.$apply(); //需要手动刷新
                }, 200)

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
                if (!$scope.add_cve_flag &&
                    $scope.nvd_list.length > 0 &&
                    $scope.add_item.NVD[0].name != '') {
                    zeroModal.error('您未选中NVD关联信息，请选择！');
                    $scope.add_item.NVD[0].name = '';
                }
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
                        key.label_id_attr = []
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.add_item.tag[index].tag_name_list = key.label;
                        //console.log($scope.add_item.tag[index].tag_name_list)
                        $scope.init_auto_complete();
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
                $scope.add_item.affected.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'reference':
                angular.forEach($scope.add_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.add_item.reference.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.add_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.add_item.NVD.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                if ($scope.add_item.tag.length >= 500) {
                    zeroModal.error("标签最多可以添加500个");
                    return false
                }
                angular.forEach($scope.add_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.add_item.tag.splice((index + 1), 0, {
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true,
                    label_id_attr: []
                })

                $scope.init_auto_complete();
                break;
            default:
                break;
        }
    }
    // 删除input框
    $scope.delete_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                if ($scope.add_item.affected.length == 1) {
                    $scope.add_item.affected[0].name = ''
                    return false
                } else if ($scope.add_item.affected[index].name != '') {
                    $scope.add_item.affected[index].name = '';
                } else {
                    $scope.add_item.affected.splice(index, 1);
                }
                break;
            case 'reference':
                if ($scope.add_item.reference.length == 1) {
                    $scope.add_item.reference[0].name = ''
                    return false
                } else if ($scope.add_item.reference[index].name != '') {
                    $scope.add_item.reference[index].name = '';
                } else {
                    $scope.add_item.reference.splice(index, 1);
                }
                break;
            case 'NVD':
                if ($scope.add_item.NVD.length == 1) {
                    $scope.add_item.NVD[0].name = ''
                    return false
                } else if ($scope.add_item.NVD[index].name != '') {
                    $scope.add_item.NVD[index].name = '';
                } else {
                    $scope.add_item.NVD.splice(index, 1);
                }
                break;
            case 'tag':
                if ($scope.add_item.tag.length == 1) {
                    $scope.add_item.tag[0].name = ''
                    return false
                } else if ($scope.add_item.tag[index].name != '') {
                    $scope.add_item.tag[index].name = '';
                    $scope.add_item.tag[index].label_id_attr = [];
                } else {
                    $scope.add_item.tag.splice(index, 1);
                    $scope.init_auto_complete();
                }
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
                $scope.index_edit = index
                setTimeout(function () {
                    angular.forEach($scope.edit_item.tag, function (key, value) {
                        if (value == $scope.index_edit) {
                            key.category_ul = false;
                        }
                    })
                    $scope.$apply(); //需要手动刷新
                }, 200)
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
                if (!$scope.edit_cve_flag &&
                    $scope.nvd_list.length > 0 &&
                    $scope.edit_item.NVD[0].name != '') {
                    zeroModal.error('您未选中NVD关联信息，请选择！');
                    $scope.edit_item.NVD[0].name = '';
                }
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
                        key.label_id_attr = [];
                    }
                })
                // 联动改变
                angular.forEach($scope.label_data, function (key, value) {
                    if (key.name == data) {
                        $scope.edit_item.tag[index].tag_name_list = key.label
                        $scope.init_edit_complete();
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
                $scope.edit_item.affected.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'reference':
                angular.forEach($scope.edit_item.reference, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.reference.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'NVD':
                angular.forEach($scope.edit_item.NVD, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.NVD.splice((index + 1), 0, {
                    name: '',
                    icon: true
                })
                break;
            case 'tag':
                if ($scope.edit_item.tag.length >= 500) {
                    zeroModal.error("标签最多可以添加500个");
                    return false
                }
                angular.forEach($scope.edit_item.tag, function (item) {
                    item.icon = false;
                })
                $scope.edit_item.tag.splice((index + 1), 0, {
                    category: '',
                    name: '',
                    tag_name_list: [],
                    category_ul: false,
                    name_ul: false,
                    icon: true,
                    label_id_attr: []
                })
                $scope.init_edit_complete();
                break;
            default:
                break;
        }
    }
    // 删除input框
    $scope.edit_delete_input_list = function (name, index) {
        switch (name) {
            case 'affected':
                if ($scope.edit_item.affected.length == 1) {
                    $scope.edit_item.affected[0].name = ''
                    return false
                } else if ($scope.edit_item.affected[index].name != '') {
                    $scope.edit_item.affected[index].name = '';
                } else {
                    $scope.edit_item.affected.splice(index, 1);
                }
                break;
            case 'reference':
                if ($scope.edit_item.reference.length == 1) {
                    $scope.edit_item.reference[0].name = ''
                    return false
                } else if ($scope.edit_item.reference[index].name != '') {
                    $scope.edit_item.reference[index].name = '';
                } else {
                    $scope.edit_item.reference.splice(index, 1);
                }
                break;
            case 'NVD':
                if ($scope.edit_item.NVD.length == 1) {
                    $scope.edit_item.NVD[0].name = ''
                    return false
                } else if ($scope.edit_item.NVD[index].name != '') {
                    $scope.edit_item.NVD[index].name = '';
                } else {
                    $scope.edit_item.NVD.splice(index, 1);
                }
                break;
            case 'tag':
                if ($scope.edit_item.tag.length == 1) {
                    $scope.edit_item.tag[0].name = ''
                    return false
                } else if ($scope.edit_item.tag[index].name != '') {
                    $scope.edit_item.tag[index].name = '';
                    $scope.edit_item.tag[index].label_id_attr = [];
                } else {
                    $scope.edit_item.tag.splice(index, 1);
                    $scope.init_edit_complete();
                }
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
                    angular.forEach($scope.label_data, function (item) {
                        item.name = $scope.escape2Html(item.name)
                        angular.forEach(item.label, function (key) {
                            if (key.label_name) {
                                key.label_name = $scope.escape2Html(key.label_name)
                            }
                            if (key.category_name) {
                                key.category_name = $scope.escape2Html(key.category_name)
                            }
                            if (key.detail) {
                                key.detail = $scope.escape2Html(key.detail)
                            }
                        });
                    });
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

        this.get_page();
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
        $scope.add_cve_flag = false;
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
                $scope.add_cve_flag = true;
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
        $scope.edit_cve_flag = false;
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
                $scope.edit_cve_flag = true;
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