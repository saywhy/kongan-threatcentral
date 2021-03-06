<?php
/* @var $this yii\web\View */

$this->title = '审计日志';
?>
<style>
    .tab-content {
        background: #fff;
    }

    .td_class {
        text-overflow: ellipsis;
        -moz-text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    td,
    th {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
    }

  .sun_select_box {
    display: inline-block;
    cursor: pointer;
    position: relative;
    margin-right: 16px;
  }

  .sun_select_input {
    width: 210px;
    height: 42px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    line-height: 42px;
    background: #fff;

  }

  .sun_select_ul {
    width: 210px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    top: 44px;
    left: 0;
    overflow: hidden;
  }

  .sun_select_icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  .sun_select_li {
    height: 26px;
    line-height: 26px;
    text-align: center;
    font-size: 12px;
  }

  .sun_active {
    background: #4155d0;
    color: #fff;
  }

  .sun_select_li:hover {
    background: #4155d0;
    color: #fff;
  }
</style>
<link rel="stylesheet" href="/css/set/log.css">
<section class="log_container" ng-app="myApp" ng-controller="logCtrl">
    <div class="log_box">
        <div class="log_box_top">
            <div class="log_input_box">
                <img src="/images/report/time.png" class="time_icon" alt="">
                <input type="text" class="log_input " readonly id="timerange">
                <input type="text" class="log_input" placeholder="用户名" ng-model="parmas_data.username">


   <div class="sun_select_box">
              <li class="sun_select_input" ng-click="focus_select()">{{select_name}}</li>
              <img src="/images/home/select_icon2.png" class="sun_select_icon" alt="">
              <ul class="sun_select_ul" ng-if="select_ul">
                <li ng-repeat='item in select_type' ng-class="item.type==select_name?'sun_active':''"
                  class="sun_select_li" ng-click="choose_item(item)">{{item.type}}
                </li>
              </ul>
            </div>
                <!-- <select class="log_input" ng-model="select_name"
                    ng-options="x.num as x.type for x in select_type"></select> -->
                <button class="top_btn" ng-click="get_page_list()">搜索</button>
            </div>
        </div>
        <div class="log_box_table">

            <table class="table  domain_table ng-cloak">
                <tr style="text-algin:center">
                    <th style="width:80px;">序号</th>
                    <th style="width:200px;">时间</th>
                    <th style="width:200px;">用户名</th>
                    <th style="width:200px;">用户角色</th>
                    <th>描述</th>
                    <th style="width:200px;">主机地址</th>
                </tr>
                <tr ng-repeat="item in page_list.data">
                    <td ng-bind="$index + 1 + (page_list.pageNow-1)*10">1</td>
                    <td title="{{item.created_at*1000 | date:'yyyy-MM-dd HH:mm:ss'}}">
                        {{item.created_at*1000 | date:'yyyy-MM-dd HH:mm'}}</td>
                    <td title="{{item.username}}">{{item.username}}</td>
                    <td title="{{item.role}}">{{item.role}}</td>
                    <td title="{{item.info}}">{{item.info}}</td>
                    <td title="{{item.userip}}">{{item.userip}}</td>
                </tr>
            </table>
            <!-- angularjs分页 -->
            <div style="padding: 25px;">
                <span style="font-size: 12px;color: #BBBBBB;">共有
                    <span ng-bind="page_list.count"></span>条</span>
                <!-- angularjs分页 -->
                <ul class="pagination pagination-sm no-margin pull-right ng-cloak">
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow-1)"
                            ng-if="page_list.pageNow>1">上一页</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(1)" ng-if="page_list.pageNow>1">1</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-if="page_list.pageNow>4">...</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow-2)"
                            ng-bind="page_list.pageNow-2" ng-if="page_list.pageNow>3"></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow-1)"
                            ng-bind="page_list.pageNow-1" ng-if="page_list.pageNow>2"></a>
                    </li>
                    <li class="active">
                        <a href="javascript:void(0);" ng-bind="page_list.pageNow"></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow+1)"
                            ng-bind="page_list.pageNow+1" ng-if="page_list.pageNow<page_list.maxPage-1"></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow+2)"
                            ng-bind="page_list.pageNow+2" ng-if="page_list.pageNow<page_list.maxPage-2"></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-if="page_list.pageNow<page_list.maxPage-3">...</a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.maxPage)"
                            ng-bind="page_list.maxPage" ng-if="page_list.pageNow<page_list.maxPage"></a>
                    </li>
                    <li>
                        <a href="javascript:void(0);" ng-click="get_page_list(page_list.pageNow+1)"
                            ng-if="page_list.pageNow<page_list.maxPage">下一页</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

</section>
<script src="/js/controllers/LogList.js"></script>
