<?php

require_once '../../vendor/autoload.php';

$PHPWord = new \PhpOffice\PhpWord\PhpWord();
$PHPWord->getSettings()->setUpdateFields(true);
$PHPWord->setDefaultFontName('微软雅黑');
$PHPWord->setDefaultFontSize(10);
//添加默认页面
$section = $PHPWord->createSection();
//页眉
$header = $section->addHeader();
$header->addText('威胁情报平台运行报告', [], array('align' => 'right'));
//$header->addWatermark('images/shangqi_logo.png', array('marginTop' => 1500, 'marginLeft' => 180, 'width' => 470, 'height' => 735, 'align' => 'center', 'valign' => 'center'));
//$header->addText('威胁情报系统运行报告', array(), array('align' => 'right'));
$section->addTextBreak(6);
$section->addImage('images/shangqi_logo1_sigin.png', array('width' => 135, 'height' => 45, 'align' => 'center'));
$section->addTextBreak(4);
$section->addText('控安威胁情报平台', array('size' => 25, 'bold' => true), array('align' => 'center'));
$section->addText('运行报告', array('size' => 22, 'bold' => true), array('align' => 'center'));
$section->addTextBreak(22);
//$section->addImage('images/chixiao.png', array('width' => 80, 'height' => 95, 'align' => 'center'));
//$section->addText('赤霄网络空间信息安全实验室', array('size' => 11, 'bold' => true), array('align' => 'center'));
//$section->addText('上汽集团安全应急响应中心', array('size' => 11, 'bold' => true), array('align' => 'center'));
$section->addText('报告日期：' . $stime . '-' . $etime, [], array('align' => 'center'));
/*
 * 以下用于定义属性
 */
//正文 宋体 五号
$font_main_style = array('name' => '微软雅黑');
//注释 楷体 五号
$font_note_style = array('name' => '微软雅黑');
//表头 宋体 五号
$form_head_note_style = array('name' => '微软雅黑', 'bold' => true);
//定义标题
$PHPWord->addTitleStyle(2, array('size' => 22, 'bold' => true));
$PHPWord->addTitleStyle(3, array('size' => 14, 'bold' => true));
$PHPWord->addTitleStyle(4, array('size' => 12, 'bold' => true));
/*
 * 以上用于定义属性
 */
