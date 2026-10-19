if (typeof FLVPlayer == 'undefined') var FLVPlayer = new Object();

FLVPlayer.embed = function (id, flv, w, h) {
	var so = new SWFObject('../../swf/flvplayer.swf', id + flv, 560, 380, '7', '#ffffff');
	//so.addVariable('flv', '../movies/flv/' + flv + '.flv');
	so.addVariable('flv', 'http://wiimedia.nintendo-europe.com/wii.com/' + flv + '.flv');
	so.write(id);
}
