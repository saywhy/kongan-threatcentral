<?php
/* @var $this yii\web\View */
/* @var $form yii\bootstrap\ActiveForm */
/* @var $model \common\models\LoginForm */
$this->title = '登录';
$this->params['breadcrumbs'][] = $this->title;
$this->context->layout = false;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>上海控安威胁情报系统</title>
  <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" media="screen" href="/css/common.css">
  <link rel="stylesheet" media="screen" href="/css/family/pingfang.css">
  <link rel="stylesheet" media="screen" href="/css/login.css">
  <script src="/plugins/jQuery/jquery-2.2.3.min.js"></script>
  <script type="text/javascript" src="/plugins/angular/angular.min.js"></script>
  <script src="/bootstrap/js/bootstrap.min.js"></script>
</head>

<body>
  <div ng-app="myApp" ng-controller="loginCtrl" ng-cloak>
    <div class="row login_box" id="login_enter" style="overflow:hidden;" ng-click="click()">
      <div class="header_img">
        <img class="logo_img" src="/images/kongan.png" alt="" width="200">
      </div>
      <div class="content">
        <p class="login_title">工业控制系统安全威胁预警服务平台</p>
        <!-- 用户名 -->
        <div class="login_item_box">
          <input class="login_input" ng-focus="username_focus()" type="text" ng-model="user.username"
            placeholder="请输入用户名">
          <img class="img_icon" src="/images/login/user.png" alt="">
          <div class="login_line"></div>
        </div>
        <div class="error_box">
          <img ng-if="errorMessage.username!=''" src="/images/login/error_red.png" alt="">
          <span>{{errorMessage.username}}</span>
        </div>
        <!-- 密码 -->
        <div class="login_item_box">
          <input class="login_input" type="{{input_type}}" ng-focus="password_focus()" ng-model="user.password"
            placeholder="请输入密码">
          <img class="img_icon" src="/images/login/pswd.png" alt="">
          <img class="img_icon_right" ng-click="change_type()" src="/images/login/eye.png" alt="">
          <div class="login_line"></div>
        </div>
        <div class="error_box">
          <img ng-if="errorMessage.password!=''" src="/images/login/error_red.png" alt="">
          <span>{{errorMessage.password}}</span>
        </div>
        <div>
          <input class="login_code_box" ng-focus="code_focus()"  ng-model="user.code" placeholder="请输入验证码"
           type="text">
          <span style="float:right;">
            <canvas width="168" height="54" id="verifyCanvas"></canvas>
            <img id="code_img" />
          </span>
        </div>
        <div class="error_box">
          <img ng-if="errorMessage.code!=''" src="/images/login/error_red.png" alt="">
          <span>{{errorMessage.code}}</span>
        </div>
        <div class="login_btn">
          <p class="login_btn_p" ng-click="login_in()">登录</p>
        </div>
      </div>
    </div>
  </div>
  <script src="/js/controllers/loginCtrl.js"></script>
</body>
