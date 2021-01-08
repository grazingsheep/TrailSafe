!(function(t) {
	'function' == typeof define && define.amd ? define(t) : t();
})(function() {
	'use strict';
	function t(e) {
		return (t =
			'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
				? function(t) {
						return typeof t;
					}
				: function(t) {
						return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
							? 'symbol'
							: typeof t;
					})(e);
	}
	function e(t, e, i) {
		return (
			e in t
				? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
				: (t[e] = i),
			t
		);
	}
	function i(t) {
		for (var a = arguments.length, n = new Array(a > 1 ? a - 1 : 0), o = 1; o < a; o++) n[o - 1] = arguments[o];
		if (!n.length) return t;
		var s = n.shift();
		if (l(t) && l(s))
			for (var r in s)
				l(s[r]) ? (t[r] || Object.assign(t, e({}, r, {})), i(t[r], s[r])) : Object.assign(t, e({}, r, s[r]));
		return i.apply(void 0, [ t ].concat(n));
	}
	function a(t) {
		'complete' !== document.readyState ? window.addEventListener('load', t, { once: !0 }) : t();
	}
	function n(t, e, i) {
		return t.toFixed(e).toString().split('.').join(i || '.');
	}
	function o(t) {
		var e = '';
		t >= 864e5 && ((e += Math.floor(t / 864e5) + 'd '), (t %= 864e5)),
			t >= 36e5 && ((e += Math.floor(t / 36e5) + ':'), (t %= 36e5)),
			t >= 6e4 && ((e += Math.floor(t / 6e4).toString().padStart(2, 0) + "'"), (t %= 6e4)),
			t >= 1e3 && ((e += Math.floor(t / 1e3).toString().padStart(2, 0)), (t %= 1e3));
		var i = Math.round(1e3 * Math.floor(t)) / 1e3;
		return i && (e += '.' + i.toString().replace(/0+$/, '')), e || (e = '0.0'), (e += '"');
	}
	function s(t, e) {
		'string' == typeof t && (t = JSON.parse(t)), (e = e || this);
		var i = L.geoJson(t, {
			style: function(t) {
				var i = L.extend({}, e.options.polyline);
				return e.options.theme && (i.className += ' ' + e.options.theme), i;
			},
			pointToLayer: function(t, i) {
				var a = L.marker(i, { icon: e.options.gpxOptions.marker_options.wptIcons[''] }),
					n = t.properties.desc ? t.properties.desc : '',
					o = t.properties.name ? t.properties.name : '';
				return (
					(o || n) && a.bindPopup('<b>' + o + '</b>' + (n.length > 0 ? '<br>' + n : '')).openPopup(),
					e.fire('waypoint_added', { point: a, point_type: 'waypoint', element: i }),
					a
				);
			},
			onEachFeature: function(i, a) {
				'Point' != i.geometry.type &&
					(e.addData(i, a), (e.track_info = L.extend({}, e.track_info, { type: 'geojson', name: t.name })));
			}
		});
		return (
			L.Control.Elevation._d3LazyLoader.then(function() {
				e._fireEvt('eledata_loaded', { data: t, layer: i, name: e.track_info.name, track_info: e.track_info });
			}),
			i
		);
	}
	function r(t, e) {
		((e = e || this).options.gpxOptions.polyline_options = L.extend(
			{},
			e.options.polyline,
			e.options.gpxOptions.polyline_options
		)),
			e.options.theme && (e.options.gpxOptions.polyline_options.className += ' ' + e.options.theme);
		var i = new L.GPX(t, e.options.gpxOptions);
		return (
			i.on('addpoint', function(t) {
				e.fire('waypoint_added', t);
			}),
			i.on('addline', function(t) {
				e.addData(t.line), (e.track_info = L.extend({}, e.track_info, { type: 'gpx', name: i.get_name() }));
			}),
			i.once('loaded', function(a) {
				L.Control.Elevation._d3LazyLoader.then(function() {
					e._fireEvt('eledata_loaded', {
						data: t,
						layer: i,
						name: e.track_info.name,
						track_info: e.track_info
					});
				});
			}),
			i
		);
	}
	function l(e) {
		return e && 'object' === t(e) && !Array.isArray(e);
	}
	function h(t) {
		if (!t) return !1;
		var e = window.getComputedStyle(t);
		return (
			!!(function(t, e) {
				return 'hidden' !== e.visibility && 'none' !== e.display;
			})(0, e) &&
			!!(function(t, e) {
				var i = t.getBoundingClientRect(),
					a = i.left + 1,
					n = i.right - 1,
					o = i.top + 1,
					s = (i.bottom, !0),
					r = t.style.pointerEvents;
				return (
					'none' == e['pointer-events'] && (t.style.pointerEvents = 'auto'),
					document.elementFromPoint(a, o) !== t && (s = !1),
					document.elementFromPoint(n, o) !== t && (s = !1),
					(t.style.pointerEvents = r),
					s
				);
			})(t, e)
		);
	}
	function d(e, i) {
		if (((i = void 0 === i || i), 'string' == typeof e && i))
			return 0 == (e = e.trim()).indexOf('{') || 0 == e.indexOf('[');
		try {
			JSON.parse(e.toString());
		} catch (a) {
			return !('object' !== t(e) || !i) || (console.warn(a), !1);
		}
		return !0;
	}
	function c(t, e) {
		if (((e = void 0 === e || e), 'string' == typeof t && e)) return 0 == (t = t.trim()).indexOf('<');
		var i = (t ? t.ownerDocument || t : 0).documentElement;
		return !!i && 'HTML' !== i.nodeName;
	}
	function _(t, e, i) {
		return !1 === e
			? Promise.resolve()
			: i instanceof Promise
				? i
				: new Promise(function(e, i) {
						var a = document.createElement('script');
						a.addEventListener('load', e, { once: !0 }), (a.src = t), document.head.appendChild(a);
					});
	}
	function u(t, e) {
		return new Promise(function(e, i) {
			var a = new XMLHttpRequest();
			(a.responseType = 'text'),
				a.open('GET', t),
				(a.onload = function() {
					return e(a.response);
				}),
				(a.onerror = function() {
					return i('Error ' + a.status + ' while fetching remote file: ' + t);
				}),
				a.send();
		});
	}
	function p(t, e) {
		var i = x('a', '', { href: t, target: '_new', download: e || '', style: 'display:none;' }),
			a = document.body;
		a.appendChild(i), i.click(), a.removeChild(i);
	}
	function f(t) {
		return new Promise(function(e, i) {
			var a = !1,
				n = function i() {
					a ||
						(L.Util.requestAnimFrame(function() {
							h(t) && (window.removeEventListener('scroll', i), e()), (a = !1);
						}),
						(a = !0));
				};
			window.addEventListener('scroll', n), t && t.addEventListener('mouseenter', n, { once: !0 }), n();
		});
	}
	function m(t, e) {
		t &&
			e.split(' ').every(function(e) {
				return e && L.DomUtil.addClass(t, e);
			});
	}
	function g(t, e) {
		t &&
			e.split(' ').every(function(e) {
				return e && L.DomUtil.removeClass(t, e);
			});
	}
	function v(t, e, i) {
		return (i ? m : g).call(null, t, e);
	}
	function y(t, e, i) {
		return void 0 === i ? L.DomUtil.getStyle(t, e) : t.style.setProperty(e, i);
	}
	function x(t, e, i, a) {
		var n = L.DomUtil.create(t, e || '');
		return i && w(n, i), a && b(a, n), n;
	}
	function b(t, e) {
		return t.appendChild(e);
	}
	function k(t, e, i) {
		return t.insertAdjacentElement(i, e);
	}
	function w(t, e) {
		for (var i in e) t.setAttribute(i, e[i]);
	}
	function C(t, e) {
		return (e || document).querySelector(t);
	}
	!(function(t, e) {
		'function' == typeof define && define.amd
			? define([ 'leaflet' ], t)
			: 'object' == typeof exports && (module.exports = t(require('leaflet'))),
			void 0 !== e && e.L && t(e.L);
	})(function(t) {
		return (
			(t.locales = {}),
			(t.locale = null),
			(t.registerLocale = function(e, i) {
				t.locales[e] = t.Util.extend({}, t.locales[e], i);
			}),
			(t.setLocale = function(e) {
				t.locale = e;
			}),
			(t.i18n = t._ = function(e, i) {
				t.locale && t.locales[t.locale] && t.locales[t.locale][e] && (e = t.locales[t.locale][e]);
				try {
					e = t.Util.template(e, i);
				} catch (t) {}
				return e;
			})
		);
	}, window);
	var D = L.DomEvent.on,
		S = L.DomEvent.off,
		M = L.DomUtil.hasClass;
	function A() {
		return Math.random().toString(36).substr(2, 9);
	}
	function F(t, e) {
		for (var i in t) e(t[i], i);
	}
	var E = Object.freeze({
			__proto__: null,
			deepMerge: i,
			deferFunc: a,
			formatNum: n,
			formatTime: o,
			GeoJSONLoader: s,
			GPXLoader: r,
			isDomVisible: function(t) {
				return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
			},
			isObject: l,
			isVisible: h,
			isJSONDoc: d,
			isXMLDoc: c,
			lazyLoader: _,
			loadFile: u,
			saveFile: p,
			waitHolder: f,
			addClass: m,
			removeClass: g,
			toggleClass: v,
			style: y,
			create: x,
			append: b,
			insert: k,
			setAttributes: w,
			select: C,
			on: D,
			off: S,
			hasClass: M,
			randomId: A,
			each: F
		}),
		z = function(t) {
			var e = t.data,
				i = t.name,
				a = t.xAttr,
				n = t.yAttr,
				o = t.scaleX,
				s = t.scaleY,
				r = t.height,
				l = t.interpolation,
				h = void 0 === l ? 'curveLinear' : l;
			return function(t) {
				'string' == typeof h && (h = d3[h]);
				var l = d3
					.area()
					.curve(h)
					.x(function(t) {
						return (t.xDiagCoord = o(t[a]));
					})
					.y0(r)
					.y1(function(t) {
						return s(t[n]);
					});
				return e && t.datum(e).attr('d', l), i && t.attr('data-name', i), l;
			};
		},
		T = function(t) {
			var e = t.type,
				i = void 0 === e ? 'axis' : e,
				a = t.tickSize,
				n = void 0 === a ? 6 : a,
				o = t.tickPadding,
				s = void 0 === o ? 3 : o,
				r = t.position,
				l = t.height,
				h = t.width,
				d = t.axis,
				c = t.scale,
				_ = t.ticks,
				u = t.tickFormat,
				p = t.label,
				f = t.labelX,
				m = t.labelY,
				g = t.name,
				v = void 0 === g ? '' : g;
			return function(t) {
				var e = 0,
					a = 0;
				'bottom' == r && (a = l),
					'right' == r && (e = h),
					'x' == d && 'grid' == i ? (n = -l) : 'y' == d && 'grid' == i && (n = -h);
				var o = d3
						[
							'axis' +
								r.replace(/\b\w/g, function(t) {
									return t.toUpperCase();
								})
						]()
						.scale(c)
						.ticks(_)
						.tickPadding(s)
						.tickSize(n)
						.tickFormat(u),
					g = t
						.append('g')
						.attr('class', [ d, i, r, v ].join(' '))
						.attr('transform', 'translate(' + e + ',' + a + ')')
						.call(o);
				return p && g.append('text').attr('x', f).attr('y', m).text(p), g;
			};
		},
		H = function(t) {
			var e = t.dragStartCoords,
				i = t.dragEndCoords,
				a = t.height;
			return function(t) {
				var n = Math.min(e[0], i[0]),
					o = Math.max(e[0], i[0]);
				return t.attr('width', o - n).attr('height', a).attr('x', n);
			};
		},
		N = function(t) {
			var e = t.width,
				i = t.height;
			return function(t) {
				return t
					.attr('width', e)
					.attr('height', i)
					.style('fill', 'none')
					.style('stroke', 'none')
					.style('pointer-events', 'all');
			};
		},
		I = function(t) {
			return (t.type = 'grid'), T(t);
		},
		P = function(t) {
			var e = t.theme,
				i = t.xCoord,
				a = void 0 === i ? 0 : i,
				n = t.yCoord,
				o = void 0 === n ? 0 : n,
				s = t.length,
				r = void 0 === s ? 0 : s;
			return function(t) {
				return t
					.attr('class', e + ' height-focus line')
					.attr('x1', a)
					.attr('x2', a)
					.attr('y1', o)
					.attr('y2', r);
			};
		},
		X = function(t) {
			var e = t.theme,
				i = t.xCoord,
				a = void 0 === i ? 0 : i,
				n = t.yCoord,
				o = void 0 === n ? 0 : n,
				s = t.label;
			return function(t) {
				t
					.attr('class', e + ' height-focus-label')
					.style('pointer-events', 'none')
					.attr('x', a + 5)
					.attr('y', o);
				var i = t.select('.height-focus-y');
				return (
					i.node() || (i = t.append('svg:tspan')),
					i.attr('class', 'height-focus-y').text(s),
					t.selectAll('tspan').attr('x', a + 5),
					t
				);
			};
		},
		B = function(t) {
			var e = t.theme,
				i = t.xCoord,
				a = void 0 === i ? 0 : i,
				n = t.yCoord,
				o = void 0 === n ? 0 : n;
			return function(t) {
				return t
					.attr('class', e + ' height-focus circle-lower')
					.attr('transform', 'translate(' + a + ',' + o + ')')
					.attr('r', 6)
					.attr('cx', 0)
					.attr('cy', 0);
			};
		},
		O = function(t) {
			var e = t.name,
				i = t.width,
				a = t.height,
				n = t.margins,
				o = void 0 === n ? {} : n;
			return function(t) {
				return (
					t.attr('class', 'legend-item legend-' + e.toLowerCase()).attr('data-name', e),
					t
						.append('rect')
						.attr('class', 'area')
						.attr('x', i / 2 - 50)
						.attr('y', a + o.bottom / 2)
						.attr('width', 50)
						.attr('height', 10)
						.attr('opacity', 0.75),
					t
						.append('text')
						.text(L._(e))
						.attr('x', i / 2 + 5)
						.attr('font-size', 10)
						.style('text-decoration-thickness', '2px')
						.style('font-weight', '700')
						.attr('y', a + o.bottom / 2)
						.attr('dy', '0.75em'),
					t
				);
			};
		},
		G = function(t) {
			var e = t.xCoord,
				i = void 0 === e ? 0 : e,
				a = t.height;
			return function(t) {
				return t.attr('class', 'mouse-focus-line').attr('x2', i).attr('y2', 0).attr('x1', i).attr('y1', a);
			};
		},
		R = function(t) {
			var e = t.xCoord,
				i = t.yCoord,
				a = t.labelX,
				n = void 0 === a ? '' : a,
				o = t.labelY,
				s = void 0 === o ? '' : o,
				r = t.width;
			return function(t) {
				t.attr('class', 'mouse-focus-label');
				var a = t.select('.mouse-focus-label-rect'),
					o = t.select('.mouse-focus-label-text'),
					l = o.select('.mouse-focus-label-y'),
					h = o.select('.mouse-focus-label-x');
				a.node() || (a = t.append('rect')),
					o.node() || (o = t.append('svg:text')),
					l.node() || (l = o.append('svg:tspan')),
					h.node() || (h = o.append('svg:tspan')),
					l.text(s),
					h.text(n);
				var d = 0,
					c = 0,
					_ = { width: 0, height: 0 };
				try {
					_ = o.node().getBBox();
				} catch (e) {
					return t;
				}
				return (
					e && (d = e + (e < r / 2 ? 10 : -_.width - 10)),
					i && (c = Math.max(i - _.height, L.Browser.webkit ? 0 : -1 / 0)),
					a
						.attr('class', 'mouse-focus-label-rect')
						.attr('x', d - 5)
						.attr('y', c - 5)
						.attr('width', _.width + 10)
						.attr('height', _.height + 10)
						.attr('rx', 3)
						.attr('ry', 3),
					o.attr('class', 'mouse-focus-label-text').style('font-weight', '700').attr('y', c),
					l.attr('class', 'mouse-focus-label-y').attr('dy', '1em'),
					h.attr('class', 'mouse-focus-label-x').attr('dy', '2em'),
					o.selectAll('tspan').attr('x', d),
					t
				);
			};
		},
		Y = function(t) {
			var e = t.height,
				i = t.width;
			return function(t) {
				return (
					t.data([ { x: 0, y: e } ]).attr('transform', function(t) {
						return 'translate(' + t.x + ',' + t.y + ')';
					}),
					t.append('line').attr('class', 'horizontal-drag-line').attr('x1', 0).attr('x2', i),
					t
						.append('text')
						.attr('class', 'horizontal-drag-label')
						.attr('text-anchor', 'end')
						.attr('x', i - 8)
						.attr('y', -8),
					t
						.selectAll()
						.data([ { type: d3.symbolTriangle, x: i + 7, y: 0, angle: -90, size: 50 } ])
						.enter()
						.append('path')
						.attr('class', 'horizontal-drag-symbol')
						.attr(
							'd',
							d3
								.symbol()
								.type(function(t) {
									return t.type;
								})
								.size(function(t) {
									return t.size;
								})
						)
						.attr('transform', function(t) {
							return 'translate(' + t.x + ',' + t.y + ') rotate(' + t.angle + ')';
						}),
					t
				);
			};
		},
		U = function(t) {
			var e = t.data,
				i = t.attr,
				a = t.min,
				n = t.forceBounds,
				o = t.range,
				s = e
					? d3.extent(e, function(t) {
							return t[i];
						})
					: [ 0, 1 ];
			return (
				void 0 !== a && (a < s[0] || n) && (s[0] = a),
				'undefined' != typeof max && (max > s[1] || n) && (s[1] = max),
				d3.scaleLinear().range(o).domain(s)
			);
		},
		j = Object.freeze({
			__proto__: null,
			Area: z,
			AreaPath: function(t) {
				return d3.create('svg:path').attr('class', 'area').call(z(t));
			},
			Axis: T,
			DragRectangle: H,
			FocusRect: N,
			Grid: I,
			HeightFocusLine: P,
			HeightFocusLabel: X,
			HeightFocusMarker: B,
			LegendItem: O,
			MouseFocusLine: G,
			MouseFocusLabel: R,
			Ruler: Y,
			Scale: U,
			Bisect: function(t) {
				var e = t.data,
					i = void 0 === e ? [ 0, 1 ] : e,
					a = t.scale,
					n = t.x,
					o = t.attr;
				return d3
					.bisector(function(t) {
						return t[o];
					})
					.left(i, a.invert(n));
			}
		}),
		J = L.Class.extend({
			includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
			initialize: function(t) {
				(this.options = t),
					(this._data = []),
					(this._draggingEnabled = t.dragging),
					t.imperial
						? ((this._xLabel = 'mi'), (this._yLabel = 'ft'))
						: ((this._xLabel = t.xLabel), (this._yLabel = t.yLabel)),
					(this._xTicks = t.xTicks),
					(this._yTicks = t.yTicks);
				var e = this._updateScale(),
					i = (this._container = d3
						.create('svg')
						.attr('class', 'background')
						.attr('width', t.width)
						.attr('height', t.height));
				i
					.append('g')
					.attr('transform', 'translate(' + t.margins.left + ',' + t.margins.top + ')')
					.call(this._appendGrid())
					.call(this._appendArea())
					.call(this._appendAxis())
					.call(this._appendFocusable())
					.call(this._appendLegend());
				(this._grid = i.select('.grid')),
					(this._area = i.select('.area')),
					(this._path = i.select('.area path')),
					(this._axis = i.select('.axis')),
					(this._focus = i.select('.focus')),
					(this._focusRect = this._focus.select('rect')),
					(this._legend = i.select('.legend')),
					(this._x = e.x),
					(this._y = e.y);
			},
			update: function(t) {
				return (
					t.data && (this._data = t.data),
					t.options && (this.options = t.options),
					this._updateScale(),
					this._updateAxis(),
					this._updateArea(),
					this
				);
			},
			render: function() {
				var t = this;
				return function(e) {
					return e.append(function() {
						return t._container.node();
					});
				};
			},
			clear: function() {
				this._resetDrag(), this._area.selectAll('path').attr('d', 'M0 0'), this._path;
			},
			_updateScale: function() {
				var t = this.options;
				return (
					(this._x = U({
						data: this._data,
						range: [ 0, this._width() ],
						attr: t.xAttr,
						min: t.xAxisMin,
						max: t.xAxisMax,
						forceBounds: t.forceAxisBounds
					})),
					(this._y = U({
						data: this._data,
						range: [ this._height(), 0 ],
						attr: t.yAttr,
						min: t.yAxisMin,
						max: t.yAxisMax,
						forceBounds: t.forceAxisBounds
					})),
					{ x: this._x, y: this._y }
				);
			},
			_updateAxis: function() {
				this._grid.selectAll('g').remove(),
					this._axis.selectAll('g').remove(),
					this._grid.call(this._appendXGrid()).call(this._appendYGrid()),
					this._axis.call(this._appendXaxis()).call(this._appendYaxis());
			},
			_updateArea: function() {
				var t = this.options;
				this._path.call(
					z({
						interpolation: t.interpolation,
						data: this._data,
						name: 'Altitude',
						xAttr: t.xAttr,
						yAttr: t.yAttr,
						width: this._width(),
						height: this._height(),
						scaleX: this._x,
						scaleY: this._y
					})
				);
			},
			_appendGrid: function() {
				var t = this;
				return function(e) {
					return e.append('g').attr('class', 'grid').call(t._appendXGrid()).call(t._appendYGrid());
				};
			},
			_appendXGrid: function() {
				return I({
					axis: 'x',
					position: 'bottom',
					width: this._width(),
					height: this._height(),
					scale: this._x,
					ticks: this._xTicks,
					tickFormat: ''
				});
			},
			_appendYGrid: function() {
				return I({
					axis: 'y',
					position: 'left',
					width: this._width(),
					height: this._height(),
					scale: this._y,
					ticks: this.options.yTicks,
					tickFormat: ''
				});
			},
			_appendAxis: function() {
				var t = this;
				return function(e) {
					return e.append('g').attr('class', 'axis').call(t._appendXaxis()).call(t._appendYaxis());
				};
			},
			_appendXaxis: function() {
				return T({
					axis: 'x',
					position: 'bottom',
					width: this._width(),
					height: this._height(),
					scale: this._x,
					ticks: this._xTicks,
					label: this._xLabel,
					labelY: 25,
					labelX: this._width() + 6
				});
			},
			_appendYaxis: function() {
				return T({
					axis: 'y',
					position: 'left',
					width: this._width(),
					height: this._height(),
					scale: this._y,
					ticks: this.options.yTicks,
					label: this._yLabel,
					labelX: -25,
					labelY: 3
				});
			},
			_appendArea: function() {
				return function(t) {
					return t.append('g').attr('class', 'area').append('path');
				};
			},
			_appendFocusable: function() {
				var t = this;
				return function(e) {
					return e
						.append('g')
						.attr('class', 'focus')
						.call(t._appendFocusRect())
						.call(t._appendRuler())
						.call(t._appendMouseFocusG());
				};
			},
			_appendFocusRect: function() {
				var t = this;
				return function(e) {
					var i = e.append('rect').call(N({ width: t._width(), height: t._height() }));
					return (
						L.Browser.mobile &&
							(i
								.on('touchstart.drag', t._dragStartHandler.bind(t))
								.on('touchmove.drag', t._dragHandler.bind(t))
								.on('touchstart.focus', t._mousemoveHandler.bind(t))
								.on('touchmove.focus', t._mousemoveHandler.bind(t)),
							L.DomEvent.on(t._container.node(), 'touchend', t._dragEndHandler, t)),
						i
							.on('mousedown.drag', t._dragStartHandler.bind(t))
							.on('mousemove.drag', t._dragHandler.bind(t))
							.on('mouseenter.focus', t._mouseenterHandler.bind(t))
							.on('mousemove.focus', t._mousemoveHandler.bind(t))
							.on('mouseout.focus', t._mouseoutHandler.bind(t)),
						L.DomEvent.on(t._container.node(), 'mouseup', t._dragEndHandler, t),
						i
					);
				};
			},
			_appendMouseFocusG: function() {
				var t = this;
				return function(e) {
					var i = (t._focusG = e.append('g').attr('class', 'mouse-focus-group hidden'));
					return (
						(t._focusline = i.append('svg:line').call(G({ xCoord: 0, height: t._height() }))),
						(t._focuslabel = i
							.append('g')
							.call(
								R({
									xCoord: 0,
									yCoord: 0,
									height: t._height(),
									width: t._width(),
									labelX: '',
									labelY: ''
								})
							)),
						i
					);
				};
			},
			_appendLegend: function() {
				return function(t) {
					return t.append('g').attr('class', 'legend');
				};
			},
			_appendRuler: function() {
				var t = this,
					e = function(t) {
						this._hideDiagramIndicator(),
							this._container.select('.horizontal-drag-label').classed('hidden', !1);
					},
					i = function(t) {
						var e = this._container.select('.horizontal-drag-group').node().transform.baseVal.consolidate()
							.matrix.f;
						this._container
							.select('.horizontal-drag-label')
							.classed('hidden', e >= this._height() || e <= 0);
					},
					a = function(t) {
						var e = this._height(),
							i = d3.mouse(this._container.node())[1],
							a = i > 0 ? (i < e ? i : e) : 0,
							n = this._y.invert(a),
							o = d3.format('.0f');
						this._container
							.select('.horizontal-drag-group')
							.attr('transform', function(t) {
								return 'translate(' + t.x + ',' + a + ')';
							})
							.classed('active', a < e),
							this._container.select('.horizontal-drag-label').text(o(n) + ' ' + this._yLabel),
							this.fire('ruler_filter', { coords: i < e && i > 0 ? this._findCoordsForY(i) : [] });
					};
				return function(n) {
					return t.options.ruler
						? ((t._dragG = n
								.append('g')
								.attr('class', 'horizontal-drag-group')
								.call(Y({ height: t._height(), width: t._width() }))
								.call(d3.drag().on('start', e.bind(t)).on('drag', a.bind(t)).on('end', i.bind(t)))),
							n)
						: n;
				};
			},
			_width: function() {
				var t = this.options;
				return t.width - t.margins.left - t.margins.right;
			},
			_height: function() {
				var t = this.options;
				return t.height - t.margins.top - t.margins.bottom;
			},
			_dragHandler: function() {
				d3.event.preventDefault(),
					d3.event.stopPropagation(),
					(this._gotDragged = !0),
					this._drawDragRectangle();
			},
			_dragStartHandler: function() {
				d3.event.preventDefault(),
					d3.event.stopPropagation(),
					(this._gotDragged = !1),
					(this._dragStartCoords = d3.mouse(this._focusRect.node()));
			},
			_drawDragRectangle: function() {
				this._dragStartCoords &&
					this._draggingEnabled &&
					(this._dragRectangle ||
						(this._dragRectangle = this._focus
							.insert('rect', '.mouse-focus-group')
							.attr('class', 'mouse-drag')
							.style('pointer-events', 'none')),
					this._dragRectangle.call(
						H({
							dragStartCoords: this._dragStartCoords,
							dragEndCoords: (this._dragCurrentCoords = d3.mouse(this._focusRect.node())),
							height: this._height()
						})
					));
			},
			_dragEndHandler: function() {
				if (!this._dragStartCoords || !this._dragCurrentCoords || !this._gotDragged)
					return (
						(this._dragStartCoords = null),
						(this._gotDragged = !1),
						void (this._draggingEnabled && this._resetDrag())
					);
				var t = this._findIndexForXCoord(this._dragStartCoords[0]),
					e = this._findIndexForXCoord(this._dragCurrentCoords[0]);
				t != e &&
					((this._dragStartCoords = null),
					(this._gotDragged = !1),
					this.fire('dragged', { dragstart: this._data[t], dragend: this._data[e] }));
			},
			_mouseenterHandler: function() {
				this.fire('mouse_enter');
			},
			_mousemoveHandler: function(t, e, i) {
				var a = d3.mouse(this._focusRect.node())[0],
					n = this._data[this._findIndexForXCoord(a)];
				this.fire('mouse_move', { item: n, xCoord: a });
			},
			_mouseoutHandler: function() {
				this.fire('mouse_out');
			},
			_findCoordsForY: function(t) {
				var e,
					i = this._data,
					a = this._y.invert(t),
					n = i.reduce(function(t, e, i) {
						return e.z >= a && t.push(i), t;
					}, []),
					o = 0;
				return n.reduce(function(t, a, s) {
					return (
						(n[(e = s + 1)] === n[s] + 1 && e !== n.length) ||
							(t.push(
								n.slice(o, e).map(function(t) {
									return i[t].latlng;
								})
							),
							(o = e)),
						t
					);
				}, []);
			},
			_findIndexForXCoord: function(t) {
				var e = this;
				return d3
					.bisector(function(t) {
						return t[e.options.xAttr];
					})
					.left(this._data || [ 0, 1 ], this._x.invert(t));
			},
			_findIndexForLatLng: function(t) {
				var e = null,
					i = 1 / 0;
				return (
					this._data.forEach(function(a, n) {
						var o = t.distanceTo(a.latlng);
						o < i && ((i = o), (e = n));
					}),
					e
				);
			},
			_resetDrag: function() {
				this._dragRectangle &&
					(this._dragRectangle.remove(),
					(this._dragRectangle = null),
					this._hideDiagramIndicator(),
					this.fire('reset_drag'));
			},
			_showDiagramIndicator: function(t, e) {
				var i = this.options,
					a = this._y(t[i.yAttr]);
				this._focusG.classed('hidden', !1),
					this._focusline.call(G({ xCoord: e, height: this._height() })),
					this._focuslabel.call(
						R({
							xCoord: e,
							yCoord: a,
							height: this._height(),
							width: this._width(),
							labelX: n(t[i.xAttr], i.decimalsX) + ' ' + this._xLabel,
							labelY: n(t[i.yAttr], i.decimalsY) + ' ' + this._yLabel
						})
					);
			},
			_hideDiagramIndicator: function() {
				this._focusG.classed('hidden', !0);
			}
		}),
		V = L.Class.extend({
			initialize: function(t) {
				return (
					(this.options = t),
					this.options.imperial
						? ((this._xLabel = 'mi'), (this._yLabel = 'ft'))
						: ((this._xLabel = this.options.xLabel), (this._yLabel = this.options.yLabel)),
					'elevation-line' == this.options.marker
						? ((this._focusline = d3.create('svg:line')),
							(this._focusmarker = d3.create('svg:circle')),
							(this._focuslabel = d3.create('svg:text')))
						: 'position-marker' == this.options.marker &&
							(this._marker = L.marker([ 0, 0 ], {
								icon: this.options.markerIcon,
								zIndexOffset: 1e6,
								interactive: !1
							})),
					this
				);
			},
			addTo: function(t) {
				var e = this;
				if (((this._map = t), 'elevation-line' == this.options.marker)) {
					var i = (this._container = d3
						.select(t.getPane('elevationPane'))
						.select('svg > g')
						.attr('class', 'height-focus-group'));
					i.append(function() {
						return e._focusline.node();
					}),
						i.append(function() {
							return e._focusmarker.node();
						}),
						i.append(function() {
							return e._focuslabel.node();
						});
				} else 'position-marker' == this.options.marker && this._marker.addTo(t, { pane: 'elevationPane' });
				return this;
			},
			update: function(t) {
				t.options && (this.options = t.options), this._map || this.addTo(t.map);
				var e = this.options;
				this._latlng = t.item.latlng;
				var i = L.extend({}, t.item, this._map.latLngToLayerPoint(this._latlng));
				if ('elevation-line' == this.options.marker) {
					var a = this._height() / t.maxElevation * i.z,
						o = i.y - a;
					this._container.classed('hidden', !1),
						this._focusmarker.call(B({ theme: e.theme, xCoord: i.x, yCoord: i.y })),
						this._focusline.call(P({ theme: e.theme, xCoord: i.x, yCoord: i.y, length: o })),
						this._focuslabel.call(
							X({
								theme: e.theme,
								xCoord: i.x,
								yCoord: o,
								label: n(i[e.yAttr], e.decimalsY) + ' ' + this._yLabel
							})
						);
				} else
					'position-marker' == this.options.marker &&
						(g(this._marker.getElement(), 'hidden'), this._marker.setLatLng(this._latlng));
			},
			remove: function() {
				'elevation-line' == this.options.marker
					? this._container && this._container.classed('hidden', !0)
					: 'position-marker' == this.options.marker && m(this._marker.getElement(), 'hidden');
			},
			getLatLng: function() {
				return this._latlng;
			},
			_height: function() {
				var t = this.options;
				return t.height - t.margins.top - t.margins.bottom;
			}
		}),
		W = L.Class.extend({
			initialize: function(t) {
				(this.options = t),
					y(
						(this._container = x('div', 'elevation-summary ' + (t.summary ? t.summary + '-summary' : ''))),
						'max-width',
						t.width ? t.width + 'px' : ''
					);
			},
			render: function() {
				var t = this;
				return function(e) {
					return e.append(function() {
						return t._container;
					});
				};
			},
			reset: function() {
				this._container.innerHTML = '';
			},
			append: function(t, e, i) {
				return (
					(this._container.innerHTML += '<span class="'
						.concat(t, '"><span class="summarylabel">')
						.concat(e, '</span><span class="summaryvalue">')
						.concat(i, '</span></span>')),
					this
				);
			}
		}),
		Z = {
			autohide: !L.Browser.mobile,
			autohideMarker: !0,
			collapsed: !1,
			detached: !0,
			distanceFactor: 1,
			decimalsX: 2,
			decimalsY: 0,
			dragging: !L.Browser.mobile,
			downloadLink: 'link',
			elevationDiv: '#elevation-div',
			followMarker: !0,
			forceAxisBounds: !0,
			gpxOptions: {
				async: !0,
				marker_options: {
					startIconUrl: null,
					endIconUrl: null,
					shadowUrl: null,
					wptIcons: {
						'': L.divIcon({
							className: 'elevation-waypoint-marker',
							html: '<i class="elevation-waypoint-icon"></i>',
							iconSize: [ 30, 30 ],
							iconAnchor: [ 8, 30 ]
						})
					}
				}
			},
			height: 200,
			heightFactor: 1,
			imperial: !1,
			interpolation: 'curveLinear',
			lazyLoadJS: !0,
			legend: !0,
			loadData: { defer: !1, lazy: !1 },
			margins: { top: 20, right: 15, bottom: 20, left: 35 },
			marker: 'elevation-line',
			markerIcon: L.divIcon({
				className: 'elevation-position-marker',
				html: '<i class="elevation-position-icon"></i>',
				iconSize: [ 32, 32 ],
				iconAnchor: [ 16, 16 ]
			}),
			placeholder: !1,
			position: 'topright',
			polyline: { className: 'elevation-polyline', color: '#000', opacity: 0.75, weight: 5, lineCap: 'round' },
			polylineSegments: { className: 'elevation-polyline-segments', color: '#F00', interactive: !1 },
			reverseCoords: !1,
			ruler: !0,
			skipNullZCoords: !1,
			theme: 'red-theme',
			responsive: !0,
			summary: 'inline',
			slope: !1,
			speed: !1,
			sLimit: void 0,
			time: !1,
			timeFactor: 3600,
			timeFormat: !1,
			sDeltaMax: void 0,
			sInterpolation: 'curveStepAfter',
			sRange: void 0,
			width: 600,
			xAttr: 'dist',
			xLabel: 'km',
			xTicks: void 0,
			yAttr: 'z',
			yAxisMax: void 0,
			yAxisMin: void 0,
			yLabel: 'm',
			yTicks: void 0,
			zFollow: !1
		},
		q = (L.Control.Elevation = L.Control.extend({
			includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
			options: Z,
			__mileFactor: 0.621371,
			__footFactor: 3.28084,
			__D3: 'https://unpkg.com/d3@5.15.0/dist/d3.min.js',
			__LGPX: 'https://unpkg.com/leaflet-gpx@1.5.0/gpx.js',
			addData: function(e, i) {
				var a = this;
				null == i && e.on && (i = e),
					(q._d3LazyLoader = _(
						this.__D3,
						'object' !== ('undefined' == typeof d3 ? 'undefined' : t(d3)) || !this.options.lazyLoadJS,
						q._d3LazyLoader
					).then(function() {
						a._addData(e),
							a._addLayer(i),
							a._fireEvt('eledata_added', { data: e, layer: i, track_info: a.track_info });
					}));
			},
			addTo: function(t) {
				if (this.options.detached) {
					var e = this._initElevationDiv();
					e.isConnected || k(t.getContainer(), e, 'afterend'), b(e, this.onAdd(t));
				} else L.Control.prototype.addTo.call(this, t);
				return this;
			},
			clear: function() {
				this._marker && this._marker.remove(),
					this._chart && this._chart.clear(),
					this._layers && this._layers.clearLayers(),
					(this._data = []),
					(this.track_info = {}),
					this._fireEvt('eledata_clear');
			},
			disableDragging: function() {
				(this._chart._draggingEnabled = !1), this._resetDrag();
			},
			enableDragging: function() {
				this._chart._draggingEnabled = !0;
			},
			fitBounds: function(t) {
				(t = t || this.getBounds()), this._map && t.isValid() && this._map.fitBounds(t);
			},
			getBounds: function(t) {
				return (
					(t = t || this._data),
					L.latLngBounds(
						t.map(function(t) {
							return t.latlng;
						})
					)
				);
			},
			getZFollow: function() {
				return this._zFollow;
			},
			hide: function() {
				y(this._container, 'display', 'none');
			},
			initialize: function(t) {
				(this._data = []),
					(this._layers = L.featureGroup()),
					(this._markedSegments = L.polyline([])),
					(this._chartEnabled = !0),
					(this.track_info = {}),
					(this.options = i({}, this.options, t)),
					(this._zFollow = this.options.zFollow),
					this.options.followMarker && (this._setMapView = L.Util.throttle(this._setMapView, 300, this)),
					this.options.placeholder && (this.options.loadData.lazy = this.options.loadData.defer = !0),
					this.options.legend && (this.options.margins.bottom += 30),
					this.options.theme && (this.options.polylineSegments.className += ' ' + this.options.theme),
					this._markedSegments.setStyle(this.options.polylineSegments);
			},
			load: function(t, e) {
				this.loadData(t, e);
			},
			loadChart: function(t) {
				this.addTo(t);
			},
			loadData: function(t, e) {
				(e = L.extend({}, this.options.loadData, e)).defer
					? this.loadDefer(t, e)
					: e.lazy
						? this.loadLazy(t, e)
						: c(t) ? this.loadGPX(t) : d(t) ? this.loadGeoJSON(t) : this.loadFile(t);
			},
			loadDefer: function(t, e) {
				((e = L.extend({}, this.options.loadData, e)).defer = !1), a(L.bind(this.loadData, this, t, e));
			},
			loadFile: function(t) {
				var e = this;
				u(t)
					.then(function(i) {
						(e._downloadURL = t), e.loadData(i, { lazy: !1, defer: !1 });
					})
					.catch(function(t) {
						return console.warn(t);
					});
			},
			loadGeoJSON: function(t) {
				s(t, this);
			},
			loadGPX: function(t) {
				var e = this;
				q._gpxLazyLoader = _(
					this.__LGPX,
					'function' != typeof L.GPX || !this.options.lazyLoadJS,
					q._gpxLazyLoader
				).then(function() {
					return r(t, e);
				});
			},
			loadLazy: function(t, e) {
				var i = this,
					a = (e = L.extend({}, this.options.loadData, e)).lazy.parentNode ? e.lazy : this.placeholder;
				f(a).then(function() {
					(e.lazy = !1),
						i.loadData(t, e),
						i.once('eledata_loaded', function() {
							return i.placeholder.parentNode.removeChild(a);
						});
				});
			},
			onAdd: function(e) {
				var i = this;
				this._map = e;
				var a = (this._container = x('div', 'elevation-control elevation ' + this.options.theme));
				return (
					this.options.detached || m(a, 'leaflet-control'),
					this.options.placeholder &&
						!this._data.length &&
						((this.placeholder = x(
							'img',
							'elevation-placeholder',
							'string' == typeof this.options.placeholder
								? { src: this.options.placeholder, alt: '' }
								: this.options.placeholder
						)),
						k(a, this.placeholder, 'afterbegin')),
					(q._d3LazyLoader = _(
						this.__D3,
						'object' !== ('undefined' == typeof d3 ? 'undefined' : t(d3)) || !this.options.lazyLoadJS,
						q._d3LazyLoader
					).then(function() {
						i._initButton(a),
							i._initChart(a),
							i._initSummary(a),
							i._initMarker(e),
							i._initLayer(e),
							e
								.on('zoom viewreset zoomanim', i._hideMarker, i)
								.on('resize', i._resetView, i)
								.on('resize', i._resizeChart, i)
								.on('mousedown', i._resetDrag, i),
							D(e.getContainer(), 'mousewheel', i._resetDrag, i),
							D(e.getContainer(), 'touchstart', i._resetDrag, i),
							i
								.on('eledata_added eledata_loaded', i._updateChart, i)
								.on('eledata_added eledata_loaded', i._updateSummary, i),
							i._updateChart(),
							i._updateSummary();
					})),
					a
				);
			},
			onRemove: function(t) {
				(this._container = null),
					t
						.off('zoom viewreset zoomanim', this._hideMarker, this)
						.off('resize', this._resetView, this)
						.off('resize', this._resizeChart, this)
						.off('mousedown', this._resetDrag, this),
					S(t.getContainer(), 'mousewheel', this._resetDrag, this),
					S(t.getContainer(), 'touchstart', this._resetDrag, this),
					this.off('eledata_added eledata_loaded', this._updateChart, this).off(
						'eledata_added eledata_loaded',
						this._updateSummary,
						this
					);
			},
			redraw: function() {
				this._resizeChart();
			},
			setZFollow: function(t) {
				this._zFollow = t;
			},
			show: function() {
				y(this._container, 'display', 'block');
			},
			_addData: function(t) {
				var e = this,
					i = t && t.geometry,
					a = t && 'FeatureCollection' === t.type,
					n = t && t._latlngs;
				if (i)
					switch (i.type) {
						case 'LineString':
							this._addGeoJSONData(i.coordinates);
							break;
						case 'MultiLineString':
							F(i.coordinates, function(t) {
								return e._addGeoJSONData(t);
							});
							break;
						default:
							console.warn('Unsopperted GeoJSON feature geometry type:' + i.type);
					}
				a &&
					F(t.features, function(t) {
						return e._addData(t);
					}),
					n && this._addGPXData(t._latlngs);
			},
			_addGeoJSONData: function(t) {
				var e = this;
				F(t, function(t) {
					e._addPoint(t[1], t[0], t[2]),
						e._fireEvt('elepoint_added', { point: t, index: e._data.length - 1 });
				}),
					this._fireEvt('eletrack_added', { coords: t, index: this._data.length - 1 });
			},
			_addGPXData: function(t) {
				var e = this;
				F(t, function(t) {
					e._addPoint(t.lat, t.lng, t.meta.ele),
						e._fireEvt('elepoint_added', { point: t, index: e._data.length - 1 });
				}),
					this._fireEvt('eletrack_added', { coords: t, index: this._data.length - 1 });
			},
			_addPoint: function(t, e, i) {
				if (this.options.reverseCoords) {
					var a = [ e, t ];
					(t = a[0]), (e = a[1]);
				}
				this._data.push({ x: t, y: e, z: i, latlng: L.latLng(t, e, i) }),
					this._fireEvt('eledata_updated', { index: this._data.length - 1 });
			},
			_addLayer: function(t) {
				t && this._layers.addLayer(t);
			},
			_initElevationDiv: function() {
				var t = C(this.options.elevationDiv);
				return (
					t ||
						((this.options.elevationDiv = '#elevation-div_' + A()),
						(t = x('div', 'leaflet-control elevation elevation-div', {
							id: this.options.elevationDiv.substr(1)
						}))),
					this.options.detached && (m(t, 'elevation-detached'), g(t, 'leaflet-control')),
					(this.eleDiv = t),
					this.eleDiv
				);
			},
			_collapse: function() {
				g(this._container, 'elevation-expanded'), m(this._container, 'elevation-collapsed');
			},
			_expand: function() {
				g(this._container, 'elevation-collapsed'), m(this._container, 'elevation-expanded');
			},
			_findItemForLatLng: function(t) {
				return this._data[this._chart._findIndexForLatLng(t)];
			},
			_findItemForX: function(t) {
				return this._data[this._chart._findIndexForXCoord(t)];
			},
			_fireEvt: function(t, e, i) {
				this.fire && this.fire(t, e, i), this._map && this._map.fire(t, e, i);
			},
			_height: function() {
				var t = this.options;
				return t.height - t.margins.top - t.margins.bottom;
			},
			_hideMarker: function() {
				this.options.autohideMarker && this._marker.remove();
			},
			_initChart: function(t) {
				var e = this.options;
				if (
					((e.xTicks = e.xTicks || Math.round(this._width() / 75)),
					(e.yTicks = e.yTicks || Math.round(this._height() / 30)),
					e.responsive)
				)
					if (e.detached) {
						var i = this.eleDiv.offsetWidth,
							a = this.eleDiv.offsetHeight;
						(e.width = i > 0 ? i : e.width), (e.height = a - 20 > 0 ? a - 20 : e.height);
					} else {
						e._maxWidth = e._maxWidth > e.width ? e._maxWidth : e.width;
						var n = this._map.getContainer().clientWidth;
						e.width = e._maxWidth > n ? n - 30 : e.width;
					}
				var o = (this._chart = new J(e));
				d3.select(t).call(o.render()),
					o
						.on('reset_drag', this._hideMarker, this)
						.on('mouse_enter', this._fireEvt.bind('elechart_enter'), this)
						.on('dragged', this._dragendHandler, this)
						.on('mouse_move', this._mousemoveHandler, this)
						.on('mouse_out', this._mouseoutHandler, this)
						.on('ruler_filter', this._rulerFilterHandler, this),
					this._fireEvt('elechart_axis'),
					this.options.legend && this._fireEvt('elechart_legend'),
					this._fireEvt('elechart_init');
			},
			_initLayer: function() {
				var t = this;
				this._layers.on('layeradd layerremove', function(e) {
					var i = e.layer,
						a = 'layeradd' == e.type ? m : g,
						n = i['layeradd' == e.type ? 'on' : 'off'].bind(i);
					a(i.getElement && i.getElement(), t.options.polyline.className + ' ' + t.options.theme),
						n('mousemove', t._mousemoveLayerHandler, t),
						n('mouseout', t._mouseoutHandler, t);
				});
			},
			_initMarker: function(t) {
				var e = t.getPane('elevationPane');
				e ||
					(((e = this._pane = t.createPane('elevationPane')).style.zIndex = 625),
					(e.style.pointerEvents = 'none')),
					this._renderer && this._renderer.remove(),
					(this._renderer = L.svg({ pane: 'elevationPane' }).addTo(this._map)),
					(this._marker = new V(this.options));
			},
			_initButton: function(t) {
				if (
					(t.setAttribute('aria-haspopup', !0),
					this.options.detached || L.DomEvent.disableClickPropagation(t),
					L.Browser.mobile && D(t, 'click', L.DomEvent.stopPropagation),
					D(t, 'mousewheel', this._mousewheelHandler, this),
					!this.options.detached)
				) {
					var e = (this._button = x(
						'a',
						'elevation-toggle elevation-toggle-icon' + (this.options.autohide ? '' : ' close-button'),
						{ href: '#', title: L._('Elevation') },
						t
					));
					this.options.collapsed &&
						(this._collapse(),
						this.options.autohide
							? (D(t, 'mouseover', this._expand, this), D(t, 'mouseout', this._collapse, this))
							: (D(e, 'click', L.DomEvent.stop), D(e, 'click', this._toggle, this)),
						D(e, 'focus', this._toggle, this),
						this._map.on('click', this._collapse, this));
				}
			},
			_initSummary: function(t) {
				var e = (this._summary = new W({ summary: this.options.summary }));
				d3.select(t).call(e.render()), (this.summaryDiv = this._summary._container);
			},
			_dragendHandler: function(t) {
				this._hideMarker(),
					this.fitBounds(L.latLngBounds([ t.dragstart.latlng, t.dragend.latlng ])),
					this._fireEvt('elechart_dragged');
			},
			_mousemoveHandler: function(t) {
				if (this._data.length && this._chartEnabled) {
					var e = t.xCoord,
						i = this._findItemForX(e);
					this._chartEnabled && this._chart._showDiagramIndicator(i, e),
						this._updateMarker(i),
						this._setMapView(i),
						this._map && m(this._map.getContainer(), 'elechart-hover'),
						this._fireEvt('elechart_change', { data: i, xCoord: e }),
						this._fireEvt('elechart_hover', { data: i, xCoord: e });
				}
			},
			_mousemoveLayerHandler: function(t) {
				if (this._data.length) {
					var e = this._findItemForLatLng(t.latlng);
					if (e) {
						var i = e.xDiagCoord;
						this._chartEnabled && this._chart._showDiagramIndicator(e, i),
							this._updateMarker(e),
							this._fireEvt('elechart_change', { data: e, xCoord: i });
					}
				}
			},
			_mouseoutHandler: function() {
				this.options.detached || (this._hideMarker(), this._chart._hideDiagramIndicator()),
					this._map && g(this._map.getContainer(), 'elechart-hover'),
					this._fireEvt('elechart_leave');
			},
			_mousewheelHandler: function(t) {
				if (!this._map.gestureHandling || !this._map.gestureHandling._enabled) {
					var e = this._marker.getLatLng() || this._map.getCenter(),
						i = this._map.getZoom() + Math.sign(t.deltaY);
					this._resetDrag(), this._map.flyTo(e, i);
				}
			},
			_resetDrag: function() {
				this._chart._resetDrag(), this._hideMarker();
			},
			_resetView: function() {
				(this._map && this._map._isFullscreen) || (this._resetDrag(), this._hideMarker(), this.fitBounds());
			},
			_resizeChart: function() {
				if ('none' != y(this._container, 'display')) {
					if (this.options.responsive)
						if (this.options.detached) {
							var t = this.eleDiv.offsetWidth;
							t &&
								((this.options.width = t),
								(this.eleDiv.innerHTML = ''),
								b(this.eleDiv, this.onAdd(this._map)));
						} else this._map.removeControl(this._container), this.addTo(this._map);
					this._updateMapSegments();
				}
			},
			_rulerFilterHandler: function(t) {
				this._updateMapSegments(t.coords);
			},
			_toggle: function() {
				M(this._container, 'elevation-expanded') ? this._collapse() : this._expand();
			},
			_setMapView: function(t) {
				if (this.options.followMarker && this._map) {
					var e = this._map.getZoom();
					'number' == typeof this._zFollow
						? ((e = e < this._zFollow ? this._zFollow : e),
							this._map.setView(t.latlng, e, { animate: !0, duration: 0.25 }))
						: this._map.getBounds().contains(t.latlng) ||
							this._map.setView(t.latlng, e, { animate: !0, duration: 0.25 });
				}
			},
			_updateChart: function() {
				this._data.length &&
					this._container &&
					((this._chart = this._chart.update({ data: this._data })),
					(this._x = this._chart._x),
					(this._y = this._chart._y),
					this._fireEvt('elechart_axis'),
					this._fireEvt('elechart_area'),
					this._fireEvt('elechart_updated'));
			},
			_updateMarker: function(t) {
				this._marker.update({
					map: this._map,
					item: t,
					maxElevation: this._maxElevation,
					options: this.options
				});
			},
			_updateMapSegments: function(t) {
				this._markedSegments.setLatLngs(t || []),
					t &&
						this._map &&
						!this._map.hasLayer(this._markedSegments) &&
						this._markedSegments.addTo(this._map);
			},
			_updateSummary: function() {
				var t = this;
				this._summary.reset(),
					this.options.summary && this._fireEvt('elechart_summary')
			},
			_width: function() {
				var t = this.options;
				return t.width - t.margins.left - t.margins.right;
			}
		}));
	q.addInitHook(function() {
		this.on('waypoint_added', function(t) {
			var e = t.point,
				i = e._popup;
			i && (i.options.className = 'elevation-popup'),
				i._content &&
					((i._content = decodeURI(i._content)),
					e
						.bindTooltip(i._content, {
							direction: 'top',
							sticky: !0,
							opacity: 1,
							className: 'elevation-tooltip'
						})
						.openTooltip());
		}),
			this.on('elepath_toggle', function(t) {
				var e = this,
					i = t.path,
					a = i.getAttribute('data-name').toLowerCase(),
					n = M(i, 'hidden'),
					o = C('text', t.legend),
					s = C('rect', t.legend);
				y(o, 'text-decoration-line', n ? '' : 'line-through'),
					y(s, 'fill-opacity', n ? '' : '0'),
					v(i, 'hidden', !n),
					(this._chartEnabled = 0 != this._chart._area.selectAll('path:not(.hidden)').nodes().length),
					this._layers.eachLayer(function(t) {
						return v(
							t.getElement && t.getElement(),
							e.options.polyline.className + ' ' + e.options.theme,
							e._chartEnabled
						);
					}),
					(this.options[a] = n && 'disabled' == this.options[a] ? 'enabled' : 'disabled'),
					this._chartEnabled || (this._chart._hideDiagramIndicator(), this._marker.remove());
			}),
			this.on('elechart_updated elechart_init', function() {
				var t = this,
					e = this._chart._legend.selectAll('.legend-item'),
					i = e.nodes().length,
					a = Array(Math.floor(i / 2)).fill(null).map(function(t, e) {
						return 2 * (e + 1) - (1 - Math.sign(i % 2));
					}),
					n = a.slice().reverse().map(function(t) {
						return -t;
					});
				i % 2 != 0 && n.push(0),
					(a = n.concat(a)),
					e.each(function(e, i, n) {
						var o = n[i],
							s = o.getAttribute('data-name'),
							r = s.toLowerCase(),
							l = t._chart._area.select('path[data-name="' + s + '"]').node();
						d3.select(o).on('click', function() {
							return t._fireEvt('elepath_toggle', { path: l, name: s, legend: o });
						}),
							l &&
								r in t.options &&
								'disabled' == t.options[r] &&
								(l.classList.add('hidden'),
								(o.querySelector('text').style.textDecorationLine = 'line-through'),
								(o.querySelector('rect').style.fillOpacity = '0')),
							d3.select(o).attr('transform', 'translate(' + 50 * a[i] + ', 0)');
					}),
					this._chart._axis.selectAll('.y.axis.right').each(function(t, e, i) {
						var a = d3.select(i[e]),
							n = a.attr('transform'),
							o = n.substring(n.indexOf('(') + 1, n.indexOf(')')).split(',');
						a.attr('transform', 'translate(' + (+o[0] + 30 * e) + ',' + o[1] + ')'),
							e > 0 &&
								(a.select(':scope > path').attr('opacity', 0.25),
								a.selectAll(':scope > .tick line').attr('opacity', 0.75));
					});
				var o = 22 * i;
				this.options.margins.right != o && ((this.options.margins.right = o), this.redraw());
			}),
			this.on('eletrack_download', function(t) {
				'modal' == t.downloadLink && 'function' == typeof CustomEvent
					? document.dispatchEvent(new CustomEvent('eletrack_download', { detail: t }))
					: ('link' != t.downloadLink && !0 !== t.downloadLink) || t.confirm();
			}),
			this.on('eledata_loaded', function(t) {
				var e = this,
					i = this._map,
					a = t.layer;
				i
					? (i.once(
							'layeradd',
							function(t) {
								this.fitBounds(a.getBounds());
							},
							this
						),
						this.options.polyline && a.addTo(i),
						L.GeometryUtil &&
							i.almostOver &&
							i.almostOver.enabled() &&
							!L.Browser.mobile &&
							(i.almostOver.addLayer(a),
							i
								.on('almost:move', function(t) {
									return e._mousemoveLayerHandler(t);
								})
								.on('almost:out', function(t) {
									return e._mouseoutHandler(t);
								})))
					: console.warn('Undefined elevation map object');
			});
		var t = L.Canvas.prototype._fillStroke,
			e = this;
		L.Canvas.include({
			_fillStroke: function(i, a) {
				if (e._layers.hasLayer(a)) {
					var n = e.options.theme.replace('-theme', ''),
						o = a.options;
					switch (((o.stroke = !0), n)) {
						case 'lightblue':
							o.color = '#3366CC';
							break;
						case 'magenta':
							o.color = '#FF005E';
							break;
						case 'red':
							o.color = '#F00';
							break;
						case 'yellow':
							o.color = '#FF0';
							break;
						case 'purple':
							o.color = '#732C7B';
							break;
						case 'steelblue':
							o.color = '#4682B4';
							break;
						case 'lime':
							o.color = '#566B13';
							break;
						default:
							n ? (o.color = n) : (o.stroke = !1);
					}
					if ((t.call(this, i, a), o.stroke && 0 !== o.weight)) {
						var s = i.globalCompositeOperation || 'source-over';
						(i.globalCompositeOperation = 'destination-over'),
							(i.strokeStyle = '#FFF'),
							(i.lineWidth = 1.75 * o.weight),
							i.stroke(),
							(i.globalCompositeOperation = s);
					}
				} else t.call(this, i, a);
			}
		}),
			this.on('elechart_init', function() {
				this.once('elechart_change elechart_hover', function(t) {
					this._chartEnabled && this._chart._showDiagramIndicator(t.data, t.xCoord),
						this._updateMarker(t.data);
				});
			});
	}),
		q.addInitHook(function() {
			this.options.imperial
				? ((this._distanceFactor = this.__mileFactor), (this._xLabel = 'mi'))
				: ((this._distanceFactor = this.options.distanceFactor), (this._xLabel = this.options.xLabel)),
				this.on('eledata_updated', function(t) {
					var e = this._data,
						i = t.index,
						a = this._distance || 0,
						n = e[i].latlng,
						o = i > 0 ? e[i - 1].latlng : n,
						s = n.distanceTo(o) * this._distanceFactor;
					(a += Math.round(s / 1e3 * 1e5) / 1e5),
						(e[i].dist = a),
						(this.track_info.distance = this._distance = a);
				}),
				this.on('elechart_summary', function() {
					(this.track_info.distance = this._distance || 0),
						this._summary.append(
							'totlen',
							L._('Total Length: '),
							this.track_info.distance.toFixed(2) + '&nbsp;' + this._xLabel
						);
				}),
				this.on('eledata_clear', function() {
					this._distance = 0;
				});
		}),
		q.addInitHook(function() {
			this.options.imperial
				? ((this._heightFactor = this.__footFactor), (this._yLabel = 'ft'))
				: ((this._heightFactor = this.options.heightFactor), (this._yLabel = this.options.yLabel)),
				this.on('eledata_updated', function(t) {
					var e = this._data,
						i = t.index,
						a = e[i].z * this._heightFactor,
						n = this._maxElevation || -1 / 0,
						o = this._minElevation || 1 / 0;
					if (!this.options.skipNullZCoords && i > 0) {
						var s = e[i - 1].z;
						if (isNaN(s)) {
							var r = this._lastValidZ,
								l = a;
							if (
								(isNaN(r) || isNaN(l) ? (isNaN(r) ? isNaN(l) || (s = l) : (s = r)) : (s = (r + l) / 2),
								!isNaN(s))
							)
								return e.splice(i - 1, 1);
							e[i - 1].z = s;
						}
					}
					isNaN(a) || ((n = n < a ? a : n), (o = o > a ? a : o), (this._lastValidZ = a)),
						(e[i].z = a),
						(this.track_info.elevation_max = this._maxElevation = n),
						(this.track_info.elevation_min = this._minElevation = o);
				}),
				this.on('elechart_legend', function() {
					this._altitudeLegend = this._chart._legend
						.append('g')
						.call(
							O({
								name: 'Altitude',
								width: this._width(),
								height: this._height(),
								margins: this.options.margins
							})
						);
				}),
				this.on('elechart_summary', function() {
					(this.track_info.elevation_max = this._maxElevation || 0),
						(this.track_info.elevation_min = this._minElevation || 0),
						this._summary
							.append(
								'maxele',
								L._('Max Elevation: '),
								this.track_info.elevation_max.toFixed(2) + '&nbsp;' + this._yLabel
							)
							.append(
								'minele',
								L._('Min Elevation: '),
								this.track_info.elevation_min.toFixed(2) + '&nbsp;' + this._yLabel
							);
				}),
				this.on('eledata_clear', function() {
					(this._maxElevation = null), (this._minElevation = null);
				});
		}),
		q.addInitHook(function() {
			(this._timeFactor = this.options.timeFactor),
				this.options.timeFormat
					? 'time' == this.options.timeFormat
						? (this.options.timeFormat = function(t) {
								return new Date(t).toLocaleTimeString();
							})
						: 'date' == this.options.timeFormat &&
							(this.options.timeFormat = function(t) {
								return new Date(t).toLocaleDateString();
							})
					: (this.options.timeFormat = function(t) {
							return new Date(t).toLocaleString().replaceAll('/', '-').replaceAll(',', ' ');
						}),
				this.on('elepoint_added', function(t) {
					if (t.point.meta && t.point.meta.time) {
						var e = this._data,
							i = t.index,
							a = t.point.meta.time;
						a.getTime() - 6e4 * a.getTimezoneOffset() == 0 && (a = 0), (e[i].time = a);
						var n = e[i].time,
							o = i > 0 ? e[i - 1].time : n,
							s = Math.abs(n - o);
						this.track_info.time = (this.track_info.time || 0) + s;
					}
				}),
				this.options.time &&
					(this.on('elechart_change', function(t) {
						var e = this._chart,
							i = t.data;
						e._focuslabel &&
							i.time &&
							((e._focuslabelTime && e._focuslabelTime.property('isConnected')) ||
								(e._focuslabelTime = e._focuslabel
									.select('text')
									.insert('svg:tspan', '.mouse-focus-label-x')
									.attr('class', 'mouse-focus-label-time')
									.attr('dy', '1.5em')),
							e._focuslabelTime.text(this.options.timeFormat(i.time)));
					}),
					this.on('elechart_summary', function() {
						(this.track_info.time = this.track_info.time || 0),
							this._summary.append('tottime', L._('Total Time: '), o(this.track_info.time));
					}));
		}),
		q.addInitHook(function() {
			if (this.options.slope) {
				var t = this.options,
					e = {};
				'summary' != this.options.slope &&
					(this.on('elechart_init', function() {
						e.path = this._chart._area
							.append('path')
							.style('pointer-events', 'none')
							.attr('fill', '#F00')
							.attr('stroke', '#000')
							.attr('stroke-opacity', '0.5')
							.attr('fill-opacity', '0.25');
					}),
					this.on('elechart_axis', function() {
						(e.x = this._chart._x),
							(e.y = U({
								data: this._data,
								range: [ this._height(), 0 ],
								attr: 'slope',
								min: -1,
								max: 1,
								forceBounds: t.forceAxisBounds
							})),
							(e.axis = T({
								axis: 'y',
								position: 'right',
								width: this._width(),
								height: this._height(),
								scale: e.y,
								ticks: this.options.yTicks,
								tickPadding: 16,
								label: '%',
								labelX: 25,
								labelY: 3,
								name: 'slope'
							})),
							this._chart._axis.call(e.axis);
					}),
					this.on('elechart_area', function() {
						(e.area = z({
							interpolation: t.sInterpolation,
							data: this._data,
							name: 'Slope',
							xAttr: t.xAttr,
							yAttr: 'slope',
							width: this._width(),
							height: this._height(),
							scaleX: e.x,
							scaleY: e.y
						})),
							e.path.call(e.area);
					}),
					this.on('elechart_legend', function() {
						(e.legend = this._chart._legend
							.append('g')
							.call(
								O({
									name: 'Slope',
									width: this._width(),
									height: this._height(),
									margins: this.options.margins
								})
							)),
							e.legend
								.select('rect')
								.classed('area', !1)
								.attr('fill', '#F00')
								.attr('stroke', '#000')
								.attr('stroke-opacity', '0.5')
								.attr('fill-opacity', '0.25');
					})),
					this.on('eledata_updated', function(t) {
						var e = this._data,
							i = t.index,
							a = e[i].z,
							n = e[i].latlng,
							o = i > 0 ? e[i - 1].latlng : n,
							s = n.distanceTo(o) * this._distanceFactor,
							r = this._tAsc || 0,
							l = this._tDes || 0,
							h = this._sMax || 0,
							d = this._sMin || 0,
							c = 0;
						if (!isNaN(a)) {
							var _ = i > 0 ? a - e[i - 1].z : 0;
							_ > 0 ? (r += _) : _ < 0 && (l -= _), (c = 0 !== s ? _ / s * 100 : 0);
						}
						if (this.options.sDeltaMax) {
							var u = i > 0 ? c - e[i - 1].slope : 0,
								p = this.options.sDeltaMax;
							Math.abs(u) > p && (c = e[i - 1].slope + p * Math.sign(u));
						}
						if (this.options.sRange) {
							var f = this.options.sRange;
							c < f[0] ? (c = f[0]) : c > f[1] && (c = f[1]);
						}
						(h = (c = L.Util.formatNum(c, 2)) > h ? c : h),
							(d = c < d ? c : d),
							(e[i].slope = c),
							(this.track_info.ascent = this._tAsc = r),
							(this.track_info.descent = this._tDes = l),
							(this.track_info.slope_max = this._sMax = h),
							(this.track_info.slope_min = this._sMin = d);
					}),
					this.on('elechart_change', function(t) {
						var e = t.data,
							i = (t.xCoord, this._chart),
							a = this._marker;
						i._focuslabel &&
							((i._focuslabelSlope && i._focuslabelSlope.property('isConnected')) ||
								(i._focuslabelSlope = i._focuslabel
									.select('text')
									.insert('svg:tspan', '.mouse-focus-label-x')
									.attr('class', 'mouse-focus-label-slope')
									.attr('dy', '1.5em')),
							i._focuslabelSlope.text(e.slope + '%'),
							i._focuslabel.select('.mouse-focus-label-x').attr('dy', '1.5em')),
							a._focuslabel &&
								(i._mouseSlopeFocusLabel ||
									(i._mouseSlopeFocusLabel = a._focuslabel
										.append('svg:tspan')
										.attr('class', 'height-focus-slope ')),
								i._mouseSlopeFocusLabel.attr('dy', '1.5em').text(Math.round(e.slope) + '%'),
								a._focuslabel.select('.height-focus-y').attr('dy', '-1.5em'));
					}),
					this.on('elechart_summary', function() {
						(this.track_info.ascent = this._tAsc || 0),
							(this.track_info.descent = this._tDes || 0),
							(this.track_info.slope_max = this._sMax || 0),
							(this.track_info.slope_min = this._sMin || 0),
							this._summary
								.append(
									'ascent',
									L._('Total Ascent: '),
									Math.round(this.track_info.ascent) + '&nbsp;' + this._yLabel
								)
								.append(
									'descent',
									L._('Total Descent: '),
									Math.round(this.track_info.descent) + '&nbsp;' + this._yLabel
								)
								.append(
									'minslope',
									L._('Min Slope: '),
									Math.round(this.track_info.slope_min) + '&nbsp;%'
								)
								.append(
									'maxslope',
									L._('Max Slope: '),
									Math.round(this.track_info.slope_max) + '&nbsp;%'
								);
					}),
					this.on('eledata_clear', function() {
						(this._sMax = null), (this._sMin = null), (this._tAsc = null), (this._tDes = null);
					});
			}
		}),
		q.addInitHook(function() {
			if (this.options.speed || this.options.acceleration) {
				var t = this.options,
					e = {};
				(e.label = L._(this.options.imperial ? 'mph' : 'km/h')),
					this.options.speed &&
						'summary' != this.options.speed &&
						(this.on('elechart_init', function() {
							e.path = this._chart._area
								.append('path')
								.style('pointer-events', 'none')
								.attr('fill', '#03ffff')
								.attr('stroke', '#000')
								.attr('stroke-opacity', '0.5')
								.attr('fill-opacity', '0.25');
						}),
						this.on('elechart_axis', function() {
							(e.x = this._chart._x),
								(e.y = U({
									data: this._data,
									range: [ this._height(), 0 ],
									attr: 'speed',
									min: 0,
									max: 1,
									forceBounds: t.forceAxisBounds
								})),
								(e.axis = T({
									axis: 'y',
									position: 'right',
									width: this._width(),
									height: this._height(),
									scale: e.y,
									ticks: this.options.yTicks,
									tickPadding: 16,
									label: e.label,
									labelX: 25,
									labelY: 3,
									name: 'speed'
								})),
								this._chart._axis.call(e.axis);
						}),
						this.on('elechart_area', function() {
							(e.area = z({
								interpolation: t.sInterpolation,
								data: this._data,
								name: 'Speed',
								xAttr: t.xAttr,
								yAttr: 'speed',
								width: this._width(),
								height: this._height(),
								scaleX: e.x,
								scaleY: e.y
							})),
								e.path.call(e.area);
						}),
						this.on('elechart_legend', function() {
							(e.legend = this._chart._legend
								.append('g')
								.call(
									O({
										name: 'Speed',
										width: this._width(),
										height: this._height(),
										margins: this.options.margins
									})
								)),
								e.legend
									.select('rect')
									.classed('area', !1)
									.attr('fill', '#03ffff')
									.attr('stroke', '#000')
									.attr('stroke-opacity', '0.5')
									.attr('fill-opacity', '0.25');
						})),
					this.on('elepoint_added', function(t) {
						var e = this._data,
							i = t.index,
							a = e[i].time,
							n = a - (i > 0 ? e[i - 1].time : a),
							o = this._maxSpeed || -1 / 0,
							s = this._minSpeed || 1 / 0,
							r = this._avgSpeed || 0,
							l = 0;
						if (n > 0) {
							var h = e[i].latlng,
								d = i > 0 ? e[i - 1].latlng : h,
								c = h.distanceTo(d) * this._distanceFactor;
							l = Math.abs(c / n * this._timeFactor);
						}
						if (this.options.speedDeltaMax) {
							var _ = i > 0 ? l - e[i - 1].speed : 0,
								u = this.options.speedDeltaMax;
							Math.abs(_) > u && (l = e[i - 1].speed + u * Math.sign(_));
						}
						if (this.options.speedRange) {
							var p = this.options.speedRange;
							l < p[0] ? (l = p[0]) : l > p[1] && (l = p[1]);
						}
						(o = (l = L.Util.formatNum(l, 2)) > o ? l : o),
							(s = l < s ? l : s),
							(r = (l + r) / 2),
							(e[i].speed = l),
							(this.track_info.speed_max = this._maxSpeed = o),
							(this.track_info.speed_min = this._minSpeed = s),
							(this.track_info.speed_avg = this._avgSpeed = r);
					}),
					this.options.speed &&
						(this.on('elechart_change', function(t) {
							var i = t.data,
								a = this._chart,
								n = this._marker;
							a._focuslabel &&
								((a._focuslabelSpeed && a._focuslabelSpeed.property('isConnected')) ||
									(a._focuslabelSpeed = a._focuslabel
										.select('text')
										.insert('svg:tspan', '.mouse-focus-label-x')
										.attr('class', 'mouse-focus-label-speed')
										.attr('dy', '1.5em')),
								a._focuslabelSpeed.text(i.speed + ' ' + e.label),
								a._focuslabel.select('.mouse-focus-label-x').attr('dy', '1.5em')),
								n._focuslabel &&
									(a._mouseSpeedFocusLabel ||
										(a._mouseSpeedFocusLabel = n._focuslabel
											.append('svg:tspan')
											.attr('class', 'height-focus-speed ')),
									a._mouseSpeedFocusLabel
										.attr('dy', '1.5em')
										.text(Math.round(i.speed) + ' ' + e.label),
									n._focuslabel.select('.height-focus-y').attr('dy', '-1.5em'));
						}),
						this.on('elechart_summary', function() {
							(this.track_info.speed_max = this._maxSpeed || 0),
								(this.track_info.speed_min = this._minSpeed || 0),
								this._summary
									.append(
										'minspeed',
										L._('Min Speed: '),
										Math.round(this.track_info.speed_min) + '&nbsp;' + e.label
									)
									.append(
										'maxspeed',
										L._('Max Speed: '),
										Math.round(this.track_info.speed_max) + '&nbsp;' + e.label
									)
									.append(
										'avgspeed',
										L._('Avg Speed: '),
										Math.round(this.track_info.speed_avg) + '&nbsp;' + e.label
									);
						})),
					this.on('eledata_clear', function() {
						(this._maxSpeed = null), (this._minSpeed = null);
					});
			}
		}),
		q.addInitHook(function() {
			if (this.options.acceleration) {
				var t = this.options,
					e = {};
				(e.label = L._(this.options.imperial ? 'ft/s²' : 'm/s²')),
					'summary' != this.options.acceleration &&
						(this.on('elechart_init', function() {
							e.path = this._chart._area
								.append('path')
								.style('pointer-events', 'none')
								.attr('fill', '#050402')
								.attr('stroke', '#000')
								.attr('stroke-opacity', '0.5')
								.attr('fill-opacity', '0.25');
						}),
						this.on('elechart_axis', function() {
							(e.x = this._chart._x),
								(e.y = U({
									data: this._data,
									range: [ this._height(), 0 ],
									attr: 'acceleration',
									min: 0,
									max: 1,
									forceBounds: t.forceAxisBounds
								})),
								(e.axis = T({
									axis: 'y',
									position: 'right',
									width: this._width(),
									height: this._height(),
									scale: e.y,
									ticks: this.options.yTicks,
									tickPadding: 16,
									label: e.label,
									labelX: 25,
									labelY: 3,
									name: 'acceleration'
								})),
								this._chart._axis.call(e.axis);
						}),
						this.on('elechart_area', function() {
							(e.area = z({
								interpolation: t.sInterpolation,
								data: this._data,
								name: 'Acceleration',
								xAttr: t.xAttr,
								yAttr: 'acceleration',
								width: this._width(),
								height: this._height(),
								scaleX: e.x,
								scaleY: e.y
							})),
								e.path.call(e.area);
						}),
						this.on('elechart_legend', function() {
							(e.legend = this._chart._legend
								.append('g')
								.call(
									O({
										name: 'Acceleration',
										width: this._width(),
										height: this._height(),
										margins: this.options.margins
									})
								)),
								e.legend
									.select('rect')
									.classed('area', !1)
									.attr('fill', '#03ffff')
									.attr('stroke', '#000')
									.attr('stroke-opacity', '0.5')
									.attr('fill-opacity', '0.25');
						})),
					this.on('elepoint_added', function(t) {
						var e = this._data,
							i = t.index,
							a = e[i].time,
							n = (a - (i > 0 ? e[i - 1].time : a)) / 1e3,
							o = this._maxAcceleration || -1 / 0,
							s = this._minAcceleration || 1 / 0,
							r = this._avgAcceleration || 0,
							l = 0;
						if (n > 0) {
							var h = e[i].speed,
								d = (h - (i > 0 ? e[i - 1].speed : h)) * (1e3 / this._timeFactor);
							l = Math.abs(d / n);
						}
						if (this.options.accelerationDeltaMax) {
							var c = i > 0 ? l - e[i - 1].acceleration : 0,
								_ = this.options.accelerationDeltaMax;
							Math.abs(c) > _ && (l = e[i - 1].acceleration + _ * Math.sign(c));
						}
						if (this.options.accelerationRange) {
							var u = this.options.accelerationRange;
							l < u[0] ? (l = u[0]) : l > u[1] && (l = u[1]);
						}
						(o = (l = L.Util.formatNum(l, 2)) > o ? l : o),
							(s = l < s ? l : s),
							(r = (l + r) / 2),
							(e[i].acceleration = l),
							(this.track_info.acceleration_max = this._maxAcceleration = o),
							(this.track_info.acceleration_min = this._minAcceleration = s),
							(this.track_info.acceleration_avg = this._avgAcceleration = r);
					}),
					this.on('elechart_change', function(t) {
						var i = t.data,
							a = this._chart,
							n = this._marker;
						a._focuslabel &&
							((a._focuslabelAcceleration && a._focuslabelAcceleration.property('isConnected')) ||
								(a._focuslabelAcceleration = a._focuslabel
									.select('text')
									.insert('svg:tspan', '.mouse-focus-label-x')
									.attr('class', 'mouse-focus-label-acceleration')
									.attr('dy', '1.5em')),
							a._focuslabelAcceleration.text(i.acceleration + ' ' + e.label),
							a._focuslabel.select('.mouse-focus-label-x').attr('dy', '1.5em')),
							n._focuslabel &&
								(a._mouseAccelerationFocusLabel ||
									(a._mouseAccelerationFocusLabel = n._focuslabel
										.append('svg:tspan')
										.attr('class', 'height-focus-acceleration ')),
								a._mouseAccelerationFocusLabel
									.attr('dy', '1.5em')
									.text(Math.round(i.acceleration) + ' ' + e.label),
								n._focuslabel.select('.height-focus-y').attr('dy', '-1.5em'));
					}),
					this.on('elechart_summary', function() {
						(this.track_info.acceleration_max = this._maxAcceleration || 0),
							(this.track_info.acceleration_min = this._minAcceleration || 0),
							this._summary
								.append(
									'minacceleration',
									L._('Min Acceleration: '),
									Math.round(this.track_info.acceleration_min) + '&nbsp;' + e.label
								)
								.append(
									'maxacceleration',
									L._('Max Acceleration: '),
									Math.round(this.track_info.acceleration_max) + '&nbsp;' + e.label
								)
								.append(
									'avgacceleration',
									L._('Avg Acceleration: '),
									Math.round(this.track_info.acceleration_avg) + '&nbsp;' + e.label
								);
					}),
					this.on('eledata_clear', function() {
						(this._maxAcceleration = null), (this._minAcceleration = null);
					});
			}
		}),
		(q.Utils = E),
		(q.Components = j),
		(q.Chart = J),
		(L.control.elevation = function(t) {
			return new q(t);
		});
});
//# sourceMappingURL=leaflet-elevation.min.js.map
