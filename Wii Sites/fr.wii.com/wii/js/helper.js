documentViewHelper = {
    init : function() {
        hoverImages.init();
    }
}
hoverImages = {
    
    // HoverImages v0.1 is Copyright (c) by Philipp RheinstÃ¤dter and Martin PreiÃ. It's 
    // released under the MIT License: http://www.opensource.org/licenses/mit-license.php
    srcDelimiter : "#",
    preloadimages : new Array(),
    
    preload : function(imgsrc) {
        var img = new Image();
        img.src = imgsrc;
        return this.preloadimages.push(img);
    },
    
    init : function() {
        regExpTest = new RegExp(this.srcDelimiter);
        regExpFind = new RegExp("(.*)" + this.srcDelimiter + "(.*)"); 
        for (i = 0; i < document.images.length; i++) {
            img = document.images[i];
            if(regExpTest.test(img.getAttribute('src'))) {
                img.setAttribute('src_reg', regExpFind.exec(img.getAttribute('src'))[1]);
                img.setAttribute('src_ovr', regExpFind.exec(img.getAttribute('src'))[2]);
                img.onmouseover = function(){ this.setAttribute('src', this.getAttribute('src_ovr')); }; 
                img.onmouseout = function(){ this.setAttribute('src', this.getAttribute('src_reg')); };
                img.onmouseout();
                this.preload(img.getAttribute('src_ovr'));
            }
        }
    }
};
videoList= {
    init:function (p) {    
    for (i = 0; i < data.length; i++) {
        if (data[i].id == p.currentID) {
            for (j = 0; j < p.length; j++) {
                if (i >= data.length) i = 0;
                //console.log(data[i++].id);
                p.rootNode.innerHTML = p.rootNode.innerHTML + data[i++].value;            
            }
            break;
        }
    }
    }
}    
scrollList = {
  
  init: function(p){
    var listElements  = $A(p.rootNode.childElements());
    var currentId     = 'exp_guid_' + p.currentPageId;
    var listLength    = p.listLength-1;
    var arrDisplay = new Array();
    var i = 0
        
        // get array to display list
        var firstListElement = listElements.find( function(current){
            if (current.id == currentId) {
        arrDisplay.push(current);
        while (i < listLength) {
                    arrDisplay.push(current.next(i));                        
                    i++;
              }
      }
        });    
        // clear array    
        arrDisplay = arrDisplay.compact();
        
        // push elements to array if needed
        if (arrDisplay.length < listLength) {
      var i = 0;
      var lengthDiff = listLength-arrDisplay.length;                        
        
      arrDisplay.push(listElements.first());
      var missingElements = listElements.each( function(item) {
        while (i < lengthDiff) {
          arrDisplay.push(item.next(i));
        i++;
                }       
      });     
        }    
        // display all selected list items
        arrDisplay.each(function(item) {
            item.removeClassName('hidden');
        });
                
  }
}


