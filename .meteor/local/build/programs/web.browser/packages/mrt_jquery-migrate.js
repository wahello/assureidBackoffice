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

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                          //
// packages/mrt_jquery-migrate/packages/mrt_jquery-migrate.js                                               //
//                                                                                                          //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                            //
(function () {                                                                                              // 1
                                                                                                            // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                                   //     // 4
// packages/mrt:jquery-migrate/client/jquery-migrate-1.2.1.js                                        //     // 5
//                                                                                                   //     // 6
///////////////////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                                     //     // 8
/*!                                                                                                  // 1   // 9
 * jQuery Migrate - v1.2.1 - 2013-05-08                                                              // 2   // 10
 * https://github.com/jquery/jquery-migrate                                                          // 3   // 11
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors; Licensed MIT                 // 4   // 12
 */                                                                                                  // 5   // 13
(function( jQuery, window, undefined ) {                                                             // 6   // 14
// See http://bugs.jquery.com/ticket/13335                                                           // 7   // 15
// "use strict";                                                                                     // 8   // 16
                                                                                                     // 9   // 17
                                                                                                     // 10  // 18
var warnedAbout = {};                                                                                // 11  // 19
                                                                                                     // 12  // 20
// List of warnings already given; public read only                                                  // 13  // 21
jQuery.migrateWarnings = [];                                                                         // 14  // 22
                                                                                                     // 15  // 23
// Set to true to prevent console output; migrateWarnings still maintained                           // 16  // 24
// jQuery.migrateMute = false;                                                                       // 17  // 25
                                                                                                     // 18  // 26
// Show a message on the console so devs know we're active                                           // 19  // 27
if ( !jQuery.migrateMute && window.console && window.console.log ) {                                 // 20  // 28
	window.console.log("JQMIGRATE: Logging is active");                                                 // 21  // 29
}                                                                                                    // 22  // 30
                                                                                                     // 23  // 31
// Set to false to disable traces that appear with warnings                                          // 24  // 32
if ( jQuery.migrateTrace === undefined ) {                                                           // 25  // 33
	jQuery.migrateTrace = true;                                                                         // 26  // 34
}                                                                                                    // 27  // 35
                                                                                                     // 28  // 36
// Forget any warnings we've already given; public                                                   // 29  // 37
jQuery.migrateReset = function() {                                                                   // 30  // 38
	warnedAbout = {};                                                                                   // 31  // 39
	jQuery.migrateWarnings.length = 0;                                                                  // 32  // 40
};                                                                                                   // 33  // 41
                                                                                                     // 34  // 42
function migrateWarn( msg) {                                                                         // 35  // 43
	var console = window.console;                                                                       // 36  // 44
	if ( !warnedAbout[ msg ] ) {                                                                        // 37  // 45
		warnedAbout[ msg ] = true;                                                                         // 38  // 46
		jQuery.migrateWarnings.push( msg );                                                                // 39  // 47
		if ( console && console.warn && !jQuery.migrateMute ) {                                            // 40  // 48
			console.warn( "JQMIGRATE: " + msg );                                                              // 41  // 49
			if ( jQuery.migrateTrace && console.trace ) {                                                     // 42  // 50
				console.trace();                                                                                 // 43  // 51
			}                                                                                                 // 44  // 52
		}                                                                                                  // 45  // 53
	}                                                                                                   // 46  // 54
}                                                                                                    // 47  // 55
                                                                                                     // 48  // 56
function migrateWarnProp( obj, prop, value, msg ) {                                                  // 49  // 57
	if ( Object.defineProperty ) {                                                                      // 50  // 58
		// On ES5 browsers (non-oldIE), warn if the code tries to get prop;                                // 51  // 59
		// allow property to be overwritten in case some other plugin wants it                             // 52  // 60
		try {                                                                                              // 53  // 61
			Object.defineProperty( obj, prop, {                                                               // 54  // 62
				configurable: true,                                                                              // 55  // 63
				enumerable: true,                                                                                // 56  // 64
				get: function() {                                                                                // 57  // 65
					migrateWarn( msg );                                                                             // 58  // 66
					return value;                                                                                   // 59  // 67
				},                                                                                               // 60  // 68
				set: function( newValue ) {                                                                      // 61  // 69
					migrateWarn( msg );                                                                             // 62  // 70
					value = newValue;                                                                               // 63  // 71
				}                                                                                                // 64  // 72
			});                                                                                               // 65  // 73
			return;                                                                                           // 66  // 74
		} catch( err ) {                                                                                   // 67  // 75
			// IE8 is a dope about Object.defineProperty, can't warn there                                    // 68  // 76
		}                                                                                                  // 69  // 77
	}                                                                                                   // 70  // 78
                                                                                                     // 71  // 79
	// Non-ES5 (or broken) browser; just set the property                                               // 72  // 80
	jQuery._definePropertyBroken = true;                                                                // 73  // 81
	obj[ prop ] = value;                                                                                // 74  // 82
}                                                                                                    // 75  // 83
                                                                                                     // 76  // 84
if ( document.compatMode === "BackCompat" ) {                                                        // 77  // 85
	// jQuery has never supported or tested Quirks Mode                                                 // 78  // 86
	migrateWarn( "jQuery is not compatible with Quirks Mode" );                                         // 79  // 87
}                                                                                                    // 80  // 88
                                                                                                     // 81  // 89
                                                                                                     // 82  // 90
var attrFn = jQuery( "<input/>", { size: 1 } ).attr("size") && jQuery.attrFn,                        // 83  // 91
	oldAttr = jQuery.attr,                                                                              // 84  // 92
	valueAttrGet = jQuery.attrHooks.value && jQuery.attrHooks.value.get ||                              // 85  // 93
		function() { return null; },                                                                       // 86  // 94
	valueAttrSet = jQuery.attrHooks.value && jQuery.attrHooks.value.set ||                              // 87  // 95
		function() { return undefined; },                                                                  // 88  // 96
	rnoType = /^(?:input|button)$/i,                                                                    // 89  // 97
	rnoAttrNodeType = /^[238]$/,                                                                        // 90  // 98
	rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	ruseDefault = /^(?:checked|selected)$/i;                                                            // 92  // 100
                                                                                                     // 93  // 101
// jQuery.attrFn                                                                                     // 94  // 102
migrateWarnProp( jQuery, "attrFn", attrFn || {}, "jQuery.attrFn is deprecated" );                    // 95  // 103
                                                                                                     // 96  // 104
jQuery.attr = function( elem, name, value, pass ) {                                                  // 97  // 105
	var lowerName = name.toLowerCase(),                                                                 // 98  // 106
		nType = elem && elem.nodeType;                                                                     // 99  // 107
                                                                                                     // 100
	if ( pass ) {                                                                                       // 101
		// Since pass is used internally, we only warn for new jQuery                                      // 102
		// versions where there isn't a pass arg in the formal params                                      // 103
		if ( oldAttr.length < 4 ) {                                                                        // 104
			migrateWarn("jQuery.fn.attr( props, pass ) is deprecated");                                       // 105
		}                                                                                                  // 106
		if ( elem && !rnoAttrNodeType.test( nType ) &&                                                     // 107
			(attrFn ? name in attrFn : jQuery.isFunction(jQuery.fn[name])) ) {                                // 108
			return jQuery( elem )[ name ]( value );                                                           // 109
		}                                                                                                  // 110
	}                                                                                                   // 111
                                                                                                     // 112
	// Warn if user tries to set `type`, since it breaks on IE 6/7/8; by checking                       // 113
	// for disconnected elements we don't warn on $( "<button>", { type: "button" } ).                  // 114
	if ( name === "type" && value !== undefined && rnoType.test( elem.nodeName ) && elem.parentNode ) { // 115
		migrateWarn("Can't change the 'type' of an input or button in IE 6/7/8");                          // 116
	}                                                                                                   // 117
                                                                                                     // 118
	// Restore boolHook for boolean property/attribute synchronization                                  // 119
	if ( !jQuery.attrHooks[ lowerName ] && rboolean.test( lowerName ) ) {                               // 120
		jQuery.attrHooks[ lowerName ] = {                                                                  // 121
			get: function( elem, name ) {                                                                     // 122
				// Align boolean attributes with corresponding properties                                        // 123
				// Fall back to attribute presence where some booleans are not supported                         // 124
				var attrNode,                                                                                    // 125
					property = jQuery.prop( elem, name );                                                           // 126
				return property === true || typeof property !== "boolean" &&                                     // 127
					( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?                    // 128
                                                                                                     // 129
					name.toLowerCase() :                                                                            // 130
					undefined;                                                                                      // 131
			},                                                                                                // 132
			set: function( elem, value, name ) {                                                              // 133
				var propName;                                                                                    // 134
				if ( value === false ) {                                                                         // 135
					// Remove boolean attributes when set to false                                                  // 136
					jQuery.removeAttr( elem, name );                                                                // 137
				} else {                                                                                         // 138
					// value is true since we know at this point it's type boolean and not false                    // 139
					// Set boolean attributes to the same name and set the DOM property                             // 140
					propName = jQuery.propFix[ name ] || name;                                                      // 141
					if ( propName in elem ) {                                                                       // 142
						// Only set the IDL specifically if it already exists on the element                           // 143
						elem[ propName ] = true;                                                                       // 144
					}                                                                                               // 145
                                                                                                     // 146
					elem.setAttribute( name, name.toLowerCase() );                                                  // 147
				}                                                                                                // 148
				return name;                                                                                     // 149
			}                                                                                                 // 150
		};                                                                                                 // 151
                                                                                                     // 152
		// Warn only for attributes that can remain distinct from their properties post-1.9                // 153
		if ( ruseDefault.test( lowerName ) ) {                                                             // 154
			migrateWarn( "jQuery.fn.attr('" + lowerName + "') may use property instead of attribute" );       // 155
		}                                                                                                  // 156
	}                                                                                                   // 157
                                                                                                     // 158
	return oldAttr.call( jQuery, elem, name, value );                                                   // 159
};                                                                                                   // 160
                                                                                                     // 161
// attrHooks: value                                                                                  // 162
jQuery.attrHooks.value = {                                                                           // 163
	get: function( elem, name ) {                                                                       // 164
		var nodeName = ( elem.nodeName || "" ).toLowerCase();                                              // 165
		if ( nodeName === "button" ) {                                                                     // 166
			return valueAttrGet.apply( this, arguments );                                                     // 167
		}                                                                                                  // 168
		if ( nodeName !== "input" && nodeName !== "option" ) {                                             // 169
			migrateWarn("jQuery.fn.attr('value') no longer gets properties");                                 // 170
		}                                                                                                  // 171
		return name in elem ?                                                                              // 172
			elem.value :                                                                                      // 173
			null;                                                                                             // 174
	},                                                                                                  // 175
	set: function( elem, value ) {                                                                      // 176
		var nodeName = ( elem.nodeName || "" ).toLowerCase();                                              // 177
		if ( nodeName === "button" ) {                                                                     // 178
			return valueAttrSet.apply( this, arguments );                                                     // 179
		}                                                                                                  // 180
		if ( nodeName !== "input" && nodeName !== "option" ) {                                             // 181
			migrateWarn("jQuery.fn.attr('value', val) no longer sets properties");                            // 182
		}                                                                                                  // 183
		// Does not return so that setAttribute is also used                                               // 184
		elem.value = value;                                                                                // 185
	}                                                                                                   // 186
};                                                                                                   // 187
                                                                                                     // 188
                                                                                                     // 189
var matched, browser,                                                                                // 190
	oldInit = jQuery.fn.init,                                                                           // 191
	oldParseJSON = jQuery.parseJSON,                                                                    // 192
	// Note: XSS check is done below after string is trimmed                                            // 193
	rquickExpr = /^([^<]*)(<[\w\W]+>)([^>]*)$/;                                                         // 194
                                                                                                     // 195
// $(html) "looks like html" rule change                                                             // 196
jQuery.fn.init = function( selector, context, rootjQuery ) {                                         // 197
	var match;                                                                                          // 198
                                                                                                     // 199
	if ( selector && typeof selector === "string" && !jQuery.isPlainObject( context ) &&                // 200
			(match = rquickExpr.exec( jQuery.trim( selector ) )) && match[ 0 ] ) {                            // 201
		// This is an HTML string according to the "old" rules; is it still?                               // 202
		if ( selector.charAt( 0 ) !== "<" ) {                                                              // 203
			migrateWarn("$(html) HTML strings must start with '<' character");                                // 204
		}                                                                                                  // 205
		if ( match[ 3 ] ) {                                                                                // 206
			migrateWarn("$(html) HTML text after last tag is ignored");                                       // 207
		}                                                                                                  // 208
		// Consistently reject any HTML-like string starting with a hash (#9521)                           // 209
		// Note that this may break jQuery 1.6.x code that otherwise would work.                           // 210
		if ( match[ 0 ].charAt( 0 ) === "#" ) {                                                            // 211
			migrateWarn("HTML string cannot start with a '#' character");                                     // 212
			jQuery.error("JQMIGRATE: Invalid selector string (XSS)");                                         // 213
		}                                                                                                  // 214
		// Now process using loose rules; let pre-1.8 play too                                             // 215
		if ( context && context.context ) {                                                                // 216
			// jQuery object as context; parseHTML expects a DOM object                                       // 217
			context = context.context;                                                                        // 218
		}                                                                                                  // 219
		if ( jQuery.parseHTML ) {                                                                          // 220
			return oldInit.call( this, jQuery.parseHTML( match[ 2 ], context, true ),                         // 221
					context, rootjQuery );                                                                          // 222
		}                                                                                                  // 223
	}                                                                                                   // 224
	return oldInit.apply( this, arguments );                                                            // 225
};                                                                                                   // 226
jQuery.fn.init.prototype = jQuery.fn;                                                                // 227
                                                                                                     // 228
// Let $.parseJSON(falsy_value) return null                                                          // 229
jQuery.parseJSON = function( json ) {                                                                // 230
	if ( !json && json !== null ) {                                                                     // 231
		migrateWarn("jQuery.parseJSON requires a valid JSON string");                                      // 232
		return null;                                                                                       // 233
	}                                                                                                   // 234
	return oldParseJSON.apply( this, arguments );                                                       // 235
};                                                                                                   // 236
                                                                                                     // 237
jQuery.uaMatch = function( ua ) {                                                                    // 238
	ua = ua.toLowerCase();                                                                              // 239
                                                                                                     // 240
	var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||                                                   // 241
		/(webkit)[ \/]([\w.]+)/.exec( ua ) ||                                                              // 242
		/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||                                                 // 243
		/(msie) ([\w.]+)/.exec( ua ) ||                                                                    // 244
		ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||                      // 245
		[];                                                                                                // 246
                                                                                                     // 247
	return {                                                                                            // 248
		browser: match[ 1 ] || "",                                                                         // 249
		version: match[ 2 ] || "0"                                                                         // 250
	};                                                                                                  // 251
};                                                                                                   // 252
                                                                                                     // 253
// Don't clobber any existing jQuery.browser in case it's different                                  // 254
if ( !jQuery.browser ) {                                                                             // 255
	matched = jQuery.uaMatch( navigator.userAgent );                                                    // 256
	browser = {};                                                                                       // 257
                                                                                                     // 258
	if ( matched.browser ) {                                                                            // 259
		browser[ matched.browser ] = true;                                                                 // 260
		browser.version = matched.version;                                                                 // 261
	}                                                                                                   // 262
                                                                                                     // 263
	// Chrome is Webkit, but Webkit is also Safari.                                                     // 264
	if ( browser.chrome ) {                                                                             // 265
		browser.webkit = true;                                                                             // 266
	} else if ( browser.webkit ) {                                                                      // 267
		browser.safari = true;                                                                             // 268
	}                                                                                                   // 269
                                                                                                     // 270
	jQuery.browser = browser;                                                                           // 271
}                                                                                                    // 272
                                                                                                     // 273
// Warn if the code tries to get jQuery.browser                                                      // 274
migrateWarnProp( jQuery, "browser", jQuery.browser, "jQuery.browser is deprecated" );                // 275
                                                                                                     // 276
jQuery.sub = function() {                                                                            // 277
	function jQuerySub( selector, context ) {                                                           // 278
		return new jQuerySub.fn.init( selector, context );                                                 // 279
	}                                                                                                   // 280
	jQuery.extend( true, jQuerySub, this );                                                             // 281
	jQuerySub.superclass = this;                                                                        // 282
	jQuerySub.fn = jQuerySub.prototype = this();                                                        // 283
	jQuerySub.fn.constructor = jQuerySub;                                                               // 284
	jQuerySub.sub = this.sub;                                                                           // 285
	jQuerySub.fn.init = function init( selector, context ) {                                            // 286
		if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {                   // 287
			context = jQuerySub( context );                                                                   // 288
		}                                                                                                  // 289
                                                                                                     // 290
		return jQuery.fn.init.call( this, selector, context, rootjQuerySub );                              // 291
	};                                                                                                  // 292
	jQuerySub.fn.init.prototype = jQuerySub.fn;                                                         // 293
	var rootjQuerySub = jQuerySub(document);                                                            // 294
	migrateWarn( "jQuery.sub() is deprecated" );                                                        // 295
	return jQuerySub;                                                                                   // 296
};                                                                                                   // 297
                                                                                                     // 298
                                                                                                     // 299
// Ensure that $.ajax gets the new parseJSON defined in core.js                                      // 300
jQuery.ajaxSetup({                                                                                   // 301
	converters: {                                                                                       // 302
		"text json": jQuery.parseJSON                                                                      // 303
	}                                                                                                   // 304
});                                                                                                  // 305
                                                                                                     // 306
                                                                                                     // 307
var oldFnData = jQuery.fn.data;                                                                      // 308
                                                                                                     // 309
jQuery.fn.data = function( name ) {                                                                  // 310
	var ret, evt,                                                                                       // 311
		elem = this[0];                                                                                    // 312
                                                                                                     // 313
	// Handles 1.7 which has this behavior and 1.8 which doesn't                                        // 314
	if ( elem && name === "events" && arguments.length === 1 ) {                                        // 315
		ret = jQuery.data( elem, name );                                                                   // 316
		evt = jQuery._data( elem, name );                                                                  // 317
		if ( ( ret === undefined || ret === evt ) && evt !== undefined ) {                                 // 318
			migrateWarn("Use of jQuery.fn.data('events') is deprecated");                                     // 319
			return evt;                                                                                       // 320
		}                                                                                                  // 321
	}                                                                                                   // 322
	return oldFnData.apply( this, arguments );                                                          // 323
};                                                                                                   // 324
                                                                                                     // 325
                                                                                                     // 326
var rscriptType = /\/(java|ecma)script/i,                                                            // 327
	oldSelf = jQuery.fn.andSelf || jQuery.fn.addBack;                                                   // 328
                                                                                                     // 329
jQuery.fn.andSelf = function() {                                                                     // 330
	migrateWarn("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()");                                 // 331
	return oldSelf.apply( this, arguments );                                                            // 332
};                                                                                                   // 333
                                                                                                     // 334
// Since jQuery.clean is used internally on older versions, we only shim if it's missing             // 335
if ( !jQuery.clean ) {                                                                               // 336
	jQuery.clean = function( elems, context, fragment, scripts ) {                                      // 337
		// Set context per 1.8 logic                                                                       // 338
		context = context || document;                                                                     // 339
		context = !context.nodeType && context[0] || context;                                              // 340
		context = context.ownerDocument || context;                                                        // 341
                                                                                                     // 342
		migrateWarn("jQuery.clean() is deprecated");                                                       // 343
                                                                                                     // 344
		var i, elem, handleScript, jsTags,                                                                 // 345
			ret = [];                                                                                         // 346
                                                                                                     // 347
		jQuery.merge( ret, jQuery.buildFragment( elems, context ).childNodes );                            // 348
                                                                                                     // 349
		// Complex logic lifted directly from jQuery 1.8                                                   // 350
		if ( fragment ) {                                                                                  // 351
			// Special handling of each script element                                                        // 352
			handleScript = function( elem ) {                                                                 // 353
				// Check if we consider it executable                                                            // 354
				if ( !elem.type || rscriptType.test( elem.type ) ) {                                             // 355
					// Detach the script and store it in the scripts array (if provided) or the fragment            // 356
					// Return truthy to indicate that it has been handled                                           // 357
					return scripts ?                                                                                // 358
						scripts.push( elem.parentNode ? elem.parentNode.removeChild( elem ) : elem ) :                 // 359
						fragment.appendChild( elem );                                                                  // 360
				}                                                                                                // 361
			};                                                                                                // 362
                                                                                                     // 363
			for ( i = 0; (elem = ret[i]) != null; i++ ) {                                                     // 364
				// Check if we're done after handling an executable script                                       // 365
				if ( !( jQuery.nodeName( elem, "script" ) && handleScript( elem ) ) ) {                          // 366
					// Append to fragment and handle embedded scripts                                               // 367
					fragment.appendChild( elem );                                                                   // 368
					if ( typeof elem.getElementsByTagName !== "undefined" ) {                                       // 369
						// handleScript alters the DOM, so use jQuery.merge to ensure snapshot iteration               // 370
						jsTags = jQuery.grep( jQuery.merge( [], elem.getElementsByTagName("script") ), handleScript ); // 371
                                                                                                     // 372
						// Splice the scripts into ret after their former ancestor and advance our index beyond them   // 373
						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );                                          // 374
						i += jsTags.length;                                                                            // 375
					}                                                                                               // 376
				}                                                                                                // 377
			}                                                                                                 // 378
		}                                                                                                  // 379
                                                                                                     // 380
		return ret;                                                                                        // 381
	};                                                                                                  // 382
}                                                                                                    // 383
                                                                                                     // 384
var eventAdd = jQuery.event.add,                                                                     // 385
	eventRemove = jQuery.event.remove,                                                                  // 386
	eventTrigger = jQuery.event.trigger,                                                                // 387
	oldToggle = jQuery.fn.toggle,                                                                       // 388
	oldLive = jQuery.fn.live,                                                                           // 389
	oldDie = jQuery.fn.die,                                                                             // 390
	ajaxEvents = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",                      // 391
	rajaxEvent = new RegExp( "\\b(?:" + ajaxEvents + ")\\b" ),                                          // 392
	rhoverHack = /(?:^|\s)hover(\.\S+|)\b/,                                                             // 393
	hoverHack = function( events ) {                                                                    // 394
		if ( typeof( events ) !== "string" || jQuery.event.special.hover ) {                               // 395
			return events;                                                                                    // 396
		}                                                                                                  // 397
		if ( rhoverHack.test( events ) ) {                                                                 // 398
			migrateWarn("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'");                   // 399
		}                                                                                                  // 400
		return events && events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );                        // 401
	};                                                                                                  // 402
                                                                                                     // 403
// Event props removed in 1.9, put them back if needed; no practical way to warn them                // 404
if ( jQuery.event.props && jQuery.event.props[ 0 ] !== "attrChange" ) {                              // 405
	jQuery.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" );                // 406
}                                                                                                    // 407
                                                                                                     // 408
// Undocumented jQuery.event.handle was "deprecated" in jQuery 1.7                                   // 409
if ( jQuery.event.dispatch ) {                                                                       // 410
	migrateWarnProp( jQuery.event, "handle", jQuery.event.dispatch, "jQuery.event.handle is undocumented and deprecated" );
}                                                                                                    // 412
                                                                                                     // 413
// Support for 'hover' pseudo-event and ajax event warnings                                          // 414
jQuery.event.add = function( elem, types, handler, data, selector ){                                 // 415
	if ( elem !== document && rajaxEvent.test( types ) ) {                                              // 416
		migrateWarn( "AJAX events should be attached to document: " + types );                             // 417
	}                                                                                                   // 418
	eventAdd.call( this, elem, hoverHack( types || "" ), handler, data, selector );                     // 419
};                                                                                                   // 420
jQuery.event.remove = function( elem, types, handler, selector, mappedTypes ){                       // 421
	eventRemove.call( this, elem, hoverHack( types ) || "", handler, selector, mappedTypes );           // 422
};                                                                                                   // 423
                                                                                                     // 424
jQuery.fn.error = function() {                                                                       // 425
	var args = Array.prototype.slice.call( arguments, 0);                                               // 426
	migrateWarn("jQuery.fn.error() is deprecated");                                                     // 427
	args.splice( 0, 0, "error" );                                                                       // 428
	if ( arguments.length ) {                                                                           // 429
		return this.bind.apply( this, args );                                                              // 430
	}                                                                                                   // 431
	// error event should not bubble to window, although it does pre-1.7                                // 432
	this.triggerHandler.apply( this, args );                                                            // 433
	return this;                                                                                        // 434
};                                                                                                   // 435
                                                                                                     // 436
jQuery.fn.toggle = function( fn, fn2 ) {                                                             // 437
                                                                                                     // 438
	// Don't mess with animation or css toggles                                                         // 439
	if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {                                      // 440
		return oldToggle.apply( this, arguments );                                                         // 441
	}                                                                                                   // 442
	migrateWarn("jQuery.fn.toggle(handler, handler...) is deprecated");                                 // 443
                                                                                                     // 444
	// Save reference to arguments for access in closure                                                // 445
	var args = arguments,                                                                               // 446
		guid = fn.guid || jQuery.guid++,                                                                   // 447
		i = 0,                                                                                             // 448
		toggler = function( event ) {                                                                      // 449
			// Figure out which function to execute                                                           // 450
			var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;                       // 451
			jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );                                     // 452
                                                                                                     // 453
			// Make sure that clicks stop                                                                     // 454
			event.preventDefault();                                                                           // 455
                                                                                                     // 456
			// and execute the function                                                                       // 457
			return args[ lastToggle ].apply( this, arguments ) || false;                                      // 458
		};                                                                                                 // 459
                                                                                                     // 460
	// link all the functions, so any of them can unbind this click handler                             // 461
	toggler.guid = guid;                                                                                // 462
	while ( i < args.length ) {                                                                         // 463
		args[ i++ ].guid = guid;                                                                           // 464
	}                                                                                                   // 465
                                                                                                     // 466
	return this.click( toggler );                                                                       // 467
};                                                                                                   // 468
                                                                                                     // 469
jQuery.fn.live = function( types, data, fn ) {                                                       // 470
	migrateWarn("jQuery.fn.live() is deprecated");                                                      // 471
	if ( oldLive ) {                                                                                    // 472
		return oldLive.apply( this, arguments );                                                           // 473
	}                                                                                                   // 474
	jQuery( this.context ).on( types, this.selector, data, fn );                                        // 475
	return this;                                                                                        // 476
};                                                                                                   // 477
                                                                                                     // 478
jQuery.fn.die = function( types, fn ) {                                                              // 479
	migrateWarn("jQuery.fn.die() is deprecated");                                                       // 480
	if ( oldDie ) {                                                                                     // 481
		return oldDie.apply( this, arguments );                                                            // 482
	}                                                                                                   // 483
	jQuery( this.context ).off( types, this.selector || "**", fn );                                     // 484
	return this;                                                                                        // 485
};                                                                                                   // 486
                                                                                                     // 487
// Turn global events into document-triggered events                                                 // 488
jQuery.event.trigger = function( event, data, elem, onlyHandlers  ){                                 // 489
	if ( !elem && !rajaxEvent.test( event ) ) {                                                         // 490
		migrateWarn( "Global events are undocumented and deprecated" );                                    // 491
	}                                                                                                   // 492
	return eventTrigger.call( this,  event, data, elem || document, onlyHandlers  );                    // 493
};                                                                                                   // 494
jQuery.each( ajaxEvents.split("|"),                                                                  // 495
	function( _, name ) {                                                                               // 496
		jQuery.event.special[ name ] = {                                                                   // 497
			setup: function() {                                                                               // 498
				var elem = this;                                                                                 // 499
                                                                                                     // 500
				// The document needs no shimming; must be !== for oldIE                                         // 501
				if ( elem !== document ) {                                                                       // 502
					jQuery.event.add( document, name + "." + jQuery.guid, function() {                              // 503
						jQuery.event.trigger( name, null, elem, true );                                                // 504
					});                                                                                             // 505
					jQuery._data( this, name, jQuery.guid++ );                                                      // 506
				}                                                                                                // 507
				return false;                                                                                    // 508
			},                                                                                                // 509
			teardown: function() {                                                                            // 510
				if ( this !== document ) {                                                                       // 511
					jQuery.event.remove( document, name + "." + jQuery._data( this, name ) );                       // 512
				}                                                                                                // 513
				return false;                                                                                    // 514
			}                                                                                                 // 515
		};                                                                                                 // 516
	}                                                                                                   // 517
);                                                                                                   // 518
                                                                                                     // 519
                                                                                                     // 520
})( jQuery, window );                                                                                // 521
                                                                                                     // 522
///////////////////////////////////////////////////////////////////////////////////////////////////////     // 531
                                                                                                            // 532
}).call(this);                                                                                              // 533
                                                                                                            // 534
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['mrt:jquery-migrate'] = {};

})();
