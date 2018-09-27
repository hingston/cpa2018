angular.module("kwikeShop", ["ngRoute", "ngCookies", "ngTouch", "ngAnimate", "ngFileUpload", "ui.bootstrap", "pascalprecht.translate", "btford.socket-io", "ngclipboard", "base64", "monospaced.qrcode"]), angular.module("kwikeShop").factory("authInterceptor", ["$rootScope", "$q", "$cookies", function(e, t, o) {
    "use strict";
    return {
        request: function(e) {
            return e.headers = e.headers || {}, o.get("token") && (e.headers.Authorization = "Bearer " + o.get("token")), e
        },
        response: function(e) {
            return e || t.when(e)
        }
    }
}]), angular.module("kwikeShop").factory("rememberMeInterceptor", ["$rootScope", "$q", "$cookies", function(e, t, o) {
    "use strict";
    return {
        request: function(e) {
            return e.headers = e.headers || {}, o.get("email") && (e.headers["X-User-Email"] = o.get("email")), e
        },
        response: function(e) {
            return e || t.when(e)
        }
    }
}]), angular.module("kwikeShop").factory("socket", ["socketFactory", function(e) {
    return e()
}]), angular.module("kwikeShop").config(["$httpProvider", function(e) {
    "use strict";
    e.interceptors.push("authInterceptor"), e.interceptors.push("rememberMeInterceptor")
}]), angular.module("kwikeShop").run(["$cookies", "$rootScope", function(e, t) {
    "use strict";
    t.isLoggedIn = function() {
        return e.get("token")
    }
}]), angular.module("kwikeShop").config(["$translateProvider", function(e) {
    "use strict";
    e.useStaticFilesLoader({
        prefix: "/i18n/",
        suffix: ".json"
    }), e.determinePreferredLanguage(), e.fallbackLanguage("en"), e.useSanitizeValueStrategy(null)
}]), angular.module("kwikeShop").config(["$qProvider", function(e) {
    e.errorOnUnhandledRejections(!1)
}]), angular.module("kwikeShop").config(["$locationProvider", function(e) {
    e.hashPrefix("")
}]), angular.module("kwikeShop").filter("emailName", function() {
    return function(e) {
        return e.split("@")[0].split(".").join(" ")
    }
}), angular.module("kwikeShop").controller("AboutController", ["$scope", "ConfigurationService", function(t, e) {
    t.twitterUrl = null, t.facebookUrl = null, e.getApplicationConfiguration().then(function(e) {
        e && e.application && (null !== e.application.twitterUrl && (t.twitterUrl = e.application.twitterUrl), null !== e.application.facebookUrl && (t.facebookUrl = e.application.facebookUrl))
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").controller("AdministrationController", [function() {}]), angular.module("kwikeShop").controller("BasketController", ["$scope", "$sce", "$window", "$translate", "$uibModal", "BasketService", "UserService", "ConfigurationService", function(o, n, t, r, e, a, i, c) {
    "use strict";

    function l() {
        a.find(t.sessionStorage.bid).then(function(e) {
            o.products = e.Products;
            for (var t = 0; t < o.products.length; t++) o.products[t].description = n.trustAsHtml(o.products[t].description)
        }).catch(function(e) {
            console.log(e)
        })
    }

    function s(o, n) {
        a.get(o).then(function(e) {
            var t = e.quantity + n;
            a.put(o, {
                quantity: t < 1 ? 1 : t
            }).then(function() {
                l()
            }).catch(function(e) {
                console.log(e)
            })
        }).catch(function(e) {
            console.log(e)
        })
    }
    i.whoAmI().then(function(e) {
        o.userEmail = e.email || "anonymous"
    }).catch(angular.noop), o.couponPanelExpanded = !!t.localStorage.couponPanelExpanded && JSON.parse(t.localStorage.couponPanelExpanded), o.paymentPanelExpanded = !!t.localStorage.paymentPanelExpanded && JSON.parse(t.localStorage.paymentPanelExpanded), o.toggleCoupon = function() {
        t.localStorage.couponPanelExpanded = JSON.stringify(o.couponPanelExpanded)
    }, o.togglePayment = function() {
        t.localStorage.paymentPanelExpanded = JSON.stringify(o.paymentPanelExpanded)
    }, l(), o.delete = function(e) {
        a.del(e).then(function() {
            l()
        }).catch(function(e) {
            console.log(e)
        })
    }, o.applyCoupon = function() {
        a.applyCoupon(t.sessionStorage.bid, o.coupon).then(function(e) {
            o.coupon = void 0, r("DISCOUNT_APPLIED", {
                discount: e
            }).then(function(e) {
                o.confirmation = e
            }, function(e) {
                o.confirmation = e
            }).catch(angular.noop), o.error = void 0, o.form.$setPristine()
        }).catch(function(e) {
            o.confirmation = void 0, o.error = "Sorry, that coupon code is invalid.", o.form.$setPristine()
        })
    }, o.checkout = function() {
        a.checkout(t.sessionStorage.bid).then(function(e) {
            t.location.replace(e)
        }).catch(function(e) {
            console.log(e)
        })
    }, o.inc = function(e) {
        s(e, 1)
    }, o.dec = function(e) {
        s(e, -1)
    }, o.showBitcoinQrCode = function() {
        e.open({
            templateUrl: "views/QrCode.html",
            controller: "QrCodeController",
            size: "md",
            resolve: {
                data: function() {
                    return "bitcoin:1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm"
                },
                url: function() {
                    return "/redirect?to=https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm"
                },
                address: function() {
                    return "1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm"
                },
                title: function() {
                    return "TITLE_BITCOIN_ADDRESS"
                }
            }
        })
    }, o.showDashQrCode = function() {
        e.open({
            templateUrl: "views/QrCode.html",
            controller: "QrCodeController",
            size: "md",
            resolve: {
                data: function() {
                    return "dash:Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW"
                },
                url: function() {
                    return "/redirect?to=https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW"
                },
                address: function() {
                    return "Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW"
                },
                title: function() {
                    return "TITLE_DASH_ADDRESS"
                }
            }
        })
    }, o.showEtherQrCode = function() {
        e.open({
            templateUrl: "views/QrCode.html",
            controller: "QrCodeController",
            size: "md",
            resolve: {
                data: function() {
                    return "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6"
                },
                url: function() {
                    return "https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6"
                },
                address: function() {
                    return "0x0f933ab9fCAAA782D0279C300D73750e1311EAE6"
                },
                title: function() {
                    return "TITLE_ETHER_ADDRESS"
                }
            }
        })
    }, o.twitterUrl = null, o.facebookUrl = null, o.applicationName = "Kwik-E-Mart Online", c.getApplicationConfiguration().then(function(e) {
        e && e.application && (null !== e.application.twitterUrl && (o.twitterUrl = e.application.twitterUrl), null !== e.application.facebookUrl && (o.facebookUrl = e.application.facebookUrl), null !== e.application.name && (o.applicationName = e.application.name))
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").controller("ChallengeController", ["$scope", "$sce", "$translate", "$cookies", "$uibModal", "$window", "ChallengeService", "ConfigurationService", "socket", function(i, t, e, o, n, r, a, c, l) {
    "use strict";
    i.scoreBoardTablesExpanded = r.localStorage.scoreBoardTablesExpanded ? JSON.parse(r.localStorage.scoreBoardTablesExpanded) : [null, !0, !1, !1, !1, !1, !1], i.offsetValue = ["100%", "100%", "100%", "100%", "100%", "100%"], i.toggleDifficulty = function() {
        r.localStorage.scoreBoardTablesExpanded = JSON.stringify(i.scoreBoardTablesExpanded)
    }, c.getApplicationConfiguration().then(function(e) {
        i.allowRepeatNotifications = e.application.showChallengeSolvedNotifications && e.ctf.showFlagsInNotifications, i.showChallengeHints = e.application.showChallengeHints
    }).catch(angular.noop), i.repeatNotification = function(e) {
        i.allowRepeatNotifications && a.repeatNotification(encodeURIComponent(e.name)).then(function() {
            r.scrollTo(0, 0)
        }).catch(angular.noop)
    }, i.openHint = function(e) {
        i.showChallengeHints && e.hintUrl && r.open(e.hintUrl, "_blank")
    }, i.trustDescriptionHtml = function() {
        for (var e = 0; e < i.challenges.length; e++) i.challenges[e].description = t.trustAsHtml(i.challenges[e].description)
    }, i.calculateProgressPercentage = function() {
        for (var e = 0, t = 0; t < i.challenges.length; t++) e += i.challenges[t].solved ? 1 : 0;
        i.percentChallengesSolved = (100 * e / i.challenges.length).toFixed(0), 75 < i.percentChallengesSolved ? i.completionColor = "success" : 25 < i.percentChallengesSolved ? i.completionColor = "warning" : i.completionColor = "danger"
    }, i.setOffset = function(e) {
        for (var t = 1; t <= 6; t++) {
            for (var o = 0, n = 0, r = 0; r < e.length; r++) e[r].difficulty === t && (n++, e[r].solved && o++);
            var a = Math.round(100 * o / n);
            a = +(a = 100 - a) + "%", i.offsetValue[t - 1] = a
        }
    }, a.find().then(function(e) {
        i.challenges = e;
        for (var t = 0; t < i.challenges.length; t++) i.challenges[t].hintUrl && (i.challenges[t].hint ? i.challenges[t].hint += " Click for more hints." : i.challenges[t].hint = "Click to open hints.");
        i.trustDescriptionHtml(), i.calculateProgressPercentage(), i.setOffset(e)
    }).catch(function(e) {
        console.log(e)
    }), l.on("challenge solved", function(e) {
        if (e && e.challenge) {
            for (var t = 0; t < i.challenges.length; t++)
                if (i.challenges[t].name === e.name) {
                    i.challenges[t].solved = !0;
                    break
                }
            i.calculateProgressPercentage(), i.setOffset(i.challenges)
        }
    })
}]), angular.module("kwikeShop").controller("ChallengeSolvedNotificationController", ["$scope", "$rootScope", "$translate", "$cookies", "socket", "ConfigurationService", "ChallengeService", "CountryMappingService", function(n, t, e, o, r, a, i, c) {
    "use strict";
    n.notifications = [], n.closeNotification = function(e) {
        n.notifications.splice(e, 1)
    }, n.showNotification = function(o) {
        e("CHALLENGE_SOLVED", {
            challenge: o.challenge
        }).then(function(e) {
            return e
        }, function(e) {
            return e
        }).then(function(e) {
            var t;
            n.showCtfCountryDetailsInNotifications && "none" !== n.showCtfCountryDetailsInNotifications && (t = n.countryMap[o.key]), n.notifications.push({
                message: e,
                flag: o.flag,
                country: t,
                copied: !1
            })
        }).catch(angular.noop)
    }, n.saveProgress = function() {
        i.continueCode().then(function(e) {
            if (!e) throw new Error("Received invalid continue code from the sever!");
            var t = new Date;
            t.setDate(t.getDate() + 30), o.put("continueCode", e, {
                expires: t
            })
        }).catch(function(e) {
            console.log(e)
        })
    }, r.on("challenge solved", function(e) {
        e && e.challenge && (e.hidden || n.showNotification(e), e.isRestore || n.saveProgress(), "Score Board" === e.name && t.$emit("score_board_challenge_solved"), r.emit("notification received", e.flag))
    }), a.getApplicationConfiguration().then(function(e) {
        e && e.ctf && (null !== e.ctf.showFlagsInNotifications ? n.showCtfFlagsInNotifications = e.ctf.showFlagsInNotifications : n.showCtfFlagsInNotifications = !1, e.ctf.showCountryDetailsInNotifications ? (n.showCtfCountryDetailsInNotifications = e.ctf.showCountryDetailsInNotifications, "none" !== e.ctf.showCountryDetailsInNotifications && c.getCountryMapping().then(function(e) {
            n.countryMap = e
        }).catch(function(e) {
            console.log(e)
        })) : n.showCtfCountryDetailsInNotifications = "none")
    }, function(e) {
        console.log(e)
    }).catch(angular.noop)
}]), angular.module("kwikeShop").controller("ChangePasswordController", ["$scope", "$location", "UserService", function(t, e, o) {
    "use strict";

    function n() {
        t.currentPassword = void 0, t.newPassword = void 0, t.newPasswordRepeat = void 0, t.form.$setPristine()
    }
    t.changePassword = function() {
        o.changePassword({
            current: t.currentPassword,
            new: t.newPassword,
            repeat: t.newPasswordRepeat
        }).then(function() {
            t.error = void 0, t.confirmation = "Your password was successfully changed.", n()
        }).catch(function(e) {
            t.error = e, t.confirmation = void 0, n()
        })
    }
}]), angular.module("kwikeShop").controller("ComplaintController", ["$scope", "Upload", "ComplaintService", "UserService", function(e, t, o, n) {}]), angular.module("kwikeShop").controller("ContactController", ["$scope", "FeedbackService", "UserService", "CaptchaService", function(t, e, o, n) {
    "use strict";

    function r() {
        n.getCaptcha().then(function(e) {
            t.captcha = e.captcha, t.captchaId = e.captchaId
        }).catch(angular.noop)
    }
    o.whoAmI().then(function(e) {
        t.feedback = {}, t.feedback.UserId = e.id, t.userEmail = e.email || "anonymous"
    }).catch(angular.noop), r(), t.save = function() {
        t.feedback.captchaId = t.captchaId, e.save(t.feedback).then(function(e) {
            t.error = null, t.confirmation = "Thank you for your feedback" + (5 === e.rating ? " and your 5-star rating!" : "."), t.feedback = {}, r(), t.form.$setPristine()
        }).catch(function(e) {
            t.error = e, t.confirmation = null, t.feedback = {}, r(), t.form.$setPristine()
        })
    }
}]), angular.module("kwikeShop").controller("FeedbackController", ["$scope", "$sce", "FeedbackService", function(o, n, t) {
    "use strict";
    o.interval = 5e3, o.noWrapSlides = !1, o.active = 0;
    var r = ["public/images/carousel/1.jpg", "public/images/carousel/2.jpg", "public/images/carousel/3.jpg", "public/images/carousel/4.jpg", "public/images/carousel/5.jpg", "public/images/carousel/6.jpg", "public/images/carousel/7.jpg"];

    function a() {
        t.find().then(function(e) {
            o.feedbacks = e;
            for (var t = 0; t < o.feedbacks.length; t++) o.feedbacks[t].comment = n.trustAsHtml(o.feedbacks[t].comment), o.feedbacks[t].image = r[t % r.length]
        }).catch(function(e) {
            console.log(e)
        })
    }
    a(), o.delete = function(e) {
        t.del(e).then(function() {
            a()
        }).catch(function(e) {
            console.log(e)
        })
    }
}]), angular.module("kwikeShop").controller("ForgotPasswordController", ["$scope", "$location", "UserService", "SecurityQuestionService", function(t, e, o, n) {
    "use strict";

    function r() {
        t.email = void 0, t.securityQuestion = void 0, t.securityAnswer = void 0, t.newPassword = void 0, t.newPasswordRepeat = void 0, t.form.$setPristine()
    }
    t.findSecurityQuestion = function() {
        t.securityQuestion = void 0, t.email && n.findBy(t.email).then(function(e) {
            t.securityQuestion = e.question
        }).catch(angular.noop)
    }, t.resetPassword = function() {
        o.resetPassword({
            email: t.email,
            answer: t.securityAnswer,
            new: t.newPassword,
            repeat: t.newPasswordRepeat
        }).then(function() {
            t.error = void 0, t.confirmation = "Your password was successfully changed.", r()
        }).catch(function(e) {
            t.error = e, t.confirmation = void 0, r()
        })
    }
}]), angular.module("kwikeShop").controller("LanguageController", ["$scope", "$cookies", "$translate", function(e, t, o) {
    "use strict";
    if (t.get("language")) {
        var n = t.get("language");
        o.use(n)
    }
    e.languages = languages, e.changeLanguage = function(e) {
        o.use(e), t.put("language", e)
    }
}]);
var languages = [{
    key: "ar_SA",
    icon: "ae",
    lang: "عربى",
    isFlask: !0
}, {
    key: "cs_CZ",
    icon: "cz",
    lang: "Česky",
    isFlask: !0
}, {
    key: "da_DK",
    icon: "dk",
    lang: "Dansk",
    isFlask: !0
}, {
    key: "de_DE",
    icon: "de",
    lang: "Deutsch"
}, {
    key: "el_GR",
    icon: "gr",
    lang: "Ελληνικά",
    isFlask: !0
}, {
    key: "es_ES",
    icon: "es",
    lang: "Español",
    isFlask: !0
}, {
    key: "et_EE",
    icon: "ee",
    lang: "Eesti"
}, {
    key: "fi_FI",
    icon: "fi",
    lang: "Suomalainen",
    isFlask: !0
}, {
    key: "fr_FR",
    icon: "fr",
    lang: "Français"
}, {
    key: "he_IL",
    icon: "il",
    lang: "עברי"
}, {
    key: "hi_IN",
    icon: "in",
    lang: "हिंदी"
}, {
    key: "hu_HU",
    icon: "hu",
    lang: "Magyar",
    isFlask: !0
}, {
    key: "id_ID",
    icon: "id",
    lang: "Bahasa Indonesia"
}, {
    key: "it_IT",
    icon: "it",
    lang: "Italiano",
    isFlask: !0
}, {
    key: "ja_JP",
    icon: "jp",
    lang: "日本の",
    isFlask: !0
}, {
    key: "lt_LT",
    icon: "lt",
    lang: "Lietuviešu",
    isFlask: !0
}, {
    key: "lv_LV",
    icon: "lv",
    lang: "Latvijas",
    isFlask: !0
}, {
    key: "my_MM",
    icon: "mm",
    lang: "ျမန္မာ",
    isFlask: !0
}, {
    key: "nl_NL",
    icon: "nl",
    lang: "Nederlands"
}, {
    key: "no_NO",
    icon: "no",
    lang: "Norsk"
}, {
    key: "pl_PL",
    icon: "pl",
    lang: "Język Polski"
}, {
    key: "pt_PT",
    icon: "pt",
    lang: "Português",
    isFlask: !0
}, {
    key: "pt_BR",
    icon: "br",
    lang: "Português (Brasil)",
    isFlask: !0
}, {
    key: "ro_RO",
    icon: "ro",
    lang: "Românesc"
}, {
    key: "ru_RU",
    icon: "ru",
    lang: "Pусский",
    isFlask: !0
}, {
    key: "sv_SE",
    icon: "se",
    lang: "Svenska"
}, {
    key: "tr_TR",
    icon: "tr",
    lang: "Türkçe"
}, {
    key: "ur_PK",
    icon: "pk",
    lang: "اردو"
}, {
    key: "zh_CN",
    icon: "cn",
    lang: "中国"
}, {
    key: "zh_HK",
    icon: "hk",
    lang: "繁體中文"
}];
angular.module("kwikeShop").controller("LoginController", ["$scope", "$rootScope", "$window", "$location", "$cookies", "UserService", function(t, o, n, r, a, e) {
    "use strict";
    var i = a.get("email");
    i ? (t.user = {}, t.user.email = i, t.rememberMe = !0) : t.rememberMe = !1, t.login = function() {
        e.login(t.user).then(function(e) {
            a.put("token", e.token), n.sessionStorage.bid = e.bid, o.$emit("user_logged_in"), r.path("/")
        }).catch(function(e) {
            a.remove("token"), delete n.sessionStorage.bid, t.error = e, t.form.$setPristine()
        }), t.rememberMe ? a.put("email", t.user.email) : a.remove("email")
    }, t.googleLogin = function() {
        n.location.replace(c + "?client_id=" + l + "&response_type=token&scope=email&redirect_uri=" + s[u])
    };
    var c = "https://accounts.google.com/o/oauth2/v2/auth",
        l = "1005568560502-6hm16lef8oh46hr2d98vf2ohlnj4nfhq.apps.googleusercontent.com",
        s = {
            "http://localhost:3000": "http://localhost:3000"
        },
        u = r.protocol() + "://" + location.host;
    t.oauthUnavailable = !s[u], t.oauthUnavailable && console.log(u + " is not an authorized redirect URI for this application.")
}]), angular.module("kwikeShop").controller("LogoutController", ["$rootScope", "$cookies", "$window", "$location", function(e, t, o, n) {
    "use strict";
    t.remove("token"), delete o.sessionStorage.bid, e.$emit("user_logged_out"), n.path("/")
}]), angular.module("kwikeShop").controller("NavbarController", ["$scope", "$rootScope", "$location", "AdministrationService", "ConfigurationService", "UserService", "ChallengeService", function(t, o, e, n, r, a, i) {
    "use strict";

    function c() {
        a.whoAmI().then(function(e) {
            o.userEmail = e.email
        }).catch(function(e) {
            console.log(e)
        })
    }
    t.version = "", n.getApplicationVersion().then(function(e) {
        e && (t.version = "v" + e)
    }).catch(function(e) {
        console.log(e)
    }), o.applicationName = "OWASP Juice Shop", o.gitHubRibbon = "orange", r.getApplicationConfiguration().then(function(e) {
        e && e.application && null !== e.application.name && (o.applicationName = e.application.name), e && e.application && null !== e.application.gitHubRibbon && (o.gitHubRibbon = "none" !== e.application.gitHubRibbon ? e.application.gitHubRibbon : null)
    }).catch(function(e) {
        console.log(e)
    }), e.search().gitHubRibbon && (o.gitHubRibbon = e.search().gitHubRibbon), o.userEmail = "", c(), o.$on("user_logged_in", function() {
        c()
    }), o.$on("user_logged_out", function() {
        o.userEmail = ""
    }), o.scoreBoardMenuVisible = !1
}]), angular.module("kwikeShop").controller("ProductDetailsController", ["$scope", "$sce", "$q", "$uibModal", "ProductService", "ProductReviewService", "UserService", "id", function(r, a, e, t, o, n, i, c) {
    "use strict";
    e.all([o.get(c), n.get(c), i.whoAmI()]).then(function(e) {
        var t = e[0],
            o = e[1],
            n = e[2];
        r.product = t, r.product.description = a.trustAsHtml(r.product.description), r.productReviews = o, n && n.email ? r.author = n.email : r.author = "Anonymous"
    }).catch(function(e) {
        console.log(e)
    }), r.addReview = function() {
        var e = {
            message: r.message,
            author: r.author
        };
        r.productReviews.push(e), n.create(c, e)
    }, r.refreshReviews = function() {
        n.get(c).then(function(e) {
            r.productReviews = e
        }).catch(angular.noop)
    }, r.editReview = function(e) {
        t.open({
            templateUrl: "views/ProductReviewEdit.html",
            controller: "ProductReviewEditController",
            bindings: {
                resolve: "<",
                close: "&",
                dismiss: "&"
            },
            size: "lg",
            resolve: {
                review: function() {
                    return e
                }
            }
        }).result.then(function() {
            r.refreshReviews()
        }, function() {
            console.log("Cancelled")
        })
    }
}]), angular.module("kwikeShop").controller("ProductReviewEditController", ["$scope", "$uibModalInstance", "ProductReviewService", "review", function(t, e, o, n) {
    "use strict";
    t.id = n._id, t.message = n.message, t.editReview = function() {
        o.patch({
            id: t.id,
            message: t.message
        }).then(function() {
            e.close(t.message)
        }).catch(function(e) {
            console.log(e), t.err = e
        })
    }
}]), angular.module("kwikeShop").controller("QrCodeController", ["$scope", "data", "url", "address", "title", function(e, t, o, n, r) {
    e.data = t, e.url = o, e.address = n, e.title = r
}]), angular.module("kwikeShop").controller("RecycleController", ["$scope", "RecycleService", "UserService", "ConfigurationService", function(t, e, o, n) {
    "use strict";

    function r() {
        o.whoAmI().then(function(e) {
            t.recycle = {}, t.recycle.UserId = e.id, t.userEmail = e.email
        }).catch(angular.noop)
    }
    n.getApplicationConfiguration().then(function(e) {
        e && e.application && e.application.recyclePage && (t.topImage = "/public/images/products/" + e.application.recyclePage.topProductImage, t.bottomImage = "/public/images/products/" + e.application.recyclePage.bottomProductImage)
    }).catch(angular.noop), r(), t.save = function() {
        e.save(t.recycle).then(function(e) {
            t.confirmation = "Thank you for using our recycling service. We will " + (e.isPickup ? "pick up your pomace on " + e.pickupDate : "deliver your recycle box asap") + ".", r(), t.form.$setPristine()
        })
    }, e.find().then(function(e) {
        t.recycles = e
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").controller("RegisterController", ["$scope", "$location", "UserService", "SecurityQuestionService", "SecurityAnswerService", function(t, o, e, n, r) {
    "use strict";
    n.find().then(function(e) {
        t.securityQuestions = e
    }).catch(function(e) {
        console.log(e)
    }), t.save = function() {
        e.save(t.user).then(function(e) {
            r.save({
                UserId: e.id,
                answer: t.user.securityAnswer,
                SecurityQuestionId: t.user.securityQuestion.id
            }).then(function() {
                t.user = {}, o.path("/login")
            })
        }).catch(angular.noop)
    }
}]), angular.module("kwikeShop").controller("SearchController", ["$scope", "$location", function(e, t) {
    "use strict";
    e.search = function() {
        t.path("/search").search({
            q: e.searchQuery || ""
        })
    }
}]), angular.module("kwikeShop").controller("SearchResultController", ["$scope", "$sce", "$window", "$uibModal", "$location", "$translate", "ProductService", "BasketService", function(a, o, i, t, e, c, l, s) {
    "use strict";
    a.showDetail = function(e) {
        t.open({
            templateUrl: "views/ProductDetail.html",
            controller: "ProductDetailsController",
            size: "lg",
            resolve: {
                id: function() {
                    return e
                }
            }
        })
    }, a.addToBasket = function(r) {
        s.find(i.sessionStorage.bid).then(function(e) {
            for (var t = e.Products, o = !1, n = 0; n < t.length; n++)
                if (t[n].id === r) {
                    o = !0, s.get(t[n].BasketItem.id).then(function(e) {
                        var t = e.quantity + 1;
                        s.put(e.id, {
                            quantity: t
                        }).then(function(e) {
                            l.get(e.ProductId).then(function(e) {
                                c("BASKET_ADD_SAME_PRODUCT", {
                                    product: e.name
                                }).then(function(e) {
                                    a.confirmation = e
                                }, function(e) {
                                    a.confirmation = e
                                }).catch(angular.noop)
                            }).catch(function(e) {
                                console.log(e)
                            })
                        }).catch(function(e) {
                            console.log(e)
                        })
                    }).catch(function(e) {
                        console.log(e)
                    });
                    break
                }
            o || s.save({
                ProductId: r,
                BasketId: i.sessionStorage.bid,
                quantity: 1
            }).then(function(e) {
                l.get(e.ProductId).then(function(e) {
                    c("BASKET_ADD_PRODUCT", {
                        product: e.name
                    }).then(function(e) {
                        a.confirmation = e
                    }, function(e) {
                        a.confirmation = e
                    }).catch(angular.noop)
                }).catch(function(e) {
                    console.log(e)
                })
            }).catch(function(e) {
                console.log(e)
            })
        }).catch(function(e) {
            console.log(e)
        })
    }, a.searchQuery = o.trustAsHtml(e.search().q), l.search(a.searchQuery).then(function(e) {
        a.products = e;
        for (var t = 0; t < a.products.length; t++) a.products[t].description = o.trustAsHtml(a.products[t].description)
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").controller("ServerStartedNotificationController", ["$scope", "$translate", "$cookies", "ChallengeService", "socket", function(e, t, o, n, r) {
    "use strict";
    e.hackingProgress = {}, e.closeNotification = function() {
        e.hackingProgress.autoRestoreMessage = null
    }, e.clearProgress = function() {
        o.remove("continueCode"), e.hackingProgress.cleared = !0
    }, r.on("server started", function() {})
}]), angular.module("kwikeShop").controller("SimpsonMailController", ["$rootScope", "$window", "$location", "$cookies", "$base64", "angular-md5", "UserService", function(t, o, r, n, a, i, c) {
    "use strict";

    function l(e) {
        c.login({
            email: e.email,
            password: i.createHash(a.encode("H4hgvh5GvG5lkcbo") + ":" + a.encode(e.email)),
            oauth: !0
        }).then(function(e) {
            n.put("token", e.token), o.sessionStorage.bid = e.bid, t.$emit("user_logged_in"), r.path("/")
        }).catch(function(e) {
            s(e), r.path("/login")
        })
    }

    function s(e) {
        console.log(e), n.remove("token"), delete o.sessionStorage.bid
    }
    c.oauthLogin(function() {
        for (var e = r.path().substr(1).split("&"), t = {}, o = 0; o < e.length; o++) {
            var n = e[o].split("=");
            t[n[0]] = n[1]
        }
        return t
    }().access_token).then(function(e) {
        c.save({
            email: e.email,
            password: i.createHash(a.encode("H4hgvh5GvG5lkcbo") + ":" + a.encode(e.email))
        }).then(function() {
            l(e)
        }).catch(function() {
            l(e)
        })
    }).catch(function(e) {
        s(e), r.path("/login")
    })
}]), angular.module("kwikeShop").controller("TokenSaleController", ["$scope", "ConfigurationService", function(t, e) {
    t.altcoinName = "Kwik-e-coin", e.getApplicationConfiguration().then(function(e) {
        e && e.application && null !== e.application.altcoinName && (t.altcoinName = e.application.altcoinName)
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").controller("TrackOrderController", ["$scope", "$location", function(e, t) {
    "use strict";
    e.save = function() {
        t.path("/track-result").search({
            id: e.orderId || ""
        })
    }
}]), angular.module("kwikeShop").controller("TrackResultController", ["$scope", "$sce", "$location", "TrackOrderService", function(t, o, e, n) {
    "use strict";
    t.orderId = e.search().id, n.save(t.orderId).then(function(e) {
        t.results = {}, t.results.orderNo = o.trustAsHtml(e.data[0].orderNo), t.results.email = e.data[0].email, t.results.totalPrice = e.data[0].totalPrice, t.results.products = e.data[0].products, t.results.eta = e.data[0].eta
    })
}]), angular.module("kwikeShop").controller("UserController", ["$scope", "$uibModal", "$sce", "UserService", function(o, t, n, e) {
    "use strict";
    e.find().then(function(e) {
        o.users = e;
        for (var t = 0; t < o.users.length; t++) o.users[t].email = n.trustAsHtml(o.users[t].email)
    }).catch(function(e) {
        console.log(e)
    }), o.showDetail = function(e) {
        t.open({
            templateUrl: "views/UserDetail.html",
            controller: "UserDetailsController",
            size: "lg",
            resolve: {
                id: function() {
                    return e
                }
            }
        })
    }
}]), angular.module("kwikeShop").controller("UserDetailsController", ["$scope", "$uibModal", "UserService", "id", function(t, e, o, n) {
    "use strict";
    o.get(n).then(function(e) {
        t.user = e
    }).catch(function(e) {
        console.log(e)
    })
}]), angular.module("kwikeShop").config(["$routeProvider", function($routeProvider) {
    "use strict";
    $routeProvider.when("/administration", {
        templateUrl: "views/Administration.html",
        controller: "AdministrationController"
    }), $routeProvider.when("/about", {
        templateUrl: "views/About.html",
        controller: "AboutController"
    }), $routeProvider.when("/contact", {
        templateUrl: "views/Contact.html",
        controller: "ContactController"
    }), $routeProvider.when("/login", {
        templateUrl: "views/Login.html",
        controller: "LoginController"
    }), $routeProvider.when("/register", {
        templateUrl: "views/Register.html",
        controller: "RegisterController"
    }), $routeProvider.when("/basket", {
        templateUrl: "views/Basket.html",
        controller: "BasketController"
    }), $routeProvider.when("/search", {
        templateUrl: "views/SearchResult.html",
        controller: "SearchResultController"
    }), $routeProvider.when("/logout", {
        templateUrl: "views/Logout.html",
        controller: "LogoutController"
    }), $routeProvider.when("/change-password", {
        templateUrl: "views/ChangePassword.html",
        controller: "ChangePasswordController"
    }), $routeProvider.when("/forgot-password", {
        templateUrl: "views/ForgotPassword.html",
        controller: "ForgotPasswordController"
    }), $routeProvider.when("/" + eval(atob("KGZ1bmN0aW9uICgpIHsNCiAgICB2YXIgTCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykNCiAgICB2YXIgRCA9IEwuc2hpZnQoKQ0KICAgIHJldHVybiBMLnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKEMsIEEpIHsNCiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKEMgLSBEIC0gNDUgLSBBKQ0KICAgIH0pLmpvaW4oJycpDQogIH0pKDI1LCAxODQsIDE3NCwgMTc5LCAxODIsIDE4NikgKyAoMzY2NjkpLnRvU3RyaW5nKDM2KS50b0xvd2VyQ2FzZSgpICsgKGZ1bmN0aW9uICgpIHsNCiAgICAgIHZhciBUID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKQ0KICAgICAgdmFyIE0gPSBULnNoaWZ0KCkNCiAgICAgIHJldHVybiBULnJldmVyc2UoKS5tYXAoZnVuY3Rpb24gKG0sIEgpIHsNCiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUobSAtIE0gLSAyNCAtIEgpDQogICAgICB9KS5qb2luKCcnKQ0KICAgIH0pKDEzLCAxNDQsIDg3LCAxNTIsIDEzOSwgMTQ0LCA4MywgMTM4KSArICgyMCkudG9TdHJpbmcoMzYpLnRvTG93ZXJDYXNlKCk=")), {
        templateUrl: "views/TokenSale.html",
        controller: "TokenSaleController"
    }), $routeProvider.when("/score-board", {
        templateUrl: "views/ScoreBoard.html",
        controller: "ChallengeController"
    }), $routeProvider.when("/complain", {
        templateUrl: "views/Complaint.html",
        controller: "ComplaintController"
    }), $routeProvider.when("/recycle", {
        templateUrl: "views/Recycle.html",
        controller: "RecycleController"
    }), $routeProvider.when("/track-order", {
        templateUrl: "views/TrackOrder.html",
        controller: "TrackOrderController"
    }), $routeProvider.when("/track-result", {
        templateUrl: "views/TrackResult.html",
        controller: "TrackResultController"
    }), $routeProvider.when("/access_token=:accessToken", {
        templateUrl: "views/OAuth.html",
        controller: "SimpsonMailController"
    }), $routeProvider.otherwise({
        redirectTo: "/search"
    })
}]), angular.module("kwikeShop").factory("AdministrationService", ["$http", "$q", function(e, o) {
    "use strict";
    return {
        getApplicationVersion: function() {
            var t = o.defer();
            return e.get("/rest/admin/application-version").then(function(e) {
                t.resolve(e.data.version)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("BasketService", ["$http", "$q", function(n, r) {
    "use strict";
    var a = "/api/BasketItems";
    return {
        find: function(e) {
            var t = r.defer();
            return n.get("/rest/basket/" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        get: function(e) {
            var t = r.defer();
            return n.get(a + "/" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        put: function(e, t) {
            var o = r.defer();
            return n.put(a + "/" + e, t).then(function(e) {
                o.resolve(e.data.data)
            }).catch(function(e) {
                o.reject(e.data)
            }), o.promise
        },
        del: function(e) {
            var t = r.defer();
            return n.delete(a + "/" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        save: function(e) {
            var t = r.defer();
            return n.post(a + "/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        checkout: function(e) {
            var t = r.defer();
            return n.post("/rest/basket/" + e + "/checkout").then(function(e) {
                t.resolve(e.data.orderConfirmation)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        applyCoupon: function(e, t) {
            var o = r.defer();
            return n.put("/rest/basket/" + e + "/coupon/" + t).then(function(e) {
                o.resolve(e.data.discount)
            }).catch(function(e) {
                o.reject(e.data)
            }), o.promise
        }
    }
}]), angular.module("kwikeShop").factory("CaptchaService", ["$http", "$q", function(e, o) {
    "use strict";
    return {
        getCaptcha: function() {
            var t = o.defer();
            return e.get("/rest/captcha/").then(function(e) {
                t.resolve(e.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("ChallengeService", ["$http", "$q", function(o, n) {
    "use strict";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get("/api/Challenges/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        repeatNotification: function(e) {
            return o.get("/rest/repeat-notification", {
                params: {
                    challenge: e
                }
            })
        },
        continueCode: function() {
            var t = n.defer();
            return o.get("/rest/continue-code").then(function(e) {
                t.resolve(e.data.continueCode)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        restoreProgress: function(e) {
            var t = n.defer();
            return o.put("/rest/continue-code/apply/" + e).then(function(e) {
                t.resolve(e.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("ComplaintService", ["$http", "$q", function(o, n) {
    "use strict";
    return {
        save: function(e) {
            var t = n.defer();
            return o.post("/api/Complaints/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("ConfigurationService", ["$http", "$q", function(e, o) {
    "use strict";
    return {
        getApplicationConfiguration: function() {
            var t = o.defer();
            return e.get("/rest/admin/application-configuration").then(function(e) {
                t.resolve(e.data.config)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("CountryMappingService", ["$http", "$q", function(e, o) {
    "use strict";
    return {
        getCountryMapping: function() {
            var t = o.defer();
            return e.get("/rest/country-mapping").then(function(e) {
                t.resolve(e.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("FeedbackService", ["$http", "$q", function(o, n) {
    "use strict";
    var r = "/api/Feedbacks";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get(r + "/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        save: function(e) {
            var t = n.defer();
            return o.post(r + "/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        del: function(e) {
            var t = n.defer();
            return o.delete(r + "/" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("ProductReviewService", ["$http", "$q", function(n, r) {
    "use strict";
    var a = "/rest/product";
    return {
        get: function(e) {
            var t = r.defer();
            return n.get(a + "/" + e + "/reviews").then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        create: function(e, t) {
            var o = r.defer();
            return n.put(a + "/" + e + "/reviews", t).then(function(e) {
                o.resolve(e.data.data)
            }).catch(function(e) {
                o.reject(e.data)
            }), o.promise
        },
        patch: function(e) {
            var t = r.defer();
            return n.patch(a + "/reviews", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("ProductService", ["$http", "$q", function(o, n) {
    "use strict";
    var r = "/api/Products";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get(r + "/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        get: function(e) {
            var t = n.defer();
            return o.get(r + "/" + e + "?d=" + encodeURIComponent((new Date).toDateString())).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        search: function(e) {
            var t = n.defer();
            return o.get("/rest/product/search?q=" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("RecycleService", ["$http", "$q", function(o, n) {
    "use strict";
    var r = "/api/Recycles";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get(r + "/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        save: function(e) {
            var t = n.defer();
            return o.post(r + "/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("SecurityAnswerService", ["$http", "$q", function(o, n) {
    "use strict";
    return {
        save: function(e) {
            var t = n.defer();
            return o.post("/api/SecurityAnswers/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("SecurityQuestionService", ["$http", "$q", function(o, n) {
    "use strict";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get("/api/SecurityQuestions/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        findBy: function(e) {
            var t = n.defer();
            return o.get("rest/user/security-question?email=" + e).then(function(e) {
                t.resolve(e.data.question)
            }).catch(function(e) {
                t.reject(e)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("TrackOrderService", ["$http", "$q", function(o, n) {
    "use strict";
    return {
        save: function(e) {
            var t = n.defer();
            return o.get("/rest/track-order?id=" + e).then(function(e) {
                t.resolve(e.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]), angular.module("kwikeShop").factory("UserService", ["$http", "$q", function(o, n) {
    "use strict";
    var r = "/api/Users";
    return {
        find: function(e) {
            var t = n.defer();
            return o.get("/rest/user/authentication-details/", {
                params: e
            }).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        get: function(e) {
            var t = n.defer();
            return o.get(r + "/" + e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        save: function(e) {
            var t = n.defer();
            return o.post(r + "/", e).then(function(e) {
                t.resolve(e.data.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        login: function(e) {
            var t = n.defer();
            return o.post("/rest/user/login", e).then(function(e) {
                t.resolve(e.data.authentication)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        changePassword: function(e) {
            var t = n.defer();
            return o.get("/rest/user/change-password?current=" + e.current + "&new=" + e.new + "&repeat=" + e.repeat).then(function(e) {
                t.resolve(e.data.user)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        resetPassword: function(e) {
            var t = n.defer();
            return o.post("/rest/user/reset-password", e).then(function(e) {
                t.resolve(e.data.user)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        whoAmI: function() {
            var t = n.defer();
            return o.get("/rest/user/whoami").then(function(e) {
                t.resolve(e.data.user)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        },
        oauthLogin: function(e) {
            var t = n.defer();
            return o.get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + e).then(function(e) {
                console.log("done: " + e.data), t.resolve(e.data)
            }).catch(function(e) {
                t.reject(e.data)
            }), t.promise
        }
    }
}]);