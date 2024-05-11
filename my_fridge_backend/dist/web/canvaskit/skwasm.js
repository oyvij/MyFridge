'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var skwasm = function () {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return function () {
    var moduleArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    function aa() {
      d.buffer != h.buffer && k();return h;
    }function p() {
      d.buffer != h.buffer && k();return ca;
    }function q() {
      d.buffer != h.buffer && k();return da;
    }function t() {
      d.buffer != h.buffer && k();return ea;
    }function v() {
      d.buffer != h.buffer && k();return fa;
    }function ha() {
      d.buffer != h.buffer && k();return ia;
    }var w = moduleArg,
        ja,
        ka;w.ready = new Promise(function (a, b) {
      ja = a;ka = b;
    });
    var la = Object.assign({}, w),
        ma = "./this.program",
        na = function na(a, b) {
      throw b;
    },
        oa = "object" == (typeof window === 'undefined' ? 'undefined' : _typeof(window)),
        pa = "function" == typeof importScripts,
        x = "object" == (typeof process === 'undefined' ? 'undefined' : _typeof(process)) && "object" == _typeof(process.versions) && "string" == typeof process.versions.node,
        A = w.ENVIRONMENT_IS_PTHREAD || !1,
        C = "";function qa(a) {
      return w.locateFile ? w.locateFile(a, C) : C + a;
    }var ra, sa, ta;
    if (x) {
      var fs = require("fs"),
          ua = require("path");C = pa ? ua.dirname(C) + "/" : __dirname + "/";ra = function ra(b, c) {
        b = b.startsWith("file://") ? new URL(b) : ua.normalize(b);return fs.readFileSync(b, c ? void 0 : "utf8");
      };ta = function ta(b) {
        b = ra(b, !0);b.buffer || (b = new Uint8Array(b));return b;
      };sa = function sa(b, c, e) {
        var f = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !0;
        b = b.startsWith("file://") ? new URL(b) : ua.normalize(b);fs.readFile(b, f ? void 0 : "utf8", function (g, l) {
          g ? e(g) : c(f ? l.buffer : l);
        });
      };!w.thisProgram && 1 < process.argv.length && (ma = process.argv[1].replace(/\\/g, "/"));process.argv.slice(2);na = function na(b, c) {
        process.exitCode = b;throw c;
      };w.inspect = function () {
        return "[Emscripten Module object]";
      };var a = void 0;try {
        a = require("worker_threads");
      } catch (b) {
        throw console.error('The "worker_threads" module is not supported in this node.js build - perhaps a newer version is needed?'), b;
      }global.Worker = a.Worker;
    } else if (oa || pa) pa ? C = self.location.href : "undefined" != typeof document && document.currentScript && (C = document.currentScript.src), _scriptDir && (C = _scriptDir), 0 !== C.indexOf("blob:") ? C = C.substr(0, C.replace(/[?#].*/, "").lastIndexOf("/") + 1) : C = "", x || (ra = function ra(a) {
      var b = new XMLHttpRequest();b.open("GET", a, !1);b.send(null);return b.responseText;
    }, pa && (ta = function ta(a) {
      var b = new XMLHttpRequest();b.open("GET", a, !1);b.responseType = "arraybuffer";b.send(null);return new Uint8Array(b.response);
    }), sa = function sa(a, b, c) {
      var e = new XMLHttpRequest();e.open("GET", a, !0);e.responseType = "arraybuffer";e.onload = function () {
        200 == e.status || 0 == e.status && e.response ? b(e.response) : c();
      };e.onerror = c;e.send(null);
    });x && "undefined" == typeof performance && (global.performance = require("perf_hooks").performance);
    var va = console.log.bind(console),
        wa = console.error.bind(console);x && (va = function va() {
      for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
        a[_key] = arguments[_key];
      }

      return fs.writeSync(1, a.join(" ") + "\n");
    }, wa = function wa() {
      for (var _len2 = arguments.length, a = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        a[_key2] = arguments[_key2];
      }

      return fs.writeSync(2, a.join(" ") + "\n");
    });var xa = w.print || va,
        D = w.printErr || wa;Object.assign(w, la);la = null;w.thisProgram && (ma = w.thisProgram);w.quit && (na = w.quit);var ya;w.wasmBinary && (ya = w.wasmBinary);var noExitRuntime = w.noExitRuntime || !0;"object" != (typeof WebAssembly === 'undefined' ? 'undefined' : _typeof(WebAssembly)) && za("no native wasm support detected");var d,
        F,
        Aa,
        Ba = !1,
        Ca,
        h,
        ca,
        Da,
        Ea,
        da,
        ea,
        fa,
        ia;
    function k() {
      var a = d.buffer;w.HEAP8 = h = new Int8Array(a);w.HEAP16 = Da = new Int16Array(a);w.HEAP32 = da = new Int32Array(a);w.HEAPU8 = ca = new Uint8Array(a);w.HEAPU16 = Ea = new Uint16Array(a);w.HEAPU32 = ea = new Uint32Array(a);w.HEAPF32 = fa = new Float32Array(a);w.HEAPF64 = ia = new Float64Array(a);
    }var Fa = w.INITIAL_MEMORY || 16777216;65536 <= Fa || za("INITIAL_MEMORY should be larger than STACK_SIZE, was " + Fa + "! (STACK_SIZE=65536)");
    if (A) d = w.wasmMemory;else if (w.wasmMemory) d = w.wasmMemory;else if (d = new WebAssembly.Memory({ initial: Fa / 65536, maximum: 32768, shared: !0 }), !(d.buffer instanceof SharedArrayBuffer)) throw D("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"), x && D("(on node you may need: --experimental-wasm-threads --experimental-wasm-bulk-memory and/or recent version)"), Error("bad memory");k();Fa = d.buffer.byteLength;var G,
        Ga = [],
        Ha = [],
        Ia = [],
        Ja = 0;function Ka() {
      return noExitRuntime || 0 < Ja;
    }var H = 0,
        La = null,
        Ma = null;function Na() {
      H++;w.monitorRunDependencies && w.monitorRunDependencies(H);
    }function Oa() {
      H--;w.monitorRunDependencies && w.monitorRunDependencies(H);if (0 == H && (null !== La && (clearInterval(La), La = null), Ma)) {
        var a = Ma;Ma = null;a();
      }
    }
    function za(a) {
      if (w.onAbort) w.onAbort(a);a = "Aborted(" + a + ")";D(a);Ba = !0;Ca = 1;a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");ka(a);throw a;
    }function Pa(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }var Qa;Qa = "skwasm.wasm";Pa(Qa) || (Qa = qa(Qa));function Ra(a) {
      if (a == Qa && ya) return new Uint8Array(ya);if (ta) return ta(a);throw "both async and sync fetching of the wasm failed";
    }
    function Sa(a) {
      if (!ya && (oa || pa)) {
        if ("function" == typeof fetch && !a.startsWith("file://")) return fetch(a, { credentials: "same-origin" }).then(function (b) {
          if (!b.ok) throw "failed to load wasm binary file at '" + a + "'";return b.arrayBuffer();
        }).catch(function () {
          return Ra(a);
        });if (sa) return new Promise(function (b, c) {
          sa(a, function (e) {
            return b(new Uint8Array(e));
          }, c);
        });
      }return Promise.resolve().then(function () {
        return Ra(a);
      });
    }function Ta(a, b, c) {
      return Sa(a).then(function (e) {
        return WebAssembly.instantiate(e, b);
      }).then(function (e) {
        return e;
      }).then(c, function (e) {
        D("failed to asynchronously prepare wasm: " + e);za(e);
      });
    }
    function Ua(a, b) {
      var c = Qa;return ya || "function" != typeof WebAssembly.instantiateStreaming || Pa(c) || c.startsWith("file://") || x || "function" != typeof fetch ? Ta(c, a, b) : fetch(c, { credentials: "same-origin" }).then(function (e) {
        return WebAssembly.instantiateStreaming(e, a).then(b, function (f) {
          D("wasm streaming compile failed: " + f);D("falling back to ArrayBuffer instantiation");return Ta(c, a, b);
        });
      });
    }function Va(a) {
      this.name = "ExitStatus";this.message = 'Program terminated with exit(' + a + ')';this.status = a;
    }
    function Wa(a) {
      a.terminate();a.onmessage = function () {};
    }function Xa(a) {
      (a = I.g[a]) || za();I.xa(a);
    }function Ya(a) {
      var b = I.ma();if (!b) return 6;I.u.push(b);I.g[a.m] = b;b.m = a.m;var c = { cmd: "run", start_routine: a.ya, arg: a.ka, pthread_ptr: a.m };c.D = a.D;c.S = a.S;x && b.unref();b.postMessage(c, a.Ea);return 0;
    }
    var Za = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
        $a = function $a(a, b, c) {
      var e = b + c;for (c = b; a[c] && !(c >= e);) {
        ++c;
      }if (16 < c - b && a.buffer && Za) return Za.decode(a.slice(b, c));for (e = ""; b < c;) {
        var f = a[b++];if (f & 128) {
          var g = a[b++] & 63;if (192 == (f & 224)) e += String.fromCharCode((f & 31) << 6 | g);else {
            var l = a[b++] & 63;f = 224 == (f & 240) ? (f & 15) << 12 | g << 6 | l : (f & 7) << 18 | g << 12 | l << 6 | a[b++] & 63;65536 > f ? e += String.fromCharCode(f) : (f -= 65536, e += String.fromCharCode(55296 | f >> 10, 56320 | f & 1023));
          }
        } else e += String.fromCharCode(f);
      }return e;
    },
        J = function J(a, b) {
      return a ? $a(p(), a, b) : "";
    };function ab(a) {
      if (A) return K(1, 1, a);Ca = a;if (!Ka()) {
        I.za();if (w.onExit) w.onExit(a);Ba = !0;
      }na(a, new Va(a));
    }
    var cb = function cb(a) {
      Ca = a;if (A) throw bb(a), "unwind";ab(a);
    },
        I = { o: [], u: [], ha: [], g: {}, R: function R() {
        A ? I.ra() : I.qa();
      }, qa: function qa() {
        for (var a = 1; a--;) {
          I.X();
        }Ga.unshift(function () {
          Na();I.ta(function () {
            return Oa();
          });
        });
      }, ra: function ra() {
        I.receiveObjectTransfer = I.wa;I.threadInitTLS = I.ga;I.setExitStatus = I.fa;noExitRuntime = !1;
      }, fa: function fa(a) {
        Ca = a;
      }, La: ["$terminateWorker"], za: function za() {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = I.u[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var a = _step.value;
            Wa(a);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = I.o[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            a = _step2.value;
            Wa(a);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        I.o = [];I.u = [];I.g = [];
      }, xa: function xa(a) {
        var b = a.m;delete I.g[b];I.o.push(a);I.u.splice(I.u.indexOf(a), 1);a.m = 0;_db(b);
      }, wa: function wa(a) {
        "undefined" != typeof eb && (Object.assign(L, a.S), !w.canvas && a.D && L[a.D] && (w.canvas = L[a.D].F, w.canvas.id = a.D));
      }, ga: function ga() {
        I.ha.forEach(function (a) {
          return a();
        });
      }, ba: function ba(a) {
        return new Promise(function (b) {
          a.onmessage = function (g) {
            g = g.data;var l = g.cmd;if (g.targetThread && g.targetThread != fb()) {
              var n = I.g[g.Ka];n ? n.postMessage(g, g.transferList) : D('Internal error! Worker sent a message "' + l + '" to target pthread ' + g.targetThread + ", but that thread no longer exists!");
            } else if ("checkMailbox" === l) gb();else if ("spawnThread" === l) Ya(g);else if ("cleanupThread" === l) Xa(g.thread);else if ("killThread" === l) g = g.thread, l = I.g[g], delete I.g[g], Wa(l), _db(g), I.u.splice(I.u.indexOf(l), 1), l.m = 0;else if ("cancelThread" === l) I.g[g.thread].postMessage({ cmd: "cancel" });else if ("loaded" === l) a.loaded = !0, x && !a.m && a.unref(), b(a);else if ("alert" === l) alert("Thread " + g.threadId + ": " + g.text);else if ("setimmediate" === g.target) a.postMessage(g);else if ("callHandler" === l) w[g.handler].apply(w, _toConsumableArray(g.args));else l && D("worker sent an unknown command " + l);
          };a.onerror = function (g) {
            D("worker sent an error! " + g.filename + ":" + g.lineno + ": " + g.message);throw g;
          };x && (a.on("message", function (g) {
            a.onmessage({ data: g });
          }), a.on("error", function (g) {
            a.onerror(g);
          }));var c = [],
              e = ["onExit", "onAbort", "print", "printErr"],
              f;var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = e[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              f = _step3.value;
              w.hasOwnProperty(f) && c.push(f);
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          a.postMessage({ cmd: "load", handlers: c, urlOrBlob: w.mainScriptUrlOrBlob || _scriptDir, wasmMemory: d, wasmModule: Aa });
        });
      }, ta: function ta(a) {
        if (A) return a();Promise.all(I.o.map(I.ba)).then(a);
      }, X: function X() {
        var a = qa("skwasm.worker.js");a = new Worker(a);I.o.push(a);
      }, ma: function ma() {
        0 == I.o.length && (I.X(), I.ba(I.o[0]));return I.o.pop();
      } };w.PThread = I;var hb = function hb(a) {
      for (; 0 < a.length;) {
        a.shift()(w);
      }
    };w.establishStackSpace = function () {
      var a = fb(),
          b = q()[a + 52 >> 2];a = q()[a + 56 >> 2];_ib(b, b - a);_M(b);
    };function bb(a) {
      if (A) return K(2, 0, a);cb(a);
    }w.invokeEntryPoint = function (a, b) {
      a = G.get(a)(b);Ka() ? I.fa(a) : jb(a);
    };function kb(a) {
      this.C = a - 24;this.ua = function (b) {
        t()[this.C + 4 >> 2] = b;
      };this.sa = function (b) {
        t()[this.C + 8 >> 2] = b;
      };this.R = function (b, c) {
        this.na();this.ua(b);this.sa(c);
      };this.na = function () {
        t()[this.C + 16 >> 2] = 0;
      };
    }var lb = 0,
        mb = 0;
    function nb(a, b, c, e) {
      return A ? K(3, 1, a, b, c, e) : ob(a, b, c, e);
    }
    function ob(a, b, c, e) {
      if ("undefined" == typeof SharedArrayBuffer) return D("Current environment does not support SharedArrayBuffer, pthreads are not available!"), 6;var f = [],
          g = 0,
          l = b ? t()[b + 40 >> 2] : 0;4294967295 == l ? l = "#canvas" : l && (l = J(l).trim());l && (l = l.split(","));var n = {},
          r = w.canvas ? w.canvas.id : "",
          u;for (u in l) {
        var y = l[u].trim();try {
          if ("#canvas" == y) {
            if (!w.canvas) {
              D('pthread_create: could not find canvas with ID "' + y + '" to transfer to thread!');g = 28;break;
            }y = w.canvas.id;
          }if (L[y]) {
            var V = L[y];L[y] = null;w.canvas instanceof OffscreenCanvas && y === w.canvas.id && (w.canvas = null);
          } else if (!A) {
            var E = w.canvas && w.canvas.id === y ? w.canvas : document.querySelector(y);if (!E) {
              D('pthread_create: could not find canvas with ID "' + y + '" to transfer to thread!');g = 28;break;
            }if (E.Y) {
              D('pthread_create: cannot transfer canvas with ID "' + y + '" to thread, since the current thread does not have control over it!');g = 63;break;
            }if (E.transferControlToOffscreen) E.h || (E.h = _pb(12), q()[E.h >> 2] = E.width, q()[E.h + 4 >> 2] = E.height, q()[E.h + 8 >> 2] = 0), V = { F: E.transferControlToOffscreen(),
              h: E.h, id: E.id }, E.Y = !0;else return D('pthread_create: cannot transfer control of canvas "' + y + '" to pthread, because current browser does not support OffscreenCanvas!'), D("pthread_create: Build with -sOFFSCREEN_FRAMEBUFFER to enable fallback proxying of GL commands from pthread to main thread."), 52;
          }V && (f.push(V.F), n[V.id] = V);
        } catch (m) {
          return D('pthread_create: failed to transfer control of canvas "' + y + '" to OffscreenCanvas! Error: ' + m), 28;
        }
      }if (A && (0 === f.length || g)) return nb(a, b, c, e);if (g) return g;var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.values(n)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          E = _step4.value;
          q()[E.h + 8 >> 2] = a;
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      a = { ya: c, m: a, ka: e, D: r, S: n, Ea: f };return A ? (a.Ga = "spawnThread", postMessage(a, f), 0) : Ya(a);
    }function qb(a, b, c) {
      return A ? K(4, 1, a, b, c) : 0;
    }function rb(a, b) {
      if (A) return K(5, 1, a, b);
    }function sb(a, b, c) {
      return A ? K(6, 1, a, b, c) : 0;
    }function tb(a, b, c, e) {
      if (A) return K(7, 1, a, b, c, e);
    }var ub = function ub(a) {
      if (!Ba) try {
        if (a(), !Ka()) try {
          A ? jb(Ca) : cb(Ca);
        } catch (b) {
          b instanceof Va || "unwind" == b || na(1, b);
        }
      } catch (b) {
        b instanceof Va || "unwind" == b || na(1, b);
      }
    };
    function vb(a) {
      "function" === typeof Atomics.Fa && (Atomics.Fa(q(), a >> 2, a).value.then(gb), a += 128, Atomics.store(q(), a >> 2, 1));
    }w.__emscripten_thread_mailbox_await = vb;function gb() {
      var a = fb();a && (vb(a), ub(function () {
        return wb();
      }));
    }w.checkMailbox = gb;
    var xb = function xb(a) {
      var b = _N();a = a();_M(b);return a;
    },
        yb = function yb(a) {
      for (var b = 0, c = 0; c < a.length; ++c) {
        var e = a.charCodeAt(c);127 >= e ? b++ : 2047 >= e ? b += 2 : 55296 <= e && 57343 >= e ? (b += 4, ++c) : b += 3;
      }return b;
    },
        zb = function zb(a, b, c, e) {
      if (!(0 < e)) return 0;var f = c;e = c + e - 1;for (var g = 0; g < a.length; ++g) {
        var l = a.charCodeAt(g);if (55296 <= l && 57343 >= l) {
          var n = a.charCodeAt(++g);l = 65536 + ((l & 1023) << 10) | n & 1023;
        }if (127 >= l) {
          if (c >= e) break;b[c++] = l;
        } else {
          if (2047 >= l) {
            if (c + 1 >= e) break;b[c++] = 192 | l >> 6;
          } else {
            if (65535 >= l) {
              if (c + 2 >= e) break;b[c++] = 224 | l >> 12;
            } else {
              if (c + 3 >= e) break;
              b[c++] = 240 | l >> 18;b[c++] = 128 | l >> 12 & 63;
            }b[c++] = 128 | l >> 6 & 63;
          }b[c++] = 128 | l & 63;
        }
      }b[c] = 0;return c - f;
    },
        Ab = function Ab(a) {
      var b = yb(a) + 1,
          c = _pb(b);c && zb(a, p(), c, b);return c;
    };function Bb(a, b, c, e) {
      b = b ? J(b) : "";xb(function () {
        var f = Cb(12),
            g = 0;b && (g = Ab(b));q()[f >> 2] = g;q()[f + 4 >> 2] = c;q()[f + 8 >> 2] = e;_Db(a, 654311424, 0, g, f);
      });
    }
    function Eb(a) {
      var b = a.getExtension("ANGLE_instanced_arrays");b && (a.vertexAttribDivisor = function (c, e) {
        b.vertexAttribDivisorANGLE(c, e);
      }, a.drawArraysInstanced = function (c, e, f, g) {
        b.drawArraysInstancedANGLE(c, e, f, g);
      }, a.drawElementsInstanced = function (c, e, f, g, l) {
        b.drawElementsInstancedANGLE(c, e, f, g, l);
      });
    }
    function Fb(a) {
      var b = a.getExtension("OES_vertex_array_object");b && (a.createVertexArray = function () {
        return b.createVertexArrayOES();
      }, a.deleteVertexArray = function (c) {
        b.deleteVertexArrayOES(c);
      }, a.bindVertexArray = function (c) {
        b.bindVertexArrayOES(c);
      }, a.isVertexArray = function (c) {
        return b.isVertexArrayOES(c);
      });
    }function Gb(a) {
      var b = a.getExtension("WEBGL_draw_buffers");b && (a.drawBuffers = function (c, e) {
        b.drawBuffersWEBGL(c, e);
      });
    }
    function Hb(a) {
      a.Z = a.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
    }function Ib(a) {
      a.ea = a.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
    }function Jb(a) {
      a.Ja = a.getExtension("WEBGL_multi_draw");
    }var Kb = 1,
        Lb = [],
        O = [],
        Mb = [],
        Nb = [],
        P = [],
        Q = [],
        Ob = [],
        Pb = {},
        L = {},
        R = [],
        Qb = [],
        Rb = {},
        Sb = {},
        Tb = 4;function S(a) {
      Ub || (Ub = a);
    }function Vb(a) {
      for (var b = Kb++, c = a.length; c < b; c++) {
        a[c] = null;
      }return b;
    }
    function Wb(a) {
      var b = { da: 2, alpha: !0, depth: !0, stencil: !0, antialias: !1, premultipliedAlpha: !0, preserveDrawingBuffer: !1, powerPreference: "default", failIfMajorPerformanceCaveat: !1, aa: !0 };a.C || (a.C = a.getContext, a.getContext = function (e, f) {
        f = a.C(e, f);return "webgl" == e == f instanceof WebGLRenderingContext ? f : null;
      });var c = 1 < b.da ? a.getContext("webgl2", b) : a.getContext("webgl", b);return c ? Xb(c, b) : 0;
    }
    function Xb(a, b) {
      var c = _pb(8);q()[c + 4 >> 2] = fb();var e = { handle: c, attributes: b, version: b.da, s: a };a.canvas && (a.canvas.H = e);Pb[c] = e;("undefined" == typeof b.aa || b.aa) && Yb(e);return c;
    }
    function Yb(a) {
      a || (a = T);if (!a.pa) {
        a.pa = !0;var b = a.s;Eb(b);Fb(b);Gb(b);Hb(b);Ib(b);2 <= a.version && (b.$ = b.getExtension("EXT_disjoint_timer_query_webgl2"));if (2 > a.version || !b.$) b.$ = b.getExtension("EXT_disjoint_timer_query");Jb(b);(b.getSupportedExtensions() || []).forEach(function (c) {
          c.includes("lose_context") || c.includes("debug") || b.getExtension(c);
        });
      }
    }var eb = {},
        Ub,
        T;
    function Zb(a) {
      a = 2 < a ? J(a) : a;return L[a.substr(1)] || "canvas" == a && Object.keys(L)[0] || "undefined" != typeof document && document.querySelector(a);
    }function $b(a, b, c) {
      var e = Zb(a);if (!e) return -4;e.h && (q()[e.h >> 2] = b, q()[e.h + 4 >> 2] = c);if (e.F || !e.Y) e.F && (e = e.F), a = !1, e.H && e.H.s && (a = e.H.s.getParameter(2978), a = 0 === a[0] && 0 === a[1] && a[2] === e.width && a[3] === e.height), e.width = b, e.height = c, a && e.H.s.viewport(0, 0, b, c);else return e.h ? (e = q()[e.h + 8 >> 2], Bb(e, a, b, c), 1) : -4;return 0;
    }
    function ac(a, b, c) {
      return A ? K(8, 1, a, b, c) : $b(a, b, c);
    }function bc(a, b, c, e, f, g, l, n) {
      return A ? K(9, 1, a, b, c, e, f, g, l, n) : -52;
    }function cc(a, b, c, e, f, g, l) {
      if (A) return K(10, 1, a, b, c, e, f, g, l);
    }function dc(a, b) {
      U.bindFramebuffer(a, Mb[b]);
    }function ec(a) {
      U.clear(a);
    }function fc(a, b, c, e) {
      U.clearColor(a, b, c, e);
    }function gc(a) {
      U.clearStencil(a);
    }
    function hc(a, b, c) {
      if (b) {
        var e = void 0;switch (a) {case 36346:
            e = 1;break;case 36344:
            0 != c && 1 != c && S(1280);return;case 34814:case 36345:
            e = 0;break;case 34466:
            var f = U.getParameter(34467);e = f ? f.length : 0;break;case 33309:
            if (2 > T.version) {
              S(1282);return;
            }e = 2 * (U.getSupportedExtensions() || []).length;break;case 33307:case 33308:
            if (2 > T.version) {
              S(1280);return;
            }e = 33307 == a ? 3 : 0;}if (void 0 === e) switch (f = U.getParameter(a), typeof f === 'undefined' ? 'undefined' : _typeof(f)) {case "number":
            e = f;break;case "boolean":
            e = f ? 1 : 0;break;case "string":
            S(1280);return;case "object":
            if (null === f) switch (a) {case 34964:case 35725:case 34965:case 36006:case 36007:case 32873:case 34229:case 36662:case 36663:case 35053:case 35055:case 36010:case 35097:case 35869:case 32874:case 36389:case 35983:case 35368:case 34068:
                e = 0;break;default:
                S(1280);return;} else {
              if (f instanceof Float32Array || f instanceof Uint32Array || f instanceof Int32Array || f instanceof Array) {
                for (a = 0; a < f.length; ++a) {
                  switch (c) {case 0:
                      q()[b + 4 * a >> 2] = f[a];break;case 2:
                      v()[b + 4 * a >> 2] = f[a];break;case 4:
                      aa()[b + a >> 0] = f[a] ? 1 : 0;}
                }return;
              }try {
                e = f.name | 0;
              } catch (g) {
                S(1280);D("GL_INVALID_ENUM in glGet" + c + "v: Unknown object returned from WebGL getParameter(" + a + ")! (error: " + g + ")");return;
              }
            }break;default:
            S(1280);D("GL_INVALID_ENUM in glGet" + c + "v: Native code calling glGet" + c + "v(" + a + ") and it returns " + f + " of type " + (typeof f === 'undefined' ? 'undefined' : _typeof(f)) + "!");return;}switch (c) {case 1:
            c = e;t()[b >> 2] = c;t()[b + 4 >> 2] = (c - t()[b >> 2]) / 4294967296;break;case 0:
            q()[b >> 2] = e;break;case 2:
            v()[b >> 2] = e;break;case 4:
            aa()[b >> 0] = e ? 1 : 0;}
      } else S(1281);
    }function ic(a, b) {
      hc(a, b, 0);
    }
    function K(a, b) {
      var c = arguments.length - 2,
          e = arguments;return xb(function () {
        for (var f = Cb(8 * c), g = f >> 3, l = 0; l < c; l++) {
          var n = e[2 + l];ha()[g + l] = n;
        }return _jc(a, c, f, b);
      });
    }
    var kc = [],
        lc = {},
        nc = function nc() {
      if (!mc) {
        var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: ("object" == (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: ma || "./this.program" },
            b;for (b in lc) {
          void 0 === lc[b] ? delete a[b] : a[b] = lc[b];
        }var c = [];for (b in a) {
          c.push(b + '=' + a[b]);
        }mc = c;
      }return mc;
    },
        mc;
    function oc(a, b) {
      if (A) return K(11, 1, a, b);var c = 0;nc().forEach(function (e, f) {
        var g = b + c;f = t()[a + 4 * f >> 2] = g;for (g = 0; g < e.length; ++g) {
          aa()[f++ >> 0] = e.charCodeAt(g);
        }aa()[f >> 0] = 0;c += e.length + 1;
      });return 0;
    }function pc(a, b) {
      if (A) return K(12, 1, a, b);var c = nc();t()[a >> 2] = c.length;var e = 0;c.forEach(function (f) {
        e += f.length + 1;
      });t()[b >> 2] = e;return 0;
    }function qc(a) {
      return A ? K(13, 1, a) : 52;
    }function rc(a, b, c, e, f, g) {
      return A ? K(14, 1, a, b, c, e, f, g) : 52;
    }function sc(a, b, c, e) {
      return A ? K(15, 1, a, b, c, e) : 52;
    }
    function tc(a, b, c, e, f) {
      return A ? K(16, 1, a, b, c, e, f) : 70;
    }var uc = [null, [], []];function vc(a, b, c, e) {
      if (A) return K(17, 1, a, b, c, e);for (var f = 0, g = 0; g < c; g++) {
        var l = t()[b >> 2],
            n = t()[b + 4 >> 2];b += 8;for (var r = 0; r < n; r++) {
          var u = p()[l + r],
              y = uc[a];0 === u || 10 === u ? ((1 === a ? xa : D)($a(y, 0)), y.length = 0) : y.push(u);
        }f += n;
      }t()[e >> 2] = f;return 0;
    }function wc(a) {
      U.bindVertexArray(Ob[a]);
    }function xc(a, b) {
      for (var c = 0; c < a; c++) {
        var e = q()[b + 4 * c >> 2];U.deleteVertexArray(Ob[e]);Ob[e] = null;
      }
    }var yc = [];
    function zc(a, b, c, e) {
      U.drawElements(a, b, c, e);
    }function Ac(a, b, c, e) {
      for (var f = 0; f < a; f++) {
        var g = U[c](),
            l = g && Vb(e);g ? (g.name = l, e[l] = g) : S(1282);q()[b + 4 * f >> 2] = l;
      }
    }function Bc(a, b) {
      Ac(a, b, "createVertexArray", Ob);
    }function Cc(a) {
      return "]" == a.slice(-1) && a.lastIndexOf("[");
    }function Dc(a) {
      a -= 5120;0 == a ? a = aa() : 1 == a ? a = p() : 2 == a ? (d.buffer != h.buffer && k(), a = Da) : 4 == a ? a = q() : 6 == a ? a = v() : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a ? a = t() : (d.buffer != h.buffer && k(), a = Ea);return a;
    }
    function Ec(a, b, c, e, f) {
      a = Dc(a);var g = 31 - Math.clz32(a.BYTES_PER_ELEMENT),
          l = Tb;return a.subarray(f >> g, f + e * (c * ({ 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 }[b - 6402] || 1) * (1 << g) + l - 1 & -l) >> g);
    }function W(a) {
      var b = U.la;if (b) {
        var c = b.G[a];"number" == typeof c && (b.G[a] = c = U.getUniformLocation(b, b.ia[a] + (0 < c ? "[" + c + "]" : "")));return c;
      }S(1282);
    }var X = [],
        Fc = [];function Gc() {}function Hc() {}function Jc() {}function Kc() {}function Lc() {}function Mc() {}function Nc() {}function Oc() {}function Pc() {}
    var Qc = function Qc(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    },
        Rc = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Sc = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];function Tc(a) {
      var b = Array(yb(a) + 1);zb(a, b, 0, b.length);return b;
    }
    var Uc = function Uc(a, b) {
      aa().set(a, b);
    },
        Vc = function Vc(a, b, c, e) {
      function f(m, z, B) {
        for (m = "number" == typeof m ? m.toString() : m || ""; m.length < z;) {
          m = B[0] + m;
        }return m;
      }function g(m, z) {
        return f(m, z, "0");
      }function l(m, z) {
        function B(Ic) {
          return 0 > Ic ? -1 : 0 < Ic ? 1 : 0;
        }var ba;0 === (ba = B(m.getFullYear() - z.getFullYear())) && 0 === (ba = B(m.getMonth() - z.getMonth())) && (ba = B(m.getDate() - z.getDate()));return ba;
      }function n(m) {
        switch (m.getDay()) {case 0:
            return new Date(m.getFullYear() - 1, 11, 29);case 1:
            return m;case 2:
            return new Date(m.getFullYear(), 0, 3);case 3:
            return new Date(m.getFullYear(), 0, 2);case 4:
            return new Date(m.getFullYear(), 0, 1);case 5:
            return new Date(m.getFullYear() - 1, 11, 31);case 6:
            return new Date(m.getFullYear() - 1, 11, 30);}
      }function r(m) {
        var z = m.v;for (m = new Date(new Date(m.A + 1900, 0, 1).getTime()); 0 < z;) {
          var B = m.getMonth(),
              ba = (Qc(m.getFullYear()) ? Rc : Sc)[B];if (z > ba - m.getDate()) z -= ba - m.getDate() + 1, m.setDate(1), 11 > B ? m.setMonth(B + 1) : (m.setMonth(0), m.setFullYear(m.getFullYear() + 1));else {
            m.setDate(m.getDate() + z);break;
          }
        }B = new Date(m.getFullYear() + 1, 0, 4);z = n(new Date(m.getFullYear(), 0, 4));B = n(B);return 0 >= l(z, m) ? 0 >= l(B, m) ? m.getFullYear() + 1 : m.getFullYear() : m.getFullYear() - 1;
      }var u = q()[e + 40 >> 2];e = { Ca: q()[e >> 2], Ba: q()[e + 4 >> 2], M: q()[e + 8 >> 2], V: q()[e + 12 >> 2], N: q()[e + 16 >> 2], A: q()[e + 20 >> 2], l: q()[e + 24 >> 2], v: q()[e + 28 >> 2], Ma: q()[e + 32 >> 2], Aa: q()[e + 36 >> 2], Da: u ? J(u) : "" };c = J(c);u = { "%c": "%a %b %d %H:%M:%S %Y", "%D": "%m/%d/%y", "%F": "%Y-%m-%d", "%h": "%b", "%r": "%I:%M:%S %p", "%R": "%H:%M", "%T": "%H:%M:%S", "%x": "%m/%d/%y", "%X": "%H:%M:%S", "%Ec": "%c", "%EC": "%C", "%Ex": "%m/%d/%y", "%EX": "%H:%M:%S", "%Ey": "%y",
        "%EY": "%Y", "%Od": "%d", "%Oe": "%e", "%OH": "%H", "%OI": "%I", "%Om": "%m", "%OM": "%M", "%OS": "%S", "%Ou": "%u", "%OU": "%U", "%OV": "%V", "%Ow": "%w", "%OW": "%W", "%Oy": "%y" };for (var y in u) {
        c = c.replace(new RegExp(y, "g"), u[y]);
      }var V = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
          E = "January February March April May June July August September October November December".split(" ");u = { "%a": function a(m) {
          return V[m.l].substring(0, 3);
        }, "%A": function A(m) {
          return V[m.l];
        }, "%b": function b(m) {
          return E[m.N].substring(0, 3);
        }, "%B": function B(m) {
          return E[m.N];
        }, "%C": function C(m) {
          return g((m.A + 1900) / 100 | 0, 2);
        }, "%d": function d(m) {
          return g(m.V, 2);
        }, "%e": function e(m) {
          return f(m.V, 2, " ");
        }, "%g": function g(m) {
          return r(m).toString().substring(2);
        }, "%G": function G(m) {
          return r(m);
        }, "%H": function H(m) {
          return g(m.M, 2);
        }, "%I": function I(m) {
          m = m.M;0 == m ? m = 12 : 12 < m && (m -= 12);return g(m, 2);
        }, "%j": function j(m) {
          for (var z = 0, B = 0; B <= m.N - 1; z += (Qc(m.A + 1900) ? Rc : Sc)[B++]) {}return g(m.V + z, 3);
        }, "%m": function m(_m) {
          return g(_m.N + 1, 2);
        }, "%M": function M(m) {
          return g(m.Ba, 2);
        }, "%n": function n() {
          return "\n";
        }, "%p": function p(m) {
          return 0 <= m.M && 12 > m.M ? "AM" : "PM";
        }, "%S": function S(m) {
          return g(m.Ca, 2);
        }, "%t": function t() {
          return "\t";
        }, "%u": function u(m) {
          return m.l || 7;
        }, "%U": function U(m) {
          return g(Math.floor((m.v + 7 - m.l) / 7), 2);
        }, "%V": function V(m) {
          var z = Math.floor((m.v + 7 - (m.l + 6) % 7) / 7);2 >= (m.l + 371 - m.v - 2) % 7 && z++;if (z) 53 == z && (B = (m.l + 371 - m.v) % 7, 4 == B || 3 == B && Qc(m.A) || (z = 1));else {
            z = 52;var B = (m.l + 7 - m.v - 1) % 7;(4 == B || 5 == B && Qc(m.A % 400 - 1)) && z++;
          }return g(z, 2);
        }, "%w": function w(m) {
          return m.l;
        }, "%W": function W(m) {
          return g(Math.floor((m.v + 7 - (m.l + 6) % 7) / 7), 2);
        }, "%y": function y(m) {
          return (m.A + 1900).toString().substring(2);
        }, "%Y": function Y(m) {
          return m.A + 1900;
        }, "%z": function z(m) {
          m = m.Aa;var z = 0 <= m;m = Math.abs(m) / 60;return (z ? "+" : "-") + String("0000" + (m / 60 * 100 + m % 60)).slice(-4);
        }, "%Z": function Z(m) {
          return m.Da;
        }, "%%": function _() {
          return "%";
        } };c = c.replace(/%%/g, "\x00\x00");for (y in u) {
        c.includes(y) && (c = c.replace(new RegExp(y, "g"), u[y](e)));
      }c = c.replace(/\0\0/g, "%");y = Tc(c);
      if (y.length > b) return 0;Uc(y, a);return y.length - 1;
    },
        Wc = void 0,
        Xc = [];I.R();for (var U, Y = 0; 32 > Y; ++Y) {
      yc.push(Array(Y));
    }var Yc = new Float32Array(288);for (Y = 0; 288 > Y; ++Y) {
      X[Y] = Yc.subarray(0, Y + 1);
    }var Zc = new Int32Array(288);for (Y = 0; 288 > Y; ++Y) {
      Fc[Y] = Zc.subarray(0, Y + 1);
    }(function () {
      var a = new Map(),
          b = new Map();Pc = function Pc(c, e, f) {
        I.g[c].postMessage({ L: "setAssociatedObject", T: e, object: f }, [f]);
      };Mc = function Mc(c) {
        return b.get(c);
      };Nc = function Nc(c) {
        function e(_ref) {
          var f = _ref.data;
          var g = f.L;if (g) switch (g) {case "renderPicture":
              $c(f.U, f.va, f.O);break;case "onRenderComplete":
              ad(f.U, f.O, f.oa);break;case "setAssociatedObject":
              b.set(f.T, f.object);break;case "disposeAssociatedObject":
              f = f.T;g = b.get(f);g.close && g.close();b.delete(f);break;default:
              console.warn('unrecognized skwasm message: ' + g);}
        }
        c ? I.g[c].addEventListener("message", e) : addEventListener("message", e);
      };Kc = function Kc(c, e, f, g) {
        I.g[c].postMessage({ L: "renderPicture", U: e, va: f, O: g });
      };Jc = function Jc(c, e) {
        c = new OffscreenCanvas(c, e);e = Wb(c);a.set(e, c);return e;
      };Oc = function Oc(c, e, f) {
        c = a.get(c);c.width = e;c.height = f;
      };Gc = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(c, e, f, g, l) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  e = a.get(e);_context.next = 3;
                  return createImageBitmap(e, 0, 0, g, l);

                case 3:
                  g = _context.sent;
                  postMessage({ L: "onRenderComplete", U: c, O: f, oa: g }, [g]);
                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function Gc(_x3, _x4, _x5, _x6, _x7) {
          return _ref2.apply(this, arguments);
        };
      }();Hc = function Hc(c, e, f) {
        var g = T.s,
            l = g.createTexture();g.bindTexture(g.TEXTURE_2D, l);g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, e, f, 0, g.RGBA, g.UNSIGNED_BYTE, c);g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);g.bindTexture(g.TEXTURE_2D, null);c = Vb(P);P[c] = l;return c;
      };Lc = function Lc(c, e) {
        I.g[c].postMessage({ L: "disposeAssociatedObject", T: e });
      };
    })();
    var bd = [null, ab, bb, nb, qb, rb, sb, tb, ac, bc, cc, oc, pc, qc, rc, sc, tc, vc],
        od = { __cxa_throw: function __cxa_throw(a, b, c) {
        new kb(a).R(b, c);lb = a;mb++;throw lb;
      }, __emscripten_init_main_thread_js: function __emscripten_init_main_thread_js(a) {
        cd(a, !pa, 1, !oa, 65536, !1);I.ga();
      }, __emscripten_thread_cleanup: function __emscripten_thread_cleanup(a) {
        A ? postMessage({ cmd: "cleanupThread", thread: a }) : Xa(a);
      }, __pthread_create_js: ob, __syscall_fcntl64: qb, __syscall_fstat64: rb, __syscall_ioctl: sb, __syscall_openat: tb, _emscripten_get_now_is_monotonic: function _emscripten_get_now_is_monotonic() {
        return !0;
      }, _emscripten_notify_mailbox_postmessage: function _emscripten_notify_mailbox_postmessage(a, b) {
        a == b ? setTimeout(function () {
          return gb();
        }) : A ? postMessage({ targetThread: a, cmd: "checkMailbox" }) : (a = I.g[a]) && a.postMessage({ cmd: "checkMailbox" });
      }, _emscripten_set_offscreencanvas_size: function _emscripten_set_offscreencanvas_size(a, b, c) {
        return Zb(a) ? $b(a, b, c) : ac(a, b, c);
      }, _emscripten_thread_mailbox_await: vb, _emscripten_thread_set_strongref: function _emscripten_thread_set_strongref(a) {
        x && I.g[a].ref();
      }, _emscripten_throw_longjmp: function _emscripten_throw_longjmp() {
        throw Infinity;
      }, _mmap_js: bc, _munmap_js: cc, abort: function abort() {
        za("");
      }, emscripten_check_blocking_allowed: function emscripten_check_blocking_allowed() {}, emscripten_exit_with_live_runtime: function emscripten_exit_with_live_runtime() {
        Ja += 1;throw "unwind";
      }, emscripten_get_now: function emscripten_get_now() {
        return performance.timeOrigin + performance.now();
      }, emscripten_glBindFramebuffer: dc, emscripten_glClear: ec, emscripten_glClearColor: fc, emscripten_glClearStencil: gc, emscripten_glGetIntegerv: ic, emscripten_receive_on_main_thread_js: function emscripten_receive_on_main_thread_js(a, b, c, e) {
        I.Ia = b;kc.length = c;b = e >> 3;for (e = 0; e < c; e++) {
          kc[e] = ha()[b + e];
        }return bd[a].apply(null, kc);
      }, emscripten_resize_heap: function emscripten_resize_heap(a) {
        var b = p().length;a >>>= 0;if (a <= b || 2147483648 < a) return !1;for (var c = 1; 4 >= c; c *= 2) {
          var e = b * (1 + .2 / c);e = Math.min(e, a + 100663296);var f = Math;
          e = Math.max(a, e);a: {
            f = f.min.call(f, 2147483648, e + (65536 - e % 65536) % 65536) - d.buffer.byteLength + 65535 >>> 16;try {
              d.grow(f);k();var g = 1;break a;
            } catch (l) {}g = void 0;
          }if (g) return !0;
        }return !1;
      }, emscripten_webgl_enable_extension: function emscripten_webgl_enable_extension(a, b) {
        a = Pb[a];b = J(b);b.startsWith("GL_") && (b = b.substr(3));"ANGLE_instanced_arrays" == b && Eb(U);"OES_vertex_array_object" == b && Fb(U);"WEBGL_draw_buffers" == b && Gb(U);"WEBGL_draw_instanced_base_vertex_base_instance" == b && Hb(U);"WEBGL_multi_draw_instanced_base_vertex_base_instance" == b && Ib(U);
        "WEBGL_multi_draw" == b && Jb(U);return !!a.s.getExtension(b);
      }, emscripten_webgl_get_current_context: function emscripten_webgl_get_current_context() {
        return T ? T.handle : 0;
      }, emscripten_webgl_make_context_current: function emscripten_webgl_make_context_current(a) {
        T = Pb[a];w.Ha = U = T && T.s;return !a || U ? 0 : -5;
      }, environ_get: oc, environ_sizes_get: pc, exit: cb, fd_close: qc, fd_pread: rc, fd_read: sc, fd_seek: tc, fd_write: vc, glActiveTexture: function glActiveTexture(a) {
        U.activeTexture(a);
      }, glAttachShader: function glAttachShader(a, b) {
        U.attachShader(O[a], Q[b]);
      }, glBindAttribLocation: function glBindAttribLocation(a, b, c) {
        U.bindAttribLocation(O[a], b, J(c));
      }, glBindBuffer: function glBindBuffer(a, b) {
        35051 == a ? U.P = b : 35052 == a && (U.B = b);U.bindBuffer(a, Lb[b]);
      }, glBindFramebuffer: dc, glBindRenderbuffer: function glBindRenderbuffer(a, b) {
        U.bindRenderbuffer(a, Nb[b]);
      }, glBindSampler: function glBindSampler(a, b) {
        U.bindSampler(a, R[b]);
      }, glBindTexture: function glBindTexture(a, b) {
        U.bindTexture(a, P[b]);
      }, glBindVertexArray: wc, glBindVertexArrayOES: wc, glBlendColor: function glBlendColor(a, b, c, e) {
        U.blendColor(a, b, c, e);
      }, glBlendEquation: function glBlendEquation(a) {
        U.blendEquation(a);
      }, glBlendFunc: function glBlendFunc(a, b) {
        U.blendFunc(a, b);
      }, glBlitFramebuffer: function glBlitFramebuffer(a, b, c, e, f, g, l, n, r, u) {
        U.blitFramebuffer(a, b, c, e, f, g, l, n, r, u);
      }, glBufferData: function glBufferData(a, b, c, e) {
        2 <= T.version ? c && b ? U.bufferData(a, p(), e, c, b) : U.bufferData(a, b, e) : U.bufferData(a, c ? p().subarray(c, c + b) : b, e);
      }, glBufferSubData: function glBufferSubData(a, b, c, e) {
        2 <= T.version ? c && U.bufferSubData(a, b, p(), e, c) : U.bufferSubData(a, b, p().subarray(e, e + c));
      }, glCheckFramebufferStatus: function glCheckFramebufferStatus(a) {
        return U.checkFramebufferStatus(a);
      }, glClear: ec, glClearColor: fc, glClearStencil: gc, glClientWaitSync: function glClientWaitSync(a, b, c, e) {
        return U.clientWaitSync(Qb[a], b, (c >>> 0) + 4294967296 * e);
      }, glColorMask: function glColorMask(a, b, c, e) {
        U.colorMask(!!a, !!b, !!c, !!e);
      }, glCompileShader: function glCompileShader(a) {
        U.compileShader(Q[a]);
      }, glCompressedTexImage2D: function glCompressedTexImage2D(a, b, c, e, f, g, l, n) {
        2 <= T.version ? U.B || !l ? U.compressedTexImage2D(a, b, c, e, f, g, l, n) : U.compressedTexImage2D(a, b, c, e, f, g, p(), n, l) : U.compressedTexImage2D(a, b, c, e, f, g, n ? p().subarray(n, n + l) : null);
      }, glCompressedTexSubImage2D: function glCompressedTexSubImage2D(a, b, c, e, f, g, l, n, r) {
        2 <= T.version ? U.B || !n ? U.compressedTexSubImage2D(a, b, c, e, f, g, l, n, r) : U.compressedTexSubImage2D(a, b, c, e, f, g, l, p(), r, n) : U.compressedTexSubImage2D(a, b, c, e, f, g, l, r ? p().subarray(r, r + n) : null);
      }, glCopyBufferSubData: function glCopyBufferSubData(a, b, c, e, f) {
        U.copyBufferSubData(a, b, c, e, f);
      }, glCopyTexSubImage2D: function glCopyTexSubImage2D(a, b, c, e, f, g, l, n) {
        U.copyTexSubImage2D(a, b, c, e, f, g, l, n);
      }, glCreateProgram: function glCreateProgram() {
        var a = Vb(O),
            b = U.createProgram();b.name = a;b.K = b.I = b.J = 0;b.W = 1;O[a] = b;return a;
      }, glCreateShader: function glCreateShader(a) {
        var b = Vb(Q);Q[b] = U.createShader(a);return b;
      }, glCullFace: function glCullFace(a) {
        U.cullFace(a);
      }, glDeleteBuffers: function glDeleteBuffers(a, b) {
        for (var c = 0; c < a; c++) {
          var e = q()[b + 4 * c >> 2],
              f = Lb[e];f && (U.deleteBuffer(f), f.name = 0, Lb[e] = null, e == U.P && (U.P = 0), e == U.B && (U.B = 0));
        }
      }, glDeleteFramebuffers: function glDeleteFramebuffers(a, b) {
        for (var c = 0; c < a; ++c) {
          var e = q()[b + 4 * c >> 2],
              f = Mb[e];f && (U.deleteFramebuffer(f), f.name = 0, Mb[e] = null);
        }
      }, glDeleteProgram: function glDeleteProgram(a) {
        if (a) {
          var b = O[a];b ? (U.deleteProgram(b), b.name = 0, O[a] = null) : S(1281);
        }
      }, glDeleteRenderbuffers: function glDeleteRenderbuffers(a, b) {
        for (var c = 0; c < a; c++) {
          var e = q()[b + 4 * c >> 2],
              f = Nb[e];f && (U.deleteRenderbuffer(f), f.name = 0, Nb[e] = null);
        }
      }, glDeleteSamplers: function glDeleteSamplers(a, b) {
        for (var c = 0; c < a; c++) {
          var e = q()[b + 4 * c >> 2],
              f = R[e];
          f && (U.deleteSampler(f), f.name = 0, R[e] = null);
        }
      }, glDeleteShader: function glDeleteShader(a) {
        if (a) {
          var b = Q[a];b ? (U.deleteShader(b), Q[a] = null) : S(1281);
        }
      }, glDeleteSync: function glDeleteSync(a) {
        if (a) {
          var b = Qb[a];b ? (U.deleteSync(b), b.name = 0, Qb[a] = null) : S(1281);
        }
      }, glDeleteTextures: function glDeleteTextures(a, b) {
        for (var c = 0; c < a; c++) {
          var e = q()[b + 4 * c >> 2],
              f = P[e];f && (U.deleteTexture(f), f.name = 0, P[e] = null);
        }
      }, glDeleteVertexArrays: xc, glDeleteVertexArraysOES: xc, glDepthMask: function glDepthMask(a) {
        U.depthMask(!!a);
      }, glDisable: function glDisable(a) {
        U.disable(a);
      }, glDisableVertexAttribArray: function glDisableVertexAttribArray(a) {
        U.disableVertexAttribArray(a);
      },
      glDrawArrays: function glDrawArrays(a, b, c) {
        U.drawArrays(a, b, c);
      }, glDrawArraysInstanced: function glDrawArraysInstanced(a, b, c, e) {
        U.drawArraysInstanced(a, b, c, e);
      }, glDrawArraysInstancedBaseInstanceWEBGL: function glDrawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f) {
        U.Z.drawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f);
      }, glDrawBuffers: function glDrawBuffers(a, b) {
        for (var c = yc[a], e = 0; e < a; e++) {
          c[e] = q()[b + 4 * e >> 2];
        }U.drawBuffers(c);
      }, glDrawElements: zc, glDrawElementsInstanced: function glDrawElementsInstanced(a, b, c, e, f) {
        U.drawElementsInstanced(a, b, c, e, f);
      }, glDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function glDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, e, f, g, l) {
        U.Z.drawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, e, f, g, l);
      }, glDrawRangeElements: function glDrawRangeElements(a, b, c, e, f, g) {
        zc(a, e, f, g);
      }, glEnable: function glEnable(a) {
        U.enable(a);
      }, glEnableVertexAttribArray: function glEnableVertexAttribArray(a) {
        U.enableVertexAttribArray(a);
      }, glFenceSync: function glFenceSync(a, b) {
        return (a = U.fenceSync(a, b)) ? (b = Vb(Qb), a.name = b, Qb[b] = a, b) : 0;
      }, glFinish: function glFinish() {
        U.finish();
      }, glFlush: function glFlush() {
        U.flush();
      }, glFramebufferRenderbuffer: function glFramebufferRenderbuffer(a, b, c, e) {
        U.framebufferRenderbuffer(a, b, c, Nb[e]);
      }, glFramebufferTexture2D: function glFramebufferTexture2D(a, b, c, e, f) {
        U.framebufferTexture2D(a, b, c, P[e], f);
      }, glFrontFace: function glFrontFace(a) {
        U.frontFace(a);
      },
      glGenBuffers: function glGenBuffers(a, b) {
        Ac(a, b, "createBuffer", Lb);
      }, glGenFramebuffers: function glGenFramebuffers(a, b) {
        Ac(a, b, "createFramebuffer", Mb);
      }, glGenRenderbuffers: function glGenRenderbuffers(a, b) {
        Ac(a, b, "createRenderbuffer", Nb);
      }, glGenSamplers: function glGenSamplers(a, b) {
        Ac(a, b, "createSampler", R);
      }, glGenTextures: function glGenTextures(a, b) {
        Ac(a, b, "createTexture", P);
      }, glGenVertexArrays: Bc, glGenVertexArraysOES: Bc, glGenerateMipmap: function glGenerateMipmap(a) {
        U.generateMipmap(a);
      }, glGetBufferParameteriv: function glGetBufferParameteriv(a, b, c) {
        c ? q()[c >> 2] = U.getBufferParameter(a, b) : S(1281);
      }, glGetError: function glGetError() {
        var a = U.getError() || Ub;Ub = 0;return a;
      }, glGetFloatv: function glGetFloatv(a, b) {
        hc(a, b, 2);
      }, glGetFramebufferAttachmentParameteriv: function glGetFramebufferAttachmentParameteriv(a, b, c, e) {
        a = U.getFramebufferAttachmentParameter(a, b, c);if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) a = a.name | 0;q()[e >> 2] = a;
      }, glGetIntegerv: ic, glGetProgramInfoLog: function glGetProgramInfoLog(a, b, c, e) {
        a = U.getProgramInfoLog(O[a]);null === a && (a = "(unknown error)");var f;0 < b && e ? f = zb(a, p(), e, b) : f = 0;b = f;c && (q()[c >> 2] = b);
      }, glGetProgramiv: function glGetProgramiv(a, b, c) {
        if (c) {
          if (a >= Kb) S(1281);else if (a = O[a], 35716 == b) a = U.getProgramInfoLog(a), null === a && (a = "(unknown error)"), q()[c >> 2] = a.length + 1;else if (35719 == b) {
            if (!a.K) for (b = 0; b < U.getProgramParameter(a, 35718); ++b) {
              a.K = Math.max(a.K, U.getActiveUniform(a, b).name.length + 1);
            }q()[c >> 2] = a.K;
          } else if (35722 == b) {
            if (!a.I) for (b = 0; b < U.getProgramParameter(a, 35721); ++b) {
              a.I = Math.max(a.I, U.getActiveAttrib(a, b).name.length + 1);
            }q()[c >> 2] = a.I;
          } else if (35381 == b) {
            if (!a.J) for (b = 0; b < U.getProgramParameter(a, 35382); ++b) {
              a.J = Math.max(a.J, U.getActiveUniformBlockName(a, b).length + 1);
            }q()[c >> 2] = a.J;
          } else q()[c >> 2] = U.getProgramParameter(a, b);
        } else S(1281);
      }, glGetRenderbufferParameteriv: function glGetRenderbufferParameteriv(a, b, c) {
        c ? q()[c >> 2] = U.getRenderbufferParameter(a, b) : S(1281);
      }, glGetShaderInfoLog: function glGetShaderInfoLog(a, b, c, e) {
        a = U.getShaderInfoLog(Q[a]);null === a && (a = "(unknown error)");var f;0 < b && e ? f = zb(a, p(), e, b) : f = 0;b = f;c && (q()[c >> 2] = b);
      }, glGetShaderPrecisionFormat: function glGetShaderPrecisionFormat(a, b, c, e) {
        a = U.getShaderPrecisionFormat(a, b);q()[c >> 2] = a.rangeMin;q()[c + 4 >> 2] = a.rangeMax;q()[e >> 2] = a.precision;
      }, glGetShaderiv: function glGetShaderiv(a, b, c) {
        c ? 35716 == b ? (a = U.getShaderInfoLog(Q[a]), null === a && (a = "(unknown error)"), a = a ? a.length + 1 : 0, q()[c >> 2] = a) : 35720 == b ? (a = (a = U.getShaderSource(Q[a])) ? a.length + 1 : 0, q()[c >> 2] = a) : q()[c >> 2] = U.getShaderParameter(Q[a], b) : S(1281);
      }, glGetString: function glGetString(a) {
        var b = Rb[a];if (!b) {
          switch (a) {case 7939:
              b = U.getSupportedExtensions() || [];b = b.concat(b.map(function (e) {
                return "GL_" + e;
              }));b = Ab(b.join(" "));break;case 7936:case 7937:case 37445:case 37446:
              (b = U.getParameter(a)) || S(1280);b = b && Ab(b);break;case 7938:
              b = U.getParameter(7938);b = 2 <= T.version ? "OpenGL ES 3.0 (" + b + ")" : "OpenGL ES 2.0 (" + b + ")";b = Ab(b);break;case 35724:
              b = U.getParameter(35724);var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);null !== c && (3 == c[1].length && (c[1] += "0"), b = "OpenGL ES GLSL ES " + c[1] + " (" + b + ")");b = Ab(b);break;default:
              S(1280);}Rb[a] = b;
        }return b;
      }, glGetStringi: function glGetStringi(a, b) {
        if (2 > T.version) return S(1282), 0;var c = Sb[a];if (c) return 0 > b || b >= c.length ? (S(1281), 0) : c[b];switch (a) {case 7939:
            return c = U.getSupportedExtensions() || [], c = c.concat(c.map(function (e) {
              return "GL_" + e;
            })), c = c.map(function (e) {
              return Ab(e);
            }), c = Sb[a] = c, 0 > b || b >= c.length ? (S(1281), 0) : c[b];default:
            return S(1280), 0;}
      }, glGetUniformLocation: function glGetUniformLocation(a, b) {
        b = J(b);if (a = O[a]) {
          var c = a,
              e = c.G,
              f = c.ja,
              g;if (!e) for (c.G = e = {}, c.ia = {}, g = 0; g < U.getProgramParameter(c, 35718); ++g) {
            var l = U.getActiveUniform(c, g);var n = l.name;l = l.size;var r = Cc(n);r = 0 < r ? n.slice(0, r) : n;var u = c.W;c.W += l;f[r] = [l, u];for (n = 0; n < l; ++n) {
              e[u] = n, c.ia[u++] = r;
            }
          }c = a.G;e = 0;f = b;g = Cc(b);0 < g && (e = parseInt(b.slice(g + 1)) >>> 0, f = b.slice(0, g));if ((f = a.ja[f]) && e < f[0] && (e += f[1], c[e] = c[e] || U.getUniformLocation(a, b))) return e;
        } else S(1281);return -1;
      }, glInvalidateFramebuffer: function glInvalidateFramebuffer(a, b, c) {
        for (var e = yc[b], f = 0; f < b; f++) {
          e[f] = q()[c + 4 * f >> 2];
        }U.invalidateFramebuffer(a, e);
      }, glInvalidateSubFramebuffer: function glInvalidateSubFramebuffer(a, b, c, e, f, g, l) {
        for (var n = yc[b], r = 0; r < b; r++) {
          n[r] = q()[c + 4 * r >> 2];
        }U.invalidateSubFramebuffer(a, n, e, f, g, l);
      }, glIsSync: function glIsSync(a) {
        return U.isSync(Qb[a]);
      }, glIsTexture: function glIsTexture(a) {
        return (a = P[a]) ? U.isTexture(a) : 0;
      }, glLineWidth: function glLineWidth(a) {
        U.lineWidth(a);
      }, glLinkProgram: function glLinkProgram(a) {
        a = O[a];U.linkProgram(a);a.G = 0;a.ja = {};
      }, glMultiDrawArraysInstancedBaseInstanceWEBGL: function glMultiDrawArraysInstancedBaseInstanceWEBGL(a, b, c, e, f, g) {
        U.ea.multiDrawArraysInstancedBaseInstanceWEBGL(a, q(), b >> 2, q(), c >> 2, q(), e >> 2, t(), f >> 2, g);
      }, glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL: function glMultiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, b, c, e, f, g, l, n) {
        U.ea.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(a, q(), b >> 2, c, q(), e >> 2, q(), f >> 2, q(), g >> 2, t(), l >> 2, n);
      }, glPixelStorei: function glPixelStorei(a, b) {
        3317 == a && (Tb = b);U.pixelStorei(a, b);
      }, glReadBuffer: function glReadBuffer(a) {
        U.readBuffer(a);
      }, glReadPixels: function glReadPixels(a, b, c, e, f, g, l) {
        if (2 <= T.version) {
          if (U.P) U.readPixels(a, b, c, e, f, g, l);else {
            var n = Dc(g);
            U.readPixels(a, b, c, e, f, g, n, l >> 31 - Math.clz32(n.BYTES_PER_ELEMENT));
          }
        } else (l = Ec(g, f, c, e, l)) ? U.readPixels(a, b, c, e, f, g, l) : S(1280);
      }, glRenderbufferStorage: function glRenderbufferStorage(a, b, c, e) {
        U.renderbufferStorage(a, b, c, e);
      }, glRenderbufferStorageMultisample: function glRenderbufferStorageMultisample(a, b, c, e, f) {
        U.renderbufferStorageMultisample(a, b, c, e, f);
      }, glSamplerParameterf: function glSamplerParameterf(a, b, c) {
        U.samplerParameterf(R[a], b, c);
      }, glSamplerParameteri: function glSamplerParameteri(a, b, c) {
        U.samplerParameteri(R[a], b, c);
      }, glSamplerParameteriv: function glSamplerParameteriv(a, b, c) {
        c = q()[c >> 2];U.samplerParameteri(R[a], b, c);
      }, glScissor: function glScissor(a, b, c, e) {
        U.scissor(a, b, c, e);
      }, glShaderSource: function glShaderSource(a, b, c, e) {
        for (var f = "", g = 0; g < b; ++g) {
          var l = e ? q()[e + 4 * g >> 2] : -1;f += J(q()[c + 4 * g >> 2], 0 > l ? void 0 : l);
        }U.shaderSource(Q[a], f);
      }, glStencilFunc: function glStencilFunc(a, b, c) {
        U.stencilFunc(a, b, c);
      }, glStencilFuncSeparate: function glStencilFuncSeparate(a, b, c, e) {
        U.stencilFuncSeparate(a, b, c, e);
      }, glStencilMask: function glStencilMask(a) {
        U.stencilMask(a);
      }, glStencilMaskSeparate: function glStencilMaskSeparate(a, b) {
        U.stencilMaskSeparate(a, b);
      }, glStencilOp: function glStencilOp(a, b, c) {
        U.stencilOp(a, b, c);
      }, glStencilOpSeparate: function glStencilOpSeparate(a, b, c, e) {
        U.stencilOpSeparate(a, b, c, e);
      }, glTexImage2D: function glTexImage2D(a, b, c, e, f, g, l, n, r) {
        if (2 <= T.version) {
          if (U.B) U.texImage2D(a, b, c, e, f, g, l, n, r);else if (r) {
            var u = Dc(n);U.texImage2D(a, b, c, e, f, g, l, n, u, r >> 31 - Math.clz32(u.BYTES_PER_ELEMENT));
          } else U.texImage2D(a, b, c, e, f, g, l, n, null);
        } else U.texImage2D(a, b, c, e, f, g, l, n, r ? Ec(n, l, e, f, r) : null);
      }, glTexParameterf: function glTexParameterf(a, b, c) {
        U.texParameterf(a, b, c);
      }, glTexParameterfv: function glTexParameterfv(a, b, c) {
        c = v()[c >> 2];U.texParameterf(a, b, c);
      }, glTexParameteri: function glTexParameteri(a, b, c) {
        U.texParameteri(a, b, c);
      },
      glTexParameteriv: function glTexParameteriv(a, b, c) {
        c = q()[c >> 2];U.texParameteri(a, b, c);
      }, glTexStorage2D: function glTexStorage2D(a, b, c, e, f) {
        U.texStorage2D(a, b, c, e, f);
      }, glTexSubImage2D: function glTexSubImage2D(a, b, c, e, f, g, l, n, r) {
        if (2 <= T.version) {
          if (U.B) U.texSubImage2D(a, b, c, e, f, g, l, n, r);else if (r) {
            var u = Dc(n);U.texSubImage2D(a, b, c, e, f, g, l, n, u, r >> 31 - Math.clz32(u.BYTES_PER_ELEMENT));
          } else U.texSubImage2D(a, b, c, e, f, g, l, n, null);
        } else u = null, r && (u = Ec(n, l, f, g, r)), U.texSubImage2D(a, b, c, e, f, g, l, n, u);
      }, glUniform1f: function glUniform1f(a, b) {
        U.uniform1f(W(a), b);
      }, glUniform1fv: function glUniform1fv(a, b, c) {
        if (2 <= T.version) b && U.uniform1fv(W(a), v(), c >> 2, b);else {
          if (288 >= b) for (var e = X[b - 1], f = 0; f < b; ++f) {
            e[f] = v()[c + 4 * f >> 2];
          } else e = v().subarray(c >> 2, c + 4 * b >> 2);U.uniform1fv(W(a), e);
        }
      }, glUniform1i: function glUniform1i(a, b) {
        U.uniform1i(W(a), b);
      }, glUniform1iv: function glUniform1iv(a, b, c) {
        if (2 <= T.version) b && U.uniform1iv(W(a), q(), c >> 2, b);else {
          if (288 >= b) for (var e = Fc[b - 1], f = 0; f < b; ++f) {
            e[f] = q()[c + 4 * f >> 2];
          } else e = q().subarray(c >> 2, c + 4 * b >> 2);U.uniform1iv(W(a), e);
        }
      }, glUniform2f: function glUniform2f(a, b, c) {
        U.uniform2f(W(a), b, c);
      }, glUniform2fv: function glUniform2fv(a, b, c) {
        if (2 <= T.version) b && U.uniform2fv(W(a), v(), c >> 2, 2 * b);else {
          if (144 >= b) for (var e = X[2 * b - 1], f = 0; f < 2 * b; f += 2) {
            e[f] = v()[c + 4 * f >> 2], e[f + 1] = v()[c + (4 * f + 4) >> 2];
          } else e = v().subarray(c >> 2, c + 8 * b >> 2);U.uniform2fv(W(a), e);
        }
      }, glUniform2i: function glUniform2i(a, b, c) {
        U.uniform2i(W(a), b, c);
      }, glUniform2iv: function glUniform2iv(a, b, c) {
        if (2 <= T.version) b && U.uniform2iv(W(a), q(), c >> 2, 2 * b);else {
          if (144 >= b) for (var e = Fc[2 * b - 1], f = 0; f < 2 * b; f += 2) {
            e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c + (4 * f + 4) >> 2];
          } else e = q().subarray(c >> 2, c + 8 * b >> 2);U.uniform2iv(W(a), e);
        }
      }, glUniform3f: function glUniform3f(a, b, c, e) {
        U.uniform3f(W(a), b, c, e);
      }, glUniform3fv: function glUniform3fv(a, b, c) {
        if (2 <= T.version) b && U.uniform3fv(W(a), v(), c >> 2, 3 * b);else {
          if (96 >= b) for (var e = X[3 * b - 1], f = 0; f < 3 * b; f += 3) {
            e[f] = v()[c + 4 * f >> 2], e[f + 1] = v()[c + (4 * f + 4) >> 2], e[f + 2] = v()[c + (4 * f + 8) >> 2];
          } else e = v().subarray(c >> 2, c + 12 * b >> 2);U.uniform3fv(W(a), e);
        }
      }, glUniform3i: function glUniform3i(a, b, c, e) {
        U.uniform3i(W(a), b, c, e);
      }, glUniform3iv: function glUniform3iv(a, b, c) {
        if (2 <= T.version) b && U.uniform3iv(W(a), q(), c >> 2, 3 * b);else {
          if (96 >= b) for (var e = Fc[3 * b - 1], f = 0; f < 3 * b; f += 3) {
            e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c + (4 * f + 4) >> 2], e[f + 2] = q()[c + (4 * f + 8) >> 2];
          } else e = q().subarray(c >> 2, c + 12 * b >> 2);U.uniform3iv(W(a), e);
        }
      }, glUniform4f: function glUniform4f(a, b, c, e, f) {
        U.uniform4f(W(a), b, c, e, f);
      }, glUniform4fv: function glUniform4fv(a, b, c) {
        if (2 <= T.version) b && U.uniform4fv(W(a), v(), c >> 2, 4 * b);else {
          if (72 >= b) {
            var e = X[4 * b - 1],
                f = v();c >>= 2;for (var g = 0; g < 4 * b; g += 4) {
              var l = c + g;e[g] = f[l];e[g + 1] = f[l + 1];e[g + 2] = f[l + 2];e[g + 3] = f[l + 3];
            }
          } else e = v().subarray(c >> 2, c + 16 * b >> 2);U.uniform4fv(W(a), e);
        }
      }, glUniform4i: function glUniform4i(a, b, c, e, f) {
        U.uniform4i(W(a), b, c, e, f);
      }, glUniform4iv: function glUniform4iv(a, b, c) {
        if (2 <= T.version) b && U.uniform4iv(W(a), q(), c >> 2, 4 * b);else {
          if (72 >= b) for (var e = Fc[4 * b - 1], f = 0; f < 4 * b; f += 4) {
            e[f] = q()[c + 4 * f >> 2], e[f + 1] = q()[c + (4 * f + 4) >> 2], e[f + 2] = q()[c + (4 * f + 8) >> 2], e[f + 3] = q()[c + (4 * f + 12) >> 2];
          } else e = q().subarray(c >> 2, c + 16 * b >> 2);U.uniform4iv(W(a), e);
        }
      }, glUniformMatrix2fv: function glUniformMatrix2fv(a, b, c, e) {
        if (2 <= T.version) b && U.uniformMatrix2fv(W(a), !!c, v(), e >> 2, 4 * b);else {
          if (72 >= b) for (var f = X[4 * b - 1], g = 0; g < 4 * b; g += 4) {
            f[g] = v()[e + 4 * g >> 2], f[g + 1] = v()[e + (4 * g + 4) >> 2], f[g + 2] = v()[e + (4 * g + 8) >> 2], f[g + 3] = v()[e + (4 * g + 12) >> 2];
          } else f = v().subarray(e >> 2, e + 16 * b >> 2);U.uniformMatrix2fv(W(a), !!c, f);
        }
      }, glUniformMatrix3fv: function glUniformMatrix3fv(a, b, c, e) {
        if (2 <= T.version) b && U.uniformMatrix3fv(W(a), !!c, v(), e >> 2, 9 * b);else {
          if (32 >= b) for (var f = X[9 * b - 1], g = 0; g < 9 * b; g += 9) {
            f[g] = v()[e + 4 * g >> 2], f[g + 1] = v()[e + (4 * g + 4) >> 2], f[g + 2] = v()[e + (4 * g + 8) >> 2], f[g + 3] = v()[e + (4 * g + 12) >> 2], f[g + 4] = v()[e + (4 * g + 16) >> 2], f[g + 5] = v()[e + (4 * g + 20) >> 2], f[g + 6] = v()[e + (4 * g + 24) >> 2], f[g + 7] = v()[e + (4 * g + 28) >> 2], f[g + 8] = v()[e + (4 * g + 32) >> 2];
          } else f = v().subarray(e >> 2, e + 36 * b >> 2);U.uniformMatrix3fv(W(a), !!c, f);
        }
      },
      glUniformMatrix4fv: function glUniformMatrix4fv(a, b, c, e) {
        if (2 <= T.version) b && U.uniformMatrix4fv(W(a), !!c, v(), e >> 2, 16 * b);else {
          if (18 >= b) {
            var f = X[16 * b - 1],
                g = v();e >>= 2;for (var l = 0; l < 16 * b; l += 16) {
              var n = e + l;f[l] = g[n];f[l + 1] = g[n + 1];f[l + 2] = g[n + 2];f[l + 3] = g[n + 3];f[l + 4] = g[n + 4];f[l + 5] = g[n + 5];f[l + 6] = g[n + 6];f[l + 7] = g[n + 7];f[l + 8] = g[n + 8];f[l + 9] = g[n + 9];f[l + 10] = g[n + 10];f[l + 11] = g[n + 11];f[l + 12] = g[n + 12];f[l + 13] = g[n + 13];f[l + 14] = g[n + 14];f[l + 15] = g[n + 15];
            }
          } else f = v().subarray(e >> 2, e + 64 * b >> 2);U.uniformMatrix4fv(W(a), !!c, f);
        }
      }, glUseProgram: function glUseProgram(a) {
        a = O[a];U.useProgram(a);U.la = a;
      }, glVertexAttrib1f: function glVertexAttrib1f(a, b) {
        U.vertexAttrib1f(a, b);
      }, glVertexAttrib2fv: function glVertexAttrib2fv(a, b) {
        U.vertexAttrib2f(a, v()[b >> 2], v()[b + 4 >> 2]);
      }, glVertexAttrib3fv: function glVertexAttrib3fv(a, b) {
        U.vertexAttrib3f(a, v()[b >> 2], v()[b + 4 >> 2], v()[b + 8 >> 2]);
      }, glVertexAttrib4fv: function glVertexAttrib4fv(a, b) {
        U.vertexAttrib4f(a, v()[b >> 2], v()[b + 4 >> 2], v()[b + 8 >> 2], v()[b + 12 >> 2]);
      }, glVertexAttribDivisor: function glVertexAttribDivisor(a, b) {
        U.vertexAttribDivisor(a, b);
      }, glVertexAttribIPointer: function glVertexAttribIPointer(a, b, c, e, f) {
        U.vertexAttribIPointer(a, b, c, e, f);
      }, glVertexAttribPointer: function glVertexAttribPointer(a, b, c, e, f, g) {
        U.vertexAttribPointer(a, b, c, !!e, f, g);
      }, glViewport: function glViewport(a, b, c, e) {
        U.viewport(a, b, c, e);
      }, glWaitSync: function glWaitSync(a, b, c, e) {
        U.waitSync(Qb[a], b, (c >>> 0) + 4294967296 * e);
      }, invoke_ii: dd, invoke_iii: ed, invoke_iiii: fd, invoke_iiiii: gd, invoke_iiiiiii: hd, invoke_vi: jd, invoke_vii: kd, invoke_viii: ld, invoke_viiii: md, invoke_viiiiiii: nd, memory: d || w.wasmMemory, skwasm_captureImageBitmap: Gc, skwasm_createGlTextureFromTextureSource: Hc, skwasm_createOffscreenCanvas: Jc, skwasm_dispatchRenderPicture: Kc, skwasm_disposeAssociatedObjectOnThread: Lc,
      skwasm_getAssociatedObject: Mc, skwasm_registerMessageListener: Nc, skwasm_resizeCanvas: Oc, skwasm_setAssociatedObjectOnThread: Pc, strftime_l: function strftime_l(a, b, c, e) {
        return Vc(a, b, c, e);
      } };
    (function () {
      function a(c, e) {
        F = c = c.exports;w.wasmExports = F;I.ha.push(F._emscripten_tls_init);G = F.__indirect_function_table;Ha.unshift(F.__wasm_call_ctors);Aa = e;Oa();return c;
      }var b = { env: od, wasi_snapshot_preview1: od };Na();if (w.instantiateWasm) try {
        return w.instantiateWasm(b, a);
      } catch (c) {
        D("Module.instantiateWasm callback failed with error: " + c), ka(c);
      }Ua(b, function (c) {
        a(c.instance, c.module);
      }).catch(ka);return {};
    })();w._canvas_saveLayer = function (a, b, c, e) {
      return (w._canvas_saveLayer = F.canvas_saveLayer)(a, b, c, e);
    };
    w._canvas_save = function (a) {
      return (w._canvas_save = F.canvas_save)(a);
    };w._canvas_restore = function (a) {
      return (w._canvas_restore = F.canvas_restore)(a);
    };w._canvas_restoreToCount = function (a, b) {
      return (w._canvas_restoreToCount = F.canvas_restoreToCount)(a, b);
    };w._canvas_getSaveCount = function (a) {
      return (w._canvas_getSaveCount = F.canvas_getSaveCount)(a);
    };w._canvas_translate = function (a, b, c) {
      return (w._canvas_translate = F.canvas_translate)(a, b, c);
    };w._canvas_scale = function (a, b, c) {
      return (w._canvas_scale = F.canvas_scale)(a, b, c);
    };w._canvas_rotate = function (a, b) {
      return (w._canvas_rotate = F.canvas_rotate)(a, b);
    };
    w._canvas_skew = function (a, b, c) {
      return (w._canvas_skew = F.canvas_skew)(a, b, c);
    };w._canvas_transform = function (a, b) {
      return (w._canvas_transform = F.canvas_transform)(a, b);
    };w._canvas_clipRect = function (a, b, c, e) {
      return (w._canvas_clipRect = F.canvas_clipRect)(a, b, c, e);
    };w._canvas_clipRRect = function (a, b, c) {
      return (w._canvas_clipRRect = F.canvas_clipRRect)(a, b, c);
    };w._canvas_clipPath = function (a, b, c) {
      return (w._canvas_clipPath = F.canvas_clipPath)(a, b, c);
    };w._canvas_drawColor = function (a, b, c) {
      return (w._canvas_drawColor = F.canvas_drawColor)(a, b, c);
    };
    w._canvas_drawLine = function (a, b, c, e, f, g) {
      return (w._canvas_drawLine = F.canvas_drawLine)(a, b, c, e, f, g);
    };w._canvas_drawPaint = function (a, b) {
      return (w._canvas_drawPaint = F.canvas_drawPaint)(a, b);
    };w._canvas_drawRect = function (a, b, c) {
      return (w._canvas_drawRect = F.canvas_drawRect)(a, b, c);
    };w._canvas_drawRRect = function (a, b, c) {
      return (w._canvas_drawRRect = F.canvas_drawRRect)(a, b, c);
    };w._canvas_drawDRRect = function (a, b, c, e) {
      return (w._canvas_drawDRRect = F.canvas_drawDRRect)(a, b, c, e);
    };w._canvas_drawOval = function (a, b, c) {
      return (w._canvas_drawOval = F.canvas_drawOval)(a, b, c);
    };
    w._canvas_drawCircle = function (a, b, c, e, f) {
      return (w._canvas_drawCircle = F.canvas_drawCircle)(a, b, c, e, f);
    };w._canvas_drawArc = function (a, b, c, e, f, g) {
      return (w._canvas_drawArc = F.canvas_drawArc)(a, b, c, e, f, g);
    };w._canvas_drawPath = function (a, b, c) {
      return (w._canvas_drawPath = F.canvas_drawPath)(a, b, c);
    };w._canvas_drawShadow = function (a, b, c, e, f, g) {
      return (w._canvas_drawShadow = F.canvas_drawShadow)(a, b, c, e, f, g);
    };w._canvas_drawParagraph = function (a, b, c, e) {
      return (w._canvas_drawParagraph = F.canvas_drawParagraph)(a, b, c, e);
    };
    w._canvas_drawPicture = function (a, b) {
      return (w._canvas_drawPicture = F.canvas_drawPicture)(a, b);
    };w._canvas_drawImage = function (a, b, c, e, f, g) {
      return (w._canvas_drawImage = F.canvas_drawImage)(a, b, c, e, f, g);
    };w._canvas_drawImageRect = function (a, b, c, e, f, g) {
      return (w._canvas_drawImageRect = F.canvas_drawImageRect)(a, b, c, e, f, g);
    };w._canvas_drawImageNine = function (a, b, c, e, f, g) {
      return (w._canvas_drawImageNine = F.canvas_drawImageNine)(a, b, c, e, f, g);
    };w._canvas_drawVertices = function (a, b, c, e) {
      return (w._canvas_drawVertices = F.canvas_drawVertices)(a, b, c, e);
    };
    w._canvas_drawPoints = function (a, b, c, e, f) {
      return (w._canvas_drawPoints = F.canvas_drawPoints)(a, b, c, e, f);
    };w._canvas_drawAtlas = function (a, b, c, e, f, g, l, n, r) {
      return (w._canvas_drawAtlas = F.canvas_drawAtlas)(a, b, c, e, f, g, l, n, r);
    };w._canvas_getTransform = function (a, b) {
      return (w._canvas_getTransform = F.canvas_getTransform)(a, b);
    };w._canvas_getLocalClipBounds = function (a, b) {
      return (w._canvas_getLocalClipBounds = F.canvas_getLocalClipBounds)(a, b);
    };w._canvas_getDeviceClipBounds = function (a, b) {
      return (w._canvas_getDeviceClipBounds = F.canvas_getDeviceClipBounds)(a, b);
    };
    w._contourMeasureIter_create = function (a, b, c) {
      return (w._contourMeasureIter_create = F.contourMeasureIter_create)(a, b, c);
    };w._contourMeasureIter_next = function (a) {
      return (w._contourMeasureIter_next = F.contourMeasureIter_next)(a);
    };w._contourMeasureIter_dispose = function (a) {
      return (w._contourMeasureIter_dispose = F.contourMeasureIter_dispose)(a);
    };w._contourMeasure_dispose = function (a) {
      return (w._contourMeasure_dispose = F.contourMeasure_dispose)(a);
    };w._contourMeasure_length = function (a) {
      return (w._contourMeasure_length = F.contourMeasure_length)(a);
    };
    w._contourMeasure_isClosed = function (a) {
      return (w._contourMeasure_isClosed = F.contourMeasure_isClosed)(a);
    };w._contourMeasure_getPosTan = function (a, b, c, e) {
      return (w._contourMeasure_getPosTan = F.contourMeasure_getPosTan)(a, b, c, e);
    };w._contourMeasure_getSegment = function (a, b, c, e) {
      return (w._contourMeasure_getSegment = F.contourMeasure_getSegment)(a, b, c, e);
    };w._skData_create = function (a) {
      return (w._skData_create = F.skData_create)(a);
    };w._skData_getPointer = function (a) {
      return (w._skData_getPointer = F.skData_getPointer)(a);
    };w._skData_getConstPointer = function (a) {
      return (w._skData_getConstPointer = F.skData_getConstPointer)(a);
    };
    w._skData_getSize = function (a) {
      return (w._skData_getSize = F.skData_getSize)(a);
    };w._skData_dispose = function (a) {
      return (w._skData_dispose = F.skData_dispose)(a);
    };w._imageFilter_createBlur = function (a, b, c) {
      return (w._imageFilter_createBlur = F.imageFilter_createBlur)(a, b, c);
    };w._imageFilter_createDilate = function (a, b) {
      return (w._imageFilter_createDilate = F.imageFilter_createDilate)(a, b);
    };w._imageFilter_createErode = function (a, b) {
      return (w._imageFilter_createErode = F.imageFilter_createErode)(a, b);
    };
    w._imageFilter_createMatrix = function (a, b) {
      return (w._imageFilter_createMatrix = F.imageFilter_createMatrix)(a, b);
    };w._imageFilter_createFromColorFilter = function (a) {
      return (w._imageFilter_createFromColorFilter = F.imageFilter_createFromColorFilter)(a);
    };w._imageFilter_compose = function (a, b) {
      return (w._imageFilter_compose = F.imageFilter_compose)(a, b);
    };w._imageFilter_dispose = function (a) {
      return (w._imageFilter_dispose = F.imageFilter_dispose)(a);
    };w._imageFilter_getFilterBounds = function (a, b) {
      return (w._imageFilter_getFilterBounds = F.imageFilter_getFilterBounds)(a, b);
    };
    w._colorFilter_createMode = function (a, b) {
      return (w._colorFilter_createMode = F.colorFilter_createMode)(a, b);
    };w._colorFilter_createMatrix = function (a) {
      return (w._colorFilter_createMatrix = F.colorFilter_createMatrix)(a);
    };w._colorFilter_createSRGBToLinearGamma = function () {
      return (w._colorFilter_createSRGBToLinearGamma = F.colorFilter_createSRGBToLinearGamma)();
    };w._colorFilter_createLinearToSRGBGamma = function () {
      return (w._colorFilter_createLinearToSRGBGamma = F.colorFilter_createLinearToSRGBGamma)();
    };
    w._colorFilter_compose = function (a, b) {
      return (w._colorFilter_compose = F.colorFilter_compose)(a, b);
    };w._colorFilter_dispose = function (a) {
      return (w._colorFilter_dispose = F.colorFilter_dispose)(a);
    };w._maskFilter_createBlur = function (a, b) {
      return (w._maskFilter_createBlur = F.maskFilter_createBlur)(a, b);
    };w._maskFilter_dispose = function (a) {
      return (w._maskFilter_dispose = F.maskFilter_dispose)(a);
    };w._fontCollection_create = function () {
      return (w._fontCollection_create = F.fontCollection_create)();
    };w._fontCollection_dispose = function (a) {
      return (w._fontCollection_dispose = F.fontCollection_dispose)(a);
    };
    w._typeface_create = function (a) {
      return (w._typeface_create = F.typeface_create)(a);
    };w._typeface_dispose = function (a) {
      return (w._typeface_dispose = F.typeface_dispose)(a);
    };w._typefaces_filterCoveredCodePoints = function (a, b, c, e) {
      return (w._typefaces_filterCoveredCodePoints = F.typefaces_filterCoveredCodePoints)(a, b, c, e);
    };w._fontCollection_registerTypeface = function (a, b, c) {
      return (w._fontCollection_registerTypeface = F.fontCollection_registerTypeface)(a, b, c);
    };w._fontCollection_clearCaches = function (a) {
      return (w._fontCollection_clearCaches = F.fontCollection_clearCaches)(a);
    };
    w._image_createFromPicture = function (a, b, c) {
      return (w._image_createFromPicture = F.image_createFromPicture)(a, b, c);
    };w._image_createFromPixels = function (a, b, c, e, f) {
      return (w._image_createFromPixels = F.image_createFromPixels)(a, b, c, e, f);
    };w._image_createFromTextureSource = function (a, b, c, e) {
      return (w._image_createFromTextureSource = F.image_createFromTextureSource)(a, b, c, e);
    };w._image_ref = function (a) {
      return (w._image_ref = F.image_ref)(a);
    };w._image_dispose = function (a) {
      return (w._image_dispose = F.image_dispose)(a);
    };w._image_getWidth = function (a) {
      return (w._image_getWidth = F.image_getWidth)(a);
    };
    w._image_getHeight = function (a) {
      return (w._image_getHeight = F.image_getHeight)(a);
    };w._paint_create = function () {
      return (w._paint_create = F.paint_create)();
    };w._paint_dispose = function (a) {
      return (w._paint_dispose = F.paint_dispose)(a);
    };w._paint_setBlendMode = function (a, b) {
      return (w._paint_setBlendMode = F.paint_setBlendMode)(a, b);
    };w._paint_setStyle = function (a, b) {
      return (w._paint_setStyle = F.paint_setStyle)(a, b);
    };w._paint_getStyle = function (a) {
      return (w._paint_getStyle = F.paint_getStyle)(a);
    };w._paint_setStrokeWidth = function (a, b) {
      return (w._paint_setStrokeWidth = F.paint_setStrokeWidth)(a, b);
    };
    w._paint_getStrokeWidth = function (a) {
      return (w._paint_getStrokeWidth = F.paint_getStrokeWidth)(a);
    };w._paint_setStrokeCap = function (a, b) {
      return (w._paint_setStrokeCap = F.paint_setStrokeCap)(a, b);
    };w._paint_getStrokeCap = function (a) {
      return (w._paint_getStrokeCap = F.paint_getStrokeCap)(a);
    };w._paint_setStrokeJoin = function (a, b) {
      return (w._paint_setStrokeJoin = F.paint_setStrokeJoin)(a, b);
    };w._paint_getStrokeJoin = function (a) {
      return (w._paint_getStrokeJoin = F.paint_getStrokeJoin)(a);
    };w._paint_setAntiAlias = function (a, b) {
      return (w._paint_setAntiAlias = F.paint_setAntiAlias)(a, b);
    };
    w._paint_getAntiAlias = function (a) {
      return (w._paint_getAntiAlias = F.paint_getAntiAlias)(a);
    };w._paint_setColorInt = function (a, b) {
      return (w._paint_setColorInt = F.paint_setColorInt)(a, b);
    };w._paint_getColorInt = function (a) {
      return (w._paint_getColorInt = F.paint_getColorInt)(a);
    };w._paint_setMiterLimit = function (a, b) {
      return (w._paint_setMiterLimit = F.paint_setMiterLimit)(a, b);
    };w._paint_getMiterLImit = function (a) {
      return (w._paint_getMiterLImit = F.paint_getMiterLImit)(a);
    };w._paint_setShader = function (a, b) {
      return (w._paint_setShader = F.paint_setShader)(a, b);
    };
    w._paint_setImageFilter = function (a, b) {
      return (w._paint_setImageFilter = F.paint_setImageFilter)(a, b);
    };w._paint_setColorFilter = function (a, b) {
      return (w._paint_setColorFilter = F.paint_setColorFilter)(a, b);
    };w._paint_setMaskFilter = function (a, b) {
      return (w._paint_setMaskFilter = F.paint_setMaskFilter)(a, b);
    };w._path_create = function () {
      return (w._path_create = F.path_create)();
    };w._path_dispose = function (a) {
      return (w._path_dispose = F.path_dispose)(a);
    };w._path_copy = function (a) {
      return (w._path_copy = F.path_copy)(a);
    };w._path_setFillType = function (a, b) {
      return (w._path_setFillType = F.path_setFillType)(a, b);
    };
    w._path_getFillType = function (a) {
      return (w._path_getFillType = F.path_getFillType)(a);
    };w._path_moveTo = function (a, b, c) {
      return (w._path_moveTo = F.path_moveTo)(a, b, c);
    };w._path_relativeMoveTo = function (a, b, c) {
      return (w._path_relativeMoveTo = F.path_relativeMoveTo)(a, b, c);
    };w._path_lineTo = function (a, b, c) {
      return (w._path_lineTo = F.path_lineTo)(a, b, c);
    };w._path_relativeLineTo = function (a, b, c) {
      return (w._path_relativeLineTo = F.path_relativeLineTo)(a, b, c);
    };w._path_quadraticBezierTo = function (a, b, c, e, f) {
      return (w._path_quadraticBezierTo = F.path_quadraticBezierTo)(a, b, c, e, f);
    };
    w._path_relativeQuadraticBezierTo = function (a, b, c, e, f) {
      return (w._path_relativeQuadraticBezierTo = F.path_relativeQuadraticBezierTo)(a, b, c, e, f);
    };w._path_cubicTo = function (a, b, c, e, f, g, l) {
      return (w._path_cubicTo = F.path_cubicTo)(a, b, c, e, f, g, l);
    };w._path_relativeCubicTo = function (a, b, c, e, f, g, l) {
      return (w._path_relativeCubicTo = F.path_relativeCubicTo)(a, b, c, e, f, g, l);
    };w._path_conicTo = function (a, b, c, e, f, g) {
      return (w._path_conicTo = F.path_conicTo)(a, b, c, e, f, g);
    };w._path_relativeConicTo = function (a, b, c, e, f, g) {
      return (w._path_relativeConicTo = F.path_relativeConicTo)(a, b, c, e, f, g);
    };
    w._path_arcToOval = function (a, b, c, e, f) {
      return (w._path_arcToOval = F.path_arcToOval)(a, b, c, e, f);
    };w._path_arcToRotated = function (a, b, c, e, f, g, l, n) {
      return (w._path_arcToRotated = F.path_arcToRotated)(a, b, c, e, f, g, l, n);
    };w._path_relativeArcToRotated = function (a, b, c, e, f, g, l, n) {
      return (w._path_relativeArcToRotated = F.path_relativeArcToRotated)(a, b, c, e, f, g, l, n);
    };w._path_addRect = function (a, b) {
      return (w._path_addRect = F.path_addRect)(a, b);
    };w._path_addOval = function (a, b) {
      return (w._path_addOval = F.path_addOval)(a, b);
    };w._path_addArc = function (a, b, c, e) {
      return (w._path_addArc = F.path_addArc)(a, b, c, e);
    };
    w._path_addPolygon = function (a, b, c, e) {
      return (w._path_addPolygon = F.path_addPolygon)(a, b, c, e);
    };w._path_addRRect = function (a, b) {
      return (w._path_addRRect = F.path_addRRect)(a, b);
    };w._path_addPath = function (a, b, c, e) {
      return (w._path_addPath = F.path_addPath)(a, b, c, e);
    };w._path_close = function (a) {
      return (w._path_close = F.path_close)(a);
    };w._path_reset = function (a) {
      return (w._path_reset = F.path_reset)(a);
    };w._path_contains = function (a, b, c) {
      return (w._path_contains = F.path_contains)(a, b, c);
    };w._path_transform = function (a, b) {
      return (w._path_transform = F.path_transform)(a, b);
    };
    w._path_getBounds = function (a, b) {
      return (w._path_getBounds = F.path_getBounds)(a, b);
    };w._path_combine = function (a, b, c) {
      return (w._path_combine = F.path_combine)(a, b, c);
    };w._pictureRecorder_create = function () {
      return (w._pictureRecorder_create = F.pictureRecorder_create)();
    };w._pictureRecorder_dispose = function (a) {
      return (w._pictureRecorder_dispose = F.pictureRecorder_dispose)(a);
    };w._pictureRecorder_beginRecording = function (a, b) {
      return (w._pictureRecorder_beginRecording = F.pictureRecorder_beginRecording)(a, b);
    };w._pictureRecorder_endRecording = function (a) {
      return (w._pictureRecorder_endRecording = F.pictureRecorder_endRecording)(a);
    };
    w._picture_getCullRect = function (a, b) {
      return (w._picture_getCullRect = F.picture_getCullRect)(a, b);
    };w._picture_dispose = function (a) {
      return (w._picture_dispose = F.picture_dispose)(a);
    };w._picture_approximateBytesUsed = function (a) {
      return (w._picture_approximateBytesUsed = F.picture_approximateBytesUsed)(a);
    };w._shader_createLinearGradient = function (a, b, c, e, f, g) {
      return (w._shader_createLinearGradient = F.shader_createLinearGradient)(a, b, c, e, f, g);
    };w._shader_createRadialGradient = function (a, b, c, e, f, g, l, n) {
      return (w._shader_createRadialGradient = F.shader_createRadialGradient)(a, b, c, e, f, g, l, n);
    };
    w._shader_createConicalGradient = function (a, b, c, e, f, g, l, n) {
      return (w._shader_createConicalGradient = F.shader_createConicalGradient)(a, b, c, e, f, g, l, n);
    };w._shader_createSweepGradient = function (a, b, c, e, f, g, l, n, r) {
      return (w._shader_createSweepGradient = F.shader_createSweepGradient)(a, b, c, e, f, g, l, n, r);
    };w._shader_dispose = function (a) {
      return (w._shader_dispose = F.shader_dispose)(a);
    };w._runtimeEffect_create = function (a) {
      return (w._runtimeEffect_create = F.runtimeEffect_create)(a);
    };w._runtimeEffect_dispose = function (a) {
      return (w._runtimeEffect_dispose = F.runtimeEffect_dispose)(a);
    };
    w._runtimeEffect_getUniformSize = function (a) {
      return (w._runtimeEffect_getUniformSize = F.runtimeEffect_getUniformSize)(a);
    };w._shader_createRuntimeEffectShader = function (a, b, c, e) {
      return (w._shader_createRuntimeEffectShader = F.shader_createRuntimeEffectShader)(a, b, c, e);
    };w._shader_createFromImage = function (a, b, c, e, f) {
      return (w._shader_createFromImage = F.shader_createFromImage)(a, b, c, e, f);
    };w._skString_allocate = function (a) {
      return (w._skString_allocate = F.skString_allocate)(a);
    };w._skString_getData = function (a) {
      return (w._skString_getData = F.skString_getData)(a);
    };
    w._skString_free = function (a) {
      return (w._skString_free = F.skString_free)(a);
    };w._skString16_allocate = function (a) {
      return (w._skString16_allocate = F.skString16_allocate)(a);
    };w._skString16_getData = function (a) {
      return (w._skString16_getData = F.skString16_getData)(a);
    };w._skString16_free = function (a) {
      return (w._skString16_free = F.skString16_free)(a);
    };var _Db = function Db(a, b, c, e, f) {
      return (_Db = F.emscripten_dispatch_to_thread_)(a, b, c, e, f);
    };w._surface_create = function () {
      return (w._surface_create = F.surface_create)();
    };w._surface_getThreadId = function (a) {
      return (w._surface_getThreadId = F.surface_getThreadId)(a);
    };
    w._surface_setCallbackHandler = function (a, b) {
      return (w._surface_setCallbackHandler = F.surface_setCallbackHandler)(a, b);
    };w._surface_destroy = function (a) {
      return (w._surface_destroy = F.surface_destroy)(a);
    };w._surface_renderPicture = function (a, b) {
      return (w._surface_renderPicture = F.surface_renderPicture)(a, b);
    };var $c = w._surface_renderPictureOnWorker = function (a, b, c) {
      return ($c = w._surface_renderPictureOnWorker = F.surface_renderPictureOnWorker)(a, b, c);
    };w._surface_rasterizeImage = function (a, b, c) {
      return (w._surface_rasterizeImage = F.surface_rasterizeImage)(a, b, c);
    };
    var ad = w._surface_onRenderComplete = function (a, b, c) {
      return (ad = w._surface_onRenderComplete = F.surface_onRenderComplete)(a, b, c);
    };w._lineMetrics_create = function (a, b, c, e, f, g, l, n, r) {
      return (w._lineMetrics_create = F.lineMetrics_create)(a, b, c, e, f, g, l, n, r);
    };w._lineMetrics_dispose = function (a) {
      return (w._lineMetrics_dispose = F.lineMetrics_dispose)(a);
    };w._lineMetrics_getHardBreak = function (a) {
      return (w._lineMetrics_getHardBreak = F.lineMetrics_getHardBreak)(a);
    };w._lineMetrics_getAscent = function (a) {
      return (w._lineMetrics_getAscent = F.lineMetrics_getAscent)(a);
    };
    w._lineMetrics_getDescent = function (a) {
      return (w._lineMetrics_getDescent = F.lineMetrics_getDescent)(a);
    };w._lineMetrics_getUnscaledAscent = function (a) {
      return (w._lineMetrics_getUnscaledAscent = F.lineMetrics_getUnscaledAscent)(a);
    };w._lineMetrics_getHeight = function (a) {
      return (w._lineMetrics_getHeight = F.lineMetrics_getHeight)(a);
    };w._lineMetrics_getWidth = function (a) {
      return (w._lineMetrics_getWidth = F.lineMetrics_getWidth)(a);
    };w._lineMetrics_getLeft = function (a) {
      return (w._lineMetrics_getLeft = F.lineMetrics_getLeft)(a);
    };w._lineMetrics_getBaseline = function (a) {
      return (w._lineMetrics_getBaseline = F.lineMetrics_getBaseline)(a);
    };
    w._lineMetrics_getLineNumber = function (a) {
      return (w._lineMetrics_getLineNumber = F.lineMetrics_getLineNumber)(a);
    };w._lineMetrics_getStartIndex = function (a) {
      return (w._lineMetrics_getStartIndex = F.lineMetrics_getStartIndex)(a);
    };w._lineMetrics_getEndIndex = function (a) {
      return (w._lineMetrics_getEndIndex = F.lineMetrics_getEndIndex)(a);
    };w._paragraph_dispose = function (a) {
      return (w._paragraph_dispose = F.paragraph_dispose)(a);
    };w._paragraph_getWidth = function (a) {
      return (w._paragraph_getWidth = F.paragraph_getWidth)(a);
    };w._paragraph_getHeight = function (a) {
      return (w._paragraph_getHeight = F.paragraph_getHeight)(a);
    };
    w._paragraph_getLongestLine = function (a) {
      return (w._paragraph_getLongestLine = F.paragraph_getLongestLine)(a);
    };w._paragraph_getMinIntrinsicWidth = function (a) {
      return (w._paragraph_getMinIntrinsicWidth = F.paragraph_getMinIntrinsicWidth)(a);
    };w._paragraph_getMaxIntrinsicWidth = function (a) {
      return (w._paragraph_getMaxIntrinsicWidth = F.paragraph_getMaxIntrinsicWidth)(a);
    };w._paragraph_getAlphabeticBaseline = function (a) {
      return (w._paragraph_getAlphabeticBaseline = F.paragraph_getAlphabeticBaseline)(a);
    };w._paragraph_getIdeographicBaseline = function (a) {
      return (w._paragraph_getIdeographicBaseline = F.paragraph_getIdeographicBaseline)(a);
    };
    w._paragraph_getDidExceedMaxLines = function (a) {
      return (w._paragraph_getDidExceedMaxLines = F.paragraph_getDidExceedMaxLines)(a);
    };w._paragraph_layout = function (a, b) {
      return (w._paragraph_layout = F.paragraph_layout)(a, b);
    };w._paragraph_getPositionForOffset = function (a, b, c, e) {
      return (w._paragraph_getPositionForOffset = F.paragraph_getPositionForOffset)(a, b, c, e);
    };w._paragraph_getClosestGlyphInfoAtCoordinate = function (a, b, c, e, f, g) {
      return (w._paragraph_getClosestGlyphInfoAtCoordinate = F.paragraph_getClosestGlyphInfoAtCoordinate)(a, b, c, e, f, g);
    };
    w._paragraph_getGlyphInfoAt = function (a, b, c, e, f) {
      return (w._paragraph_getGlyphInfoAt = F.paragraph_getGlyphInfoAt)(a, b, c, e, f);
    };w._paragraph_getWordBoundary = function (a, b, c) {
      return (w._paragraph_getWordBoundary = F.paragraph_getWordBoundary)(a, b, c);
    };w._paragraph_getLineCount = function (a) {
      return (w._paragraph_getLineCount = F.paragraph_getLineCount)(a);
    };w._paragraph_getLineNumberAt = function (a, b) {
      return (w._paragraph_getLineNumberAt = F.paragraph_getLineNumberAt)(a, b);
    };
    w._paragraph_getLineMetricsAtIndex = function (a, b) {
      return (w._paragraph_getLineMetricsAtIndex = F.paragraph_getLineMetricsAtIndex)(a, b);
    };w._textBoxList_dispose = function (a) {
      return (w._textBoxList_dispose = F.textBoxList_dispose)(a);
    };w._textBoxList_getLength = function (a) {
      return (w._textBoxList_getLength = F.textBoxList_getLength)(a);
    };w._textBoxList_getBoxAtIndex = function (a, b, c) {
      return (w._textBoxList_getBoxAtIndex = F.textBoxList_getBoxAtIndex)(a, b, c);
    };w._paragraph_getBoxesForRange = function (a, b, c, e, f) {
      return (w._paragraph_getBoxesForRange = F.paragraph_getBoxesForRange)(a, b, c, e, f);
    };
    w._paragraph_getBoxesForPlaceholders = function (a) {
      return (w._paragraph_getBoxesForPlaceholders = F.paragraph_getBoxesForPlaceholders)(a);
    };w._paragraph_getUnresolvedCodePoints = function (a, b, c) {
      return (w._paragraph_getUnresolvedCodePoints = F.paragraph_getUnresolvedCodePoints)(a, b, c);
    };w._paragraphBuilder_create = function (a, b) {
      return (w._paragraphBuilder_create = F.paragraphBuilder_create)(a, b);
    };w._paragraphBuilder_dispose = function (a) {
      return (w._paragraphBuilder_dispose = F.paragraphBuilder_dispose)(a);
    };
    w._paragraphBuilder_addPlaceholder = function (a, b, c, e, f, g) {
      return (w._paragraphBuilder_addPlaceholder = F.paragraphBuilder_addPlaceholder)(a, b, c, e, f, g);
    };w._paragraphBuilder_addText = function (a, b) {
      return (w._paragraphBuilder_addText = F.paragraphBuilder_addText)(a, b);
    };w._paragraphBuilder_getUtf8Text = function (a, b) {
      return (w._paragraphBuilder_getUtf8Text = F.paragraphBuilder_getUtf8Text)(a, b);
    };w._paragraphBuilder_pushStyle = function (a, b) {
      return (w._paragraphBuilder_pushStyle = F.paragraphBuilder_pushStyle)(a, b);
    };w._paragraphBuilder_pop = function (a) {
      return (w._paragraphBuilder_pop = F.paragraphBuilder_pop)(a);
    };
    w._paragraphBuilder_build = function (a) {
      return (w._paragraphBuilder_build = F.paragraphBuilder_build)(a);
    };w._unicodePositionBuffer_create = function (a) {
      return (w._unicodePositionBuffer_create = F.unicodePositionBuffer_create)(a);
    };w._unicodePositionBuffer_getDataPointer = function (a) {
      return (w._unicodePositionBuffer_getDataPointer = F.unicodePositionBuffer_getDataPointer)(a);
    };w._unicodePositionBuffer_free = function (a) {
      return (w._unicodePositionBuffer_free = F.unicodePositionBuffer_free)(a);
    };w._lineBreakBuffer_create = function (a) {
      return (w._lineBreakBuffer_create = F.lineBreakBuffer_create)(a);
    };
    w._lineBreakBuffer_getDataPointer = function (a) {
      return (w._lineBreakBuffer_getDataPointer = F.lineBreakBuffer_getDataPointer)(a);
    };w._lineBreakBuffer_free = function (a) {
      return (w._lineBreakBuffer_free = F.lineBreakBuffer_free)(a);
    };w._paragraphBuilder_setGraphemeBreaksUtf16 = function (a, b) {
      return (w._paragraphBuilder_setGraphemeBreaksUtf16 = F.paragraphBuilder_setGraphemeBreaksUtf16)(a, b);
    };w._paragraphBuilder_setWordBreaksUtf16 = function (a, b) {
      return (w._paragraphBuilder_setWordBreaksUtf16 = F.paragraphBuilder_setWordBreaksUtf16)(a, b);
    };
    w._paragraphBuilder_setLineBreaksUtf16 = function (a, b) {
      return (w._paragraphBuilder_setLineBreaksUtf16 = F.paragraphBuilder_setLineBreaksUtf16)(a, b);
    };w._paragraphStyle_create = function () {
      return (w._paragraphStyle_create = F.paragraphStyle_create)();
    };w._paragraphStyle_dispose = function (a) {
      return (w._paragraphStyle_dispose = F.paragraphStyle_dispose)(a);
    };w._paragraphStyle_setTextAlign = function (a, b) {
      return (w._paragraphStyle_setTextAlign = F.paragraphStyle_setTextAlign)(a, b);
    };
    w._paragraphStyle_setTextDirection = function (a, b) {
      return (w._paragraphStyle_setTextDirection = F.paragraphStyle_setTextDirection)(a, b);
    };w._paragraphStyle_setMaxLines = function (a, b) {
      return (w._paragraphStyle_setMaxLines = F.paragraphStyle_setMaxLines)(a, b);
    };w._paragraphStyle_setHeight = function (a, b) {
      return (w._paragraphStyle_setHeight = F.paragraphStyle_setHeight)(a, b);
    };w._paragraphStyle_setTextHeightBehavior = function (a, b, c) {
      return (w._paragraphStyle_setTextHeightBehavior = F.paragraphStyle_setTextHeightBehavior)(a, b, c);
    };
    w._paragraphStyle_setEllipsis = function (a, b) {
      return (w._paragraphStyle_setEllipsis = F.paragraphStyle_setEllipsis)(a, b);
    };w._paragraphStyle_setStrutStyle = function (a, b) {
      return (w._paragraphStyle_setStrutStyle = F.paragraphStyle_setStrutStyle)(a, b);
    };w._paragraphStyle_setTextStyle = function (a, b) {
      return (w._paragraphStyle_setTextStyle = F.paragraphStyle_setTextStyle)(a, b);
    };w._strutStyle_create = function () {
      return (w._strutStyle_create = F.strutStyle_create)();
    };w._strutStyle_dispose = function (a) {
      return (w._strutStyle_dispose = F.strutStyle_dispose)(a);
    };
    w._strutStyle_setFontFamilies = function (a, b, c) {
      return (w._strutStyle_setFontFamilies = F.strutStyle_setFontFamilies)(a, b, c);
    };w._strutStyle_setFontSize = function (a, b) {
      return (w._strutStyle_setFontSize = F.strutStyle_setFontSize)(a, b);
    };w._strutStyle_setHeight = function (a, b) {
      return (w._strutStyle_setHeight = F.strutStyle_setHeight)(a, b);
    };w._strutStyle_setHalfLeading = function (a, b) {
      return (w._strutStyle_setHalfLeading = F.strutStyle_setHalfLeading)(a, b);
    };w._strutStyle_setLeading = function (a, b) {
      return (w._strutStyle_setLeading = F.strutStyle_setLeading)(a, b);
    };
    w._strutStyle_setFontStyle = function (a, b, c) {
      return (w._strutStyle_setFontStyle = F.strutStyle_setFontStyle)(a, b, c);
    };w._strutStyle_setForceStrutHeight = function (a, b) {
      return (w._strutStyle_setForceStrutHeight = F.strutStyle_setForceStrutHeight)(a, b);
    };w._textStyle_create = function () {
      return (w._textStyle_create = F.textStyle_create)();
    };w._textStyle_copy = function (a) {
      return (w._textStyle_copy = F.textStyle_copy)(a);
    };w._textStyle_dispose = function (a) {
      return (w._textStyle_dispose = F.textStyle_dispose)(a);
    };w._textStyle_setColor = function (a, b) {
      return (w._textStyle_setColor = F.textStyle_setColor)(a, b);
    };
    w._textStyle_setDecoration = function (a, b) {
      return (w._textStyle_setDecoration = F.textStyle_setDecoration)(a, b);
    };w._textStyle_setDecorationColor = function (a, b) {
      return (w._textStyle_setDecorationColor = F.textStyle_setDecorationColor)(a, b);
    };w._textStyle_setDecorationStyle = function (a, b) {
      return (w._textStyle_setDecorationStyle = F.textStyle_setDecorationStyle)(a, b);
    };w._textStyle_setDecorationThickness = function (a, b) {
      return (w._textStyle_setDecorationThickness = F.textStyle_setDecorationThickness)(a, b);
    };
    w._textStyle_setFontStyle = function (a, b, c) {
      return (w._textStyle_setFontStyle = F.textStyle_setFontStyle)(a, b, c);
    };w._textStyle_setTextBaseline = function (a, b) {
      return (w._textStyle_setTextBaseline = F.textStyle_setTextBaseline)(a, b);
    };w._textStyle_clearFontFamilies = function (a) {
      return (w._textStyle_clearFontFamilies = F.textStyle_clearFontFamilies)(a);
    };w._textStyle_addFontFamilies = function (a, b, c) {
      return (w._textStyle_addFontFamilies = F.textStyle_addFontFamilies)(a, b, c);
    };w._textStyle_setFontSize = function (a, b) {
      return (w._textStyle_setFontSize = F.textStyle_setFontSize)(a, b);
    };
    w._textStyle_setLetterSpacing = function (a, b) {
      return (w._textStyle_setLetterSpacing = F.textStyle_setLetterSpacing)(a, b);
    };w._textStyle_setWordSpacing = function (a, b) {
      return (w._textStyle_setWordSpacing = F.textStyle_setWordSpacing)(a, b);
    };w._textStyle_setHeight = function (a, b) {
      return (w._textStyle_setHeight = F.textStyle_setHeight)(a, b);
    };w._textStyle_setHalfLeading = function (a, b) {
      return (w._textStyle_setHalfLeading = F.textStyle_setHalfLeading)(a, b);
    };w._textStyle_setLocale = function (a, b) {
      return (w._textStyle_setLocale = F.textStyle_setLocale)(a, b);
    };
    w._textStyle_setBackground = function (a, b) {
      return (w._textStyle_setBackground = F.textStyle_setBackground)(a, b);
    };w._textStyle_setForeground = function (a, b) {
      return (w._textStyle_setForeground = F.textStyle_setForeground)(a, b);
    };w._textStyle_addShadow = function (a, b, c, e, f) {
      return (w._textStyle_addShadow = F.textStyle_addShadow)(a, b, c, e, f);
    };w._textStyle_addFontFeature = function (a, b, c) {
      return (w._textStyle_addFontFeature = F.textStyle_addFontFeature)(a, b, c);
    };w._textStyle_setFontVariations = function (a, b, c, e) {
      return (w._textStyle_setFontVariations = F.textStyle_setFontVariations)(a, b, c, e);
    };
    w._vertices_create = function (a, b, c, e, f, g, l) {
      return (w._vertices_create = F.vertices_create)(a, b, c, e, f, g, l);
    };w._vertices_dispose = function (a) {
      return (w._vertices_dispose = F.vertices_dispose)(a);
    };var fb = w._pthread_self = function () {
      return (fb = w._pthread_self = F.pthread_self)();
    },
        _pb = function pb(a) {
      return (_pb = F.malloc)(a);
    };w.__emscripten_tls_init = function () {
      return (w.__emscripten_tls_init = F._emscripten_tls_init)();
    };var cd = w.__emscripten_thread_init = function (a, b, c, e, f, g) {
      return (cd = w.__emscripten_thread_init = F._emscripten_thread_init)(a, b, c, e, f, g);
    };
    w.__emscripten_thread_crashed = function () {
      return (w.__emscripten_thread_crashed = F._emscripten_thread_crashed)();
    };
    var _jc = function jc(a, b, c, e) {
      return (_jc = F._emscripten_run_in_main_runtime_thread_js)(a, b, c, e);
    },
        _db = function db(a) {
      return (_db = F._emscripten_thread_free_data)(a);
    },
        jb = w.__emscripten_thread_exit = function (a) {
      return (jb = w.__emscripten_thread_exit = F._emscripten_thread_exit)(a);
    },
        wb = w.__emscripten_check_mailbox = function () {
      return (wb = w.__emscripten_check_mailbox = F._emscripten_check_mailbox)();
    },
        _Z = function Z(a, b) {
      return (_Z = F.setThrew)(a, b);
    },
        _ib = function ib(a, b) {
      return (_ib = F.emscripten_stack_set_limits)(a, b);
    },
        _N = function N() {
      return (_N = F.stackSave)();
    },
        _M = function M(a) {
      return (_M = F.stackRestore)(a);
    },
        Cb = w.stackAlloc = function (a) {
      return (Cb = w.stackAlloc = F.stackAlloc)(a);
    };
    function ed(a, b, c) {
      var e = _N();try {
        return G.get(a)(b, c);
      } catch (f) {
        _M(e);if (f !== f + 0) throw f;_Z(1, 0);
      }
    }function kd(a, b, c) {
      var e = _N();try {
        G.get(a)(b, c);
      } catch (f) {
        _M(e);if (f !== f + 0) throw f;_Z(1, 0);
      }
    }function dd(a, b) {
      var c = _N();try {
        return G.get(a)(b);
      } catch (e) {
        _M(c);if (e !== e + 0) throw e;_Z(1, 0);
      }
    }function ld(a, b, c, e) {
      var f = _N();try {
        G.get(a)(b, c, e);
      } catch (g) {
        _M(f);if (g !== g + 0) throw g;_Z(1, 0);
      }
    }function fd(a, b, c, e) {
      var f = _N();try {
        return G.get(a)(b, c, e);
      } catch (g) {
        _M(f);if (g !== g + 0) throw g;_Z(1, 0);
      }
    }
    function md(a, b, c, e, f) {
      var g = _N();try {
        G.get(a)(b, c, e, f);
      } catch (l) {
        _M(g);if (l !== l + 0) throw l;_Z(1, 0);
      }
    }function nd(a, b, c, e, f, g, l, n) {
      var r = _N();try {
        G.get(a)(b, c, e, f, g, l, n);
      } catch (u) {
        _M(r);if (u !== u + 0) throw u;_Z(1, 0);
      }
    }function jd(a, b) {
      var c = _N();try {
        G.get(a)(b);
      } catch (e) {
        _M(c);if (e !== e + 0) throw e;_Z(1, 0);
      }
    }function hd(a, b, c, e, f, g, l) {
      var n = _N();try {
        return G.get(a)(b, c, e, f, g, l);
      } catch (r) {
        _M(n);if (r !== r + 0) throw r;_Z(1, 0);
      }
    }
    function gd(a, b, c, e, f) {
      var g = _N();try {
        return G.get(a)(b, c, e, f);
      } catch (l) {
        _M(g);if (l !== l + 0) throw l;_Z(1, 0);
      }
    }w.keepRuntimeAlive = Ka;w.wasmMemory = d;w.wasmExports = F;
    w.addFunction = function (a, b) {
      if (!Wc) {
        Wc = new WeakMap();var c = G.length;if (Wc) for (var e = 0; e < 0 + c; e++) {
          var f = G.get(e);f && Wc.set(f, e);
        }
      }if (c = Wc.get(a) || 0) return c;if (Xc.length) c = Xc.pop();else {
        try {
          G.grow(1);
        } catch (n) {
          if (!(n instanceof RangeError)) throw n;throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
        }c = G.length - 1;
      }try {
        G.set(c, a);
      } catch (n) {
        if (!(n instanceof TypeError)) throw n;if ("function" == typeof WebAssembly.Function) {
          e = WebAssembly.Function;f = { i: "i32", j: "i64", f: "f32", d: "f64", p: "i32" };for (var g = { parameters: [],
            results: "v" == b[0] ? [] : [f[b[0]]] }, l = 1; l < b.length; ++l) {
            g.parameters.push(f[b[l]]);
          }b = new e(g, a);
        } else {
          e = [1];f = b.slice(0, 1);b = b.slice(1);g = { i: 127, p: 127, j: 126, f: 125, d: 124 };e.push(96);l = b.length;128 > l ? e.push(l) : e.push(l % 128 | 128, l >> 7);for (l = 0; l < b.length; ++l) {
            e.push(g[b[l]]);
          }"v" == f ? e.push(0) : e.push(1, g[f]);b = [0, 97, 115, 109, 1, 0, 0, 0, 1];f = e.length;128 > f ? b.push(f) : b.push(f % 128 | 128, f >> 7);b.push.apply(b, e);b.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);b = new WebAssembly.Module(new Uint8Array(b));b = new WebAssembly.Instance(b, { e: { f: a } }).exports.f;
        }G.set(c, b);
      }Wc.set(a, c);return c;
    };w.ExitStatus = Va;w.PThread = I;var pd;Ma = function qd() {
      pd || rd();pd || (Ma = qd);
    };
    function rd() {
      function a() {
        if (!pd && (pd = !0, w.calledRun = !0, !Ba)) {
          A || hb(Ha);ja(w);if (w.onRuntimeInitialized) w.onRuntimeInitialized();if (!A) {
            if (w.postRun) for ("function" == typeof w.postRun && (w.postRun = [w.postRun]); w.postRun.length;) {
              var b = w.postRun.shift();Ia.unshift(b);
            }hb(Ia);
          }
        }
      }if (!(0 < H)) if (A) ja(w), A || hb(Ha), startWorker(w);else {
        if (w.preRun) for ("function" == typeof w.preRun && (w.preRun = [w.preRun]); w.preRun.length;) {
          Ga.unshift(w.preRun.shift());
        }hb(Ga);0 < H || (w.setStatus ? (w.setStatus("Running..."), setTimeout(function () {
          setTimeout(function () {
            w.setStatus("");
          }, 1);a();
        }, 1)) : a());
      }
    }if (w.preInit) for ("function" == typeof w.preInit && (w.preInit = [w.preInit]); 0 < w.preInit.length;) {
      w.preInit.pop()();
    }rd();

    return moduleArg.ready;
  };
}();
if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object') module.exports = skwasm;else if (typeof define === 'function' && define['amd']) define([], function () {
  return skwasm;
});
//# sourceMappingURL=skwasm.js.map