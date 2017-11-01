/*
 DMXzone Accordion 2
 Version: 2.1.0
 (c) 2015 DMXzone.com
 @build 07-12-2015 16:24:15
*/
(function(c){var a={};c.fn.dmxAccordion=function(b){function d(){var a=this.accordion("option");this.accordion("refresh");this.accordion("destroy");this.accordion(a);return this}if("string"==typeof b)return"refresh"==b?d.apply(this):this.accordion.apply(this,Array.prototype.slice.call(arguments));var e=c.extend(!0,{},a,b),f=this;c.each(["activate","beforeActivate","create"],function(a,b){var c=e[b];"string"==typeof c&&(e[b]=function(){(new Function(c)).call();if("undefined"!==typeof MM_returnValue&&
null!==MM_returnValue)return MM_returnValue})});"undefined"==typeof e.active&&e.collapsible&&(e.active=!1);this.accordion(e);if(c.dmxDataBindings){var g=function(a){a.data("repeater")?a.data("repeater").hooks.add("afterRender",function(){h++;a.find(":data(repeater)").each(function(a,b){g(c(b))});setTimeout(function(){h--;0==h&&d.apply(f)},0)}):a.find(":data(repeater)").each(function(a,b){g(c(b))})},h=0;g(this)}}})(jQuery);
(function(c){"function"===typeof define&&define.amd?define(["jquery","./core","./widget"],c):c(jQuery)})(function(c){c.widget("ui.accordion",{version:"1.11.4",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},
showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var a=this.options;this.prevShow=this.prevHide=c();this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist");a.collapsible||!1!==a.active&&null!=a.active||(a.active=0);this._processPanels();0>a.active&&(a.active+=this.headers.length);this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():
c()}},_createIcons:function(){var a=this.options.icons;a&&(c("<span>").addClass("ui-accordion-header-icon ui-icon "+a.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(a.header).addClass(a.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var a;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").removeUniqueId();this._destroyIcons();a=this.headers.next().removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").css("display","").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeUniqueId();
"content"!==this.options.heightStyle&&a.css("height","")},_setOption:function(a,b){"active"===a?this._activate(b):("event"===a&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(b)),this._super(a,b),"collapsible"!==a||b||!1!==this.options.active||this._activate(0),"icons"===a&&(this._destroyIcons(),b&&this._createIcons()),"disabled"===a&&(this.element.toggleClass("ui-state-disabled",!!b).attr("aria-disabled",b),this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",
!!b)))},_keydown:function(a){if(!a.altKey&&!a.ctrlKey){var b=c.ui.keyCode,d=this.headers.length,e=this.headers.index(a.target),f=!1;switch(a.keyCode){case b.RIGHT:case b.DOWN:f=this.headers[(e+1)%d];break;case b.LEFT:case b.UP:f=this.headers[(e-1+d)%d];break;case b.SPACE:case b.ENTER:this._eventHandler(a);break;case b.HOME:f=this.headers[0];break;case b.END:f=this.headers[d-1]}f&&(c(a.target).attr("tabIndex",-1),c(f).attr("tabIndex",0),f.focus(),a.preventDefault())}},_panelKeyDown:function(a){a.keyCode===
c.ui.keyCode.UP&&a.ctrlKey&&c(a.currentTarget).prev().focus()},refresh:function(){var a=this.options;this._processPanels();!1===a.active&&!0===a.collapsible||!this.headers.length?(a.active=!1,this.active=c()):!1===a.active?this._activate(0):this.active.length&&!c.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(a.active=!1,this.active=c()):this._activate(Math.max(0,a.active-1)):a.active=this.headers.index(this.active);this._destroyIcons();
this._refresh()},_processPanels:function(){var a=this.headers,b=this.panels;this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-state-default ui-corner-all");this.panels=this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide();b&&(this._off(a.not(this.headers)),this._off(b.not(this.panels)))},_refresh:function(){var a,b=this.options,d=b.heightStyle,e=this.element.parent();
this.active=this._findActive(b.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all");this.active.next().addClass("ui-accordion-content-active").show();this.headers.attr("role","tab").each(function(){var a=c(this),b=a.uniqueId().attr("id"),d=a.next(),e=d.uniqueId().attr("id");a.attr("aria-controls",e);d.attr("aria-labelledby",b)}).next().attr("role","tabpanel");this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide();
this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0);this._createIcons();this._setupEvents(b.event);"fill"===d?(a=e.height(),this.element.siblings(":visible").each(function(){var b=c(this),d=b.css("position");"absolute"!==d&&"fixed"!==d&&(a-=b.outerHeight(!0))}),this.headers.each(function(){a-=c(this).outerHeight(!0)}),this.headers.next().each(function(){c(this).height(Math.max(0,
a-c(this).innerHeight()+c(this).height()))}).css("overflow","auto")):"auto"===d&&(a=0,this.headers.next().each(function(){a=Math.max(a,c(this).css("height","").height())}).height(a))},_activate:function(a){a=this._findActive(a)[0];a!==this.active[0]&&(a=a||this.active[0],this._eventHandler({target:a,currentTarget:a,preventDefault:c.noop}))},_findActive:function(a){return"number"===typeof a?this.headers.eq(a):c()},_setupEvents:function(a){var b={keydown:"_keydown"};a&&c.each(a.split(" "),function(a,
c){b[c]="_eventHandler"});this._off(this.headers.add(this.headers.next()));this._on(this.headers,b);this._on(this.headers.next(),{keydown:"_panelKeyDown"});this._hoverable(this.headers);this._focusable(this.headers)},_eventHandler:function(a){var b=this.options,d=this.active,e=c(a.currentTarget),f=e[0]===d[0],g=f&&b.collapsible,h=g?c():e.next(),l=d.next(),h={oldHeader:d,oldPanel:l,newHeader:g?c():e,newPanel:h};a.preventDefault();f&&!b.collapsible||!1===this._trigger("beforeActivate",a,h)||(b.active=
g?!1:this.headers.index(e),this.active=f?c():e,this._toggle(h),d.removeClass("ui-accordion-header-active ui-state-active"),b.icons&&d.children(".ui-accordion-header-icon").removeClass(b.icons.activeHeader).addClass(b.icons.header),f||(e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),b.icons&&e.children(".ui-accordion-header-icon").removeClass(b.icons.header).addClass(b.icons.activeHeader),e.next().addClass("ui-accordion-content-active")))},_toggle:function(a){var b=
a.newPanel,d=this.prevShow.length?this.prevShow:a.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0);this.prevShow=b;this.prevHide=d;this.options.animate?this._animate(b,d,a):(d.hide(),b.show(),this._toggleComplete(a));d.attr({"aria-hidden":"true"});d.prev().attr({"aria-selected":"false","aria-expanded":"false"});b.length&&d.length?d.prev().attr({tabIndex:-1,"aria-expanded":"false"}):b.length&&this.headers.filter(function(){return 0===parseInt(c(this).attr("tabIndex"),10)}).attr("tabIndex",-1);
b.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(a,b,c){var e,f,g,h=this,l=0,p=a.css("box-sizing"),k=a.length&&(!b.length||a.index()<b.index()),m=this.options.animate||{},k=k&&m.down||m,n=function(){h._toggleComplete(c)};"number"===typeof k&&(g=k);"string"===typeof k&&(f=k);f=f||k.easing||m.easing;g=g||k.duration||m.duration;if(!b.length)return a.animate(this.showProps,g,f,n);if(!a.length)return b.animate(this.hideProps,g,f,n);
e=a.show().outerHeight();b.animate(this.hideProps,{duration:g,easing:f,step:function(a,b){b.now=Math.round(a)}});a.hide().animate(this.showProps,{duration:g,easing:f,complete:n,step:function(a,c){c.now=Math.round(a);"height"!==c.prop?"content-box"===p&&(l+=c.now):"content"!==h.options.heightStyle&&(c.now=Math.round(e-b.outerHeight()-l),l=0)}})},_toggleComplete:function(a){var b=a.oldPanel;b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all");b.length&&
(b.parent()[0].className=b.parent()[0].className);this._trigger("activate",null,a)}})});
