<?php
/* @var $this yii\web\View */

$this->title = '情报查询';
?>
<link rel="stylesheet" href="/css/common.css">
<style>
  /* 情报查询 */
  .search_container {
    margin: 36px 48px;
    background: #fff;
    min-height: 200px;
    border-radius: 5px;
  }

  .detail_bom_nav {
    height: 56px;
    background: #EEF6FF;
    border: none;
    border-radius: 6px 6px 0 0;
  }

  .detail_bom_nav li {
    height: 56px;
  }

  .detail_bom_nav>li>a {
    height: 56px;
    line-height: 56px !important;
    font-size: 14px !important;
    color: #333333;
    padding: 0 30px !important;
    border: 0;
  }

  .detail_bom_nav a:hover {
    color: #4155d0 !important;
  }

  .detail_bom_nav>li>a:hover {
    border: none;
    background: transparent;
  }

  .detail_bom_nav>li.active>a {
    color: #4155d0 !important;
    border: none !important;
  }

  .detail_bom_nav>li.active {
    border-top: 3px solid #4155d0;
    border-radius: 5px;
  }

  .detail_bom_ul,
  .detail_bom_ul>li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

  .detail_bom_ul>li:nth-child(odd) {
    background: #fff;
    padding: 0 26px;
    line-height: 48px;
  }

  .detail_bom_ul>li:nth-child(even) {
    background: #EEF6FF;
    line-height: 48px;
    padding: 0 26px;
  }

  .detail_bom_li_title {
    font-size: 14px;
    color: #333333;
    width: 150px;
    display: inline-block;
  }

  .detail_bom_li_content {
    font-size: 14px;
    color: #666666;
    line-height: 20px;
  }

  .domain_table tr:nth-child(odd) {
    background: #fff;
  }

  .domain_table tr:nth-child(even) {
    background: #EEF6FF;

  }

  .domain_table {
    width: 100%;
    table-layout: fixed;
  }

  .domain_table tr {
    height: 48px;
    line-height: 48px;
    padding-left: 26px;
  }

  .domain_table td,
  .domain_table th {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }

  .domain_p {
    height: 48px;
    line-height: 48px;
    padding-left: 26px;
    font-size: 16px;
    color: #333333;
  }

  .info_top {
    height: 120px;
    border-bottom: 1px solid #ececec;
    padding: 36px;

  }

  .info_top_box {}

  .info_top_input {
    background: #FFFFFF;
    border: 1px solid #D1D1D1;
    padding-left: 14px;
    border-radius: 5px;
    width: 624px;
    height: 48px;
    font-size: 12px;
    color: #666;
    float: left;
  }

  .info_top_btn {
    background: #4155d0;
    border-radius: 0 5px 5px 0;
    width: 56px;
    height: 48px;
    float: left;
    margin-left: -3px;
    border: 1px solid #4155d0;
  }

  .info_bom {
    padding: 0 36px;
    position: relative;
  }

  .info_bom_top {
    height: 92px;
    padding-top: 30px;
    border-bottom: 1px solid #ececec;
  }

  .reputation_search_box {
    position: absolute;
    right: 36px;
    top: 26px;
  }



  .info_bom_top_title {
    font-size: 20px;
    color: #333333;
    font-weight: 500;
    float: left;

  }

  .info_bom_top_btn {
    background: #4155d0;
    border-radius: 5px;
    font-size: 14px;
    color: #FFFFFF;
    float: left;
    height: 42px;
    width: 124px;
  }

  .info_bom_top_cel {
    border: 1px solid #4155d0;
    border-radius: 5px;
    font-size: 14px;
    float: right;
    color: #4155d0;
    height: 42px;
    width: 124px;
  }

  .info_bom_top_cel_set {
    border: 1px solid #4155d0;
    border-radius: 5px;
    font-size: 14px;
    color: #4155d0;
    height: 42px;
    transform: translateX(-50%);
    position: absolute;
    width: 124px;
    left: 50%;
  }

  .info_bom_mid {
    height: 120px;
  }

  .info_bom_mid_p {
    line-height: 60px;
    vertical-align: middle;
  }

  .info_bom_mid_p_name {
    font-size: 14px;
    color: #4155d0;
    line-height: 20px;
    vertical-align: middle;

  }

  .info_bom_mid_p_value {
    font-size: 14px;
    color: #666;
    vertical-align: middle;

  }

  .info_bom_bom {
    padding-bottom: 20px;
  }

  .info_bom_bom_title {
    font-size: 20px;
    color: #333333;
    font-weight: 500;
    margin: 20px 0;
  }

  .loophole_contarner {
    font-size: 14px;
    color: #333333;
  }

  .high_color {
    color: #FF5F5C;
  }

  .mid_color {
    color: #FEAA00;
  }

  .low_color {
    color: #7ACE4C
  }

  .loop_id {
    color: #4155d0;
  }

  .btn_download {
    width: 80px;
    height: 30px;
    border-radius: 5px;
    background: #4155d0;
    color: #fff;
    margin-left: 5px;
    font-size: 12px;
  }

  .poc_btn {
    border-radius: 5px;
    background: #ececec;
    color: #fff;
  }