/* ********************************************************************************* */
/* ### Modal Layer Helper                                                        ### */
/* ********************************************************************************* */
MLHelper = {
  showVideo : function (strUrlVideo, strTitle, videoWidth, videoHeight, strUrlVideoXML, bgColor, tt) {
    Dialog.info(
      { 
        url: '/wii/pt_PT/channel/channel_interview_video.html', options: {method: 'get'} 
      },{ 
        id: "unique", 
        className: 'modal', 
        title: strTitle, 
        width: videoWidth, 
        zIndex: 100,
        onShow : function () { 
          FLVPlayer.embed('swfcontent', strUrlVideo, strUrlVideoXML, videoWidth, videoHeight, '/wii/videos/flvplayer_inside.swf', bgColor, tt);
          
          if(!$('swfcontent')) {
            setTimeout("MLHelper.resizeModal(\"swfcontent\")", 500);
          } else {
            MLHelper.resizeModal('swfcontent');
          }
          
          $('unique_close').observe('click', function() {
            Dialog.okCallback();
          });
        } 
      } 
    );      
  },
  showVideoWM : function (strUrlVideo, strTitle, videoWidth, videoHeight, strUrlVideoXML, bgColor, tt) {
    Dialog.info(
      {
        url: '/wii/pt_PT/channel/channel_interview_video.html', options: {method: 'get'}
      },{
        id: "unique",
        className: 'modalWM',
        title: strTitle,
        width: videoWidth,
        zIndex: 100,
        onShow : function () {
            FLVPlayer.embed('swfcontent', strUrlVideo, strUrlVideoXML, videoWidth, videoHeight, '/wii/videos/flvplayer_inside.swf', bgColor, tt);
          if(!$('swfcontent')) {
            setTimeout("MLHelper.resizeModal(\"swfcontent\")", 2500);
          } else {
            MLHelper.resizeModal('swfcontent');
          }
          $('unique_close').observe('click', function() {
            Dialog.okCallback();
          });
        }
      }
    );
  },
  showVideoExtern : function (strUrlVideo, strTitle, videoWidth, videoHeight, strUrlVideoXML, bgColor, tt) {
    Dialog.info(
      { 
        url: '/wii/pt_PT/channel/channel_interview_video.html', options: {method: 'get'} 
      },{ 
        id: "unique", 
        className: 'modal', 
        title: strTitle, 
        width: videoWidth, 
        zIndex: 100,
        onShow : function () { 
          FLVPlayer.embed('swfcontent', strUrlVideo, strUrlVideoXML, videoWidth, videoHeight, '/wii/videos/flvplayer_channel.swf', bgColor, tt);
          
          if(!$('swfcontent')) {
            setTimeout("MLHelper.resizeModal(\"swfcontent\")", 500);
          } else {
            MLHelper.resizeModal('swfcontent');
          }
          
          $('unique_close').observe('click', function() {
            Dialog.okCallback();
          });
        } 
      } 
    );      
  },
  showLayer : function (url, width, minHeight) {
    Dialog.info({ url: url, options: {method: 'get'} }, 
      { 
        id: "unique", 
        className: 'wiifit', 
        title: '', 
        width: width, 
        zIndex: 100,
        onShow : function () { 
          $('unique').innerHTML.evalScripts();
          MLHelper.resizeModal('modal_dialog_message');                    
        }
     });
  },
  showImage : function (url, title, width, height) {
    if (url == "loading") {
      if (this.img.complete) {
       MLHelper.resizeModal('imgcontent');
      } else {
       window.setTimeout("MLHelper.showImage(\"loading\")", 100)
      }
      return; 
    }
    this.img = new Image()
    this.img.src = url;
                      
        
    Dialog.info('<div id="imgcontent"><img src="'+this.img.src+'" width="'+width+'" height="'+height+'" alt="' + title + '" title="' + title + '"  /><\/div>', { 
      id: "unique", 
      className: 'modal', 
      title: title, 
      width: width, 
      recenterAuto: true,
      onShow : function() { 
        MLHelper.showImage("loading");  
                        
        $('unique_close').observe('click', function() {
          Dialog.okCallback();
        }); 
      }
    });
  },
    resizeModal : function(innerId) {
     var dim      = $(innerId).getDimensions();
     var mainDim  = $('unique').getDimensions();
     var mainPos  = new Position.cumulativeOffset($('unique'));
     var newLeft = mainPos[0] - (dim.width - mainDim.width) * 0.5; 
     var newTop  = mainPos[1] - (dim.height - mainDim.height) * 0.5;
     
     $('modal_dialog_message').setStyle({ width : dim.width + 'px', height : dim.height + 'px' } );
     $('unique_content').setStyle({ width : dim.width + 'px', height : dim.height + 'px' } );
     $('unique').setStyle({ width : dim.width + 'px', height : dim.height + 'px', left: newLeft + 'px', top: newTop + 'px' } );
     return;
   }           
 }

