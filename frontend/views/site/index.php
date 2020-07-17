<?php
/* @var $this yii\web\View */

$this->title = '概览';
?>
<style type="text/css">
  p {
    margin: 0;
    padding: 0
  }

  ul,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .box-body {
    overflow-x: hidden;
    height: 100%;
    background: #F8F8F8;
  }

  .box {
    height: 310px;
  }

  .chart-box {
    height: 250px;
  }

  td,
  th {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }

  /* 弹窗 */

  .pop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 46, 46, .5);
    border-radius: 10px;
    z-index: 66;
  }

  .pop-content {
    padding: 10px;
    position: absolute;
    width: 800px;
    background-color: #fff;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 666;
  }

  .pop-content-head {
    font-size: 20px;
    font-weight: 700;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }

  /* iot pop */

  .iot_pop {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(48, 46, 46, .5);
    border-radius: 10px;
    z-index: 700;
  }

  .iot_pop_content {
    padding: 10px;
    position: absolute;
    width: 800px;
    background-color: #fff;
    border-radius: 10px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

  .iot_pop_content_head {
    font-size: 20px;
    font-weight: 700;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }

  .closed {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  #iot_detail_top,
  #iot_detail_bom {
    width: 100%;
    height: 200px;
  }

  table {
    table-layout: fixed;
  }

  .borderleft {
    margin: 10px 10px 0px 20px;
    height: 70px;
    padding-left: 10px;
  }

  .title_num {
    height: 100px;
  }

  .title_li {
    margin: 0;
    height: 100px;
    padding: 0 8px;
  }

  .title_mid {
    font-size: 25px;
    padding: 0;
    height: 36px;
  }

  .title_top {
    font-size: 14px;
    padding: 0;
    height: 30px;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
  }

  .title_bom {
    font-size: 14px;
    text-align: center;
    padding: 0;
  }

  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.05em;
    fill: currentColor;
    overflow: hidden;
  }

  .svg {
    float: right;
  }

  #threaten,
  #threat_categories,
  #risk_indicator {
    padding: 10px;
    width: 100%;
    height: 340px;
  }

  .red {
    color: red;
  }

  .green {
    color: #54FB5D;
  }

  .threat_real {
    height: 214px;
    padding: 14px;
  }

  .threat_real_span {
    float: left;
    padding: 0 3px;
    border: 1px solid #666;
    border-radius: 4px;
    margin-right: 2px;
    margin-bottom: 12px;

  }

  .margin0 {
    margin: 0;
  }

  .title_content {
    background: #fff;
    border-radius: 4px;
    height: 100%;
    width: 100%;
    padding: 15px;
  }

  .padding_left0 {
    padding-left: 0;
  }

  .padding_right0 {
    padding-right: 0;
  }

  .float_left {
    float: left
  }

  .float_right {
    float: right
  }

  .green_color {
    font-size: 28px;
    color: #7ACE4C;
    line-height: 32px;
  }

  .blue_color {
    font-size: 28px;
    color: #0E79FF;
    line-height: 32px;
  }

  .lingt_color {
    font-size: 28px;
    color: #12DCFF;
    line-height: 32px;
  }

  .img_style {
    margin-top: 5px;
  }

  .float_left {
    float: left;
  }

  .float_right {
    float: right;
  }

  .box_content {
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    height: 400px;
  }

  .box_title_text {
    font-size: 14px;
    color: #333;
    font-weight: bold
  }

  .box_title_text_left {
    flex: 1;
    text-align: left;
  }

  .box_title_text_right {
    flex: 1;
    text-align: right;
  }

  .title_box {
    height: 30px;
    display: flex;

  }

  .box_padding_right {
    padding: 0;
    padding-right: 8px;
  }

  .box_padding_left {
    padding: 0;
    padding-left: 8px;
  }

  .box_padding_right_left {
    padding: 0 8px;
  }

  .height_color {
    display: inline-block;
    background: #FF5F5C;
    /* margin-left: 10px; */
    width: 16px;
    border-radius: 2px;
    height: 10px;
  }

  .mid_color {
    display: inline-block;
    background: #FEAA00;
    width: 16px;
    margin-left: 15px;
    border-radius: 2px;
    height: 10px;
  }

  .low_color {
    display: inline-block;
    background: #12DCFF;
    width: 16px;
    margin-left: 15px;
    border-radius: 2px;
    height: 10px;
  }

  .text_title_frist {
    font-size: 12px;
    color: #333;
  }

  table {
    background-color: #fff
  }

  table tr:nth-child(even) {
    background-color: #fff
  }

  .table-striped>tbody>tr:nth-of-type(odd) {
    background-color: #EEF6FF
  }

  .progress {
    background-color: transparent;
  }

  .loophole_box {
    height: 72px;
  }

  .loophole_p {
    padding-left: 6px;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #333;
    background: #4155d0;
    border-radius: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .loop_hight {
    border-left: 3px solid #FF5F5C;

  }

  .loop_mid {
    border-left: 3px solid #FEAA00;
  }

  .loop_low {
    border-left: 3px solid #7ACE4C;
  }

  .loophole_li {
    border-radius: 4px;
    padding: 16px 18px;
    height: 52px;
    display: inline-block;
    margin: 0 8px 8px 0;
    color: #fff;
  }

  select:focus,
  input:focus {
    outline: none;
    outline-offset: 0px;
    border: 1px solid #D1D1D1;
  }

  .slect_input {
    border: 1px solid #D1D1D1;
    border-radius: 5px;
    height: 42px;
    width: 120px;
    float: right
  }

  .item_common {
    border-radius: 2px;
    float: left;
    height: 100%;
    margin-left: -2px;
  }

  .item_high {
    background-color: #FF5F5C
  }

  .item_mid {
    background-color: #FEAA00;
  }

  .item_low {
    background-color: #7ACE4C
  }


  .sun_select_box {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer
  }

  .sun_select_input {
    width: 120px;
    height: 36px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    line-height: 36px;
    background: #fff;

  }

  .sun_select_ul {
    width: 120px;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    background: #fff;
    position: absolute;
    top: 38px;
    left: 0;
    overflow:hidden;
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

<!-- Main content -->
<section class="content" style="padding:24px 48px;" ng-app="myApp" ng-controller="indexCtrl" ng-cloak>
  <div class="row margin0 title_num" style="margin-bottom: 24px;">
    <div class="col-md-12 title_main" style="padding:0">
      <div class="title_li col-md-2 padding_left0" style="">
        <div class="title_content">
          <p class="title_top">
            总情报数
          </p>
          <p class="title_mid ">
            <img src="/images/home/1_title.png" alt="" class="float_left img_style">
            <span class="float_right green_color" ng-bind="site_top_data.total_intelligence"></span>
          </p>
        </div>
      </div>
      <div class="title_li col-md-2 padding8" style=" ">
        <div class="title_content">
          <p class="title_top">
            漏洞情报数
          </p>
          <p class="title_mid">
            <img src="/images/home/1_title.png" alt="" class="float_left img_style">
            <span class="float_right green_color"> {{site_top_data.total_loophole}}</span>
          </p>
        </div>
      </div>
      <div class="title_li col-md-2 padding8">
        <div class="title_content">
          <p class="title_top">
            暗网情报数
          </p>
          <p class="title_mid">
            <img src="/images/home/3_title.png" alt="" class="float_left img_style">
            <span class="float_right blue_color"> {{site_top_data.darknet_intelligence_count}}</span>
          </p>
        </div>
      </div>
      <div class="title_li col-md-2 padding8">
        <div class="title_content">
          <p class="title_top">
            APT武器库
          </p>
          <p class="title_mid">
            <img src="/images/home/3_title.png" alt="" class="float_left img_style">
            <span class="float_right blue_color"> {{site_top_data.apt_count}}</span>
          </p>
        </div>
      </div>
      <div class="title_li col-md-2">
        <div class="title_content">
          <p class="title_top">
            总预警数
          </p>
          <p class="title_mid">
            <img src="/images/home/2_title.png" alt="" class="float_left img_style">
            <span class="float_right lingt_color"> {{site_top_data.total_alert}}</span>
          </p>
        </div>
      </div>
      <div class="title_li col-md-2 padding_right0">
        <div class="title_content">
          <p class="title_top">
            7天内新预警数
          </p>
          <p class="title_mid">
            <img src="/images/home/2_title.png" alt="" class="float_left img_style">
            <span class="float_right lingt_color">{{site_top_data.last_7day_alert}}</span>
          </p>

        </div>
      </div>
    </div>
  </div>
  <!-- 第一排 -->
  <div class="row margin0">
    <!--左边-威胁预警 -->
    <div class="col-md-8 box_padding_right">
      <div class="box_content">
        <div class="title_box">
          <span class=" box_title_text">威胁预警</span>
          <span class="box_title_text_right">
            <span class="height_color"></span>
            <span class="text_title_frist">高危</span>
            <span class="mid_color"></span>
            <span class="text_title_frist">中危</span>
            <span class="low_color"></span>
            <span class="text_title_frist">低危</span>
          </span>
        </div>
        <div id="threaten" class="chart-box"></div>
      </div>
    </div>
    <!-- 右边-威胁类别 -->
    <div class="col-md-4 box_padding_left">
      <div class="box_content">
        <div class="title_box">
          <span class=" box_title_text">威胁类别</span>
          <span class="box_title_text_left" style="width: 311px;margin-left:20px;">
            <span ng-repeat="item in item_data" style="margin-right:10px;">
              <span class="height_color" ng-style="item.style"></span>
              <span class="text_title_frist">{{item.name}}</span>
            </span>
          </span>
        </div>
        <div id="threat_categories" class="chart-box"></div>
      </div>
    </div>
  </div>
  <!-- 第二排 -->
  <div class="row margin0" style="margin: 24px 0;">
    <!-- 左边-受影响资产 -->
    <div class="col-md-4 box_padding_right" style="overflow:hidden;">
      <div class="box_content" style="padding:24px 0 0 0;">
        <div class="title_box" style="padding-left:24px;margin-bottom: 14px;">
          <p>
            <span class="float_left box_title_text">受影响资产</span>
          </p>
        </div>
        <table class="table table-striped">
          <tr style="height:42px;">
            <th style="width:150px">资产名称</th>
            <th></th>
          </tr>
          <tr ng-repeat="(index,item) in risk_property_data.data" style="cursor: pointer;height:42px;"
            ng-click="goAlarmRisk()">
            <td ng-bind="item.asset_ip"></td>
            <td>
              <div style="height:14px;width:100%;">
                <span title="{{item.high}}" class="item_common item_high" style="width:{{item.high_percent}}"></span>
                <span title="{{item.medium}}" class="item_common item_mid" style="width:{{item.medium_percent}}"></span>
                <span title="{{item.low}}" class="item_common item_low" style="width:{{item.low_percent}}"></span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 左边-漏洞预警 -->
    <div class="col-md-4 box_padding_right_left">
      <div class="box_content">
        <div class="title_box" style="margin-bottom: 24px;">
          <p>
            <span class="float_left box_title_text">漏洞预警</span>
          </p>
        </div>
        <div class="loophole_box" ng-repeat="item in loophole_top5_data" ng-if="$index < 4">
          <p class="loophole_p"
            ng-class="{'loop_hight':item.level=='高','loop_mid':item.level=='中','loop_low':item.level=='低'}">
            <span>名称：</span>
            <span title="{{item.app_name}}">{{item.app_name}}</span>
          </p>
          <div class="row"
            style="margin-top:10px;font-size:14px;color:#666;margin:0;padding-left:10px;margin-top: 10px;height: 20px;">
            <span class="col-md-6" style="padding:0">
              <span>后果：</span>
              <span>{{item.vuln_type}}</span>
            </span>
            <span class="col-md-6" style="padding:0">
              <span>受影响资产数：</span>
              <span>{{item.affected_assets_count}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 右边-高风险威胁指标 -->
    <div class="col-md-4 box_padding_left">
      <div class="box_content" style="overflow:hidden;">
        <div class="title_box">
          <p>
            <span class="float_left box_title_text">高风险威胁指标</span>
          </p>
        </div>
        <div>
          <ul style="margin-top: 24px;">
            <li class="loophole_li" ng-repeat="item in loophole_warning_data" style="background-color:{{item.color}}">
              {{item.indicator}}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- 第三排 -->
  <div class="row margin0">
    <div class="col-md-6 box_padding_right" style="overflow:hidden;">
      <div class="box_content" style="padding:24px 0 0 0;overflow:hidden;">
        <div class="title_box" style="padding-left:24px;margin-bottom: 14px;position:relative;">
          <p>
            <span class="float_left box_title_text">最新情报</span>
            <!-- sun -->
            <div class="sun_select_box">
              <li class="sun_select_input" ng-click="focus_select()">{{select_model}}</li>
              <img src="/images/home/select_icon2.png" class="sun_select_icon" alt="">
              <ul class="sun_select_ul" ng-if="select_ul">
                <li ng-repeat='item in select_list' ng-class="item.type==select_model?'sun_active':''"
                  class="sun_select_li" ng-click="choose_item(item)">{{item.type}}
                </li>
              </ul>
            </div>
            <!-- sun -->
          </p>
        </div>
        <table class="table table-striped">
          <tr style="height:42px;" ng-if="select_model!='攻击情报'">
            <th ng-repeat="item in title_list">{{item.name}}</th>
          </tr>
          <tr ng-if="select_model=='信誉情报'&& index < 7 " style="height:42px;"
            ng-repeat="(index,item) in real_time_threat">
            <td title="{{item.indicator}}">{{item.indicator}}</td>
            <td>
            <span ng-repeat="key in item.category">{{key}}</span>
            </td>
            <td>{{item.hoohoolab_last_seen}}</td>
          </tr>
          <!-- 漏洞情报 -->
          <tr ng-repeat="(index,item) in loophole_intelligence_data" ng-if="select_model=='漏洞情报' " style="height:42px;">
            <td title="{{item.title}}">{{item.title}}</td>
            <td style="color:{{item.color}};">{{item.degree}}</td>
            <td>{{item.poc == false?'无':'有'}}</td>
          </tr>
          <!-- 暗网情报 -->
          <tr ng-repeat="(index,item) in darknet_list_data" ng-if="select_model=='暗网情报'" style="height:42px;">
            <td>{{item.theme}}</td>
            <td>{{item.status==1?'新预警':'更新预警'}}</td>
            <td>{{item.label}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 最新预警 -->
    <div class="col-md-6 box_padding_left" style="overflow:hidden;">
      <div class="box_content" style="padding:24px 0 0 0;overflow:hidden;">
        <div class="title_box" style="padding-left:24px;margin-bottom: 14px;">
          <p>
            <span class="float_left box_title_text">最新预警</span>
          </p>
        </div>
        <table class="table table-striped">
          <tr style="height:42px;">
            <th style="width: 150px">预警时间</th>
            <th style="width: 100px">预警类型</th>
            <th>威胁指标</th>
            <th style="width: 100px">失陷资产</th>
            <th>预警等级</th>
          </tr>
          <tr ng-repeat="item in pages.data" style="height: 42px;" ng-click="goAlarm()">
            <td ng-bind="item.time*1000 | date:'yyyy-MM-dd HH:mm'"></td>
            <td ng-bind="item.category"></td>
            <td style="padding-left: 30px;" ng-bind="item.indicator"></td>
            <td ng-bind="item.client_ip"></td>
            <td style="color:{{item.color}}" ng-bind="item.degree"></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</section>
<script src="/js/controllers/index.js"></script>
