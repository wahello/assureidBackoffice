//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

/* Package-scope variables */
var t, pageY, currTop;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/rochal_slimscroll/packages/rochal_slimscroll.js                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   // 3
//                                                                                                                //   // 4
// packages/rochal:slimscroll/jquery.slimscroll.js                                                                //   // 5
//                                                                                                                //   // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   // 7
                                                                                                                  //   // 8
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)                                                            // 1
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)                               // 2
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.                                         // 3
 *                                                                                                                // 4
 * Version: 1.3.3                                                                                                 // 5
 *                                                                                                                // 6
 */                                                                                                               // 7
(function($) {                                                                                                    // 8
                                                                                                                  // 9
  $.fn.extend({                                                                                                   // 10
    slimScroll: function(options) {                                                                               // 11
                                                                                                                  // 12
      var defaults = {                                                                                            // 13
                                                                                                                  // 14
        // width in pixels of the visible scroll area                                                             // 15
        width : 'auto',                                                                                           // 16
                                                                                                                  // 17
        // height in pixels of the visible scroll area                                                            // 18
        height : '250px',                                                                                         // 19
                                                                                                                  // 20
        // width in pixels of the scrollbar and rail                                                              // 21
        size : '7px',                                                                                             // 22
                                                                                                                  // 23
        // scrollbar color, accepts any hex/color value                                                           // 24
        color: '#000',                                                                                            // 25
                                                                                                                  // 26
        // scrollbar position - left/right                                                                        // 27
        position : 'right',                                                                                       // 28
                                                                                                                  // 29
        // distance in pixels between the side edge and the scrollbar                                             // 30
        distance : '1px',                                                                                         // 31
                                                                                                                  // 32
        // default scroll position on load - top / bottom / $('selector')                                         // 33
        start : 'top',                                                                                            // 34
                                                                                                                  // 35
        // sets scrollbar opacity                                                                                 // 36
        opacity : .4,                                                                                             // 37
                                                                                                                  // 38
        // enables always-on mode for the scrollbar                                                               // 39
        alwaysVisible : false,                                                                                    // 40
                                                                                                                  // 41
        // check if we should hide the scrollbar when user is hovering over                                       // 42
        disableFadeOut : false,                                                                                   // 43
                                                                                                                  // 44
        // sets visibility of the rail                                                                            // 45
        railVisible : false,                                                                                      // 46
                                                                                                                  // 47
        // sets rail color                                                                                        // 48
        railColor : '#333',                                                                                       // 49
                                                                                                                  // 50
        // sets rail opacity                                                                                      // 51
        railOpacity : .2,                                                                                         // 52
                                                                                                                  // 53
        // whether  we should use jQuery UI Draggable to enable bar dragging                                      // 54
        railDraggable : true,                                                                                     // 55
                                                                                                                  // 56
        // defautlt CSS class of the slimscroll rail                                                              // 57
        railClass : 'slimScrollRail',                                                                             // 58
                                                                                                                  // 59
        // defautlt CSS class of the slimscroll bar                                                               // 60
        barClass : 'slimScrollBar',                                                                               // 61
                                                                                                                  // 62
        // defautlt CSS class of the slimscroll wrapper                                                           // 63
        wrapperClass : 'slimScrollDiv',                                                                           // 64
                                                                                                                  // 65
        // check if mousewheel should scroll the window if we reach top/bottom                                    // 66
        allowPageScroll : false,                                                                                  // 67
                                                                                                                  // 68
        // scroll amount applied to each mouse wheel step                                                         // 69
        wheelStep : 20,                                                                                           // 70
                                                                                                                  // 71
        // scroll amount applied when user is using gestures                                                      // 72
        touchScrollStep : 200,                                                                                    // 73
                                                                                                                  // 74
        // sets border radius                                                                                     // 75
        borderRadius: '7px',                                                                                      // 76
                                                                                                                  // 77
        // sets border radius of the rail                                                                         // 78
        railBorderRadius : '7px'                                                                                  // 79
      };                                                                                                          // 80
                                                                                                                  // 81
      var o = $.extend(defaults, options);                                                                        // 82
                                                                                                                  // 83
      // do it for every element that matches selector                                                            // 84
      this.each(function(){                                                                                       // 85
                                                                                                                  // 86
      var isOverPanel, isOverBar, isDragg, queueHide, touchDif,                                                   // 87
        barHeight, percentScroll, lastScroll,                                                                     // 88
        divS = '<div></div>',                                                                                     // 89
        minBarHeight = 30,                                                                                        // 90
        releaseScroll = false;                                                                                    // 91
                                                                                                                  // 92
        // used in event handlers and for better minification                                                     // 93
        var me = $(this);                                                                                         // 94
                                                                                                                  // 95
        // ensure we are not binding it again                                                                     // 96
        if (me.parent().hasClass(o.wrapperClass))                                                                 // 97
        {                                                                                                         // 98
            // start from last bar position                                                                       // 99
            var offset = me.scrollTop();                                                                          // 100
                                                                                                                  // 101
            // find bar and rail                                                                                  // 102
            bar = me.parent().find('.' + o.barClass);                                                             // 103
            rail = me.parent().find('.' + o.railClass);                                                           // 104
                                                                                                                  // 105
            getBarHeight();                                                                                       // 106
                                                                                                                  // 107
            // check if we should scroll existing instance                                                        // 108
            if ($.isPlainObject(options))                                                                         // 109
            {                                                                                                     // 110
              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed // 111
              if ( 'height' in options && options.height == 'auto' ) {                                            // 112
                me.parent().css('height', 'auto');                                                                // 113
                me.css('height', 'auto');                                                                         // 114
                var height = me.parent().parent().height();                                                       // 115
                me.parent().css('height', height);                                                                // 116
                me.css('height', height);                                                                         // 117
              }                                                                                                   // 118
                                                                                                                  // 119
              if ('scrollTo' in options)                                                                          // 120
              {                                                                                                   // 121
                // jump to a static point                                                                         // 122
                offset = parseInt(o.scrollTo);                                                                    // 123
              }                                                                                                   // 124
              else if ('scrollBy' in options)                                                                     // 125
              {                                                                                                   // 126
                // jump by value pixels                                                                           // 127
                offset += parseInt(o.scrollBy);                                                                   // 128
              }                                                                                                   // 129
              else if ('destroy' in options)                                                                      // 130
              {                                                                                                   // 131
                // remove slimscroll elements                                                                     // 132
                bar.remove();                                                                                     // 133
                rail.remove();                                                                                    // 134
                me.unwrap();                                                                                      // 135
                return;                                                                                           // 136
              }                                                                                                   // 137
                                                                                                                  // 138
              // scroll content by the given offset                                                               // 139
              scrollContent(offset, false, true);                                                                 // 140
            }                                                                                                     // 141
                                                                                                                  // 142
            return;                                                                                               // 143
        }                                                                                                         // 144
        else if ($.isPlainObject(options))                                                                        // 145
        {                                                                                                         // 146
            if ('destroy' in options)                                                                             // 147
            {                                                                                                     // 148
            	return;                                                                                              // 149
            }                                                                                                     // 150
        }                                                                                                         // 151
                                                                                                                  // 152
        // optionally set height to the parent's height                                                           // 153
        o.height = (o.height == 'auto') ? me.parent().height() : o.height;                                        // 154
                                                                                                                  // 155
        // wrap content                                                                                           // 156
        var wrapper = $(divS)                                                                                     // 157
          .addClass(o.wrapperClass)                                                                               // 158
          .css({                                                                                                  // 159
            position: 'relative',                                                                                 // 160
            overflow: 'hidden',                                                                                   // 161
            width: o.width,                                                                                       // 162
            height: o.height                                                                                      // 163
          });                                                                                                     // 164
                                                                                                                  // 165
        // update style for the div                                                                               // 166
        me.css({                                                                                                  // 167
          overflow: 'hidden',                                                                                     // 168
          width: o.width,                                                                                         // 169
          height: o.height                                                                                        // 170
        });                                                                                                       // 171
                                                                                                                  // 172
        // create scrollbar rail                                                                                  // 173
        var rail = $(divS)                                                                                        // 174
          .addClass(o.railClass)                                                                                  // 175
          .css({                                                                                                  // 176
            width: o.size,                                                                                        // 177
            height: '100%',                                                                                       // 178
            position: 'absolute',                                                                                 // 179
            top: 0,                                                                                               // 180
            display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',                                       // 181
            'border-radius': o.railBorderRadius,                                                                  // 182
            background: o.railColor,                                                                              // 183
            opacity: o.railOpacity,                                                                               // 184
            zIndex: 90                                                                                            // 185
          });                                                                                                     // 186
                                                                                                                  // 187
        // create scrollbar                                                                                       // 188
        var bar = $(divS)                                                                                         // 189
          .addClass(o.barClass)                                                                                   // 190
          .css({                                                                                                  // 191
            background: o.color,                                                                                  // 192
            width: o.size,                                                                                        // 193
            position: 'absolute',                                                                                 // 194
            top: 0,                                                                                               // 195
            opacity: o.opacity,                                                                                   // 196
            display: o.alwaysVisible ? 'block' : 'none',                                                          // 197
            'border-radius' : o.borderRadius,                                                                     // 198
            BorderRadius: o.borderRadius,                                                                         // 199
            MozBorderRadius: o.borderRadius,                                                                      // 200
            WebkitBorderRadius: o.borderRadius,                                                                   // 201
            zIndex: 99                                                                                            // 202
          });                                                                                                     // 203
                                                                                                                  // 204
        // set position                                                                                           // 205
        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };                      // 206
        rail.css(posCss);                                                                                         // 207
        bar.css(posCss);                                                                                          // 208
                                                                                                                  // 209
        // wrap it                                                                                                // 210
        me.wrap(wrapper);                                                                                         // 211
                                                                                                                  // 212
        // append to parent div                                                                                   // 213
        me.parent().append(bar);                                                                                  // 214
        me.parent().append(rail);                                                                                 // 215
                                                                                                                  // 216
        // make it draggable and no longer dependent on the jqueryUI                                              // 217
        if (o.railDraggable){                                                                                     // 218
          bar.bind("mousedown", function(e) {                                                                     // 219
            var $doc = $(document);                                                                               // 220
            isDragg = true;                                                                                       // 221
            t = parseFloat(bar.css('top'));                                                                       // 222
            pageY = e.pageY;                                                                                      // 223
                                                                                                                  // 224
            $doc.bind("mousemove.slimscroll", function(e){                                                        // 225
              currTop = t + e.pageY - pageY;                                                                      // 226
              bar.css('top', currTop);                                                                            // 227
              scrollContent(0, bar.position().top, false);// scroll content                                       // 228
            });                                                                                                   // 229
                                                                                                                  // 230
            $doc.bind("mouseup.slimscroll", function(e) {                                                         // 231
              isDragg = false;hideBar();                                                                          // 232
              $doc.unbind('.slimscroll');                                                                         // 233
            });                                                                                                   // 234
            return false;                                                                                         // 235
          }).bind("selectstart.slimscroll", function(e){                                                          // 236
            e.stopPropagation();                                                                                  // 237
            e.preventDefault();                                                                                   // 238
            return false;                                                                                         // 239
          });                                                                                                     // 240
        }                                                                                                         // 241
                                                                                                                  // 242
        // on rail over                                                                                           // 243
        rail.hover(function(){                                                                                    // 244
          showBar();                                                                                              // 245
        }, function(){                                                                                            // 246
          hideBar();                                                                                              // 247
        });                                                                                                       // 248
                                                                                                                  // 249
        // on bar over                                                                                            // 250
        bar.hover(function(){                                                                                     // 251
          isOverBar = true;                                                                                       // 252
        }, function(){                                                                                            // 253
          isOverBar = false;                                                                                      // 254
        });                                                                                                       // 255
                                                                                                                  // 256
        // show on parent mouseover                                                                               // 257
        me.hover(function(){                                                                                      // 258
          isOverPanel = true;                                                                                     // 259
          showBar();                                                                                              // 260
          hideBar();                                                                                              // 261
        }, function(){                                                                                            // 262
          isOverPanel = false;                                                                                    // 263
          hideBar();                                                                                              // 264
        });                                                                                                       // 265
                                                                                                                  // 266
        // support for mobile                                                                                     // 267
        me.bind('touchstart', function(e,b){                                                                      // 268
          if (e.originalEvent.touches.length)                                                                     // 269
          {                                                                                                       // 270
            // record where touch started                                                                         // 271
            touchDif = e.originalEvent.touches[0].pageY;                                                          // 272
          }                                                                                                       // 273
        });                                                                                                       // 274
                                                                                                                  // 275
        me.bind('touchmove', function(e){                                                                         // 276
          // prevent scrolling the page if necessary                                                              // 277
          if(!releaseScroll)                                                                                      // 278
          {                                                                                                       // 279
  		      e.originalEvent.preventDefault();                                                                       // 280
		      }                                                                                                         // 281
          if (e.originalEvent.touches.length)                                                                     // 282
          {                                                                                                       // 283
            // see how far user swiped                                                                            // 284
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;                         // 285
            // scroll content                                                                                     // 286
            scrollContent(diff, true);                                                                            // 287
            touchDif = e.originalEvent.touches[0].pageY;                                                          // 288
          }                                                                                                       // 289
        });                                                                                                       // 290
                                                                                                                  // 291
        // set up initial height                                                                                  // 292
        getBarHeight();                                                                                           // 293
                                                                                                                  // 294
        // check start position                                                                                   // 295
        if (o.start === 'bottom')                                                                                 // 296
        {                                                                                                         // 297
          // scroll content to bottom                                                                             // 298
          bar.css({ top: me.outerHeight() - bar.outerHeight() });                                                 // 299
          scrollContent(0, true);                                                                                 // 300
        }                                                                                                         // 301
        else if (o.start !== 'top')                                                                               // 302
        {                                                                                                         // 303
          // assume jQuery selector                                                                               // 304
          scrollContent($(o.start).position().top, null, true);                                                   // 305
                                                                                                                  // 306
          // make sure bar stays hidden                                                                           // 307
          if (!o.alwaysVisible) { bar.hide(); }                                                                   // 308
        }                                                                                                         // 309
                                                                                                                  // 310
        // attach scroll events                                                                                   // 311
        attachWheel();                                                                                            // 312
                                                                                                                  // 313
        function _onWheel(e)                                                                                      // 314
        {                                                                                                         // 315
          // use mouse wheel only when mouse is over                                                              // 316
          if (!isOverPanel) { return; }                                                                           // 317
                                                                                                                  // 318
          var e = e || window.event;                                                                              // 319
                                                                                                                  // 320
          var delta = 0;                                                                                          // 321
          if (e.wheelDelta) { delta = -e.wheelDelta/120; }                                                        // 322
          if (e.detail) { delta = e.detail / 3; }                                                                 // 323
                                                                                                                  // 324
          var target = e.target || e.srcTarget || e.srcElement;                                                   // 325
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {                                          // 326
            // scroll content                                                                                     // 327
            scrollContent(delta, true);                                                                           // 328
          }                                                                                                       // 329
                                                                                                                  // 330
          // stop window scroll                                                                                   // 331
          if (e.preventDefault && !releaseScroll) { e.preventDefault(); }                                         // 332
          if (!releaseScroll) { e.returnValue = false; }                                                          // 333
        }                                                                                                         // 334
                                                                                                                  // 335
        function scrollContent(y, isWheel, isJump)                                                                // 336
        {                                                                                                         // 337
          releaseScroll = false;                                                                                  // 338
          var delta = y;                                                                                          // 339
          var maxTop = me.outerHeight() - bar.outerHeight();                                                      // 340
                                                                                                                  // 341
          if (isWheel)                                                                                            // 342
          {                                                                                                       // 343
            // move bar with mouse wheel                                                                          // 344
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();               // 345
                                                                                                                  // 346
            // move bar, make sure it doesn't go out                                                              // 347
            delta = Math.min(Math.max(delta, 0), maxTop);                                                         // 348
                                                                                                                  // 349
            // if scrolling down, make sure a fractional change to the                                            // 350
            // scroll position isn't rounded away when the scrollbar's CSS is set                                 // 351
            // this flooring of delta would happened automatically when                                           // 352
            // bar.css is set below, but we floor here for clarity                                                // 353
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);                                               // 354
                                                                                                                  // 355
            // scroll the scrollbar                                                                               // 356
            bar.css({ top: delta + 'px' });                                                                       // 357
          }                                                                                                       // 358
                                                                                                                  // 359
          // calculate actual scroll amount                                                                       // 360
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());                      // 361
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());                                        // 362
                                                                                                                  // 363
          if (isJump)                                                                                             // 364
          {                                                                                                       // 365
            delta = y;                                                                                            // 366
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();                                        // 367
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);                                                 // 368
            bar.css({ top: offsetTop + 'px' });                                                                   // 369
          }                                                                                                       // 370
                                                                                                                  // 371
          // scroll content                                                                                       // 372
          me.scrollTop(delta);                                                                                    // 373
                                                                                                                  // 374
          // fire scrolling event                                                                                 // 375
          me.trigger('slimscrolling', ~~delta);                                                                   // 376
                                                                                                                  // 377
          // ensure bar is visible                                                                                // 378
          showBar();                                                                                              // 379
                                                                                                                  // 380
          // trigger hide when scroll is stopped                                                                  // 381
          hideBar();                                                                                              // 382
        }                                                                                                         // 383
                                                                                                                  // 384
        function attachWheel()                                                                                    // 385
        {                                                                                                         // 386
          if (window.addEventListener)                                                                            // 387
          {                                                                                                       // 388
            this.addEventListener('DOMMouseScroll', _onWheel, false );                                            // 389
            this.addEventListener('mousewheel', _onWheel, false );                                                // 390
          }                                                                                                       // 391
          else                                                                                                    // 392
          {                                                                                                       // 393
            document.attachEvent("onmousewheel", _onWheel)                                                        // 394
          }                                                                                                       // 395
        }                                                                                                         // 396
                                                                                                                  // 397
        function getBarHeight()                                                                                   // 398
        {                                                                                                         // 399
          // calculate scrollbar height and make sure it is not too small                                         // 400
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);         // 401
          bar.css({ height: barHeight + 'px' });                                                                  // 402
                                                                                                                  // 403
          // hide scrollbar if content is not long enough                                                         // 404
          var display = barHeight == me.outerHeight() ? 'none' : 'block';                                         // 405
          bar.css({ display: display });                                                                          // 406
        }                                                                                                         // 407
                                                                                                                  // 408
        function showBar()                                                                                        // 409
        {                                                                                                         // 410
          // recalculate bar height                                                                               // 411
          getBarHeight();                                                                                         // 412
          clearTimeout(queueHide);                                                                                // 413
                                                                                                                  // 414
          // when bar reached top or bottom                                                                       // 415
          if (percentScroll == ~~percentScroll)                                                                   // 416
          {                                                                                                       // 417
            //release wheel                                                                                       // 418
            releaseScroll = o.allowPageScroll;                                                                    // 419
                                                                                                                  // 420
            // publish approporiate event                                                                         // 421
            if (lastScroll != percentScroll)                                                                      // 422
            {                                                                                                     // 423
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';                                              // 424
                me.trigger('slimscroll', msg);                                                                    // 425
            }                                                                                                     // 426
          }                                                                                                       // 427
          else                                                                                                    // 428
          {                                                                                                       // 429
            releaseScroll = false;                                                                                // 430
          }                                                                                                       // 431
          lastScroll = percentScroll;                                                                             // 432
                                                                                                                  // 433
          // show only when required                                                                              // 434
          if(barHeight >= me.outerHeight()) {                                                                     // 435
            //allow window scroll                                                                                 // 436
            releaseScroll = true;                                                                                 // 437
            return;                                                                                               // 438
          }                                                                                                       // 439
          bar.stop(true,true).fadeIn('fast');                                                                     // 440
          if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }                                             // 441
        }                                                                                                         // 442
                                                                                                                  // 443
        function hideBar()                                                                                        // 444
        {                                                                                                         // 445
          // only hide when options allow it                                                                      // 446
          if (!o.alwaysVisible)                                                                                   // 447
          {                                                                                                       // 448
            queueHide = setTimeout(function(){                                                                    // 449
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)                                   // 450
              {                                                                                                   // 451
                bar.fadeOut('slow');                                                                              // 452
                rail.fadeOut('slow');                                                                             // 453
              }                                                                                                   // 454
            }, 1000);                                                                                             // 455
          }                                                                                                       // 456
        }                                                                                                         // 457
                                                                                                                  // 458
      });                                                                                                         // 459
                                                                                                                  // 460
      // maintain chainability                                                                                    // 461
      return this;                                                                                                // 462
    }                                                                                                             // 463
  });                                                                                                             // 464
                                                                                                                  // 465
  $.fn.extend({                                                                                                   // 466
    slimscroll: $.fn.slimScroll                                                                                   // 467
  });                                                                                                             // 468
                                                                                                                  // 469
})(jQuery);                                                                                                       // 470
                                                                                                                  // 471
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   // 480
                                                                                                                       // 481
}).call(this);                                                                                                         // 482
                                                                                                                       // 483
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['rochal:slimscroll'] = {};

})();