/* ********************************************************************************* */
/* ### CSS Helper                                                                ### */
/* ********************************************************************************* */
cssHelper = {
    addChildNodeClassNames : function(p) {
                var childElements = p.rootNode.childElements();
                var i = 0;
                
                childElements.each(function(childNode) {
          //console.log(childNode);
                    if (typeof childNode.className != 'undefined' && childNode.tagName == 'DIV') {
                $(childNode).addClassName(p.classeNames[i]);
                if (++i >= p.classeNames.length) i = 0;
            }
        });
                /* 
                
                
                var childNode = p.rootNode.firstChild;
                var i = 0;
        while (childNode != null) {
            if (typeof childNode.className != 'undefined' && childNode.tagName == 'DIV') {
                $(childNode).addClassName(p.classeNames[i]);
                if (++i >= p.classeNames.length) i = 0;
            }
            childNode = childNode.nextSibling;
        } */
    },
    findLastElement : function(p) {
       //elements = p.rootNode.getElementsByClassName(p.cssClass);
       elements = p.rootNode.select('.' + p.cssClass);
       elements[elements.length-1].addClassName(p.additionalClass);
    },

    fixVideoListHeight : function(p) {
        var childElements = p.rootNode.childElements();
        var i = 0;
        childElements.each(function(childNode) {
            if (typeof childNode.className != 'undefined' && childNode.tagName == 'DIV') {
                if (typeof $(childNode.getElementsByTagName('a')[1]).offsetHeight != "undefined") {
                     height = $(childNode.getElementsByTagName('a')[1]).offsetHeight;
                } else {
                     height = $(childNode.getElementsByTagName('a')[1]).getHeightt
                }
                  try {
                      if (childNode, height > 38)
                        childNode.getElementsByClassName('title')[0].addClassName("title_big");
                  } catch(e) { alert( e ) }
                if (++i >= 4) i = 0;
            }
        });
    }
    
}

/* ********************************************************************************* */
/* ### Interview Helper                                                           ### */
/* ********************************************************************************* */

var InterviewHelper = Class.create();
InterviewHelper.prototype = {
    initialize: function() {
        this.interviewContainer = $('interviewContent');
        this.interviewSubnav = $('interviewSubNav');
        this.activeCSSClassName = 'subMenuActive';
        this.pagingPrevious = $('prevPage');
        this.pagingNext = $('nextPage');
        this.activeNavItem = '';
        this.activeInterview = '';
        
        this._initalizeInterview()
    },
    _initalizeInterview : function() {
        if(this.interviewSubnav.childElements().length != 0) {
            if($('interviewIntro') != undefined && $('interviewIntro').visible) { 
                $('interviewIntro').down().show();
            }

            this.activeNavItem = this.interviewSubnav.down(0);
            this.activeNavItem.className = this.activeCSSClassName;
            
            this.activeInterview = this.interviewContainer.down(0);
            this.activeInterview.show();
            this._displayPagingNext(this.activeNavItem);
        }
    },
    _displayPagingNext : function(activeItem) {
        if (activeItem.next() != null) { 
            this.pagingNext.down().innerHTML = activeItem.next().down().innerHTML;
            this.pagingNext.show();
        }
        else { this.pagingNext.hide(); }
    },
    _displayPagingPrevious : function(activeItem) {
        if (activeItem.previous() != null) {
            this.pagingPrevious.down().innerHTML = activeItem.previous().down().innerHTML;
            this.pagingPrevious.show(); 
        }
        else { 
            this.pagingPrevious.hide(); 
            if($('interviewIntro') != undefined ) { 
                $('interviewIntro').show();
            }
        }
    },
    showInterview : function(navItem, interview, moodImg) {
        if($('interviewIntro') != undefined && $('interviewIntro').visible) { $('interviewIntro').hide();}
        
        this.activeNavItem.className = '';
        if(navItem.tagName == 'A') {
            this.activeNavItem = navItem.up(0);
        }
        else {
            this.activeNavItem = navItem;
        }
        this.activeNavItem.className = this.activeCSSClassName;
        
        this.activeInterview.hide();
        this.activeInterview = interview;
        this.activeInterview.show();
        
        this._displayPagingNext(this.activeNavItem);         
        this._displayPagingPrevious(this.activeNavItem);

        // Display topic specific mood image if set
        var topicMood = this.activeInterview.firstDescendant().value;
        if(topicMood == "" || topicMood == undefined || this.activeInterview.firstDescendant().tagName != "INPUT") {    } 
        else { $('interviewMood').src = topicMood;} 

        //stop Video Player      
        stopVideo();                         
    }                            
};


var flashProxyArray = new Array();
function initializeVideo(target,video_path,image_path, videoWidth, videoHeight) {                            
        var uid = new Date().getTime();
        var flashProxy = new FlashProxy(uid, '/wii/media/JavaScriptFlashGateway.swf');             
        
        var so = new SWFObject("/wii/media/interview_main.swf", target+"_swf", videoWidth, videoHeight + 30, "7");
        so.addParam("menu","true"); 
        so.addVariable("lcId", uid);
        so.addParam("quality", "high");
        so.addParam("allowscriptaccess", "always");
        so.addVariable("libSwf", "/wii/media/video_lib.swf");
        so.addVariable("langXml", "/wii/media/lang.xml");
        so.addVariable("mediaPath", video_path);
        so.addVariable("playerType", "basic");
        so.addVariable("thumbType", "hor");
        so.addVariable("playerWidth", videoWidth);
        so.addVariable("playerHeight", videoHeight); 
        so.addVariable("autoPlay", "false");
        so.addVariable("initImage", image_path);
        so.addVariable("wa", "true");
        so.write(target);

        flashProxyArray.push(flashProxy);
}