</style>
<section ng-app="myApp" ng-controller="searchCtrl" ng-cloak>
  <div class="search_container">
    <div>
      <ul class="nav nav-tabs detail_bom_nav">
        <li role="presentation" ng-class="tab_active?'active':''" ng-click="tab_click(1)">
          <a href="#info" data-toggle="tab">信誉情报</a>
        </li>
        <li role="presentation" ng-class="!tab_active?'active':''"><a href="#loophole" data-toggle="tab"
            ng-click="tab_click(2)">漏洞情报</a></li>
      </ul>
      <div class="tab-content">
        <div id="info" class="tab-pane" ng-class="tab_active?'active':''">
          <div class="info_top">
            <div class="info_top_box">
              <input class="info_top_input" placeholder="请输入IP、hash、url或者域名" ng-model="reputation_search" type="text">
              <button class="info_top_btn" ng-click="reputation_get()">
                <img src="/images/search/search.png" alt="">
              </button>
            </div>
          </div>
          <div class="info_bom" ng-if="reputation_res_if">
            <div class="info_bom_top">
              <p class="info_bom_top_title">{{reputation_res.indicator}}</p>
            </div>
            <div class="reputation_search_box">
              <button class="info_bom_top_btn" ng-if="set_true&&lookup_license"
                ng-click="search_extend(reputation_search)">扩展查询</button>
            </div>
            <div class="info_bom_mid">
              <div class="row">
                <div class="col-md-4">
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/bom_1.png" alt="">
                    <span class="info_bom_mid_p_name">地理位置：</span>
                    <span class="info_bom_mid_p_value">{{reputation_res.geo}}</span>
                  </p>
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/bom_4.png" alt="">
                    <span class="info_bom_mid_p_name">置信度：</span>
                    <span class="info_bom_mid_p_value">{{reputation_res.confidence}}</span>
                  </p>
                </div>
                <div class="col-md-4">
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/top_3.png" alt="">
                    <span class="info_bom_mid_p_name">情报来源：</span>
                    <span class="info_bom_mid_p_value">{{reputation_res.sources[0]}}</span>
                  </p>
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/top_4.png" alt="">
                    <span class="info_bom_mid_p_name">首次发现时间：</span>
                    <span class="info_bom_mid_p_value">{{reputation_res.hoohoolab_first_seen}}</span>
                  </p>
                </div>
                <div class="col-md-4">
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/bom_3.png" alt="">
                    <span class="info_bom_mid_p_name">威胁类型：</span>
                    <span class="info_bom_mid_p_value">
                      <span ng-repeat="item in reputation_res.category">
                        {{item}}
                      </span>
                    </span>
                  </p>
                  <p class="info_bom_mid_p">
                    <img src="/images/alert/bom_6.png" alt="">
                    <span class="info_bom_mid_p_name">最近发现时间：</span>
                    <span class="info_bom_mid_p_value">{{reputation_res.hoohoolab_last_seen}}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="info_bom_bom">
              <p class="info_bom_bom_title">关联信息</p>
              <div>
                <ul class="nav nav-tabs detail_bom_nav">
                  <li role="presentation" class="active">
                    <a href="#des" data-toggle="tab">情报详情</a>
                  </li>
                  <li role="presentation">
                    <a href="#whois" data-toggle="tab">whois信息</a>
                  </li>
                  <li role="presentation"><a href="#file" data-toggle="tab">关联样本</a></li>
                  <li role="presentation"><a href="#domain" data-toggle="tab">关联域名</a></li>
                </ul>
                <div class="tab-content">
                  <div id="des" class="tab-pane active">
                    <ul class="detail_bom_ul">
                      <li class="detail_bom_li">
                        <img src="/images/alert/bom_1.png" alt="">
                        <span class="detail_bom_li_title">
                          地理位置
                        </span>
                        <span class="detail_bom_li_content">{{reputation_res.geo}}</span>
                      </li>
                      <li class="detail_bom_li">
                        <img src="/images/alert/top_3.png" alt="">
                        <span class="detail_bom_li_title">
                          情报来源
                        </span>
                        <span class="detail_bom_li_content">{{reputation_res.sources[0]}}</span>
                      </li>
                      <li class="detail_bom_li" >
                        <img src="/images/alert/bom_3.png" alt="">
                        <span class="detail_bom_li_title">
                          威胁类型
                        </span>
                        <span class="detail_bom_li_content">
                        <span ng-repeat="item in reputation_res.category"> {{item}} </span>
                        </span>
                      </li>
                      <li class="detail_bom_li">
                        <img src="/images/alert/bom_4.png" alt="">
                        <span class="detail_bom_li_title">
                          置信度
                        </span>
                        <span class="detail_bom_li_content"> {{reputation_res.confidence}}</span>
                      </li>
                      <li class="detail_bom_li">
                        <img src="/images/alert/top_4.png" alt="">
                        <span class="detail_bom_li_title">
                          首次发现时间
                        </span>
                        <span class="detail_bom_li_content">{{reputation_res.hoohoolab_first_seen}}</span>
                      </li>
                      <li class="detail_bom_li" >
                        <img src="/images/alert/bom_6.png" alt="">
                        <span class="detail_bom_li_title">
                          最近发现时间
                        </span>
                        <span class="detail_bom_li_content">{{reputation_res.hoohoolab_last_seen}}</span>
                      </li>
                      <li class="detail_bom_li" >
                        <img src="/images/alert/bom_9.png" width="18" height='18' alt="">
                        <span class="detail_bom_li_title">
                          行业
                        </span>
                        <span class="detail_bom_li_content">{{reputation_res.trade}}</span>
                      </li>
                    </ul>
                  </div>
                  <div id="whois" class="tab-pane">
                    <ul class="detail_bom_ul">
                      <li ng-repeat="item in reputation_res.whois">
                        <span class="detail_bom_li_title">{{item.name}}</span>
                        <span class="detail_bom_li_content">{{item.value}}</span>
                      </li>
                    </ul>
                  </div>
                  <div id="file" class="tab-pane ">
                    <table class="table ng-cloak domain_table">
                      <tr style="font-size: 16px;color: #333;">
                        <th style="font-weight: normal;">THREAT</th>
                        <th style="font-weight: normal;">MD5</th>
                        <th style="font-weight: normal;">SHA1</th>
                        <th style="font-weight: normal;">SHA256</th>
                      </tr>
                      <tr ng-repeat="item in reputation_res.hoohoolab_files" style="font-size: 14px;color: #666666;">
                        <td title="{{item.threat}}">{{item.threat}}</td>
                        <td title="{{item.MD5}}">{{item.MD5}}</td>
                        <td title="{{item.SHA1}}">{{item.SHA1}}</td>
                        <td title="{{item.SHA256}}">{{item.SHA256}}</td>
                      </tr>
                    </table>
                  </div>
                  <div id="domain" class="tab-pane ">
                    <p>{{reputation_res.hoohoolab_domains}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="loophole" class="tab-pane" ng-class="!tab_active?'active':''">
          <div class="info_top" style="border-bottom:0;">
            <div class="info_top_box">
              <input class="info_top_input" placeholder="请输入漏洞名称" ng-model="loophole_search" type="text">
              <button class="info_top_btn" ng-click="loophole_get()">
                <img src="/images/search/search.png" alt="">
              </button>
            </div>
          </div>
          <div class="loophole_contarner" style="padding-bottom: 20px;">
            <table class="table ng-cloak domain_table">
              <tr>
                <th>漏洞ID</th>
                <th>漏洞</th>
                <th style="width: 100px;">漏洞等级</th>
                <th style="width: 100px;">漏洞预警</th>
                <th style="width: 150px;">发现时间</th>
                <th style="width: 210px;">下载导出</th>
              </tr>
              <tr style="cursor: pointer;" ng-repeat="item in loophole_res.data.result"
                ng-click="loophole_detail(item)">
                <td title="{{item.id}}" class="loop_id">
                  <span>{{item.id}}</span>
                </td>
                <td title="{{item.title}}">{{item.title}}</td>
                <td title="{{item.degree}}"
                  ng-class="{high_color:item.degree=='高',mid_color:item.degree=='中',low_color:item.degree=='低'}">
                  {{item.degree}}</td>
                <td title="{{item.count}}">{{item.count}}</td>
                <td>{{item.first_seen | date : 'yyyy-MM-dd HH:mm'}}</td>
                <td ng-click="loop_download();$event.stopPropagation();">
                  <button ng-class="item.poc==''?'poc_btn':''" class="btn_download"
                    ng-click="download_poc(item.poc);$event.stopPropagation();">下载POC</button>
                  <button ng-click="download_id(item);$event.stopPropagation();" class="btn_download">导出HTML</button>
                </td>
              </tr>
            </table>
            <div style="border-top: 1px solid #f4f4f4;padding: 10px;">
              <em>共有<span ng-bind="loophole_res.count"></span>条漏洞</em>
              <!-- angularjs分页 -->
              <ul class="pagination pagination-sm no-margin pull-right ng-cloak">
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow-1)"
                    ng-if="loophole_res.pageNow>1">上一页</a></li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(1)" ng-if="loophole_res.pageNow>1">1</a></li>
                <li><a href="javascript:void(0);" ng-if="loophole_res.pageNow>4">...</a>
                </li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow-2)"
                    ng-bind="loophole_res.pageNow-2" ng-if="loophole_res.pageNow>3"></a>
                </li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow-1)"
                    ng-bind="loophole_res.pageNow-1" ng-if="loophole_res.pageNow>2"></a>
                </li>
                <li class="active"><a href="javascript:void(0);" ng-bind="loophole_res.pageNow"></a>
                </li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow+1)"
                    ng-bind="loophole_res.pageNow+1" ng-if="loophole_res.pageNow<loophole_res.maxPage-1"></a>
                </li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow+2)"
                    ng-bind="loophole_res.pageNow+2" ng-if="loophole_res.pageNow<loophole_res.maxPage-2"></a>
                </li>
                <li><a href="javascript:void(0);" ng-if="loophole_res.pageNow<loophole_res.maxPage-3">...</a></li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.maxPage)"
                    ng-bind="loophole_res.maxPage" ng-if="loophole_res.pageNow<loophole_res.maxPage"></a>
                </li>
                <li><a href="javascript:void(0);" ng-click="loophole_get(loophole_res.pageNow+1)"
                    ng-if="loophole_res.pageNow<loophole_res.maxPage">下一页</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div style="display: none;" id="hideenBox">
    <div id="html_content">
      <div ng-bind-html='html_content'> </div>
    </div>
  </div>
  <!-- 编辑自定义规则 -->
  <div style="display: none;" id="hideenBox_custom_edit">
    <div id="custom_edit">
      <div class="row" style="margin:0;padding:10px;">
        <div class="col-md-6">
          <label>漏洞日志名称</label>
          <input type="text" class="form-control" ng-model="custom_edit_data.risk_name" placeholder="请输入漏洞日志名称">
        </div>
        <div class="col-md-6">
          <label>漏洞情报名称</label>
          <input type="text" class="form-control" ng-model="custom_edit_data.title" placeholder="请输入漏洞情报名称">
        </div>
      </div>
    </div>
  </div>
  <!-- 关联漏洞预警列表-->
  <div style="display: none;" id="hideenBox_relation_alert">
    <div id="custom_relation_alert">
      <div class="row" style="margin:0;padding:10px;">
        <div class="row margin margintop" style="padding-top: 10px;">
          <table class="table table-hover ng-cloak">
            <tr>
              <th>预警时间</th>
              <th>资产</th>
              <th>所属分组</th>
              <th>漏洞</th>
              <th>漏洞等级</th>
              <th>POC</th>
              <th>状态</th>
            </tr>
            <tr style="cursor: pointer;" ng-repeat="item in get_relation_data.data">
              <td title="{{item.time*1000|date:'yyyy-MM-dd HH:mm'}}">
                {{item.time*1000 | date:'yyyy-MM-dd HH:mm'}}</td>
              <td title="{{item.device_ip}}">{{item.device_ip}}</td>
              <td title="{{item.company}}">{{item.company}}</td>
              <td title="{{item.loophole_name}}">{{item.loophole_name}}</td>
              <td title="{{item.level}}">{{item.level}}</td>
              <td title="{{item.poc}}">{{item.poc}}</td>
              <td class="overflow_alarm width_100">
                <div class="btn-group {{(ariaID == item.id)?'open':''}}">
                  <button type="button" class="btn btn-{{loop_status_str[item.risk_process].css}} btn-xs ">
                    <span>
                      <span ng-bind="loop_status_str[item.risk_process].label"></span>
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          </table>
          <div style="border-top: 1px solid #f4f4f4;padding: 10px;">
            <em>共有<span ng-bind="get_relation_data.count"></span>条漏洞</em>
            <ul class="pagination pagination-sm no-margin pull-right ng-cloak">
              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow-1)"
                  ng-if="get_relation_data.pageNow>1">上一页</a></li>
              <li><a href="javascript:void(0);" ng-click="get_relation(1)" ng-if="get_relation_data.pageNow>1">1</a>
              </li>
              <li><a href="javascript:void(0);" ng-if="get_relation_data.pageNow>4">...</a></li>

              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow-2)"
                  ng-bind="get_relation_data.pageNow-2" ng-if="get_relation_data.pageNow>3"></a></li>
              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow-1)"
                  ng-bind="get_relation_data.pageNow-1" ng-if="get_relation_data.pageNow>2"></a></li>

              <li class="active"><a href="javascript:void(0);" ng-bind="get_relation_data.pageNow"></a>
              </li>

              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow+1)"
                  ng-bind="get_relation_data.pageNow+1"
                  ng-if="get_relation_data.pageNow<get_relation_data.maxPage-1"></a></li>
              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow+2)"
                  ng-bind="get_relation_data.pageNow+2"
                  ng-if="get_relation_data.pageNow<get_relation_data.maxPage-2"></a></li>
              <li><a href="javascript:void(0);" ng-if="get_relation_data.pageNow<get_relation_data.maxPage-3">...</a>
              </li>

              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.maxPage)"
                  ng-bind="get_relation_data.maxPage" ng-if="get_relation_data.pageNow<get_relation_data.maxPage"></a>
              </li>
              <li><a href="javascript:void(0);" ng-click="get_relation(get_relation_data.pageNow+1)"
                  ng-if="get_relation_data.pageNow<get_relation_data.maxPage">下一页</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="display: none; " id="hideen_extend">
    <div id="extend" style="height: 100%; padding-left: 20px;">
      <p style="margin-bottom: 50px; text-align: center;">
        <span>本地信誉库未查到该情报记录</span>
        <span ng-if="set_true&&lookup_license">,可进行扩展查询</span>
      </p>
      <button class="info_bom_top_btn" ng-if="set_true&&lookup_license" ng-click="search_extend(reputation_search)">
        扩展查询
      </button>
      <button class="info_bom_top_cel_set" ng-if="!set_true||!lookup_license" ng-click="cel_extend()">
        取消
      </button>
      <button class="info_bom_top_cel" ng-if="set_true&&lookup_license" ng-click="cel_extend()">
        取消
      </button>
    </div>
  </div>


</section>
<script src="/js/controllers/search.js"></script>
