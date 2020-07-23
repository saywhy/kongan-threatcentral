<style>
    .nav_li_a_p {
        color: #FFF;
        height: 64px;
        border: 0;
        line-height: 64px !important;
        padding: 0 70px !important;
        font-size: 14px;
    }

    .vertic_align {
      margin-left:5px;
        vertical-align: middle;
    }

    .treeview {
        cursor: pointer;
    }
</style>
<!-- <li class="dropdown tasks-menu"  > -->
<li role="presentation" class="dropdown" id="selfApp" ng-controller="selfCtrl">
    <a class="dropdown-toggle nav_li_a_p"  data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
        aria-expanded="false">
        <span>您好，</span>
        <span><?=Yii::$app->user->identity->username?></span>
        <span class="caret"></span>
    </a>
    <ul class="dropdown-menu" style="left: 50px;">
        <li class="treeview" ng-click="resetPassword();"  ng-mouseover="mouseover_pswd()" ng-mouseleave="mouseleave_pswd()">
            <a >
                <img src="/images/home/pswd.png" alt="" width="16" height="16" ng-if="!pswd_show">
                <img src="/images/home/pswd_o.png" alt="" width="18" height="18" ng-if="pswd_show">
                <span class="vertic_align">修改密码</span>
            </a>
        </li>
        <li class="treeview" ng-mouseover="mouseover_out()" ng-mouseleave="mouseleave_out()">
            <a href="/site/logout">
                <img src="/images/home/out.png" width="16" height="16" alt="" ng-if="!out_show">
                <img src="/images/home/out_o.png" width="18" height="18" alt="" ng-if="out_show">
                <span class="vertic_align">退出登录</span>
            </a>
        </li>
    </ul>
    <div id="resetSelfPasswordBox" style="display: none;">
    <div id="resetSelfPassword">
        <form>
            <div class="box-body">
                <div class="form-group {{resetUser_old_passworderror ? 'has-error':''}}">
                    <label for="InputVersion">旧的密码：</label>
                    <input type="password" class="form-control" ng-model="resetUser.old_password">
                    <p class="help-block" ng-bind="resetUser_old_passworderror ? '请输入旧的密码' : '　'"></p>
                </div>

                <div class="form-group {{resetUser_passworderror ? 'has-error':''}}">
                    <label for="InputVersion">设置密码：</label>
                    <input type="password" class="form-control" ng-model="resetUser.password">
                    <p class="help-block">请填写8-30位密码,包含大写字母、小写字母、数字、特称字符</p>
                </div>

                <div class="form-group {{resetUser_repassworderror ? 'has-error':''}}">
                    <label for="InputVersion">确认密码：</label>
                    <input type="password" class="form-control" ng-model="resetUser.repassword">
                    <p class="help-block" ng-bind="resetUser_repassworderror ? '密码不一致' : '　'"></p>
                </div>
            </div>
        </form>
    </div>
</div>
</li>

<!-- </li> -->

<script src="/js/controllers/self.js"></script>