function stopVideo() {
    flashProxyArray.each(function(s) {
      s.call('stopVideo');
    });
}





/* ********************************************************************************* */
/* ### Survey Helper                                                           ### */
/* ********************************************************************************* */

function convertPNG(element) {
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  if ((version >= 5.5) && (version < 7) ) {
    var imgName = element.src;
    if (imgName.substring(imgName.length-3, imgName.length) == "png") {
         var imgID = (element.id) ? "id='" + element.id + "' " : "";
         var imgClass = (element.className) ? "class='" + element.className + "' " : "";
         var imgTitle = (element.title) ? "title='" + element.title + "' " : "title='" + element.alt + "' ";
         var imgStyle = "display:inline-block" + element.style.cssText ;
         if (element.parentElement.href) imgStyle = "cursor:hand;" + imgStyle;
         var strNewHTML = "<span " + imgID + imgClass + imgTitle
         + " style=\"" + "width:" + element.width + "px; height:" + element.height + "px;" + imgStyle + ";"
         + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
         + "(src=\'" + element.src + "\', sizingMethod='image');\"></span>" ;
         element.outerHTML = strNewHTML;
    }
    
  }  
} 


function checkIE6() {
  var arVersion = navigator.appVersion.split("MSIE");
  var version = parseFloat(arVersion[1]);
  return ((version >= 5.5) && (version < 7) );
} 


function SurveyNOE(surveyName, surveyFrequency, surveyExpireDate) {
    
    this.surveyName = surveyName;
    this.surveyFrequency = surveyFrequency;
    this.surveyExpireDate = surveyExpireDate;
    this.surveyElements = {
        layer: $('survey')
    };
    
    if (typeof SurveyNOE._initialized == "undefined") {
        SurveyNOE.prototype.init = function() {
            if(this.getCookie() == undefined) {
                randomValue = this.getRandomValue(1, this.surveyFrequency);
                if(randomValue == this.surveyFrequency) {
                    this.showSurvey();
                    this.setCookie(this.surveyName, "true", this.surveyExpireDate);
                    /* this.addEventHandler(window, "load", function() {          
                    }.bind(this)); */    
                }
            }
        },
         SurveyNOE.prototype.addEventHandler = function(oTarget, sEventType, fnHandler) {
            if (oTarget.addEventListener) {
              oTarget.addEventListener(sEventType, fnHandler, false);
            } else if (oTarget.attatchEvent) {
              oTarget.attatchEvent("on" + sEventType, fnHandler);
            } else {
              oTarget["on" + sEventType] = fnHandler;
            }
        },
        SurveyNOE.prototype.setCookie = function(cookieIdentifier, cookieValue, cookieExpire) {
           document.cookie = cookieIdentifier + "=" + cookieValue + "; expires=" + new Date(cookieExpire).toGMTString() + ";";    
        },
        SurveyNOE.prototype.getCookie = function() {
            var cookieArr = document.cookie.split(";");
            for(i=0; i < cookieArr.length; i++) {
                if(cookieArr[i].indexOf(this.surveyName) != -1) {
                    if (cookieArr[i].substr(cookieArr[i].indexOf("=")+1) == "true") return true;
                }
            }
        },
        SurveyNOE.prototype.getRandomValue = function(min,max) {
            if( min > max ) { return( -1 );    }
            if( min == max ) { return( min ); }
            return min + parseInt( Math.random() * ( max-min+1 ));
        },
        SurveyNOE.prototype.showSurvey = function() {
            $('overlayer').show();
            this.surveyElements.layer.show();
            if(checkIE6()) {
                var surveyImages = this.surveyElements.layer.getElementsByClassName("png");
                surveyImages.each(function(s) {
                    convertPNG(s);
                });
            }
        },
        SurveyNOE.prototype.hideSurvey = function() {
            this.surveyElements.layer.hide();
            $('overlayer').hide();
        }
    }
    SurveyNOE._initialized = true;
    this.init();                                    
}