//分页
$section->addPageBreak();
//目录
$section->addText('目录', array('size' => 20, 'bold' => true), array('align' => 'center'));
$styleTOC = array('tabLeader' => PhpOffice\PhpWord\Style\TOC::TABLEADER_NONE);
$section->addTOC($font_main_style, $styleTOC);
//分页
$section->addPageBreak();
//正文部分
$section->addTitle('一、运行总览', 2);
$section->addTextBreak();
//整体运行状况
$section->addTitle('1.1 整体运行状况', 3);
$section->addTextBreak();
$section->addText('本次报告数据范围为' . $stime . '—' . $etime . '，共监控资产数量' . $assets_count . '个，产生威胁预警的资产数量' . $affected_assets . '个，威胁预警总数' . $warning_count . '个，接入威胁情报源' . $intelligence_sources_count . '个， 查询情报数量' . $query_intelligence_count . '次', $font_main_style);
$section->addTextBreak();
//系统预警总览
$section->addTitle('1.2 系统预警总览', 3);
$section->addTextBreak();
//预警趋势
$section->addTitle('1.2.1 预警趋势', 4);
//威胁类型
$section->addTextBreak();
$section->addText('本次报告周期内，共产生预警' . $warning_count . '个，每日产生预警数量如下图。');
$section->addText('*用类似首页的柱状图不区分高中低威胁，只展示每日的威胁告警数量');
$section->addImage('echarts/' . $waring_trend, array('width' => 450, 'height' => 260, 'align' => 'center'));
//按威胁程度统计
$section->addTitle('1.2.2 按威胁程度统计', 4);
$section->addTextBreak();
$section->addText('本次报告周期内产生的威胁预警，按照威胁程度划分高、中、低危分布情况如下图：');
$section->addText('*采用饼图展示不同威胁等级的预警数量和所占%');
$section->addImage('echarts/' . $alert_caterory, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('威胁预警', [], array('align' => 'center'));
$section->addImage('echarts/' . $loophole_caterory, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('漏洞预警', [], array('align' => 'center'));
$section->addImage('echarts/' . $darknet_caterory, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('暗网预警', [], array('align' => 'center'));
//按威胁程度统计
$section->addTitle('1.2.3 按预警类别统计', 4);
$section->addTextBreak();
$section->addText('本次报告周期内产生的威胁预警，按照所属威胁分类统计，如下图：');
$section->addText('*采用首页上威胁类别统计的图展示不同威胁类别预警的数量和占比，因为是静态的图，直接在上面显示每个类型预警的数量');
$section->addImage('echarts/' . $waring_category, array('width' => 450, 'height' => 260, 'align' => 'center'));
//重点关注预警
$section->addTitle('1.2.4 重点关注预警', 4);
$section->addTextBreak();
$section->addText('本期需要重点关注的预警和数量以及处理状态如下：');
//定义表格属性
$perday_ip_table_style = array('bold' => true, 'borderColor' => '006699', 'borderSize' => 6, 'cellMargin' => 50);
$styleFirstRow = array('bgColor' => '66BBFF');
$PHPWord->addTableStyle('yong_table', $perday_ip_table_style, $styleFirstRow);

$import_waring_table = $section->addTable('yong_table');
$import_waring_table->addRow(280);
$import_waring_table->addCell(2000)->addText('预警类别', $form_head_note_style);
$import_waring_table->addCell(2000)->addText('告警数量', $form_head_note_style);
$import_waring_table->addCell(2000)->addText('受影响资产数量', $form_head_note_style);
foreach ($focus_waring as $key => $value) {
    $import_waring_table->addRow();
    $import_waring_table->addCell()->addText(htmlspecialchars($value['category']));
    $import_waring_table->addCell()->addText($value['warint_count']);
    $import_waring_table->addCell()->addText($value['client_ip_count']);
}
$section->addText('*数据取暗网预警、漏洞预警和威胁预警，取这个时间段内新预警和未处理预警的数据', $font_note_style);
$section->addTextBreak();
//监控资产统计
$section->addTitle('1.3 监控资产统计', 3);
$section->addText('在本次报告周期内共监控资产' . $assets_count . '个，包括网站资产' . $website_assets_count . '个，主机资产' . $host_assets_count . '个，其中网站类资产产生预警' . $website_waring_count . '个，主机类资产产生预警' . $host_waring_count . '个，如下图：', $font_main_style);
$section->addImage('echarts/' . $monitor_assets_host, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('主机类资产', [], array('align' => 'center'));
$section->addImage('echarts/' . $monitor_assets_website, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('网站类资产', [], array('align' => 'center'));
$section->addText('*采用两幅饼图分别展示网站类资产和主机资产的数量和产生预警资产占比');
$section->addTextBreak();
//情报碰撞总览
$section->addTitle('1.4 情报碰撞总览', 3);
$section->addText('其中与用户资产碰撞成功的包括信誉情报' . $manual_warning_count . '条，漏洞情报' . $loophole_waring_count . '条。');
$section->addTextBreak();
$section->addText('碰撞成功情报');
$intelligence_collision_table = $section->addTable('yong_table');
$intelligence_collision_table->addRow(280);
$intelligence_collision_table->addCell(2000)->addText('情报名称', $form_head_note_style);
$intelligence_collision_table->addCell(2000)->addText('情报来源', $form_head_note_style);
$intelligence_collision_table->addCell(2000)->addText('威胁类别', $form_head_note_style);
$intelligence_collision_table->addCell(2000)->addText('碰撞资产', $form_head_note_style);
foreach ($intelligence_collision as $key => $value) {
    $intelligence_collision_table->addRow();
    $intelligence_collision_table->addCell()->addText(preg_replace('# #', '', $value['matched']));
    $intelligence_collision_table->addCell()->addText($value['source'] ?? '');
    $intelligence_collision_table->addCell()->addText(htmlspecialchars($value['category']));
    $intelligence_collision_table->addCell()->addText(htmlspecialchars($value['device_ip']));
}
$section->addTextBreak();
$section->addTitle('二、系统预警分析', 2);
$section->addTextBreak();
//信息泄露预警
$section->addTitle('2.1 信息泄露预警', 3);
$section->addText('通过对互联网信息的持续监控以及威胁情报的应用结合导入资产信息，发现互联网、暗网以及github上存在的信息泄露。');
$section->addText('本周期内信息泄露事件');

foreach ($information_leakage as $key => $value) {
    $section->addText(($key + 1) . '、' . htmlspecialchars($value['theme']) . '：' . htmlspecialchars($value['detail']));
}
//钓鱼网站预警
$section->addTitle('2.2 钓鱼网站预警', 3);
$section->addText('通过接入威胁情报与当前监控的资产信息进行碰撞，发现互联网中存在的与之相似的网站以及域名信息，并进行自动化验证，形成预警信息并通知管理人员', $font_main_style);
$section->addText('本周期内钓鱼网站预警');
$fishing_website_table = $section->addTable('yong_table');
$fishing_website_table->addRow(280);
$fishing_website_table->addCell(2000)->addText('告警预警时间', $form_head_note_style);
$fishing_website_table->addCell(2200)->addText('钓鱼网址', $form_head_note_style);
$fishing_website_table->addCell(2400)->addText('风险资产', $form_head_note_style);
foreach ($fishing_website_alert as $key => $value) {
    $fishing_website_table->addRow();
    $fishing_website_table->addCell()->addText(date('Y-m-d H:i:s', $value['time']));
    $fishing_website_table->addCell()->addText(htmlspecialchars($value['indicator']));
    $fishing_website_table->addCell()->addText(htmlspecialchars($value['client_ip']));
}
$section->addText('处理建议：由于平台自动发现钓鱼仿冒网址可能存在误报，请先人工验证。验证确认后，可配合相关部门对该网址做下线处理。');
//漏洞攻击预警
$section->addTitle('2.3 漏洞攻击预警', 3);
$section->addText('通过接入的漏洞情报与导入的资产信息进行碰撞，发现资产存在的漏洞并进行预警');
$section->addText('漏洞预警等级分布');
$section->addText('*使用饼图展示当前发现的漏洞预警总数，以及高、中、低危预警数量和占比，使用漏洞预警页面的图');
$section->addImage('echarts/' . $loophole_level, array('width' => 450, 'height' => 260, 'align' => 'center'));
$section->addText('风险资产漏洞预警数量排行：');
$loophole_attack_table = $section->addTable('yong_table');
$loophole_attack_table->addRow(280);
$loophole_attack_table->addCell(2000)->addText('资产名称', $form_head_note_style);
$loophole_attack_table->addCell(3000)->addText('漏洞数量（高/中/低）', $form_head_note_style);
foreach ($loophole_rank as $key => $value) {
    $loophole_attack_table->addRow();
    $loophole_attack_table->addCell()->addText(htmlspecialchars($value['client_ip']));
    $loophole_attack_table->addCell()->addText($value['高'] . '/' . $value['中'] . '/' . $value['低']);
}
$section->addTitle('三、风险资产分析', 2);
$section->addTextBreak();
//网站及域名资产
$section->addTitle('3.1 网站及域名资产', 3);
$section->addText('资产风险等级TOP10个，如下：');
$website_domain_table = $section->addTable('yong_table');
$website_domain_table->addRow(280);
$website_domain_table->addCell(2000)->addText('资产名称', $form_head_note_style);
$website_domain_table->addCell(2000)->addText('高危威胁预警', $form_head_note_style);
$website_domain_table->addCell(2000)->addText('高危漏洞预警', $form_head_note_style);
$website_domain_table->addCell(2000)->addText('存在钓鱼仿冒', $form_head_note_style);
foreach ($website_domain_assets as $key => $value) {
    $website_domain_table->addRow();
    $website_domain_table->addCell()->addText(htmlspecialchars($value['client_ip']));
    $website_domain_table->addCell()->addText($value['alert_count']);
    $website_domain_table->addCell()->addText($value['loophole_count']);
    $website_domain_table->addCell()->addText($value['imposter_count'] > 0 ? '有' : '无');
}
//主机资产
$section->addTitle('3.2 主机资产', 3);
$section->addText('资产风险等级TOP10');
$host_assets_table = $section->addTable('yong_table');
$host_assets_table->addRow(280);
$host_assets_table->addCell(2000)->addText('资产名称', $form_head_note_style);
$host_assets_table->addCell(2000)->addText('高危威胁预警', $form_head_note_style);
$host_assets_table->addCell(2000)->addText('高危漏洞预警', $form_head_note_style);
foreach ($host_assets as $key => $value) {
    $host_assets_table->addRow();
    $host_assets_table->addCell()->addText(htmlspecialchars($value['client_ip']));
    $host_assets_table->addCell()->addText($value['alert_count']);
    $host_assets_table->addCell()->addText($value['loophole_count']);
}
$section->addTitle('四、情报更新统计', 2);
$section->addTextBreak();
//信誉情报
$section->addTitle('4.1 信誉情报', 3);
$section->addText('情报更新统计');
$section->addText('*展示每日不同情报源更新的情报数量');
$section->addImage('echarts/' . $intelligence_update, array('width' => 450, 'height' => 260, 'align' => 'center'));
//漏洞情报
//$section->addTitle('4.2 漏洞情报', 3);
//$section->addText('情报更新统计', $font_main_style);
//$section->addText('本周期内漏洞情报更新数量xxx个，其中高危漏洞xxx个，中危漏洞xxx个，低危漏洞xxx个，每日更新漏洞数据如下图：', $font_main_style);
//$section->addText('*采用柱状图展示每日漏洞情报更新数量和不同威胁等级漏洞占比', $font_main_style);
//$section->addImage($source);
//暗网情报
//$section->addTitle('4.3 暗网情报', 3);
//$section->addText('情报更新统计', $font_main_style);
//$section->addText('本周期暗网情报更新数量xxx个，与用户相关情报xxx个，如下图', $font_main_style);
//$section->addText('*采用饼图形式展示安全情报数量和与用户相关联数量', $font_main_style);
//$user_intelligence_table = $section->addTable('yong_table');
//$user_intelligence_table->addRow(280);
//$user_intelligence_table->addCell(2000)->addText('情报描述', $form_head_note_style);
//$user_intelligence_table->addCell(2000)->addText('关联信息', $form_head_note_style);
//$user_intelligence_table->addCell(2000)->addText('发现时间', $form_head_note_style);
//下载
$file_name = iconv('utf-8', 'gb2312//TRANSLIT', $report_name . '.doc');
$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($PHPWord, 'Word2007');
header('Content-Type: application/doc');
header('Content-Disposition: attachment;filename=' . $file_name);
header('Cache-Control: max-age=0');
$objWriter->save('php://output'); //文件通过浏览器下载
die;
