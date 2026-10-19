if (typeof FLVPlayer == 'undefined') var FLVPlayer = new Object();
FLVPlayer.embed = function (id, flv, xml, w, h, playerskin, bgColor, tt) {
if(playerskin=='')
    playerskin='/wii/media/flvplayer082009.swf';
if(bgColor=='')
    bgColor='#FFFFFF';

var so = new SWFObject('/wii/videos/smg_exp.swf', id + flv, w, h, '7', bgColor);
so.addVariable("player", playerskin);
if ((typeof(xml) != undefined) && (xml.length > 0)) {
    so.addVariable("xml", xml);
}
so.addVariable('flv', flv);
so.addVariable('freeScale', 'true');
so.addParam('wmode','transparent');
if (tt != '') {
    so.addVariable("totalTime", tt);
}
so.write(id);
}