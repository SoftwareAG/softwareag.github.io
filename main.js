(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/4Oi":
/*!*****************************************************************************************!*\
  !*** ./src/services/IoTAnalytics/IoTAnalyticsDataService/iot-analytics-data.service.ts ***!
  \*****************************************************************************************/
/*! exports provided: IotAnalyticsDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IotAnalyticsDataService", function() { return IotAnalyticsDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../DataService/data.service */ "5o1m");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GitHubCacheService/git-hub-cache.service */ "i2k+");
/* harmony import */ var _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../GoogleAnalyticsService/google-analytics.service */ "uF5Q");








class IotAnalyticsDataService extends _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] {
    constructor(http, gitHubCacheService, gaService) {
        super();
        this.http = http;
        this.gitHubCacheService = gitHubCacheService;
        this.gaService = gaService;
        this.softwareAGGitHubTopics = this.topics.filter(topic => topic.page.includes(_DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"].CONST_IOT_ANALYTICS_PAGE));
        this.repositories = [
            { id: 'all-repositories', name: 'All repositories', topics: [] },
            { id: 'cumulocity-agent', name: 'cumulocity-agent', topics: ['cumulocity-agent'] },
            { id: 'microservice', name: 'microservice', topics: ['microservice'] },
            { id: 'widget', name: 'widget', topics: ['widget'] }
        ];
        this.currentSearchParameters$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            text: '',
            topic: 'all-topics',
            repository: 'all-repositories',
            page: 1,
            pageSize: 9
        });
        this.lastSearchResult$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    // Return Software AG Topics
    getTopics() {
        return Promise.resolve(this.softwareAGGitHubTopics);
    }
    // Return Repository Types
    getRepositoryTypes() {
        return Promise.resolve(this.repositories);
    }
    resetFilters() {
        this.updateSearchParameters({
            topic: 'all-topics',
            repository: 'all-repositories',
            page: 1,
        });
        this.searchWithCurrentParams().then();
    }
    updateSearchParameters(params, ignorePageReset = false) {
        const currentSearchParams = this.currentSearchParameters$.getValue();
        // If the filters exist and have been changed, reset the page to page 1
        if (!ignorePageReset &&
            ((params.text && params.text !== currentSearchParams.text) ||
                (params.topic && params.topic !== currentSearchParams.topic) ||
                (params.repository && params.repository !== currentSearchParams.repository))) {
            params.page = 1;
        }
        const newSearchParams = Object.assign({}, this.currentSearchParameters$.getValue(), params);
        this.currentSearchParameters$.next(newSearchParams);
    }
    searchWithCurrentParams() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.search(this.currentSearchParameters$.getValue());
        });
    }
    search(searchParams) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const softwareAGTopic = this.softwareAGGitHubTopics.find(t => t.id === searchParams.topic);
            const repository = this.repositories.find(r => r.id === searchParams.repository);
            let topics = '+topic:iot-analytics';
            if (softwareAGTopic && softwareAGTopic.topics.length > 0) {
                topics += softwareAGTopic.topics.filter(topic => topic.length > 0).reduce((result, topic) => result += `+topic:${topic}`, '');
            }
            if (repository && repository.topics.length > 0) {
                topics += repository.topics.filter(topic => topic.length > 0).reduce((result, topic) => result += `+topic:${topic}`, '');
            }
            let queryString = '';
            if (searchParams.text !== '') {
                queryString += `+${searchParams.text}+in:readme+${searchParams.text}+in:description+${searchParams.text}+in:name`;
            }
            if (topics !== '') {
                queryString += topics;
            }
            const response = yield this.gitHubCacheService.search('iot', queryString, searchParams.page, searchParams.pageSize);
            const getGitHubProjectsResponse = response;
            const searchResult = {
                params: searchParams,
                response: getGitHubProjectsResponse
            };
            this.lastSearchResult$.next(searchResult);
            this.gaService.pushToGoogleAnalytics();
            return searchResult;
        });
    }
}
IotAnalyticsDataService.ɵfac = function IotAnalyticsDataService_Factory(t) { return new (t || IotAnalyticsDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_5__["GitHubCacheService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__["GoogleAnalyticsService"])); };
IotAnalyticsDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: IotAnalyticsDataService, factory: IotAnalyticsDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](IotAnalyticsDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }, { type: _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_5__["GitHubCacheService"] }, { type: _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_6__["GoogleAnalyticsService"] }]; }, null); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\MARDI\githubio\src\main.ts */"zUnb");


/***/ }),

/***/ "0LBs":
/*!************************************************************************************!*\
  !*** ./src/app/custom-pagination-controls/custom-pagination-controls.component.ts ***!
  \************************************************************************************/
/*! exports provided: CustomPaginationControlsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomPaginationControlsComponent", function() { return CustomPaginationControlsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-pagination */ "oOf3");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function CustomPaginationControlsComponent_li_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CustomPaginationControlsComponent_li_3_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1); return _r0.previous(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.previousLabel);
} }
function CustomPaginationControlsComponent_li_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r2.previousLabel);
} }
function CustomPaginationControlsComponent_li_5_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CustomPaginationControlsComponent_li_5_a_1_Template_a_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const page_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit; const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r11.pageChange.emit(page_r8.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const page_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", ctx_r9.getPageUrl())("queryParams", ctx_r9.getPageQueryParams(page_r8.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](page_r8.label);
} }
function CustomPaginationControlsComponent_li_5_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const page_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](page_r8.label);
} }
function CustomPaginationControlsComponent_li_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, CustomPaginationControlsComponent_li_5_a_1_Template, 3, 3, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, CustomPaginationControlsComponent_li_5_div_2_Template, 3, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const page_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("current", _r0.getCurrent() === page_r8.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.getCurrent() !== page_r8.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.getCurrent() === page_r8.value);
} }
function CustomPaginationControlsComponent_li_6_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CustomPaginationControlsComponent_li_6_Template_a_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1); return _r0.next(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4.nextLabel);
} }
function CustomPaginationControlsComponent_li_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "li", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.nextLabel);
} }
class CustomPaginationControlsComponent {
    constructor(router, route) {
        this.router = router;
        this.route = route;
        // tslint:disable-next-line:variable-name
        this._directionLinks = true;
        // tslint:disable-next-line:variable-name
        this._autoHide = false;
        // tslint:disable-next-line:variable-name
        this._responsive = false;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = `You're on page`;
        this.pageChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.pageBoundsCorrection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    get directionLinks() {
        return this._directionLinks;
    }
    set directionLinks(value) {
        this._directionLinks = value;
    }
    get autoHide() {
        return this._autoHide;
    }
    set autoHide(value) {
        this._autoHide = value;
    }
    get responsive() {
        return this._responsive;
    }
    set responsive(value) {
        this._responsive = value;
    }
    getPageUrl() {
        return this.router.url.split('?')[0];
    }
    getPageQueryParams(page) {
        if (page !== 1) {
            // @ts-ignore
            return Object.assign({}, this.route.snapshot.queryParamMap.params, { page: page.toString() });
        }
        else {
            // @ts-ignore
            return Object.assign({}, this.route.snapshot.queryParamMap.params, { page: null });
        }
    }
}
CustomPaginationControlsComponent.ɵfac = function CustomPaginationControlsComponent_Factory(t) { return new (t || CustomPaginationControlsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"])); };
CustomPaginationControlsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CustomPaginationControlsComponent, selectors: [["app-public-custom-pagination"]], inputs: { directionLinks: "directionLinks", autoHide: "autoHide", responsive: "responsive", previousLabel: "previousLabel", nextLabel: "nextLabel", screenReaderPaginationLabel: "screenReaderPaginationLabel", screenReaderPageLabel: "screenReaderPageLabel", screenReaderCurrentLabel: "screenReaderCurrentLabel" }, outputs: { pageChange: "pageChange", pageBoundsCorrection: "pageBoundsCorrection" }, decls: 8, vars: 5, consts: [[3, "pageChange", "pageBoundsCorrection"], ["p", "paginationApi"], ["role", "navigation", "aria-label", "Pagination", 1, "ngx-pagination"], ["class", "pagination-previous", 4, "ngIf"], ["class", "pagination-previous disabled", 4, "ngIf"], [3, "current", 4, "ngFor", "ngForOf"], ["class", "pagination-next", 4, "ngIf"], ["class", "pagination-next disabled", 4, "ngIf"], [1, "pagination-previous"], [3, "click"], [1, "pagination-previous", "disabled"], [3, "routerLink", "queryParams", "click", 4, "ngIf"], [4, "ngIf"], [3, "routerLink", "queryParams", "click"], [1, "pagination-next"], [1, "pagination-next", "disabled"]], template: function CustomPaginationControlsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "pagination-template", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function CustomPaginationControlsComponent_Template_pagination_template_pageChange_0_listener($event) { return ctx.pageChange.emit($event); })("pageBoundsCorrection", function CustomPaginationControlsComponent_Template_pagination_template_pageBoundsCorrection_0_listener($event) { return ctx.pageBoundsCorrection.emit($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "ul", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CustomPaginationControlsComponent_li_3_Template, 4, 1, "li", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CustomPaginationControlsComponent_li_4_Template, 3, 1, "li", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CustomPaginationControlsComponent_li_5_Template, 3, 4, "li", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, CustomPaginationControlsComponent_li_6_Template, 4, 1, "li", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, CustomPaginationControlsComponent_li_7_Template, 3, 1, "li", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_r0.isFirstPage());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.isFirstPage());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _r0.pages);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !_r0.isLastPage());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r0.isLastPage());
    } }, directives: [ngx_pagination__WEBPACK_IMPORTED_MODULE_2__["PaginationControlsDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: [".ngx-pagination[_ngcontent-%COMP%] {\r\n  margin-left: 0;\r\n  margin-bottom: 1rem;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]::before, .ngx-pagination[_ngcontent-%COMP%]::after {\r\n  content: ' ';\r\n  display: table;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]::after {\r\n  clear: both;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  -moz-user-select: none;\r\n  -webkit-user-select: none;\r\n  -ms-user-select: none;\r\n  margin-right: 0.0625rem;\r\n  border-radius: 0;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  color: #011f3d;\r\n  display: block;\r\n  padding: 0.1875rem 0.625rem;\r\n  border-radius: 0;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\r\n  background-color: #f2f2ea;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%] {\r\n  padding: 0.1875rem 0.625rem;\r\n  background-color: #011f3d;\r\n  color: #f2f2ea;\r\n  cursor: default;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%] {\r\n  padding: 0.1875rem 0.625rem;\r\n  color: #cacaca;\r\n  cursor: default;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]:hover {\r\n  background: transparent;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .pagination-previous[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::before, .ngx-pagination[_ngcontent-%COMP%]   .pagination-previous.disabled[_ngcontent-%COMP%]::before {\r\n  content: '\u00AB';\r\n  display: inline-block;\r\n  margin-right: 0.5rem;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .pagination-next[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]::after, .ngx-pagination[_ngcontent-%COMP%]   .pagination-next.disabled[_ngcontent-%COMP%]::after {\r\n  content: '\u00BB';\r\n  display: inline-block;\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .show-for-sr[_ngcontent-%COMP%] {\r\n  position: absolute !important;\r\n  width: 1px;\r\n  height: 1px;\r\n  overflow: hidden;\r\n  clip: rect(0, 0, 0, 0);\r\n}\r\n\r\n.ngx-pagination[_ngcontent-%COMP%]   .small-screen[_ngcontent-%COMP%] {\r\n  display: none;\r\n}\r\n\r\n@media screen and (max-width: 601px) {\r\n  .ngx-pagination.responsive[_ngcontent-%COMP%]   .small-screen[_ngcontent-%COMP%] {\r\n    display: inline-block;\r\n  }\r\n\r\n  .ngx-pagination.responsive[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.small-screen):not(.pagination-previous):not(.pagination-next) {\r\n    display: none;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbS1wYWdpbmF0aW9uLWNvbnRyb2xzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFjO0VBQ2QsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIseUJBQXlCO0VBQ3pCLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBOztFQUVFLGNBQWM7RUFDZCxjQUFjO0VBQ2QsMkJBQTJCO0VBQzNCLGdCQUFnQjtBQUNsQjs7QUFFQTs7RUFFRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsMkJBQTJCO0VBQzNCLGNBQWM7RUFDZCxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLG9CQUFvQjtBQUN0Qjs7QUFFQTs7RUFFRSxZQUFZO0VBQ1oscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLDZCQUE2QjtFQUM3QixVQUFVO0VBQ1YsV0FBVztFQUNYLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRTtJQUNFLHFCQUFxQjtFQUN2Qjs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGIiwiZmlsZSI6ImN1c3RvbS1wYWdpbmF0aW9uLWNvbnRyb2xzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmd4LXBhZ2luYXRpb24ge1xyXG4gIG1hcmdpbi1sZWZ0OiAwO1xyXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XHJcbn1cclxuXHJcbi5uZ3gtcGFnaW5hdGlvbjo6YmVmb3JlLCAubmd4LXBhZ2luYXRpb246OmFmdGVyIHtcclxuICBjb250ZW50OiAnICc7XHJcbiAgZGlzcGxheTogdGFibGU7XHJcbn1cclxuXHJcbi5uZ3gtcGFnaW5hdGlvbjo6YWZ0ZXIge1xyXG4gIGNsZWFyOiBib3RoO1xyXG59XHJcblxyXG4ubmd4LXBhZ2luYXRpb24gbGkge1xyXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XHJcbiAgbWFyZ2luLXJpZ2h0OiAwLjA2MjVyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxufVxyXG5cclxuLm5neC1wYWdpbmF0aW9uIGxpIHtcclxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbn1cclxuXHJcbi5uZ3gtcGFnaW5hdGlvbiBhLFxyXG4ubmd4LXBhZ2luYXRpb24gYnV0dG9uIHtcclxuICBjb2xvcjogIzAxMWYzZDtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwYWRkaW5nOiAwLjE4NzVyZW0gMC42MjVyZW07XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxufVxyXG5cclxuLm5neC1wYWdpbmF0aW9uIGE6aG92ZXIsXHJcbi5uZ3gtcGFnaW5hdGlvbiBidXR0b246aG92ZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZWE7XHJcbn1cclxuXHJcbi5uZ3gtcGFnaW5hdGlvbiAuY3VycmVudCB7XHJcbiAgcGFkZGluZzogMC4xODc1cmVtIDAuNjI1cmVtO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMwMTFmM2Q7XHJcbiAgY29sb3I6ICNmMmYyZWE7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcblxyXG4ubmd4LXBhZ2luYXRpb24gLmRpc2FibGVkIHtcclxuICBwYWRkaW5nOiAwLjE4NzVyZW0gMC42MjVyZW07XHJcbiAgY29sb3I6ICNjYWNhY2E7XHJcbiAgY3Vyc29yOiBkZWZhdWx0O1xyXG59XHJcblxyXG4ubmd4LXBhZ2luYXRpb24gLmRpc2FibGVkOmhvdmVyIHtcclxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcclxufVxyXG5cclxuLm5neC1wYWdpbmF0aW9uIGEsIC5uZ3gtcGFnaW5hdGlvbiBidXR0b24ge1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLm5neC1wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLXByZXZpb3VzIGE6OmJlZm9yZSxcclxuLm5neC1wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLXByZXZpb3VzLmRpc2FibGVkOjpiZWZvcmUge1xyXG4gIGNvbnRlbnQ6ICfCqyc7XHJcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xyXG59XHJcblxyXG4ubmd4LXBhZ2luYXRpb24gLnBhZ2luYXRpb24tbmV4dCBhOjphZnRlcixcclxuLm5neC1wYWdpbmF0aW9uIC5wYWdpbmF0aW9uLW5leHQuZGlzYWJsZWQ6OmFmdGVyIHtcclxuICBjb250ZW50OiAnwrsnO1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tbGVmdDogMC41cmVtO1xyXG59XHJcblxyXG4ubmd4LXBhZ2luYXRpb24gLnNob3ctZm9yLXNyIHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGUgIWltcG9ydGFudDtcclxuICB3aWR0aDogMXB4O1xyXG4gIGhlaWdodDogMXB4O1xyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcclxufVxyXG5cclxuLm5neC1wYWdpbmF0aW9uIC5zbWFsbC1zY3JlZW4ge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMXB4KSB7XHJcbiAgLm5neC1wYWdpbmF0aW9uLnJlc3BvbnNpdmUgLnNtYWxsLXNjcmVlbiB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgfVxyXG5cclxuICAubmd4LXBhZ2luYXRpb24ucmVzcG9uc2l2ZSBsaTpub3QoLnNtYWxsLXNjcmVlbik6bm90KC5wYWdpbmF0aW9uLXByZXZpb3VzKTpub3QoLnBhZ2luYXRpb24tbmV4dCkge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CustomPaginationControlsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-public-custom-pagination',
                templateUrl: './custom-pagination-controls.component.html',
                styleUrls: ['./custom-pagination-controls.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }]; }, { directionLinks: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], autoHide: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], responsive: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], previousLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], nextLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], screenReaderPaginationLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], screenReaderPageLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], screenReaderCurrentLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], pageChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }], pageBoundsCorrection: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "2QUj":
/*!**********************************!*\
  !*** ./src/classes/constants.ts ***!
  \**********************************/
/*! exports provided: Constants */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Constants", function() { return Constants; });
class Constants {
}
Constants.CONST_APPLICATION_NAME = 'Open Source | Software AG';
Constants.GITHUB_RETRIEVE_FAIL_MESSAGE = 'Github API rate limited exceeded.\nPlease try again in a few seconds.';
Constants.GITHUB_API_RATE_LIMIT_EXCEEDED = 403;


/***/ }),

/***/ "5o1m":
/*!**************************************************!*\
  !*** ./src/services/DataService/data.service.ts ***!
  \**************************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DataService {
    constructor() {
        this.topics = [
            { id: 'all-topics', name: 'All topics', topics: [], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_IOT_ANALYTICS_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'apama', name: 'apama', topics: ['apama'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_IOT_ANALYTICS_PAGE] },
            { id: 'api-gateway', name: 'api-gateway', topics: ['api-gateway'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'api-management', name: 'api-management', topics: ['api-management'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'B2B', name: 'B2B', topics: ['B2B'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'cloudstreams', name: 'cloudstreams', topics: ['cloudstreams'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'command-central', name: 'command-central', topics: ['command-central'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'connectors', name: 'connectors', topics: ['connectors'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'cumulocity-iot', name: 'cumulocity-iot', topics: ['cumulocity-iot'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_IOT_ANALYTICS_PAGE] },
            { id: 'integration-server', name: 'integration-server', topics: ['integration-server'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'terracotta', name: 'terracotta', topics: ['terracotta'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'universal-messaging', name: 'universal-messaging', topics: ['universal-messaging'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'webmethods', name: 'webmethods', topics: ['webmethods'], page: [DataService.CONST_OVERVIEW_PAGE] },
            { id: 'webmethods-io-integration', name: 'webmethods-io-integration', topics: ['webmethods-io-integration'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE] },
            { id: 'zementis', name: 'zementis', topics: ['zementis'], page: [DataService.CONST_OVERVIEW_PAGE, DataService.CONST_IOT_ANALYTICS_PAGE] }
        ];
    }
}
DataService.CONST_OVERVIEW_PAGE = 'overview';
DataService.CONST_IOT_ANALYTICS_PAGE = 'iot-analytics';
DataService.CONST_API_INTEGRATION_MICROSERVICE_PAGE = 'api_integration-microservice';
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(); };
DataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: DataService, factory: DataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "6k+Y":
/*!*******************************************************************************************!*\
  !*** ./src/services/Overview/OverviewQueryParamsService/overview-query-params.service.ts ***!
  \*******************************************************************************************/
/*! exports provided: OverviewQueryParamsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewQueryParamsService", function() { return OverviewQueryParamsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../MessageService/message.service */ "zFxm");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../classes/constants */ "2QUj");
/* harmony import */ var _app_message_message_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../app/message/message.component */ "eUAL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../OverViewDataService/overview-data.service */ "bewm");










class OverviewQueryParamsService {
    constructor(router, route, messageService, overviewDataService) {
        this.router = router;
        this.route = route;
        this.messageService = messageService;
        this.overviewDataService = overviewDataService;
        this.overViewWebpage = _app_message_message_component__WEBPACK_IMPORTED_MODULE_5__["WebPage"].Overview;
    }
    getQueryParams(queryParams) {
        return {
            text: queryParams.has('search') ? queryParams.get('search') : '',
            topic: queryParams.has('topic') ? queryParams.get('topic') : 'all-topics',
            page: queryParams.has('page') ? Number(queryParams.get('page')) : 1,
        };
    }
    initialize() {
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        // Only update based on the query params on initial load of the page (not every time they change)
        this.route.queryParamMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["first"])())
            .subscribe(queryParams => {
            const searchParams = this.getQueryParams(queryParams);
            this.overviewDataService.updateSearchParameters(searchParams, true);
            this.overviewDataService.searchWithCurrentParams()
                .catch((error) => {
                const errorResponse = error;
                if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                    this.messageService.setMessage(this.overViewWebpage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
                }
                else {
                    this.messageService.setMessage(this.overViewWebpage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
                }
            });
        });
        // Update the query string from changes to the currentSearchParams
        this.subscriptions.add(this.overviewDataService.currentSearchParameters$
            // Skip the first item because it is the default value (from the search service initialization) - the value we actually want first is the one from the query param (above)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["skip"])(1))
            .subscribe(searchParams => {
            const queryParams = Object.assign(Object.assign(Object.assign({}, searchParams.text !== '' ? { search: searchParams.text } : undefined), searchParams.topic !== 'all-topics' ? { topic: searchParams.topic } : undefined), searchParams.page.toString() !== '1' ? { page: searchParams.page } : undefined);
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams,
                replaceUrl: true
            });
        }));
    }
    terminate() {
        this.subscriptions.unsubscribe();
    }
}
OverviewQueryParamsService.ɵfac = function OverviewQueryParamsService_Factory(t) { return new (t || OverviewQueryParamsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_7__["OverviewDataService"])); };
OverviewQueryParamsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: OverviewQueryParamsService, factory: OverviewQueryParamsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OverviewQueryParamsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"] }, { type: _OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_7__["OverviewDataService"] }]; }, null); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "IMFf":
/*!**************************************************!*\
  !*** ./src/app/preloader/preloader.component.ts ***!
  \**************************************************/
/*! exports provided: PreloaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreloaderComponent", function() { return PreloaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class PreloaderComponent {
    constructor() {
    }
}
PreloaderComponent.ɵfac = function PreloaderComponent_Factory(t) { return new (t || PreloaderComponent)(); };
PreloaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PreloaderComponent, selectors: [["app-preloader"]], decls: 2, vars: 0, consts: [[1, "page-container"], [1, "loader"]], template: function PreloaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".loader[_ngcontent-%COMP%] {\r\n  border: 16px solid #f3f3f3;\r\n  border-radius: 50%;\r\n  border-top: 16px solid #8E3Cf7;\r\n  border-bottom: 16px solid #8E3Cf7;\r\n  width: 100px;\r\n  height: 100px;\r\n  animation: spin 2s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  0% { transform: rotate(0deg); }\r\n  100% { transform: rotate(360deg); }\r\n}\r\n\r\n.page-container[_ngcontent-%COMP%] {\r\n  margin-top: 5%;\r\n  margin-left: 50%\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZWxvYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQTBCO0VBQzFCLGtCQUFrQjtFQUNsQiw4QkFBOEI7RUFDOUIsaUNBQWlDO0VBQ2pDLFlBQVk7RUFDWixhQUFhO0VBRWIsa0NBQWtDO0FBQ3BDOztBQU9BO0VBQ0UsS0FBSyx1QkFBdUIsRUFBRTtFQUM5QixPQUFPLHlCQUF5QixFQUFFO0FBQ3BDOztBQUVBO0VBQ0UsY0FBYztFQUNkO0FBQ0YiLCJmaWxlIjoicHJlbG9hZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubG9hZGVyIHtcclxuICBib3JkZXI6IDE2cHggc29saWQgI2YzZjNmMztcclxuICBib3JkZXItcmFkaXVzOiA1MCU7XHJcbiAgYm9yZGVyLXRvcDogMTZweCBzb2xpZCAjOEUzQ2Y3O1xyXG4gIGJvcmRlci1ib3R0b206IDE2cHggc29saWQgIzhFM0NmNztcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICAtd2Via2l0LWFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XHJcbiAgYW5pbWF0aW9uOiBzcGluIDJzIGxpbmVhciBpbmZpbml0ZTtcclxufVxyXG5cclxuQC13ZWJraXQta2V5ZnJhbWVzIHNwaW4ge1xyXG4gIDAlIHsgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTsgfVxyXG4gIDEwMCUgeyAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cclxufVxyXG5cclxuQGtleWZyYW1lcyBzcGluIHtcclxuICAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDBkZWcpOyB9XHJcbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cclxufVxyXG5cclxuLnBhZ2UtY29udGFpbmVyIHtcclxuICBtYXJnaW4tdG9wOiA1JTtcclxuICBtYXJnaW4tbGVmdDogNTAlXHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PreloaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-preloader',
                templateUrl: './preloader.component.html',
                styleUrls: ['./preloader.component.css']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "MyZq":
/*!********************************************************!*\
  !*** ./src/app/project-card/project-card.component.ts ***!
  \********************************************************/
/*! exports provided: ProjectCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectCardComponent", function() { return ProjectCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fortawesome/free-regular-svg-icons */ "twK/");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _pipes_text_limit_text_limit_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../pipes/text-limit/text-limit.pipe */ "us8n");







function ProjectCardComponent_ng_container_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON TERRACOTTA.ORG");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON EHCACHE.ORG");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON QUARTZ-SCHEDULER.ORG");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON WEBMETHODS IO");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON THIN EDGE");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function ProjectCardComponent_ng_container_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "VIEW ON GITHUB");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "svg", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "path", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", ctx_r6.gitHubProject.html_url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
class ProjectCardComponent {
    constructor() {
        this.faStar = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faStar"];
        this.faFork = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCodeBranch"];
        this.faClock = _fortawesome_free_regular_svg_icons__WEBPACK_IMPORTED_MODULE_2__["faClock"];
    }
    ngOnInit() { }
}
ProjectCardComponent.ɵfac = function ProjectCardComponent_Factory(t) { return new (t || ProjectCardComponent)(); };
ProjectCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProjectCardComponent, selectors: [["app-project-card"]], inputs: { gitHubProject: "gitHubProject" }, decls: 37, vars: 28, consts: [[1, "card"], [1, "card-body"], [1, "row"], [1, "col-lg-12", "title-container"], ["target", "_blank", 1, "link", 3, "href"], [3, "title"], [1, "col-lg-12", "desc-container"], [1, "col-lg-12", "props-container"], [1, "col-4", "col-lg-4"], [3, "icon"], [1, "col-3", "col-lg-3"], [1, "col-5", "col-lg-5", "text-right"], [1, "gp-container", "pt-2", "pb-2"], [4, "ngIf"], [1, "col-lg-12"], ["title", "Developed by Global Presales", "src", "./assets/global-presales.png", "alt", "Developed by Global Presales", 1, "gp-logo"], ["href", "https://www.terracotta.org", "target", "_blank", 1, "link"], [1, "link-container"], ["title", "VIEW ON TERRACOTTA.ORG"], [1, "text"], [1, "icon"], ["viewBox", "0 0 128 128"], ["fill", "currentColor", "d", "M103.06,102.65l.46-71.27a8.42,8.42,0,0,0-8.37-8.47v0H21.6v8.41H88.67L19.93,100.1l6.36,6.36L95.06,37.69l-.42,64.91Z", 1, "a-icon__main-dark"], ["href", "https://www.ehcache.org", "target", "_blank", 1, "link"], ["title", "VIEW ON EHCACHE.ORG"], ["href", "http://www.quartz-scheduler.org", "target", "_blank", 1, "link"], ["title", "VIEW ON QUARTZ-SCHEDULER.ORG"], ["href", "https://open-source.softwareag.com/webmethods-io-flowservice/", "target", "_blank", 1, "link"], ["title", "VIEW ON WEBMETHODS IO"], ["href", "https://thin-edge.io/", "target", "_blank", 1, "link"], ["title", "VIEW ON THIN EDGE"], ["title", "VIEW ON GITHUB"]], template: function ProjectCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "h4", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "TextLimit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "TextLimit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "fa-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "fa-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "fa-icon", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](25, "date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, ProjectCardComponent_ng_container_28_Template, 3, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](31, ProjectCardComponent_ng_container_31_Template, 9, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](32, ProjectCardComponent_ng_container_32_Template, 9, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](33, ProjectCardComponent_ng_container_33_Template, 9, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, ProjectCardComponent_ng_container_34_Template, 9, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](35, ProjectCardComponent_ng_container_35_Template, 9, 0, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, ProjectCardComponent_ng_container_36_Template, 9, 1, "ng-container", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("href", ctx.gitHubProject.html_url, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("title", ctx.gitHubProject.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](8, 17, ctx.gitHubProject.name, 55, "..."));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind3"](12, 21, ctx.gitHubProject.description, 200, "..."), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faStar);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.gitHubProject.stargazers_count, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faFork);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.gitHubProject.forks_count, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("icon", ctx.faClock);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](25, 25, ctx.gitHubProject.updated_at, "yyyy-MM-dd"), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.description && ctx.gitHubProject.description.includes("Global Presales"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name === "terracotta-org");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name === "ehcache-org");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name === "quartz-scheduler-org");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name === "webmethods-io-flowservice");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name === "thin-edge.io");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gitHubProject.name !== "terracotta-org" && ctx.gitHubProject.name !== "ehcache-org" && ctx.gitHubProject.name !== "quartz-scheduler-org" && ctx.gitHubProject.name !== "webmethods-io-flowservice" && ctx.gitHubProject.name !== "thin-edge.io");
    } }, directives: [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__["FaIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"]], pipes: [_pipes_text_limit_text_limit_pipe__WEBPACK_IMPORTED_MODULE_5__["TextLimitPipe"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["DatePipe"]], styles: [".card[_ngcontent-%COMP%] {\r\n  width: 340px;\r\n  min-height: 275px;\r\n  margin-left: 15px;\r\n  margin-right: 15px;\r\n  margin-bottom: 30px;\r\n  padding: 15px;\r\n  border-radius: 0;\r\n  border: 0;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .title-container[_ngcontent-%COMP%] {\r\n  min-height: 130px;\r\n  padding-bottom: 0;\r\n\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .title-container[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%] {\r\n  text-decoration: none;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .title-container[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\r\n  font-weight: 700;\r\n  font-size: 2.3rem;\r\n  line-height: 3.8rem;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .title-container[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\r\n  font-family: Roboto,Arial,Helvetica,sans-serif !important;\r\n  font-size: 1em;\r\n  white-space: pre-line;\r\n  color: #011f3d;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .desc-container[_ngcontent-%COMP%] {\r\n  min-height: 200px;\r\n  font-size: 1.6rem;\r\n  line-height: 3rem;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .props-container[_ngcontent-%COMP%] {\r\n  padding-top: 10px;\r\n  font-size: 1.6rem;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .gp-container[_ngcontent-%COMP%] {\r\n  padding: 15px;\r\n  min-height: 35px;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .gp-logo[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%] {\r\n  text-decoration: none;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]:hover {\r\n  color: #011f3d;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%] {\r\n  margin-top: 8px;\r\n  padding: 10px 0px 10px 0px;\r\n  border: 2px solid #011f3d;\r\n  text-align: center;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%] {\r\n  color: #011f3d !important;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: center;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]    > span.text[_ngcontent-%COMP%] {\r\n  font-size: 1.8rem;\r\n  font-weight: 700;\r\n  line-height: 1;\r\n}\r\n\r\n.card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   a.link[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%]    > span.icon[_ngcontent-%COMP%] {\r\n  width: 18px;\r\n  height: 18px;\r\n  margin-left: 4px;\r\n  display: inline-block;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3QtY2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7O0FBRW5COztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGlCQUFpQjtFQUNqQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5REFBeUQ7RUFDekQsY0FBYztFQUNkLHFCQUFxQjtFQUNyQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGlCQUFpQjtFQUNqQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsMEJBQTBCO0VBQzFCLHlCQUF5QjtFQUN6QixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIscUJBQXFCO0FBQ3ZCIiwiZmlsZSI6InByb2plY3QtY2FyZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQge1xyXG4gIHdpZHRoOiAzNDBweDtcclxuICBtaW4taGVpZ2h0OiAyNzVweDtcclxuICBtYXJnaW4tbGVmdDogMTVweDtcclxuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgYm9yZGVyOiAwO1xyXG59XHJcblxyXG4uY2FyZCAuY2FyZC1ib2R5IC50aXRsZS1jb250YWluZXIge1xyXG4gIG1pbi1oZWlnaHQ6IDEzMHB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAwO1xyXG5cclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSAudGl0bGUtY29udGFpbmVyID4gYSB7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG59XHJcblxyXG4uY2FyZCAuY2FyZC1ib2R5IC50aXRsZS1jb250YWluZXIgaDQge1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgZm9udC1zaXplOiAyLjNyZW07XHJcbiAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSAudGl0bGUtY29udGFpbmVyIGg0IHByZSB7XHJcbiAgZm9udC1mYW1pbHk6IFJvYm90byxBcmlhbCxIZWx2ZXRpY2Esc2Fucy1zZXJpZiAhaW1wb3J0YW50O1xyXG4gIGZvbnQtc2l6ZTogMWVtO1xyXG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcclxuICBjb2xvcjogIzAxMWYzZDtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSAuZGVzYy1jb250YWluZXIge1xyXG4gIG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAzcmVtO1xyXG59XHJcblxyXG4uY2FyZCAuY2FyZC1ib2R5IC5wcm9wcy1jb250YWluZXIge1xyXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gIGZvbnQtc2l6ZTogMS42cmVtO1xyXG59XHJcblxyXG4uY2FyZCAuY2FyZC1ib2R5IC5ncC1jb250YWluZXIge1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbiAgbWluLWhlaWdodDogMzVweDtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSAuZ3AtbG9nbyB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbn1cclxuXHJcbi5jYXJkIC5jYXJkLWJvZHkgYS5saW5rIHtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbn1cclxuXHJcbi5jYXJkIC5jYXJkLWJvZHkgYS5saW5rOmhvdmVyIHtcclxuICBjb2xvcjogIzAxMWYzZDtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSBhLmxpbmsgPiAubGluay1jb250YWluZXIge1xyXG4gIG1hcmdpbi10b3A6IDhweDtcclxuICBwYWRkaW5nOiAxMHB4IDBweCAxMHB4IDBweDtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjMDExZjNkO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSBhLmxpbmsgPiAubGluay1jb250YWluZXIge1xyXG4gIGNvbG9yOiAjMDExZjNkICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5jYXJkIC5jYXJkLWJvZHkgYS5saW5rID4gLmxpbmstY29udGFpbmVyID4gc3BhbiB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG5cclxuLmNhcmQgLmNhcmQtYm9keSBhLmxpbmsgPiAubGluay1jb250YWluZXIgPiBzcGFuID4gc3Bhbi50ZXh0IHtcclxuICBmb250LXNpemU6IDEuOHJlbTtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIGxpbmUtaGVpZ2h0OiAxO1xyXG59XHJcblxyXG4uY2FyZCAuY2FyZC1ib2R5IGEubGluayA+IC5saW5rLWNvbnRhaW5lciA+IHNwYW4gPiBzcGFuLmljb24ge1xyXG4gIHdpZHRoOiAxOHB4O1xyXG4gIGhlaWdodDogMThweDtcclxuICBtYXJnaW4tbGVmdDogNHB4O1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProjectCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-project-card',
                templateUrl: './project-card.component.html',
                styleUrls: ['./project-card.component.css']
            }]
    }], function () { return []; }, { gitHubProject: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "PY1i":
/*!**************************************!*\
  !*** ./src/app/iot/iot.component.ts ***!
  \**************************************/
/*! exports provided: IotComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IotComponent", function() { return IotComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/constants */ "2QUj");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message/message.component */ "eUAL");
/* harmony import */ var _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/MessageService/message.service */ "zFxm");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _services_IoTAnalytics_IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/IoTAnalytics/IoTAnalyticsDataService/iot-analytics-data.service */ "/4Oi");
/* harmony import */ var _services_IoTAnalytics_IoTAnalyticsQueryParamsService_iot_analytics_query_params_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/IoTAnalytics/IoTAnalyticsQueryParamsService/iot-analytics-query-params.service */ "rFmM");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../search-bar/search-bar.component */ "j92K");
/* harmony import */ var _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../custom-pagination-controls/custom-pagination-controls.component */ "0LBs");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../project-card/project-card.component */ "MyZq");
/* harmony import */ var _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../preloader/preloader.component */ "IMFf");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-pagination */ "oOf3");




















function IotComponent_ng_container_78_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const softwareAGTopic_r9 = ctx.$implicit;
    const searchResult_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", softwareAGTopic_r9.id)("selected", searchResult_r3.params.topic == softwareAGTopic_r9.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](softwareAGTopic_r9.name);
} }
function IotComponent_ng_container_78_option_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const repositoryType_r11 = ctx.$implicit;
    const searchResult_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", repositoryType_r11.id)("selected", searchResult_r3.params.repository == repositoryType_r11.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](repositoryType_r11.name);
} }
function IotComponent_ng_container_78_div_22_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-public-custom-pagination", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function IotComponent_ng_container_78_div_22_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r13.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function IotComponent_ng_container_78_div_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-project-card", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const searchedGitHubProject_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("gitHubProject", searchedGitHubProject_r15);
} }
function IotComponent_ng_container_78_div_28_Template(rf, ctx) { if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-public-custom-pagination", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function IotComponent_ng_container_78_div_28_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r17); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r16.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0, a1, a2) { return { itemsPerPage: a0, currentPage: a1, totalItems: a2 }; };
function IotComponent_ng_container_78_Template(rf, ctx) { if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "pre");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "All Projects");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function IotComponent_ng_container_78_Template_select_change_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r18.selectedSoftwareAGTopic($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, IotComponent_ng_container_78_option_12_Template, 2, 3, "option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function IotComponent_ng_container_78_Template_select_change_14_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r20.selectedRepository($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, IotComponent_ng_container_78_option_15_Template, 2, 3, "option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "app-search-bar", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("search", function IotComponent_ng_container_78_Template_app_search_bar_search_18_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r19); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r21.searchGitHubProjectsByText($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, IotComponent_ng_container_78_div_22_Template, 4, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, IotComponent_ng_container_78_div_26_Template, 2, 1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](27, "paginate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, IotComponent_ng_container_78_div_28_Template, 4, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const searchResult_r3 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", searchResult_r3.params.topic);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.softwareAGTopics);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", searchResult_r3.params.repository);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.repositories);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("searchText", searchResult_r3.params.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", searchResult_r3.response.total_count, " record(s) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", searchResult_r3.response.total_count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](27, 9, searchResult_r3.response.items, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](12, _c0, searchResult_r3.params.pageSize, searchResult_r3.params.page, searchResult_r3.response.total_count)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", searchResult_r3.response.total_count > 0);
} }
function IotComponent_ng_template_80_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-preloader");
} }
class IotComponent {
    constructor(iotAnalyticsDataService, messageService, iotAnalyticsQueryParamsService, titleService, metaTagService, route) {
        this.iotAnalyticsDataService = iotAnalyticsDataService;
        this.messageService = messageService;
        this.iotAnalyticsQueryParamsService = iotAnalyticsQueryParamsService;
        this.titleService = titleService;
        this.metaTagService = metaTagService;
        this.route = route;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subscription"]();
        this.initialPageLoad = true;
        this.softwareAGTopics = [];
        this.repositories = [];
        this.faStar = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faStar"];
        this.faFork = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_1__["faCodeBranch"];
        this.IoTAnalyticsWebpage = _message_message_component__WEBPACK_IMPORTED_MODULE_3__["WebPage"].IoTAnalytics;
    }
    ngOnInit() {
        this.iotAnalyticsQueryParamsService.initialize();
        this.subscriptions.add(this.iotAnalyticsDataService.lastSearchResult$.subscribe((lastSearchResult) => {
            // Only scroll on initial page load and where a dropdown or search text has been provided (in the url)
            const queryParamMap = this.route.snapshot.queryParamMap;
            if (this.initialPageLoad && (queryParamMap.has('topic') || queryParamMap.has('repository') || queryParamMap.has('search') || queryParamMap.has('page'))) {
                setTimeout(() => {
                    this.scrollToProjects();
                }, 0);
            }
            this.initialPageLoad = false;
        }));
        this.metaTagService.updateTag({ name: 'description', content: 'Discover and start using open source IoT and Analytics projects and code samples for products including Cumulocity IoT, TrendMiner, Apama Streaming Analytics, Zementis and more.' });
        this.metaTagService.updateTag({ name: 'keywords', content: 'internet of things, analytics, machine learning, streaming analytics, cumulocity iot, apama, zementis' });
        this.titleService.setTitle(`IoT & Analytics | ${_classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].CONST_APPLICATION_NAME}`);
        // Retrieve the list of Software AG Topics
        this.iotAnalyticsDataService.getTopics()
            .then((softwareAGTopics) => {
            this.softwareAGTopics = softwareAGTopics;
            this.iotAnalyticsDataService.getRepositoryTypes()
                .then((repoTypes) => {
                this.repositories = repoTypes;
            });
        });
    }
    // User selected a Software AG Topic from the dropdown
    selectedSoftwareAGTopic(topic) {
        this.iotAnalyticsDataService.updateSearchParameters({
            topic,
            page: 1,
        });
        this.iotAnalyticsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    // User selected a repo type from the dropdown
    selectedRepository(repository) {
        this.iotAnalyticsDataService.updateSearchParameters({
            repository,
            page: 1,
        });
        this.iotAnalyticsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    // User entered text into the Search... field
    searchGitHubProjectsByText(searchText) {
        this.iotAnalyticsDataService.updateSearchParameters({
            text: searchText,
            page: 1,
        });
        this.iotAnalyticsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    goToPage(pageNumber) {
        this.iotAnalyticsDataService.updateSearchParameters({
            page: pageNumber,
        });
        this.iotAnalyticsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    scrollToProjects() {
        document.querySelector('#all-iot-analytics-projects').scrollIntoView();
    }
    selectedCumulocityUIWidgets() {
        this.iotAnalyticsDataService.updateSearchParameters({
            topic: 'cumulocity-iot',
            repository: 'widget',
            text: '',
            page: 1,
        });
        this.iotAnalyticsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.IoTAnalyticsWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
}
IotComponent.ɵfac = function IotComponent_Factory(t) { return new (t || IotComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_IoTAnalytics_IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_6__["IotAnalyticsDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_IoTAnalytics_IoTAnalyticsQueryParamsService_iot_analytics_query_params_service__WEBPACK_IMPORTED_MODULE_7__["IotAnalyticsQueryParamsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Title"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"])); };
IotComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: IotComponent, selectors: [["app-iot"]], decls: 82, vars: 5, consts: [[3, "webpage"], [1, "page-header-container"], [1, "img-container"], ["src", "./assets/banner.jpeg", "alt", "IoT & Analytics Banner"], [1, "container", "content-container"], [1, "row"], [1, "col-lg-12"], [1, "heading"], [1, "col-lg-12", "teaser"], [1, "col-lg-5"], ["routerLink", "/iot-analytics", 1, "link", "brown", 3, "click"], [1, "link-container"], ["title", "ALL PROJECTS"], [1, "text"], [1, "section-container", "white"], [1, "container"], [1, "col-lg-12", "title-container"], [1, "flex-container", "quicklinks"], [1, "card"], ["href", "https://github.com/SoftwareAG/cumulocity-app-builder", "target", "_blank"], [1, "card-body"], [1, "col-lg-12", "img-container"], ["src", "assets/arrow-icon-1.jfif", "alt", "arrow"], ["title", "Application Builder for Cumulocity IoT"], ["href", "https://github.com/SoftwareAG/cumulocity-migration-tool", "target", "_blank"], ["title", "Migration Tool for Cumulocity IoT"], ["href", "https://github.com/SoftwareAG/cumulocity-kpi-trend-widget", "target", "_blank"], ["title", "KPI Trend Widget"], ["href", "https://github.com/SoftwareAG/cumulocity-silo-capacity-widget", "target", "_blank"], ["title", "Silo Capacity Widget"], ["id", "all-iot-analytics-projects", 1, "section-container", "brown"], [4, "ngIf", "ngIfElse"], ["searchGitHubProjectsPreloader", ""], [1, "col-6", "col-lg-3", "p-2"], [1, "form-control", "text", 3, "ngModel", "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [1, "col-12", "col-lg-6", "p-2"], [1, "search-container"], [3, "searchText", "search"], [1, "d-flex", "justify-content-center"], [1, "p-2", "text"], [4, "ngIf"], [1, "flex-container"], ["class", "card-container", 4, "ngFor", "ngForOf"], [3, "value", "selected"], [1, "pagination-container", "top"], ["previousLabel", "Prev", 3, "pageChange"], [1, "card-container"], [3, "gitHubProject"], [1, "pagination-container", "bottom"]], template: function IotComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h1", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "IoT & Analytics");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Explore Cumulocity IoT resources - widgets, tools, and much more");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function IotComponent_Template_a_click_16_listener() { return ctx.scrollToProjects(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "VIEW PROJECTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Quick Links");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](38, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "h4", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "Application Builder for Cumulocity IoT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](49, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "h4", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Migration Tool for Cumulocity IoT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "h4", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "KPI Trend Widget");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "h4", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Silo Capacity Widget");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](78, IotComponent_ng_container_78_Template, 29, 16, "ng-container", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](79, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](80, IotComponent_ng_template_80_Template, 1, 0, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](81);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("webpage", ctx.IoTAnalyticsWebpage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](78);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](79, 3, ctx.iotAnalyticsDataService.lastSearchResult$))("ngIfElse", _r1);
    } }, directives: [_message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_12__["SearchBarComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_x"], _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_13__["CustomPaginationControlsComponent"], _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_14__["ProjectCardComponent"], _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_15__["PreloaderComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["AsyncPipe"], ngx_pagination__WEBPACK_IMPORTED_MODULE_16__["PaginatePipe"]], styles: ["select.form-control[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 0;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 120px;\r\n  left: -200px;\r\n  right: 0;\r\n  width: 50%;\r\n  height: 330px;\r\n  padding: 15px;\r\n  background-color: #f2f2ea;\r\n  color: #011f3d;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .link-container[_ngcontent-%COMP%] {\r\n  background-color: #d9ec27;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n  color: #ffffff;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 460px;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   a.link.brown[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%] {\r\n  border: 1px solid #d9ec27;\r\n}\r\n\r\n@media(max-width: 1024px) and (min-width: 415px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 560px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 420px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 560px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 595px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 475px;\r\n    width: 90%;\r\n    top: 110px;\r\n    left: 0;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 595px;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsU0FBUztFQUNULGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsWUFBWTtFQUNaLFFBQVE7RUFDUixVQUFVO0VBQ1YsYUFBYTtFQUNiLGFBQWE7RUFDYix5QkFBeUI7RUFDekIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsYUFBYTtBQUNmOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtJQUNiLFVBQVU7SUFDVixVQUFVO0lBQ1YsT0FBTztFQUNUOztFQUVBO0lBQ0UsYUFBYTtFQUNmO0FBQ0YiLCJmaWxlIjoiaW90LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWxlY3QuZm9ybS1jb250cm9sIHtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxufVxyXG5cclxuLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0b3A6IDEyMHB4O1xyXG4gIGxlZnQ6IC0yMDBweDtcclxuICByaWdodDogMDtcclxuICB3aWR0aDogNTAlO1xyXG4gIGhlaWdodDogMzMwcHg7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmVhO1xyXG4gIGNvbG9yOiAjMDExZjNkO1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciAubGluay1jb250YWluZXIge1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNkOWVjMjc7XHJcbn1cclxuXHJcbi5wYWdlLWhlYWRlci1jb250YWluZXIgLmNvbnRlbnQtY29udGFpbmVyIGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5pbWctY29udGFpbmVyID4gaW1nIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDQ2MHB4O1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciBhLmxpbmsuYnJvd24gPiAubGluay1jb250YWluZXIge1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNkOWVjMjc7XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDEwMjRweCkgYW5kIChtaW4td2lkdGg6IDQxNXB4KSB7XHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDU2MHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA0MjBweDtcclxuICB9XHJcblxyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIgLmltZy1jb250YWluZXIgPiBpbWcge1xyXG4gICAgaGVpZ2h0OiA1NjBweDtcclxuICB9XHJcbn1cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcclxuICAucGFnZS1oZWFkZXItY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogNTk1cHg7XHJcbiAgfVxyXG5cclxuICAucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDQ3NXB4O1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIHRvcDogMTEwcHg7XHJcbiAgICBsZWZ0OiAwO1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuaW1nLWNvbnRhaW5lciA+IGltZyB7XHJcbiAgICBoZWlnaHQ6IDU5NXB4O1xyXG4gIH1cclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IotComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-iot',
                templateUrl: './iot.component.html',
                styleUrls: ['./iot.component.css']
            }]
    }], function () { return [{ type: _services_IoTAnalytics_IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_6__["IotAnalyticsDataService"] }, { type: _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"] }, { type: _services_IoTAnalytics_IoTAnalyticsQueryParamsService_iot_analytics_query_params_service__WEBPACK_IMPORTED_MODULE_7__["IotAnalyticsQueryParamsService"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Title"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Meta"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../classes/constants */ "2QUj");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ "fECr");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./footer/footer.component */ "fp1T");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");







const _c0 = function (a0) { return { "hide": a0 }; };
class AppComponent {
    constructor() {
        this.title = _classes_constants__WEBPACK_IMPORTED_MODULE_1__["Constants"].CONST_APPLICATION_NAME;
        this.scrolled = false;
    }
    ngOnInit() {
        this.setScrolled();
    }
    scrollToTop() {
        window.scroll(0, 0);
    }
    setScrolled() {
        if (document.documentElement.scrollTop > 0) {
            this.scrolled = true;
        }
        else {
            this.scrolled = false;
        }
    }
    detectSrcoll() {
        this.setScrolled();
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], hostBindings: function AppComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("scroll", function AppComponent_scroll_HostBindingHandler($event) { return ctx.detectSrcoll($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]);
    } }, decls: 6, vars: 3, consts: [[1, "back-to-top", 3, "ngClass", "click"], ["viewBox", "0 0 128 128", "id", "to-top"], ["d", "M97.75,94.39L64,53.9l-33.75,40.5L18,84.18l39.87-47.85c3.03-3.64,9.22-3.64,12.25,0L110,84.18L97.75,94.39z", 1, "a-icon__main-dark"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-footer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AppComponent_Template_div_click_3_listener() { return ctx.scrollToTop(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "svg", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "path", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, !ctx.scrolled));
    } }, directives: [_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"]], styles: [".back-to-top[_ngcontent-%COMP%] {\r\n    width: 40px;\r\n    height: 40px;\r\n    padding-top: 5px;\r\n    position: fixed;\r\n    right: 0;\r\n    bottom: 40px;\r\n    background-color: #3cc1b7;\r\n    text-align: center;\r\n}\r\n\r\n.back-to-top[_ngcontent-%COMP%]:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.back-to-top.hide[_ngcontent-%COMP%] {\r\n    display: none;\r\n}\r\n\r\nsvg[_ngcontent-%COMP%] {\r\n    width: 30px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztJQUNYLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsZUFBZTtJQUNmLFFBQVE7SUFDUixZQUFZO0lBQ1oseUJBQXlCO0lBQ3pCLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksV0FBVztBQUNmIiwiZmlsZSI6ImFwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJhY2stdG8tdG9wIHtcclxuICAgIHdpZHRoOiA0MHB4O1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgcGFkZGluZy10b3A6IDVweDtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYm90dG9tOiA0MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzNjYzFiNztcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmJhY2stdG8tdG9wOmhvdmVyIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmJhY2stdG8tdG9wLmhpZGUge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuc3ZnIHtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            }]
    }], null, { detectSrcoll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"],
            args: ["window:scroll", ["$event"]]
        }] }); })();


/***/ }),

/***/ "VDWX":
/*!****************************************************!*\
  !*** ./src/app/connectors/connectors.component.ts ***!
  \****************************************************/
/*! exports provided: ConnectorsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorsComponent", function() { return ConnectorsComponent; });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "wHSu");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/constants */ "2QUj");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../message/message.component */ "eUAL");
/* harmony import */ var _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/MessageService/message.service */ "zFxm");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _services_Connectors_ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/Connectors/ConnectorsDataService/connectors-data.service */ "uBOE");
/* harmony import */ var _services_Connectors_ConnectorsQueryParamsService_connectors_query_params_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/Connectors/ConnectorsQueryParamsService/connectors-query-params.service */ "Yemv");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../search-bar/search-bar.component */ "j92K");
/* harmony import */ var _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../custom-pagination-controls/custom-pagination-controls.component */ "0LBs");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../project-card/project-card.component */ "MyZq");
/* harmony import */ var _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../preloader/preloader.component */ "IMFf");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-pagination */ "oOf3");




















function ConnectorsComponent_ng_container_78_option_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "option", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const softwareAGTopic_r8 = ctx.$implicit;
    const searchResult_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", softwareAGTopic_r8.id)("selected", searchResult_r3.params.topic == softwareAGTopic_r8.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](softwareAGTopic_r8.name);
} }
function ConnectorsComponent_ng_container_78_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "app-public-custom-pagination", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("pageChange", function ConnectorsComponent_ng_container_78_div_19_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r11); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r10.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function ConnectorsComponent_ng_container_78_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "app-project-card", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const searchedGitHubProject_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("gitHubProject", searchedGitHubProject_r12);
} }
function ConnectorsComponent_ng_container_78_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "app-public-custom-pagination", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("pageChange", function ConnectorsComponent_ng_container_78_div_25_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r13.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
const _c0 = function (a0, a1, a2) { return { itemsPerPage: a0, currentPage: a1, totalItems: a2 }; };
function ConnectorsComponent_ng_container_78_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "pre");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "All Projects");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "select", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function ConnectorsComponent_ng_container_78_Template_select_change_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r15.selectedSoftwareAGTopic($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, ConnectorsComponent_ng_container_78_option_12_Template, 2, 3, "option", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "app-search-bar", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("search", function ConnectorsComponent_ng_container_78_Template_app_search_bar_search_15_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r16); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r17.searchGitHubProjectsByText($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, ConnectorsComponent_ng_container_78_div_19_Template, 4, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, ConnectorsComponent_ng_container_78_div_23_Template, 2, 1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](24, "paginate");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, ConnectorsComponent_ng_container_78_div_25_Template, 4, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const searchResult_r3 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", searchResult_r3.params.topic);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r0.softwareAGTopics);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("searchText", searchResult_r3.params.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", searchResult_r3.response.total_count, " record(s) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", searchResult_r3.response.total_count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](24, 7, searchResult_r3.response.items, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction3"](10, _c0, searchResult_r3.params.pageSize, searchResult_r3.params.page, searchResult_r3.response.total_count)));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", searchResult_r3.response.total_count > 0);
} }
function ConnectorsComponent_ng_template_80_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-preloader");
} }
class ConnectorsComponent {
    constructor(connectorsDataService, messageService, connectorsQueryParamsService, titleService, metaTagService, route) {
        this.connectorsDataService = connectorsDataService;
        this.messageService = messageService;
        this.connectorsQueryParamsService = connectorsQueryParamsService;
        this.titleService = titleService;
        this.metaTagService = metaTagService;
        this.route = route;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subscription"]();
        this.initialPageLoad = true;
        this.softwareAGTopics = [];
        this.faStar = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__["faStar"];
        this.faFork = _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_0__["faCodeBranch"];
        this.apiIntegrationMicroserviceWebPage = _message_message_component__WEBPACK_IMPORTED_MODULE_3__["WebPage"].ApiIntegrationMicroservice;
    }
    ngOnInit() {
        this.connectorsQueryParamsService.initialize();
        this.subscriptions.add(this.connectorsDataService.lastSearchResult$.subscribe((lastSearchResult) => {
            // Only scroll on initial page load and where a dropdown or search text has been provided (in the url)
            const queryParamMap = this.route.snapshot.queryParamMap;
            if (this.initialPageLoad && (queryParamMap.has('topic') || queryParamMap.has('search') || queryParamMap.has('page'))) {
                setTimeout(() => {
                    this.scrollToProjects();
                }, 0);
            }
            this.initialPageLoad = false;
        }));
        this.metaTagService.updateTag({ name: 'description', content: 'Discover and use open source APIs, Integration and Microservices projects and code samples for products including webMethods, webMethods.io Integration, API Management, B2B, Terracotta and more.' });
        this.metaTagService.updateTag({ name: 'keywords', content: 'webmethods, integration, webmethods.io, cloudstreams connectors, api management, b2b, managed file transfer, terracotta' });
        this.titleService.setTitle(`API, Integration & Microservices | ${_classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].CONST_APPLICATION_NAME}`);
        // Retrieve the list of Software AG Topics
        this.connectorsDataService.getTopics()
            .then((softwareAGTopics) => {
            this.softwareAGTopics = softwareAGTopics;
        });
    }
    // User selected a Software AG Topic from the dropdown
    selectedSoftwareAGTopic(topic) {
        this.connectorsDataService.updateSearchParameters({
            topic,
            page: 1,
        });
        this.connectorsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    // User entered text into the Search... field
    searchGitHubProjectsByText(searchText) {
        this.connectorsDataService.updateSearchParameters({
            text: searchText,
            page: 1,
        });
        this.connectorsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    scrollToProjects() {
        document.querySelector('#all-connectors-projects').scrollIntoView();
    }
    goToPage(pageNumber) {
        this.connectorsDataService.updateSearchParameters({
            page: pageNumber,
        });
        this.connectorsDataService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_2__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
}
ConnectorsComponent.ɵfac = function ConnectorsComponent_Factory(t) { return new (t || ConnectorsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_Connectors_ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_6__["ConnectorsDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_Connectors_ConnectorsQueryParamsService_connectors_query_params_service__WEBPACK_IMPORTED_MODULE_7__["ConnectorsQueryParamsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Title"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"])); };
ConnectorsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: ConnectorsComponent, selectors: [["app-connectors"]], decls: 82, vars: 5, consts: [[3, "webpage"], [1, "page-header-container"], [1, "img-container"], ["src", "./assets/banner.jpeg", "alt", "API, Integration & Microservices Banner"], [1, "container", "content-container"], [1, "row"], [1, "col-lg-12"], [1, "heading"], [1, "col-lg-12", "teaser"], [1, "col-lg-5"], ["routerLink", "/api-integration-microservices", 1, "link", "brown", 3, "click"], [1, "link-container"], ["title", "ALL PROJECTS"], [1, "text"], [1, "section-container", "white"], [1, "container"], [1, "col-lg-12", "title-container"], [1, "flex-container", "quicklinks"], [1, "card"], ["href", "https://github.com/SoftwareAG/webmethods-api-gateway", "target", "_blank"], [1, "card-body"], [1, "col-lg-12", "img-container"], ["src", "assets/arrow-icon-1.jfif", "alt", "arrow"], ["title", "webMethods API Gateway"], ["href", "https://open-source.softwareag.com/Connector-Developer-Program/", "target", "_blank"], ["title", "webMethods.io Connector Developer Program"], ["href", "https://tech.forums.softwareag.com/t/webmethods-service-designer-download/235227", "target", "_blank"], ["title", "webMethods Service Designer"], ["href", "https://github.com/SoftwareAG/webmethodsio-integration", "target", "_blank"], ["title", "webMethods.io Integration"], ["id", "all-connectors-projects", 1, "section-container", "brown"], [4, "ngIf", "ngIfElse"], ["searchGitHubProjectsPreloader", ""], [1, "col-6", "col-lg-3", "offset-lg-2", "p-2"], [1, "form-control", "text", 3, "ngModel", "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [1, "col-12", "col-lg-5", "p-2"], [1, "search-container"], [3, "searchText", "search"], [1, "d-flex", "justify-content-center"], [1, "p-2", "text"], [4, "ngIf"], [1, "flex-container"], ["class", "card-container", 4, "ngFor", "ngForOf"], [3, "value", "selected"], [1, "pagination-container", "top"], ["previousLabel", "Prev", 3, "pageChange"], [1, "card-container"], [3, "gitHubProject"], [1, "pagination-container", "bottom"]], template: function ConnectorsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h1", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "API, Integration & Microservices");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Explore open source webMethods resources - connectors, code samples and much more");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConnectorsComponent_Template_a_click_16_listener() { return ctx.scrollToProjects(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "VIEW PROJECTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](22, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](24, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](26, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](27, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Quick Links");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](36, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](38, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "h4", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](42, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](43, "webMethods API Gateway");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](45, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](47, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](48, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](49, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](50, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](52, "h4", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "webMethods.io Connector Developer Program");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](58, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](60, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](62, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](63, "h4", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](64, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](65, "webMethods Service Designer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](67, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](71, "img", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](74, "h4", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](75, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](76, "webMethods.io Integration");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](77, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](78, ConnectorsComponent_ng_container_78_Template, 26, 14, "ng-container", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](79, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](80, ConnectorsComponent_ng_template_80_Template, 1, 0, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](81);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("webpage", ctx.apiIntegrationMicroserviceWebPage);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](78);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](79, 3, ctx.connectorsDataService.lastSearchResult$))("ngIfElse", _r1);
    } }, directives: [_message_message_component__WEBPACK_IMPORTED_MODULE_3__["MessageComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_9__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_12__["SearchBarComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵangular_packages_forms_forms_x"], _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_13__["CustomPaginationControlsComponent"], _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_14__["ProjectCardComponent"], _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_15__["PreloaderComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["AsyncPipe"], ngx_pagination__WEBPACK_IMPORTED_MODULE_16__["PaginatePipe"]], styles: ["select.form-control[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 0;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  top: 120px;\r\n  left: -200px;\r\n  right: 0;\r\n  width: 50%;\r\n  height: 330px;\r\n  padding: 15px;\r\n  background-color: #f2f2ea;\r\n  color: #011f3d;\r\n  padding-right: 40px;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .link-container[_ngcontent-%COMP%] {\r\n  background-color: #d9ec27;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\r\n  color: #ffffff;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 460px;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   a.link.brown[_ngcontent-%COMP%]    > .link-container[_ngcontent-%COMP%] {\r\n  border: 1px solid #d9ec27;\r\n}\r\n\r\n@media(max-width: 1024px) and (min-width: 415px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 560px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 420px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 560px;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 775px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 660px;\r\n    width: 90%;\r\n    top: 110px;\r\n    left: 0;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 775px;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3RvcnMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFNBQVM7RUFDVCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFlBQVk7RUFDWixRQUFRO0VBQ1IsVUFBVTtFQUNWLGFBQWE7RUFDYixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7SUFDYixVQUFVO0lBQ1YsVUFBVTtJQUNWLE9BQU87RUFDVDs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGIiwiZmlsZSI6ImNvbm5lY3RvcnMuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbInNlbGVjdC5mb3JtLWNvbnRyb2wge1xyXG4gIGJvcmRlcjogMDtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMTIwcHg7XHJcbiAgbGVmdDogLTIwMHB4O1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHdpZHRoOiA1MCU7XHJcbiAgaGVpZ2h0OiAzMzBweDtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmMmYyZWE7XHJcbiAgY29sb3I6ICMwMTFmM2Q7XHJcbiAgcGFkZGluZy1yaWdodDogNDBweDtcclxufVxyXG5cclxuLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIgLmxpbmstY29udGFpbmVyIHtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllYzI3O1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciBhOmhvdmVyIHtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuaW1nLWNvbnRhaW5lciA+IGltZyB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA0NjBweDtcclxufVxyXG5cclxuLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIgYS5saW5rLmJyb3duID4gLmxpbmstY29udGFpbmVyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjZDllYzI3O1xyXG59XHJcblxyXG5AbWVkaWEobWF4LXdpZHRoOiAxMDI0cHgpIGFuZCAobWluLXdpZHRoOiA0MTVweCkge1xyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA1NjBweDtcclxuICB9XHJcblxyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIgLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogNDIwcHg7XHJcbiAgfVxyXG5cclxuICAucGFnZS1oZWFkZXItY29udGFpbmVyIC5pbWctY29udGFpbmVyID4gaW1nIHtcclxuICAgIGhlaWdodDogNTYwcHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDc3NXB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA2NjBweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICB0b3A6IDExMHB4O1xyXG4gICAgbGVmdDogMDtcclxuICB9XHJcblxyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIgLmltZy1jb250YWluZXIgPiBpbWcge1xyXG4gICAgaGVpZ2h0OiA3NzVweDtcclxuICB9XHJcbn1cclxuXHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ConnectorsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-connectors',
                templateUrl: './connectors.component.html',
                styleUrls: ['./connectors.component.css']
            }]
    }], function () { return [{ type: _services_Connectors_ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_6__["ConnectorsDataService"] }, { type: _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"] }, { type: _services_Connectors_ConnectorsQueryParamsService_connectors_query_params_service__WEBPACK_IMPORTED_MODULE_7__["ConnectorsQueryParamsService"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Title"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["Meta"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "Yemv":
/*!*************************************************************************************************!*\
  !*** ./src/services/Connectors/ConnectorsQueryParamsService/connectors-query-params.service.ts ***!
  \*************************************************************************************************/
/*! exports provided: ConnectorsQueryParamsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorsQueryParamsService", function() { return ConnectorsQueryParamsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _app_message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app/message/message.component */ "eUAL");
/* harmony import */ var _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../MessageService/message.service */ "zFxm");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../classes/constants */ "2QUj");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ConnectorsDataService/connectors-data.service */ "uBOE");










class ConnectorsQueryParamsService {
    constructor(router, route, messageService, connectorsDataService) {
        this.router = router;
        this.route = route;
        this.messageService = messageService;
        this.connectorsDataService = connectorsDataService;
        this.apiIntegrationMicroserviceWebPage = _app_message_message_component__WEBPACK_IMPORTED_MODULE_3__["WebPage"].ApiIntegrationMicroservice;
    }
    getQueryParams(queryParams) {
        return {
            text: queryParams.has('search') ? queryParams.get('search') : '',
            topic: queryParams.has('topic') ? queryParams.get('topic') : 'all-topics',
            page: queryParams.has('page') ? Number(queryParams.get('page')) : 1,
        };
    }
    initialize() {
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        // Only update based on the query params on initial load of the page (not every time they change)
        this.route.queryParamMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["first"])())
            .subscribe(queryParams => {
            const searchParams = this.getQueryParams(queryParams);
            this.connectorsDataService.updateSearchParameters(searchParams, true);
            this.connectorsDataService.searchWithCurrentParams()
                .catch((error) => {
                const errorResponse = error;
                if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                    this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
                }
                else {
                    this.messageService.setMessage(this.apiIntegrationMicroserviceWebPage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
                }
            });
        });
        // Update the query string from changes to the currentSearchParams
        this.subscriptions.add(this.connectorsDataService.currentSearchParameters$
            // Skip the first item because it is the default value (from the search service initialization) - the value we actually want first is the one from the query param (above)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["skip"])(1))
            .subscribe(searchParams => {
            const queryParams = Object.assign(Object.assign(Object.assign({}, searchParams.text !== '' ? { search: searchParams.text } : undefined), searchParams.topic !== 'all-topics' ? { topic: searchParams.topic } : undefined), searchParams.page.toString() !== '1' ? { page: searchParams.page } : undefined);
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams,
                replaceUrl: true
            });
        }));
    }
    terminate() {
        this.subscriptions.unsubscribe();
    }
}
ConnectorsQueryParamsService.ɵfac = function ConnectorsQueryParamsService_Factory(t) { return new (t || ConnectorsQueryParamsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_7__["ConnectorsDataService"])); };
ConnectorsQueryParamsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ConnectorsQueryParamsService, factory: ConnectorsQueryParamsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConnectorsQueryParamsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"] }, { type: _ConnectorsDataService_connectors_data_service__WEBPACK_IMPORTED_MODULE_7__["ConnectorsDataService"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _overview_git_hub_overview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./overview/git-hub-overview.component */ "mkHt");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "6NWb");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./footer/footer.component */ "fp1T");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./search-bar/search-bar.component */ "j92K");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _connectors_connectors_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./connectors/connectors.component */ "VDWX");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./header/header.component */ "fECr");
/* harmony import */ var _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./preloader/preloader.component */ "IMFf");
/* harmony import */ var _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./custom-pagination-controls/custom-pagination-controls.component */ "0LBs");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-pagination */ "oOf3");
/* harmony import */ var _iot_iot_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./iot/iot.component */ "PY1i");
/* harmony import */ var _pipes_text_limit_text_limit_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../pipes/text-limit/text-limit.pipe */ "us8n");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./message/message.component */ "eUAL");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./project-card/project-card.component */ "MyZq");






















const appRoutes = [
    { path: '', component: _overview_git_hub_overview_component__WEBPACK_IMPORTED_MODULE_6__["GitHubOverviewComponent"] },
    { path: 'api-integration-microservices', component: _connectors_connectors_component__WEBPACK_IMPORTED_MODULE_11__["ConnectorsComponent"] },
    { path: 'iot-analytics', component: _iot_iot_component__WEBPACK_IMPORTED_MODULE_16__["IotComponent"] }
];
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot(appRoutes),
            ngx_pagination__WEBPACK_IMPORTED_MODULE_15__["NgxPaginationModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _overview_git_hub_overview_component__WEBPACK_IMPORTED_MODULE_6__["GitHubOverviewComponent"],
        _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
        _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_9__["SearchBarComponent"],
        _connectors_connectors_component__WEBPACK_IMPORTED_MODULE_11__["ConnectorsComponent"],
        _header_header_component__WEBPACK_IMPORTED_MODULE_12__["HeaderComponent"],
        _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_13__["PreloaderComponent"],
        _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_14__["CustomPaginationControlsComponent"],
        _iot_iot_component__WEBPACK_IMPORTED_MODULE_16__["IotComponent"],
        _message_message_component__WEBPACK_IMPORTED_MODULE_18__["MessageComponent"],
        _pipes_text_limit_text_limit_pipe__WEBPACK_IMPORTED_MODULE_17__["TextLimitPipe"],
        _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_19__["ProjectCardComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"], _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"], ngx_pagination__WEBPACK_IMPORTED_MODULE_15__["NgxPaginationModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                    _overview_git_hub_overview_component__WEBPACK_IMPORTED_MODULE_6__["GitHubOverviewComponent"],
                    _footer_footer_component__WEBPACK_IMPORTED_MODULE_8__["FooterComponent"],
                    _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_9__["SearchBarComponent"],
                    _connectors_connectors_component__WEBPACK_IMPORTED_MODULE_11__["ConnectorsComponent"],
                    _header_header_component__WEBPACK_IMPORTED_MODULE_12__["HeaderComponent"],
                    _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_13__["PreloaderComponent"],
                    _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_14__["CustomPaginationControlsComponent"],
                    _iot_iot_component__WEBPACK_IMPORTED_MODULE_16__["IotComponent"],
                    _message_message_component__WEBPACK_IMPORTED_MODULE_18__["MessageComponent"],
                    _pipes_text_limit_text_limit_pipe__WEBPACK_IMPORTED_MODULE_17__["TextLimitPipe"],
                    _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_19__["ProjectCardComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_3__["NgbModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"],
                    _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot(appRoutes),
                    ngx_pagination__WEBPACK_IMPORTED_MODULE_15__["NgxPaginationModule"],
                ],
                providers: [],
                bootstrap: [
                    _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "bewm":
/*!****************************************************************************!*\
  !*** ./src/services/Overview/OverViewDataService/overview-data.service.ts ***!
  \****************************************************************************/
/*! exports provided: OverviewDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewDataService", function() { return OverviewDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../DataService/data.service */ "5o1m");
/* harmony import */ var _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GitHubCacheService/git-hub-cache.service */ "i2k+");
/* harmony import */ var _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GoogleAnalyticsService/google-analytics.service */ "uF5Q");







class OverviewDataService extends _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] {
    constructor(gitHubCacheService, gaService) {
        super();
        this.gitHubCacheService = gitHubCacheService;
        this.gaService = gaService;
        this.softwareAGGitHubTopics = this.topics.filter(topic => topic.page.includes(_DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"].CONST_OVERVIEW_PAGE));
        this.currentSearchParameters$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            text: '',
            topic: 'all-topics',
            page: 1,
            pageSize: 9
        });
        this.lastSearchResult$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    // Return Topics
    getTopics() {
        return Promise.resolve(this.softwareAGGitHubTopics);
    }
    updateSearchParameters(params, ignorePageReset = false) {
        const currentSearchParams = this.currentSearchParameters$.getValue();
        // If the filters exist and have been changed, reset the page to page 1
        if (!ignorePageReset &&
            ((params.text && params.text !== currentSearchParams.text) ||
                (params.topic && params.topic !== currentSearchParams.topic))) {
            params.page = 1;
        }
        const newSearchParams = Object.assign({}, this.currentSearchParameters$.getValue(), params);
        this.currentSearchParameters$.next(newSearchParams);
    }
    searchWithCurrentParams() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.search(this.currentSearchParameters$.getValue());
        });
    }
    search(searchParams) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const softwareAGTopic = this.softwareAGGitHubTopics.find(t => t.id === searchParams.topic);
            let topics = '';
            if (softwareAGTopic && softwareAGTopic.topics.length > 0) {
                topics = softwareAGTopic.topics.filter(topic => topic.length > 0).reduce((result, topic) => result += `+topic:${topic}`, '');
            }
            let queryString = '';
            if (searchParams.text !== '') {
                queryString += `+${searchParams.text}+in:readme+${searchParams.text}+in:description+${searchParams.text}+in:name`;
            }
            if (topics !== '') {
                queryString += topics;
            }
            const response = yield this.gitHubCacheService.search('overview', queryString, searchParams.page, searchParams.pageSize);
            const getGitHubProjectsResponse = response;
            const searchResult = {
                params: searchParams,
                response: getGitHubProjectsResponse
            };
            this.lastSearchResult$.next(searchResult);
            this.gaService.pushToGoogleAnalytics();
            return searchResult;
        });
    }
}
OverviewDataService.ɵfac = function OverviewDataService_Factory(t) { return new (t || OverviewDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__["GitHubCacheService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__["GoogleAnalyticsService"])); };
OverviewDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OverviewDataService, factory: OverviewDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](OverviewDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__["GitHubCacheService"] }, { type: _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__["GoogleAnalyticsService"] }]; }, null); })();


/***/ }),

/***/ "eUAL":
/*!**********************************************!*\
  !*** ./src/app/message/message.component.ts ***!
  \**********************************************/
/*! exports provided: WebPage, MessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebPage", function() { return WebPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageComponent", function() { return MessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/MessageService/message.service */ "zFxm");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");




function MessageComponent_ng_container_0_div_4_Template(rf, ctx) { if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "span", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MessageComponent_ng_container_0_div_4_Template_img_click_12_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r3); const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r2.clearMessage(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx_r1.GetMessageBorderColour());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r1.getIcon(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getSeverity());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r1.getMessage());
} }
function MessageComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, MessageComponent_ng_container_0_div_4_Template, 13, 4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.getMessage() !== "");
} }
var WebPage;
(function (WebPage) {
    WebPage[WebPage["Overview"] = 1] = "Overview";
    WebPage[WebPage["ApiIntegrationMicroservice"] = 2] = "ApiIntegrationMicroservice";
    WebPage[WebPage["IoTAnalytics"] = 3] = "IoTAnalytics";
})(WebPage || (WebPage = {}));
class MessageComponent {
    constructor(messageService) {
        this.messageService = messageService;
    }
    getIcon() {
        if (this.messageService.message.type) {
            switch (this.messageService.message.type) {
                case 'ERROR':
                    return './assets/error.png';
                case 'WARNING':
                    return './assets/warning.png';
                default:
                    return '';
            }
        }
        else {
            return '';
        }
    }
    getSeverity() {
        if (this.messageService.message.type) {
            switch (this.messageService.message.type) {
                case 'SUCCESS':
                    return 'Success: ';
                case 'ERROR':
                    return 'Error: ';
                case 'WARNING':
                    return 'Warning: ';
                default:
                    return '';
            }
        }
        else {
            return '';
        }
    }
    getWebPage() {
        return this.messageService.webpage;
    }
    getMessage() {
        if (this.messageService.message.text) {
            return this.messageService.message.text;
        }
        else {
            return '';
        }
    }
    clearMessage() {
        this.messageService.clearMessage();
    }
    GetMessageBorderColour() {
        switch (this.messageService.message.type) {
            case 'SUCCESS':
                return 'border-left-success';
            case 'WARNING':
                return 'border-left-warning';
            case 'ERROR':
                return 'border-left-error';
            default:
                return '';
        }
    }
}
MessageComponent.WebPage = WebPage;
MessageComponent.ɵfac = function MessageComponent_Factory(t) { return new (t || MessageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"])); };
MessageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MessageComponent, selectors: [["app-message"]], inputs: { webpage: "webpage" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "message-container"], [1, "row"], [1, "col-12", "col-lg-12"], [3, "ngClass", 4, "ngIf"], [3, "ngClass"], [1, "col-2", "col-lg-1", "pr-0"], [1, "message-icon-container"], ["alt", "Notification Message Icon", 3, "src"], [1, "col-9", "col-lg-10"], [1, "message-text"], [1, "col-1", "col-lg-1", "pl-0", "message-icon-container"], ["id", "message-icon-close", "src", "./assets/icon-close.png", "alt", "Clear Message Icon", 3, "click"]], template: function MessageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MessageComponent_ng_container_0_Template, 5, 1, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.webpage === ctx.getWebPage());
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], styles: [".message-container[_ngcontent-%COMP%] {\r\n  position: fixed;\r\n  top: 10px;\r\n  right: 10px;\r\n  background: white;\r\n  z-index: 100;\r\n  line-height: 30px;\r\n  font-size: 12px;\r\n}\r\n\r\n.border-left-success[_ngcontent-%COMP%] {\r\n  border-left: 4px solid #BAD80A;\r\n}\r\n\r\n.border-left-warning[_ngcontent-%COMP%] {\r\n  border-left: 4px solid #ff6700;\r\n}\r\n\r\n.border-left-error[_ngcontent-%COMP%] {\r\n  border-left: 4px solid #FF1F2D;\r\n}\r\n\r\n.message-icon-container[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n.message-icon-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  width: 15px;\r\n  height: 15px;\r\n}\r\n\r\n.message-text[_ngcontent-%COMP%] {\r\n  white-space: pre-line;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2UuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixTQUFTO0VBQ1QsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UscUJBQXFCO0FBQ3ZCIiwiZmlsZSI6Im1lc3NhZ2UuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tZXNzYWdlLWNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IGZpeGVkO1xyXG4gIHRvcDogMTBweDtcclxuICByaWdodDogMTBweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICB6LWluZGV4OiAxMDA7XHJcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgZm9udC1zaXplOiAxMnB4O1xyXG59XHJcblxyXG4uYm9yZGVyLWxlZnQtc3VjY2VzcyB7XHJcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjQkFEODBBO1xyXG59XHJcblxyXG4uYm9yZGVyLWxlZnQtd2FybmluZyB7XHJcbiAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjZmY2NzAwO1xyXG59XHJcblxyXG4uYm9yZGVyLWxlZnQtZXJyb3Ige1xyXG4gIGJvcmRlci1sZWZ0OiA0cHggc29saWQgI0ZGMUYyRDtcclxufVxyXG5cclxuLm1lc3NhZ2UtaWNvbi1jb250YWluZXIge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLm1lc3NhZ2UtaWNvbi1jb250YWluZXIgPiBpbWcge1xyXG4gIHdpZHRoOiAxNXB4O1xyXG4gIGhlaWdodDogMTVweDtcclxufVxyXG5cclxuLm1lc3NhZ2UtdGV4dCB7XHJcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-message',
                templateUrl: './message.component.html',
                styleUrls: ['./message.component.css']
            }]
    }], function () { return [{ type: _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_1__["MessageService"] }]; }, { webpage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "fECr":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");





class HeaderComponent {
    constructor(router) {
        this.router = router;
        this.selectedMenuItem = 'HOME';
        this.router.events
            .subscribe(event => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]) {
                switch (true) {
                    case event.url.includes('connectors'):
                        this.selectedMenuItem = 'CONNECTORS';
                        break;
                    case event.url.includes('iot'):
                        this.selectedMenuItem = 'IOT';
                        break;
                    default:
                        this.selectedMenuItem = 'HOME';
                        break;
                }
            }
        });
    }
    ngOnInit() {
    }
    getClassForSelected(menuItem) {
        if (menuItem === this.selectedMenuItem) {
            return 'selected';
        }
        else {
            return 'not-selected';
        }
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 32, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col-lg-12"], [1, "navbar", "navbar-expand-lg", "navbar-light"], ["routerLink", "/", 1, "navbar-brand"], ["src", "./assets/software-ag-logo-core-dark-opt.svg", "alt", ""], ["type", "button", "data-toggle", "collapse", "data-target", "#navbarSupportedContent", "aria-controls", "navbarSupportedContent", "aria-expanded", "false", "aria-label", "Toggle navigation", 1, "navbar-toggler"], [1, "navbar-toggler-icon"], ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"], [1, "navbar-nav", "mr-auto"], [1, "nav-item"], ["routerLink", "/api-integration-microservices", 1, "nav-link"], ["routerLink", "/iot-analytics", 1, "nav-link"], ["href", "https://techcommunity.softwareag.com", "target", "_blank", "title", "Tech Community", 1, "nav-button"], [1, "nav-icon-container", "community-link-container"], ["id", "Layer_1", "data-name", "Layer 1", "xmlns", "http://www.w3.org/2000/svg", "viewBox", "0 0 86.41 86.41"], ["id", "Regular_237", "data-name", "Regular 237"], ["id", "Oval_313", "data-name", "Oval 313", "d", "M44.87,28.91a11,11,0,1,0-11-11h0A11,11,0,0,0,44.87,28.91Z", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Shape_961", "data-name", "Shape 961", "d", "M58.61,56.4V48.15a13.74,13.74,0,1,0-27.47-1c0,.34,0,.68,0,1V56.4h5.5l2.7,22h11l2.76-22Z", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Oval_314", "data-name", "Oval 314", "d", "M17.4,34.4a8.25,8.25,0,1,0-8.25-8.24v0a8.23,8.23,0,0,0,8.23,8.22Z", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Shape_962", "data-name", "Shape 962", "d", "M21.8,40.63A13.72,13.72,0,0,0,4.39,49.21a13.9,13.9,0,0,0-.73,4.43V56.4H9.15l2.76,16.47h11l1.36-8.26", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Oval_315", "data-name", "Oval 315", "d", "M72.35,34.4a8.25,8.25,0,1,0-8.25-8.24v0a8.23,8.23,0,0,0,8.23,8.22Z", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Shape_963", "data-name", "Shape 963", "d", "M68,40.63a13.72,13.72,0,0,1,18.11,13V56.4H80.58l-2.7,16.47h-11l-1.39-8.26", "transform", "translate(-1.66 -4.94)", 1, "cls-1"], ["id", "Shape_964", "data-name", "Shape 964", "d", "M86.07,81.12c0,4.55-18.44,8.23-41.2,8.23S3.66,85.71,3.66,81.12", "transform", "translate(-1.66 -4.94)", 1, "cls-2"], ["href", "https://www.softwareag.com/en_corporate/contact.html", "target", "_blank", "title", "Contact Software AG"], [1, "nav-icon-container"], ["viewBox", "0 0 128 128"], ["d", "M13.42,105.7a6.53,6.53,0,0,1-6.5-6.34v-.11L7,47.91h9l-.05,48.77,93-.51.45-57.2L66.18,73.37A6.52,6.52,0,0,1,57.91,73L14.61,35.54A6.5,6.5,0,0,1,18.9,24.16H94v9H25.61L62.33,64.93,107.9,28.67a6.51,6.51,0,0,1,10.55,5.14l-.51,64.91a6.54,6.54,0,0,1-6.47,6.45l-98,.53ZM63.8,66.19l.07.07A.46.46,0,0,0,63.8,66.19Z", 1, "a-icon__main-dark"], ["fill", "currentColor", "d", "M20.76,92.81h34.24v-7h-34.24Z", 1, "a-icon__accent-colored"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nav", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "ul", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "API, INTEGRATION & MICROSERVICES");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "li", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "IOT & ANALYTICS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "svg", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "g", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "path", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "path", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "path", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "path", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "path", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](25, "path", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "path", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "svg", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "path", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](31, "path", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbNavbar"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLinkWithHref"]], styles: ["nav[_ngcontent-%COMP%] {\r\n  height: 80px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   a.navbar-brand[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  height: 35px;\r\n  width: 200px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   ul.navbar-nav[_ngcontent-%COMP%] {\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%] {\r\n  width: 44px;\r\n  height: 44px;\r\n  padding-top: 10px;\r\n  text-align: center;\r\n  background-color: #3cc1b7;\r\n}\r\n\r\n#navbarSupportedContent[_ngcontent-%COMP%]    > a.nav-button[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\r\n  background-color: #d9ec27;\r\n  padding-top: 10px;\r\n  padding-left: 0;\r\n  padding-right: 0;\r\n}\r\n\r\n.community-link-img[_ngcontent-%COMP%] {\r\n  pointer-events: none;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%] {\r\n  height: 24px;\r\n  width: 24px;\r\n  color: #8e3cf7;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]:hover {\r\n  color: #011f3d;\r\n  fill: #8e3cf7;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]   .cls-1[_ngcontent-%COMP%] {\r\n  stroke: #06203c;\r\n  stroke-linecap: square;\r\n  fill: none;\r\n  stroke-width: 4px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]   .cls-2[_ngcontent-%COMP%] {\r\n  fill: none;\r\n  stroke-width: 4px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]   .cls-1[_ngcontent-%COMP%] {\r\n  stroke: #06203c;\r\n  stroke-linecap: square;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[_ngcontent-%COMP%]   .cls-2[_ngcontent-%COMP%] {\r\n  stroke: #7d5ea8;\r\n  stroke-linejoin: round;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   div.nav-icon-container[_ngcontent-%COMP%]    > svg[id=\"Layer_1\"][_ngcontent-%COMP%]:hover   path[_ngcontent-%COMP%] {\r\n  stroke: #8e3cf7;\r\n  fill: none;\r\n  stroke-width: 4px;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   a.nav-button[_ngcontent-%COMP%] {\r\n  margin-right: 20px;\r\n  color: #011f3d;\r\n}\r\n\r\nnav[_ngcontent-%COMP%]   a.nav-button[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\r\n  height: 44px;\r\n  padding-top: 12px;\r\n  padding-left: 15px;\r\n  padding-right: 15px;\r\n  background-color: #d9ec27;\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n}\r\n\r\n.nav-item[_ngcontent-%COMP%] {\r\n  padding-right: 20px;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%] {\r\n  color: #011f3d !important;\r\n  font-size: 14px;\r\n  font-weight: 700;\r\n}\r\n\r\n.nav-link[_ngcontent-%COMP%]:hover {\r\n  color: #8e3cf7 !important;\r\n}\r\n\r\n.header-logo-container[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n}\r\n\r\n.header-logo-container[_ngcontent-%COMP%]    > a[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  width: 200px;\r\n  height: 35px;\r\n  margin-top: 21px;\r\n}\r\n\r\n@media(max-width: 1024px) and (min-width: 415px) {\r\n  nav[_ngcontent-%COMP%] {\r\n    height: inherit;\r\n  }\r\n  #navbarSupportedContent[_ngcontent-%COMP%] {\r\n    padding-left: 15px;\r\n    padding-top: 10px;\r\n    background-color: #f2f2ea;\r\n    z-index: 100;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n  nav[_ngcontent-%COMP%] {\r\n    height: inherit;\r\n  }\r\n  #navbarSupportedContent[_ngcontent-%COMP%] {\r\n    padding-left: 15px;\r\n    padding-top: 10px;\r\n    background-color: #f2f2ea;\r\n    z-index: 100;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0Usb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztFQUNkLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLFVBQVU7RUFDVixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxlQUFlO0VBQ2Ysc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7RUFDZixVQUFVO0VBQ1YsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSx5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0U7SUFDRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLHlCQUF5QjtJQUN6QixZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsZUFBZTtFQUNqQjtFQUNBO0lBQ0Usa0JBQWtCO0lBQ2xCLGlCQUFpQjtJQUNqQix5QkFBeUI7SUFDekIsWUFBWTtFQUNkO0FBQ0YiLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJuYXYge1xyXG4gIGhlaWdodDogODBweDtcclxufVxyXG5cclxubmF2IGEubmF2YmFyLWJyYW5kID4gaW1nIHtcclxuICBoZWlnaHQ6IDM1cHg7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG59XHJcblxyXG5uYXYgdWwubmF2YmFyLW5hdiB7XHJcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG5uYXYgZGl2Lm5hdi1pY29uLWNvbnRhaW5lciB7XHJcbiAgd2lkdGg6IDQ0cHg7XHJcbiAgaGVpZ2h0OiA0NHB4O1xyXG4gIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2NjMWI3O1xyXG59XHJcblxyXG4jbmF2YmFyU3VwcG9ydGVkQ29udGVudCA+IGEubmF2LWJ1dHRvbiA+IGRpdiB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Q5ZWMyNztcclxuICBwYWRkaW5nLXRvcDogMTBweDtcclxuICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgcGFkZGluZy1yaWdodDogMDtcclxufVxyXG5cclxuLmNvbW11bml0eS1saW5rLWltZyB7XHJcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XHJcbn1cclxuXHJcbm5hdiBkaXYubmF2LWljb24tY29udGFpbmVyID4gc3ZnIHtcclxuICBoZWlnaHQ6IDI0cHg7XHJcbiAgd2lkdGg6IDI0cHg7XHJcbiAgY29sb3I6ICM4ZTNjZjc7XHJcbn1cclxuXHJcbm5hdiBkaXYubmF2LWljb24tY29udGFpbmVyID4gc3ZnOmhvdmVyIHtcclxuICBjb2xvcjogIzAxMWYzZDtcclxuICBmaWxsOiAjOGUzY2Y3O1xyXG59XHJcblxyXG5uYXYgZGl2Lm5hdi1pY29uLWNvbnRhaW5lciA+IHN2ZyAuY2xzLTEge1xyXG4gIHN0cm9rZTogIzA2MjAzYztcclxuICBzdHJva2UtbGluZWNhcDogc3F1YXJlO1xyXG4gIGZpbGw6IG5vbmU7XHJcbiAgc3Ryb2tlLXdpZHRoOiA0cHg7XHJcbn1cclxuXHJcbm5hdiBkaXYubmF2LWljb24tY29udGFpbmVyID4gc3ZnIC5jbHMtMiB7XHJcbiAgZmlsbDogbm9uZTtcclxuICBzdHJva2Utd2lkdGg6IDRweDtcclxufVxyXG5cclxubmF2IGRpdi5uYXYtaWNvbi1jb250YWluZXIgPiBzdmcgLmNscy0xIHtcclxuICBzdHJva2U6ICMwNjIwM2M7XHJcbiAgc3Ryb2tlLWxpbmVjYXA6IHNxdWFyZTtcclxufVxyXG5cclxubmF2IGRpdi5uYXYtaWNvbi1jb250YWluZXIgPiBzdmcgLmNscy0yIHtcclxuICBzdHJva2U6ICM3ZDVlYTg7XHJcbiAgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDtcclxufVxyXG5cclxubmF2IGRpdi5uYXYtaWNvbi1jb250YWluZXIgPiBzdmdbaWQ9XCJMYXllcl8xXCJdOmhvdmVyIHBhdGgge1xyXG4gIHN0cm9rZTogIzhlM2NmNztcclxuICBmaWxsOiBub25lO1xyXG4gIHN0cm9rZS13aWR0aDogNHB4O1xyXG59XHJcblxyXG5uYXYgYS5uYXYtYnV0dG9uIHtcclxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XHJcbiAgY29sb3I6ICMwMTFmM2Q7XHJcbn1cclxuXHJcbm5hdiBhLm5hdi1idXR0b24gPiBkaXYge1xyXG4gIGhlaWdodDogNDRweDtcclxuICBwYWRkaW5nLXRvcDogMTJweDtcclxuICBwYWRkaW5nLWxlZnQ6IDE1cHg7XHJcbiAgcGFkZGluZy1yaWdodDogMTVweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDllYzI3O1xyXG4gIGZvbnQtc2l6ZTogMTRweDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG59XHJcblxyXG4ubmF2LWl0ZW0ge1xyXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbn1cclxuXHJcbi5uYXYtbGluayB7XHJcbiAgY29sb3I6ICMwMTFmM2QgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDE0cHg7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxufVxyXG5cclxuLm5hdi1saW5rOmhvdmVyIHtcclxuICBjb2xvcjogIzhlM2NmNyAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uaGVhZGVyLWxvZ28tY29udGFpbmVyIHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5oZWFkZXItbG9nby1jb250YWluZXIgPiBhID4gaW1nIHtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgaGVpZ2h0OiAzNXB4O1xyXG4gIG1hcmdpbi10b3A6IDIxcHg7XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDEwMjRweCkgYW5kIChtaW4td2lkdGg6IDQxNXB4KSB7XHJcbiAgbmF2IHtcclxuICAgIGhlaWdodDogaW5oZXJpdDtcclxuICB9XHJcbiAgI25hdmJhclN1cHBvcnRlZENvbnRlbnQge1xyXG4gICAgcGFkZGluZy1sZWZ0OiAxNXB4O1xyXG4gICAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJmMmVhO1xyXG4gICAgei1pbmRleDogMTAwO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG4gIG5hdiB7XHJcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XHJcbiAgfVxyXG4gICNuYXZiYXJTdXBwb3J0ZWRDb250ZW50IHtcclxuICAgIHBhZGRpbmctbGVmdDogMTVweDtcclxuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJlYTtcclxuICAgIHotaW5kZXg6IDEwMDtcclxuICB9XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.css']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] }]; }, null); })();


/***/ }),

/***/ "fp1T":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], inputs: { appLogo: "appLogo" }, decls: 122, vars: 0, consts: [[1, "footer-container"], [1, "container"], [1, "row"], [1, "col-lg-12"], ["src", "./assets/software-ag-logo-core-light.svg", 1, "img-fluid", "logo"], [1, "container", "links-container"], [1, "col-lg-3"], [1, "heading"], ["href", "https://tech.forums.softwareag.com/tag/adabas-natural", "target", "_blank", "title", "Adabas & Natural", 1, "link"], ["href", "https://tech.forums.softwareag.com/t/alfabet-or-alfabet-fastlane-customer/226672", "target", "_blank", "title", "Alfabet", 1, "link"], ["href", "https://tech.forums.softwareag.com/tag/aris", "target", "_blank", "title", "ARIS", 1, "link"], ["href", "https://tech.forums.softwareag.com/tag/streaming-analytics-apama", "target", "_blank", "title", "Apama", 1, "link"], ["href", "https://tech.forums.softwareag.com/tag/cumulocity-iot", "target", "_blank", "title", "Cumulocity IoT", 1, "link"], ["href", "https://www.terracotta.org/", "target", "_blank", "title", "Terracotta", 1, "link"], ["href", "https://tech.forums.softwareag.com/tag/webmethods", "target", "_blank", "title", "webMethods", 1, "link"], ["href", "https://hub.docker.com/publishers/softwareag", "target", "_blank", "title", "Docker Hub", 1, "link"], ["href", "https://documentation.softwareag.com/", "target", "_blank", "title", "Documentation", 1, "link"], ["href", "https://knowledge.softwareag.com", "target", "_blank", "title", "Learning Portal", 1, "link"], ["href", "https://groups.softwareag.com/", "target", "_blank", "title", "User Groups", 1, "link"], ["href", "https://devicepartnerportal.softwareag.com", "target", "_blank", "title", "Device Partner Portal", 1, "link"], ["href", "https://techradar.softwareag.com", "target", "_blank", "title", "Tech Radar", 1, "link"], ["href", "https://arishub.ariscommunity.com", "target", "_blank", "title", "ARIS Hub", 1, "link"], ["href", "https://tech.forums.softwareag.com/new-topic", "target", "_blank", 1, "link"], ["href", "https://twitter.com/techcomm_sag", "target", "_blank", 1, "link"], ["href", "https://dev.to/techcommunity", "target", "_blank", 1, "link"], ["href", "https://www.youtube.com/user/softwareag", "target", "_blank", 1, "link"], ["href", "https://tech.forums.softwareag.com/my/preferences/notifications", "target", "_blank", 1, "link"], ["href", "https://tech.forums.softwareag.com/latest.rss", "target", "_blank", 1, "link"], ["href", "https://info.softwareag.com/TechCommunity-Subscription-Page.html", "target", "_blank", 1, "link"], [1, "col-lg-8"], [1, "links"], ["href", "https://www.softwareag.com/en_corporate/company/csr.html", "target", "_blank", "title", "Social Responsibility"], ["href", "https://www.softwareag.com/en_corporate/legal.html", "target", "_blank", "title", "Legal Aspects"], ["href", "https://www.softwareag.com/en_corporate/impressum.html", "target", "_blank", "title", "Imprint"], ["href", "https://www.softwareag.com/en_corporate/privacy.html", "target", "_blank", "title", "Privacy"], ["id", "consent_blackbar"], ["id", "teconsent", "consent", "0,1,2"], [1, "col-lg-4"], [1, "sm-links"], ["href", "https://www.linkedin.com/company/software-ag", "target", "_blank"], ["src", "./assets/icon-linkedin.svg", "alt", "LinkedIn", "title", "LinkedIn"], ["href", "https://www.facebook.com/SoftwareAG", "target", "_blank"], ["src", "./assets/icon-facebook.svg", "alt", "Facebook", "title", "Facebook"], ["href", "https://twitter.com/softwareag", "target", "_blank"], ["src", "./assets/icon-twitter.svg", "alt", "Twitter", "title", "Twitter"], ["href", "https://www.youtube.com/user/SOFTWAREAG", "target", "_blank"], ["src", "./assets/icon-youtube.svg", "alt", "YouTube", "title", "YouTube"], ["href", "https://www.softwareag.com/en_corporate/resources/communities.html", "target", "_blank"], ["src", "./assets/icon-tech-comm.svg", "alt", "Tech Communities", "title", "Tech Communities"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Communities");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "a", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Adabas & Natural");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Alfabet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "ARIS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "a", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "Apama");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "a", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Cumulocity IoT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "a", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Terracotta");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "a", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "webMethods");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Discover");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Docker Hub");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Documentation");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "a", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Learning Portal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "a", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "User Groups");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "a", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Device Partner Portal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Tech Radar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "a", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "ARIS Hub");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "Connect");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "a", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "Ask question");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "a", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Follow us on Twitter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "a", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Follow us on Dev.to");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "a", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "Follow us on YouTube");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Subscribe to notifications");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "a", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Subscribe to RSS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Subscribe to newsletter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](83, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "div", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "ul", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "\u00A9 2022 Software AG");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "a", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "Social Responsibility");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "a", 32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "Legal Aspects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](97, "a", 33);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](98, "Imprint");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "a", 34);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "Privacy");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](103, "div", 35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](104, "div", 36);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](105, "div", 37);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "ul", 38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "a", 39);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](109, "img", 40);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](110, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "a", 41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](112, "img", 42);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](114, "a", 43);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "img", 44);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "a", 45);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](118, "img", 46);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "a", 47);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](121, "img", 48);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: [".footer-container {\r\n  background-color: #011f3d;\r\n  padding: 40px;\r\n}\r\n\r\n.footer-container img.logo {\r\n  width: 25rem;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n.footer-container hr {\r\n  border: 0;\r\n  border-bottom: 1px solid #f2f2ea;\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n.footer-container ul.links {\r\n  font-size: 1.4rem;\r\n  line-height: 3.8rem;\r\n  padding-left: 0px !important;\r\n}\r\n\r\n.footer-container ul.links li {\r\n  display: inline;\r\n  color: #a6b1bb;\r\n  padding-right: 10px;\r\n}\r\n\r\n.footer-container ul.links li a {\r\n  color: #a6b1bb;\r\n}\r\n\r\n.footer-container ul.links li > a:hover {\r\n  color: #ffffff;\r\n}\r\n\r\n.footer-container ul.links li .cookie-preferences-link {\r\n  cursor: pointer;\r\n}\r\n\r\n.footer-container ul.sm-links {\r\n  font-size: 1.4rem;\r\n  line-height: 3.8rem;\r\n}\r\n\r\n.footer-container ul.sm-links li {\r\n  display: inline;\r\n  color: #a6b1bb;\r\n  padding-right: 10px;\r\n}\r\n\r\n.footer-container ul.sm-links li img {\r\n  width: 40px;\r\n}\r\n\r\n.footer-container ul.sm-links li > a {\r\n  position: relative;\r\n  color: #a6b1bb;\r\n  top: 0px;\r\n}\r\n\r\n.footer-container ul.sm-links li > a:hover {\r\n  color: #ffffff;\r\n  transition: top 0.2s linear;\r\n  top: 10px;\r\n}\r\n\r\n.footer-container .links-container {\r\n  margin-bottom: 3rem;\r\n}\r\n\r\n.footer-container .links-container div.heading > h2 {\r\n  font-size: 2.8rem;\r\n  line-height: 3.8rem;\r\n  margin-bottom: 2rem;\r\n  letter-spacing: 0.1rem;\r\n  color: #ffffff;\r\n  font-weight: 700;\r\n}\r\n\r\n.footer-container .links-container a.link {\r\n  color: #a6b1bb;\r\n  font-size: 1.8rem;\r\n  line-height: 2.8rem;\r\n}\r\n\r\n.footer-container .links-container a.link:hover {\r\n  color: #ffffff;\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n\r\n  .footer-container ul.links {\r\n    padding-left: 0;\r\n  }\r\n\r\n  .footer-container ul.sm-links {\r\n    padding-left: 0;\r\n  }\r\n\r\n  .footer-container .links-container div.heading > h2 {\r\n    margin-top: 2rem;\r\n  }\r\n\r\n\r\n}\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvb3Rlci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQXlCO0VBQ3pCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxTQUFTO0VBQ1QsZ0NBQWdDO0VBQ2hDLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixtQkFBbUI7RUFDbkIsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGNBQWM7RUFDZCxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsY0FBYztFQUNkLFFBQVE7QUFDVjs7QUFFQTtFQUNFLGNBQWM7RUFDZCwyQkFBMkI7RUFDM0IsU0FBUztBQUNYOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGNBQWM7RUFDZCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGNBQWM7QUFDaEI7O0FBRUE7O0VBRUU7SUFDRSxlQUFlO0VBQ2pCOztFQUVBO0lBQ0UsZUFBZTtFQUNqQjs7RUFFQTtJQUNFLGdCQUFnQjtFQUNsQjs7O0FBR0YiLCJmaWxlIjoiZm9vdGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9vdGVyLWNvbnRhaW5lciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAxMWYzZDtcclxuICBwYWRkaW5nOiA0MHB4O1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbnRhaW5lciBpbWcubG9nbyB7XHJcbiAgd2lkdGg6IDI1cmVtO1xyXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIGhyIHtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNmMmYyZWE7XHJcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgdWwubGlua3Mge1xyXG4gIGZvbnQtc2l6ZTogMS40cmVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAzLjhyZW07XHJcbiAgcGFkZGluZy1sZWZ0OiAwcHggIWltcG9ydGFudDtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgdWwubGlua3MgbGkge1xyXG4gIGRpc3BsYXk6IGlubGluZTtcclxuICBjb2xvcjogI2E2YjFiYjtcclxuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbnRhaW5lciB1bC5saW5rcyBsaSBhIHtcclxuICBjb2xvcjogI2E2YjFiYjtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgdWwubGlua3MgbGkgPiBhOmhvdmVyIHtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgdWwubGlua3MgbGkgLmNvb2tpZS1wcmVmZXJlbmNlcy1saW5rIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIHVsLnNtLWxpbmtzIHtcclxuICBmb250LXNpemU6IDEuNHJlbTtcclxuICBsaW5lLWhlaWdodDogMy44cmVtO1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbnRhaW5lciB1bC5zbS1saW5rcyBsaSB7XHJcbiAgZGlzcGxheTogaW5saW5lO1xyXG4gIGNvbG9yOiAjYTZiMWJiO1xyXG4gIHBhZGRpbmctcmlnaHQ6IDEwcHg7XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIHVsLnNtLWxpbmtzIGxpIGltZyB7XHJcbiAgd2lkdGg6IDQwcHg7XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIHVsLnNtLWxpbmtzIGxpID4gYSB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIGNvbG9yOiAjYTZiMWJiO1xyXG4gIHRvcDogMHB4O1xyXG59XHJcblxyXG4uZm9vdGVyLWNvbnRhaW5lciB1bC5zbS1saW5rcyBsaSA+IGE6aG92ZXIge1xyXG4gIGNvbG9yOiAjZmZmZmZmO1xyXG4gIHRyYW5zaXRpb246IHRvcCAwLjJzIGxpbmVhcjtcclxuICB0b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIC5saW5rcy1jb250YWluZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIC5saW5rcy1jb250YWluZXIgZGl2LmhlYWRpbmcgPiBoMiB7XHJcbiAgZm9udC1zaXplOiAyLjhyZW07XHJcbiAgbGluZS1oZWlnaHQ6IDMuOHJlbTtcclxuICBtYXJnaW4tYm90dG9tOiAycmVtO1xyXG4gIGxldHRlci1zcGFjaW5nOiAwLjFyZW07XHJcbiAgY29sb3I6ICNmZmZmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IDcwMDtcclxufVxyXG5cclxuLmZvb3Rlci1jb250YWluZXIgLmxpbmtzLWNvbnRhaW5lciBhLmxpbmsge1xyXG4gIGNvbG9yOiAjYTZiMWJiO1xyXG4gIGZvbnQtc2l6ZTogMS44cmVtO1xyXG4gIGxpbmUtaGVpZ2h0OiAyLjhyZW07XHJcbn1cclxuXHJcbi5mb290ZXItY29udGFpbmVyIC5saW5rcy1jb250YWluZXIgYS5saW5rOmhvdmVyIHtcclxuICBjb2xvcjogI2ZmZmZmZjtcclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA2MDBweCkge1xyXG5cclxuICAuZm9vdGVyLWNvbnRhaW5lciB1bC5saW5rcyB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgfVxyXG5cclxuICAuZm9vdGVyLWNvbnRhaW5lciB1bC5zbS1saW5rcyB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDA7XHJcbiAgfVxyXG5cclxuICAuZm9vdGVyLWNvbnRhaW5lciAubGlua3MtY29udGFpbmVyIGRpdi5oZWFkaW5nID4gaDIge1xyXG4gICAgbWFyZ2luLXRvcDogMnJlbTtcclxuICB9XHJcblxyXG5cclxufSJdfQ== */"], encapsulation: 2 });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.css'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None
            }]
    }], function () { return []; }, { appLogo: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "i2k+":
/*!******************************************************************!*\
  !*** ./src/services/GitHubCacheService/git-hub-cache.service.ts ***!
  \******************************************************************/
/*! exports provided: GitHubCacheService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitHubCacheService", function() { return GitHubCacheService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");




class GitHubCacheService {
    constructor(http) {
        this.http = http;
        this.CONST_CACHE_DATA_TIMEOUT_IN_MINUTES = 5;
        this.CONST_GITHUB_FORWARD_RETRIEVE_PAGE_SIZE = 18;
        this.CONST_GITHUB_HEADERS = {
            'Content-Type': 'application/json'
        };
    }
    search(pageName, queryString, page, pageSize) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let getGitHubProjectsResponse;
            let dataExpired = true;
            const cacheKey = `${pageName}:${page}:${pageSize}:${queryString}`;
            const sessionCachedGitHubProjects = sessionStorage.getItem(cacheKey);
            let cachedGitHubProjects;
            if (sessionCachedGitHubProjects !== null) {
                cachedGitHubProjects = JSON.parse(sessionCachedGitHubProjects);
                const cachedGitHubProjectsExpiryDateTime = new Date(Date.parse(cachedGitHubProjects.expiresAt));
                if (cachedGitHubProjectsExpiryDateTime > new Date()) {
                    dataExpired = false;
                }
            }
            if (dataExpired) {
                // Retrieve the data from github
                try {
                    // make sure we get the right page number based on the page requested e.g. if the user selects page 2, make sure we request and store pages 1 and 2 and then return 2
                    const retrievalPage = page - Math.floor((page / (this.CONST_GITHUB_FORWARD_RETRIEVE_PAGE_SIZE / pageSize)));
                    const response = yield this.http.get(`https://api.github.com/search/repositories?q=org:softwareag${queryString}&sort=updated&order=desc&page=${retrievalPage}&per_page=${this.CONST_GITHUB_FORWARD_RETRIEVE_PAGE_SIZE}`, { headers: this.CONST_GITHUB_HEADERS })
                        .toPromise();
                    getGitHubProjectsResponse = response;
                    // Store the retrieved data in session
                    this.persistGitHubProjectsToSessionStorage(pageName, queryString, page, pageSize, getGitHubProjectsResponse).then();
                    // return the data for the requested page
                    return Promise.resolve({
                        total_count: getGitHubProjectsResponse.total_count,
                        items: page % 2 === 0 ? getGitHubProjectsResponse.items.slice(9, this.CONST_GITHUB_FORWARD_RETRIEVE_PAGE_SIZE) : getGitHubProjectsResponse.items.slice(0, pageSize),
                        incomplete_results: getGitHubProjectsResponse.incomplete_results
                    });
                }
                catch (error) {
                    const errorResponse = error;
                    return Promise.reject(errorResponse);
                }
            }
            else {
                return Promise.resolve(cachedGitHubProjects.data);
            }
        });
    }
    persistGitHubProjectsToSessionStorage(pageName, queryString, page, pageSize, getGitHubProjectsResponse) {
        // Asynchronously write the data to the session
        return new Promise((resolve, reject) => {
            let cacheKey = '';
            const expiresAt = new Date();
            expiresAt.setMinutes(expiresAt.getMinutes() + this.CONST_CACHE_DATA_TIMEOUT_IN_MINUTES);
            // If the user requested an even page, decrement the page value as we will have retrieved the [page-1, page] data
            if (page % 2 === 0) {
                page--;
            }
            for (let counter = 0, fromPageNumber = page; counter < getGitHubProjectsResponse.items.length; counter += pageSize, fromPageNumber++) {
                cacheKey = `${pageName}:${fromPageNumber}:${pageSize}:${queryString}`;
                sessionStorage.setItem(cacheKey, JSON.stringify({
                    expiresAt,
                    data: {
                        incomplete_results: getGitHubProjectsResponse.incomplete_results,
                        items: getGitHubProjectsResponse.items.slice(counter, counter + pageSize),
                        total_count: getGitHubProjectsResponse.total_count
                    }
                }));
            }
            resolve();
        });
    }
}
GitHubCacheService.ɵfac = function GitHubCacheService_Factory(t) { return new (t || GitHubCacheService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"])); };
GitHubCacheService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GitHubCacheService, factory: GitHubCacheService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GitHubCacheService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }]; }, null); })();


/***/ }),

/***/ "j92K":
/*!****************************************************!*\
  !*** ./src/app/search-bar/search-bar.component.ts ***!
  \****************************************************/
/*! exports provided: SearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarComponent", function() { return SearchBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");



class SearchBarComponent {
    constructor() {
        this.searchText = '';
        this.search = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    searchForText() {
        this.search.emit(this.searchText);
    }
    keyUp(event) {
        if ((event.key === 'Enter' && this.searchText !== '') || this.searchText === '') {
            this.searchForText();
        }
    }
}
SearchBarComponent.ɵfac = function SearchBarComponent_Factory(t) { return new (t || SearchBarComponent)(); };
SearchBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SearchBarComponent, selectors: [["app-search-bar"]], inputs: { searchText: "searchText", gihHubService: "gihHubService" }, outputs: { search: "search" }, decls: 3, vars: 1, consts: [[1, "row"], [1, "col-lg-12"], ["placeholder", "Search...", "type", "text", 1, "form-control", "text", 3, "ngModel", "ngModelChange", "keyup"]], template: function SearchBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "input", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function SearchBarComponent_Template_input_ngModelChange_2_listener($event) { return ctx.searchText = $event; })("keyup", function SearchBarComponent_Template_input_keyup_2_listener($event) { return ctx.keyUp($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.searchText);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgModel"]], styles: ["input.form-control[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 0;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC1iYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFNBQVM7RUFDVCxnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW5wdXQuZm9ybS1jb250cm9sIHtcclxuICBib3JkZXI6IDA7XHJcbiAgYm9yZGVyLXJhZGl1czogMDtcclxufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SearchBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-search-bar',
                templateUrl: './search-bar.component.html',
                styleUrls: ['./search-bar.component.css']
            }]
    }], function () { return []; }, { searchText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], gihHubService: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], search: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "mkHt":
/*!********************************************************!*\
  !*** ./src/app/overview/git-hub-overview.component.ts ***!
  \********************************************************/
/*! exports provided: GitHubOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GitHubOverviewComponent", function() { return GitHubOverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _message_message_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../message/message.component */ "eUAL");
/* harmony import */ var _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/MessageService/message.service */ "zFxm");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../classes/constants */ "2QUj");
/* harmony import */ var _services_Overview_OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/Overview/OverViewDataService/overview-data.service */ "bewm");
/* harmony import */ var _services_Overview_OverviewQueryParamsService_overview_query_params_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/Overview/OverviewQueryParamsService/overview-query-params.service */ "6k+Y");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../search-bar/search-bar.component */ "j92K");
/* harmony import */ var _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../custom-pagination-controls/custom-pagination-controls.component */ "0LBs");
/* harmony import */ var _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../project-card/project-card.component */ "MyZq");
/* harmony import */ var _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../preloader/preloader.component */ "IMFf");
/* harmony import */ var ngx_pagination__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ngx-pagination */ "oOf3");



















function GitHubOverviewComponent_ng_container_74_option_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const softwareAGTopic_r10 = ctx.$implicit;
    const searchResult_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", softwareAGTopic_r10.id)("selected", searchResult_r5.params.topic == softwareAGTopic_r10.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](softwareAGTopic_r10.name);
} }
function GitHubOverviewComponent_ng_container_74_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-public-custom-pagination", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function GitHubOverviewComponent_ng_container_74_div_11_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r12.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GitHubOverviewComponent_ng_container_74_div_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-project-card", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const searchedGitHubProject_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("gitHubProject", searchedGitHubProject_r14);
} }
function GitHubOverviewComponent_ng_container_74_div_17_Template(rf, ctx) { if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "app-public-custom-pagination", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("pageChange", function GitHubOverviewComponent_ng_container_74_div_17_Template_app_public_custom_pagination_pageChange_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r16); const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r15.goToPage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function (a0, a1, a2) { return { itemsPerPage: a0, currentPage: a1, totalItems: a2 }; };
function GitHubOverviewComponent_ng_container_74_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "select", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function GitHubOverviewComponent_ng_container_74_Template_select_change_3_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.selectedSoftwareAGTopic($event.target.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, GitHubOverviewComponent_ng_container_74_option_4_Template, 2, 3, "option", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "app-search-bar", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("search", function GitHubOverviewComponent_ng_container_74_Template_app_search_bar_search_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r18); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r19.searchGitHubProjectsByText($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, GitHubOverviewComponent_ng_container_74_div_11_Template, 4, 0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, GitHubOverviewComponent_ng_container_74_div_15_Template, 2, 1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "paginate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, GitHubOverviewComponent_ng_container_74_div_17_Template, 4, 0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const searchResult_r5 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", searchResult_r5.params.topic);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r0.softwareAGTopics);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("searchText", searchResult_r5.params.text);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", searchResult_r5.response.total_count, " record(s) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", searchResult_r5.response.total_count > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](16, 7, searchResult_r5.response.items, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](10, _c0, searchResult_r5.params.pageSize, searchResult_r5.params.page, searchResult_r5.response.total_count)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", searchResult_r5.response.total_count > 0);
} }
function GitHubOverviewComponent_ng_template_76_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-preloader");
} }
function GitHubOverviewComponent_ng_template_78_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-preloader");
} }
class GitHubOverviewComponent {
    constructor(overviewService, messageService, overviewQueryParamsService, titleService, metaTagService, route) {
        this.overviewService = overviewService;
        this.messageService = messageService;
        this.overviewQueryParamsService = overviewQueryParamsService;
        this.titleService = titleService;
        this.metaTagService = metaTagService;
        this.route = route;
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
        this.initialPageLoad = true;
        this.softwareAGTopics = [];
        this.overViewWebpage = _message_message_component__WEBPACK_IMPORTED_MODULE_2__["WebPage"].Overview;
    }
    ngOnInit() {
        this.overviewQueryParamsService.initialize();
        this.subscriptions.add(this.overviewService.lastSearchResult$.subscribe((lastSearchResult) => {
            // Only scroll on initial page load and where a dropdown or search text has been provided (in the url)
            const queryParamMap = this.route.snapshot.queryParamMap;
            if (this.initialPageLoad && (queryParamMap.has('topic') || queryParamMap.has('search') || queryParamMap.has('page'))) {
                setTimeout(() => {
                    this.scrollToProjects();
                }, 0);
            }
            this.initialPageLoad = false;
        }));
        this.metaTagService.updateTag({ name: 'description', content: 'Software AG Open Source – discover projects by Software AG and partners, code samples and resources to accelerate innovation.' });
        this.metaTagService.updateTag({ name: 'keywords', content: 'github, open source, code, webmethods, integration, cumulocity iot, internet of things, adabas, apama, zementis' });
        this.titleService.setTitle(`${_classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].CONST_APPLICATION_NAME}`);
        // Retrieve the list of Software AG Topics
        this.overviewService.getTopics()
            .then((softwareAGTopics) => {
            this.softwareAGTopics = softwareAGTopics;
        });
    }
    // User selected a Software AG Topic from the dropdown
    selectedSoftwareAGTopic(topic) {
        this.overviewService.updateSearchParameters({
            topic,
            page: 1,
        });
        this.overviewService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    // User entered text into the Search... field
    searchGitHubProjectsByText(searchText) {
        this.overviewService.updateSearchParameters({
            text: searchText,
            page: 1,
        });
        this.overviewService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    goToPage(pageNumber) {
        this.overviewService.updateSearchParameters({
            page: pageNumber,
        });
        this.overviewService.searchWithCurrentParams()
            .catch((error) => {
            const errorResponse = error;
            if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_4__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
            }
            else {
                this.messageService.setMessage(this.overViewWebpage, _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
            }
        });
    }
    scrollToProjects() {
        document.querySelector('#all-projects').scrollIntoView();
    }
    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
GitHubOverviewComponent.ɵfac = function GitHubOverviewComponent_Factory(t) { return new (t || GitHubOverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_Overview_OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_5__["OverviewDataService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_Overview_OverviewQueryParamsService_overview_query_params_service__WEBPACK_IMPORTED_MODULE_6__["OverviewQueryParamsService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Meta"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"])); };
GitHubOverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GitHubOverviewComponent, selectors: [["app-github-overview"]], decls: 80, vars: 5, consts: [[3, "webpage"], [1, "page-header-container"], [1, "img-container"], ["src", "./assets/banner.jpeg", "alt", "Homepage Banner"], [1, "container", "content-container"], [1, "row"], [1, "col-xl-12", "col-lg-12"], [1, "heading"], [1, "teaser"], [1, "col-lg-4"], ["routerLink", "", 1, "link", "brown", 3, "click"], [1, "link-container"], ["title", "ALL PROJECTS"], [1, "text"], [1, "section-container", "white"], [1, "container"], [1, "col-lg-12"], [1, "offset-lg-1", "col-lg-10", "title-container"], [1, "flex-container", "quicklinks"], [1, "card"], ["href", "https://github.com/SoftwareAG/cumulocity-app-builder", "target", "_blank"], [1, "card-body"], [1, "col-lg-12", "img-container"], ["src", "assets/arrow-icon-1.jfif", "alt", "arrow"], [1, "col-lg-12", "title-container"], ["title", "Application Builder for Cumulocity IoT"], ["href", "https://github.com/SoftwareAG/webmethods-integrationserver-skyprofiler", "target", "_blank"], ["title", "webMethods Integration Server Sky Profiler"], ["href", "https://github.com/SoftwareAG/webmethods-api-gateway", "target", "_blank"], ["title", "webMethods API Gateway"], ["id", "all-projects", 1, "section-container", "brown"], [4, "ngIf", "ngIfElse"], ["featuredGitHubProjectsPreloader", ""], ["searchGitHubProjectsPreloader", ""], [1, "col-6", "col-lg-3", "offset-lg-2", "p-2"], [1, "form-control", "text", 3, "ngModel", "change"], [3, "value", "selected", 4, "ngFor", "ngForOf"], [1, "col-12", "col-lg-5", "p-2"], [1, "search-container"], [3, "searchText", "search"], [1, "d-flex", "justify-content-center"], [1, "p-2", "text"], [4, "ngIf"], [1, "flex-container"], ["class", "card-container", 4, "ngFor", "ngForOf"], [3, "value", "selected"], [1, "pagination-container", "top"], ["previousLabel", "Prev", 3, "pageChange"], [1, "card-container"], [3, "gitHubProject"], [1, "pagination-container", "bottom"]], template: function GitHubOverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-message", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h1", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Software AG Open Source");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Access all of our Open Source projects, sample code and tools. Fork, commit and collaborate on open repositories.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "a", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GitHubOverviewComponent_Template_a_click_15_listener() { return ctx.scrollToProjects(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "span", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "span", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "ALL PROJECTS");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "Featured");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "a", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](37, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "h4", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Application Builder for Cumulocity IoT");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "a", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](48, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "h4", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "webMethods Integration Server Sky Profiler");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "div", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "a", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "div", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](59, "img", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "h4", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](64, "webMethods API Gateway");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "div", 30);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "div", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "div", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "pre");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "All Projects");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](74, GitHubOverviewComponent_ng_container_74_Template, 18, 14, "ng-container", 31);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](75, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](76, GitHubOverviewComponent_ng_template_76_Template, 1, 0, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](78, GitHubOverviewComponent_ng_template_78_Template, 1, 0, "ng-template", null, 33, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](79);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("webpage", ctx.overViewWebpage);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](74);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](75, 3, ctx.overviewService.lastSearchResult$))("ngIfElse", _r3);
    } }, directives: [_message_message_component__WEBPACK_IMPORTED_MODULE_2__["MessageComponent"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterLinkWithHref"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["SelectControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_11__["SearchBarComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵangular_packages_forms_forms_x"], _custom_pagination_controls_custom_pagination_controls_component__WEBPACK_IMPORTED_MODULE_12__["CustomPaginationControlsComponent"], _project_card_project_card_component__WEBPACK_IMPORTED_MODULE_13__["ProjectCardComponent"], _preloader_preloader_component__WEBPACK_IMPORTED_MODULE_14__["PreloaderComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["AsyncPipe"], ngx_pagination__WEBPACK_IMPORTED_MODULE_15__["PaginatePipe"]], styles: ["select.form-control[_ngcontent-%COMP%] {\r\n  border: 0;\r\n  border-radius: 0;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n  left: 0;\r\n  right: 0;\r\n  width: 60%;\r\n  height: 330px;\r\n  background-color: #011f3d;\r\n  color: #f2f2ea;\r\n}\r\n\r\n.page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n  height: 420px;\r\n}\r\n\r\n.quicklinks.flex-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\r\n  width: 290px;\r\n  height: 236px;\r\n}\r\n\r\n@media(max-width: 1380px) and (min-width: 415px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 435px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 350px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 435px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]    > pre[_ngcontent-%COMP%] {\r\n    font-size: 0.75em;\r\n  }\r\n}\r\n\r\n@media(max-width: 1250px) and (min-width: 415px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 490px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 410px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 490px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]    > pre[_ngcontent-%COMP%] {\r\n    font-size: 0.75em;\r\n  }\r\n}\r\n\r\n@media only screen and (max-width: 600px) {\r\n  .page-header-container[_ngcontent-%COMP%] {\r\n    height: 630px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%] {\r\n    height: 515px;\r\n    width: 90%;\r\n    top: 110px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .img-container[_ngcontent-%COMP%]    > img[_ngcontent-%COMP%] {\r\n    height: 630px;\r\n  }\r\n\r\n  .page-header-container[_ngcontent-%COMP%]   .content-container[_ngcontent-%COMP%]   .heading[_ngcontent-%COMP%]    > pre[_ngcontent-%COMP%] {\r\n    font-size: 0.50em;\r\n  }\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdpdC1odWItb3ZlcnZpZXcuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFNBQVM7RUFDVCxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxPQUFPO0VBQ1AsUUFBUTtFQUNSLFVBQVU7RUFDVixhQUFhO0VBQ2IseUJBQXlCO0VBQ3pCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0U7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRjs7QUFFQTtFQUNFO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7SUFDYixVQUFVO0lBQ1YsVUFBVTtFQUNaOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25CO0FBQ0YiLCJmaWxlIjoiZ2l0LWh1Yi1vdmVydmlldy5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsic2VsZWN0LmZvcm0tY29udHJvbCB7XHJcbiAgYm9yZGVyOiAwO1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbn1cclxuXHJcbi5wYWdlLWhlYWRlci1jb250YWluZXIgLmNvbnRlbnQtY29udGFpbmVyIHtcclxuICBsZWZ0OiAwO1xyXG4gIHJpZ2h0OiAwO1xyXG4gIHdpZHRoOiA2MCU7XHJcbiAgaGVpZ2h0OiAzMzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDExZjNkO1xyXG4gIGNvbG9yOiAjZjJmMmVhO1xyXG59XHJcblxyXG4ucGFnZS1oZWFkZXItY29udGFpbmVyIC5pbWctY29udGFpbmVyID4gaW1nIHtcclxuICBoZWlnaHQ6IDQyMHB4O1xyXG59XHJcblxyXG4ucXVpY2tsaW5rcy5mbGV4LWNvbnRhaW5lciAuY2FyZCB7XHJcbiAgd2lkdGg6IDI5MHB4O1xyXG4gIGhlaWdodDogMjM2cHg7XHJcbn1cclxuXHJcbkBtZWRpYShtYXgtd2lkdGg6IDEzODBweCkgYW5kIChtaW4td2lkdGg6IDQxNXB4KSB7XHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDQzNXB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiAzNTBweDtcclxuICB9XHJcblxyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIgLmltZy1jb250YWluZXIgPiBpbWcge1xyXG4gICAgaGVpZ2h0OiA0MzVweDtcclxuICB9XHJcblxyXG4gIC5wYWdlLWhlYWRlci1jb250YWluZXIgLmNvbnRlbnQtY29udGFpbmVyIC5oZWFkaW5nID4gcHJlIHtcclxuICAgIGZvbnQtc2l6ZTogMC43NWVtO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhKG1heC13aWR0aDogMTI1MHB4KSBhbmQgKG1pbi13aWR0aDogNDE1cHgpIHtcclxuICAucGFnZS1oZWFkZXItY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogNDkwcHg7XHJcbiAgfVxyXG5cclxuICAucGFnZS1oZWFkZXItY29udGFpbmVyIC5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDQxMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuaW1nLWNvbnRhaW5lciA+IGltZyB7XHJcbiAgICBoZWlnaHQ6IDQ5MHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIgLmhlYWRpbmcgPiBwcmUge1xyXG4gICAgZm9udC1zaXplOiAwLjc1ZW07XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7XHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IDYzMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIge1xyXG4gICAgaGVpZ2h0OiA1MTVweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICB0b3A6IDExMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuaW1nLWNvbnRhaW5lciA+IGltZyB7XHJcbiAgICBoZWlnaHQ6IDYzMHB4O1xyXG4gIH1cclxuXHJcbiAgLnBhZ2UtaGVhZGVyLWNvbnRhaW5lciAuY29udGVudC1jb250YWluZXIgLmhlYWRpbmcgPiBwcmUge1xyXG4gICAgZm9udC1zaXplOiAwLjUwZW07XHJcbiAgfVxyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GitHubOverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-github-overview',
                templateUrl: './git-hub-overview.component.html',
                styleUrls: ['./git-hub-overview.component.css']
            }]
    }], function () { return [{ type: _services_Overview_OverViewDataService_overview_data_service__WEBPACK_IMPORTED_MODULE_5__["OverviewDataService"] }, { type: _services_MessageService_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"] }, { type: _services_Overview_OverviewQueryParamsService_overview_query_params_service__WEBPACK_IMPORTED_MODULE_6__["OverviewQueryParamsService"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Title"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__["Meta"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_8__["ActivatedRoute"] }]; }, null); })();


/***/ }),

/***/ "rFmM":
/*!********************************************************************************************************!*\
  !*** ./src/services/IoTAnalytics/IoTAnalyticsQueryParamsService/iot-analytics-query-params.service.ts ***!
  \********************************************************************************************************/
/*! exports provided: IotAnalyticsQueryParamsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IotAnalyticsQueryParamsService", function() { return IotAnalyticsQueryParamsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _app_message_message_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../app/message/message.component */ "eUAL");
/* harmony import */ var _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../MessageService/message.service */ "zFxm");
/* harmony import */ var _classes_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../classes/constants */ "2QUj");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../IoTAnalyticsDataService/iot-analytics-data.service */ "/4Oi");










class IotAnalyticsQueryParamsService {
    constructor(router, route, messageService, iotAnalyticsDataService) {
        this.router = router;
        this.route = route;
        this.messageService = messageService;
        this.iotAnalyticsDataService = iotAnalyticsDataService;
        this.IoTAnalyticsWebpage = _app_message_message_component__WEBPACK_IMPORTED_MODULE_3__["WebPage"].IoTAnalytics;
    }
    getQueryParams(queryParams) {
        return {
            text: queryParams.has('search') ? queryParams.get('search') : '',
            topic: queryParams.has('topic') ? queryParams.get('topic') : 'all-topics',
            repository: queryParams.has('repository') ? queryParams.get('repository') : 'all-repositories',
            page: queryParams.has('page') ? Number(queryParams.get('page')) : 1,
        };
    }
    initialize() {
        this.subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        // Only update based on the query params on initial load of the page (not every time they change)
        this.route.queryParamMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["first"])())
            .subscribe(queryParams => {
            const searchParams = this.getQueryParams(queryParams);
            this.iotAnalyticsDataService.updateSearchParameters(searchParams, true);
            this.iotAnalyticsDataService.searchWithCurrentParams()
                .catch((error) => {
                const errorResponse = error;
                if (errorResponse.status === _classes_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].GITHUB_API_RATE_LIMIT_EXCEEDED) {
                    this.messageService.setMessage(this.IoTAnalyticsWebpage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_WARNING_TYPE, _classes_constants__WEBPACK_IMPORTED_MODULE_5__["Constants"].GITHUB_RETRIEVE_FAIL_MESSAGE);
                }
                else {
                    this.messageService.setMessage(this.IoTAnalyticsWebpage, _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageType"].CONST_ERROR_TYPE, `Github: ${errorResponse.statusText}`);
                }
            });
        });
        // Update the query string from changes to the currentSearchParams
        this.subscriptions.add(this.iotAnalyticsDataService.currentSearchParameters$
            // Skip the first item because it is the default value (from the search service initialization) - the value we actually want first is the one from the query param (above)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["skip"])(1))
            .subscribe(searchParams => {
            const queryParams = Object.assign(Object.assign(Object.assign(Object.assign({}, searchParams.text !== '' ? { search: searchParams.text } : undefined), searchParams.topic !== 'all-topics' ? { topic: searchParams.topic } : undefined), searchParams.repository !== 'all-repositories' ? { repository: searchParams.repository } : undefined), searchParams.page.toString() !== '1' ? { page: searchParams.page } : undefined);
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams,
                replaceUrl: true
            });
        }));
    }
    terminate() {
        this.subscriptions.unsubscribe();
    }
}
IotAnalyticsQueryParamsService.ɵfac = function IotAnalyticsQueryParamsService_Factory(t) { return new (t || IotAnalyticsQueryParamsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_7__["IotAnalyticsDataService"])); };
IotAnalyticsQueryParamsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: IotAnalyticsQueryParamsService, factory: IotAnalyticsQueryParamsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](IotAnalyticsQueryParamsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["ActivatedRoute"] }, { type: _MessageService_message_service__WEBPACK_IMPORTED_MODULE_4__["MessageService"] }, { type: _IoTAnalyticsDataService_iot_analytics_data_service__WEBPACK_IMPORTED_MODULE_7__["IotAnalyticsDataService"] }]; }, null); })();


/***/ }),

/***/ "uBOE":
/*!**********************************************************************************!*\
  !*** ./src/services/Connectors/ConnectorsDataService/connectors-data.service.ts ***!
  \**********************************************************************************/
/*! exports provided: ConnectorsDataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorsDataService", function() { return ConnectorsDataService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../DataService/data.service */ "5o1m");
/* harmony import */ var _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../GitHubCacheService/git-hub-cache.service */ "i2k+");
/* harmony import */ var _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../GoogleAnalyticsService/google-analytics.service */ "uF5Q");







class ConnectorsDataService extends _DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"] {
    constructor(gitHubCacheService, gaService) {
        super();
        this.gitHubCacheService = gitHubCacheService;
        this.gaService = gaService;
        this.softwareAGGitHubTopics = this.topics.filter(topic => topic.page.includes(_DataService_data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"].CONST_API_INTEGRATION_MICROSERVICE_PAGE));
        this.currentSearchParameters$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({
            text: '',
            topic: 'all-topics',
            page: 1,
            pageSize: 9
        });
        this.lastSearchResult$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
    }
    // Return Software AG Topics
    getTopics() {
        return Promise.resolve(this.softwareAGGitHubTopics);
    }
    resetFilters() {
        this.updateSearchParameters({
            topic: 'all-topics',
            page: 1,
        });
        this.searchWithCurrentParams().then();
    }
    updateSearchParameters(params, ignorePageReset = false) {
        const currentSearchParams = this.currentSearchParameters$.getValue();
        // If the filters exist and have been changed, reset the page to page 1
        if (!ignorePageReset &&
            ((params.text && params.text !== currentSearchParams.text) ||
                (params.topic && params.topic !== currentSearchParams.topic))) {
            params.page = 1;
        }
        const newSearchParams = Object.assign({}, this.currentSearchParameters$.getValue(), params);
        this.currentSearchParameters$.next(newSearchParams);
    }
    searchWithCurrentParams() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return this.search(this.currentSearchParameters$.getValue());
        });
    }
    search(searchParams) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const softwareAGTopic = this.softwareAGGitHubTopics.find(t => t.id === searchParams.topic);
            let topics = '+topic:webmethods';
            if (softwareAGTopic && softwareAGTopic.topics.length > 0) {
                topics += '+' + softwareAGTopic.topics.filter(topic => topic.length > 0).reduce((result, topic) => result += `+topic:${topic}`, '');
            }
            let queryString = '';
            if (searchParams.text !== '') {
                queryString += `+${searchParams.text}+in:readme+${searchParams.text}+in:description+${searchParams.text}+in:name`;
            }
            if (topics !== '') {
                queryString += topics;
            }
            const response = yield this.gitHubCacheService.search('connectors', queryString, searchParams.page, searchParams.pageSize);
            const getGitHubProjectsResponse = response;
            const searchResult = {
                params: searchParams,
                response: getGitHubProjectsResponse
            };
            this.lastSearchResult$.next(searchResult);
            this.gaService.pushToGoogleAnalytics();
            return searchResult;
        });
    }
}
ConnectorsDataService.ɵfac = function ConnectorsDataService_Factory(t) { return new (t || ConnectorsDataService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__["GitHubCacheService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__["GoogleAnalyticsService"])); };
ConnectorsDataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConnectorsDataService, factory: ConnectorsDataService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ConnectorsDataService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _GitHubCacheService_git_hub_cache_service__WEBPACK_IMPORTED_MODULE_4__["GitHubCacheService"] }, { type: _GoogleAnalyticsService_google_analytics_service__WEBPACK_IMPORTED_MODULE_5__["GoogleAnalyticsService"] }]; }, null); })();


/***/ }),

/***/ "uF5Q":
/*!*************************************************************************!*\
  !*** ./src/services/GoogleAnalyticsService/google-analytics.service.ts ***!
  \*************************************************************************/
/*! exports provided: GoogleAnalyticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleAnalyticsService", function() { return GoogleAnalyticsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../environments/environment */ "AytR");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");





class GoogleAnalyticsService {
    constructor(router, titleService) {
        this.router = router;
        this.titleService = titleService;
    }
    pushToGoogleAnalytics() {
        if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
            gtag('config', 'G-WR7W2ZB88V', {
                page_title: this.titleService.getTitle(),
                page_path: this.router.url
            });
            // } else {
            //   console.log("Debug: GoogleAnalyticsService.pushToGoogleAnalytics(): Page URL is: "+this.router.url + " Page Title is: " + this.titleService.getTitle());
        }
    }
}
GoogleAnalyticsService.ɵfac = function GoogleAnalyticsService_Factory(t) { return new (t || GoogleAnalyticsService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["Title"])); };
GoogleAnalyticsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: GoogleAnalyticsService, factory: GoogleAnalyticsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GoogleAnalyticsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["Title"] }]; }, null); })();


/***/ }),

/***/ "us8n":
/*!*************************************************!*\
  !*** ./src/pipes/text-limit/text-limit.pipe.ts ***!
  \*************************************************/
/*! exports provided: TextLimitPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextLimitPipe", function() { return TextLimitPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class TextLimitPipe {
    transform(text, textCount, postfix) {
        let shortDescription = '';
        if (text !== undefined) {
            let characterCount = 500;
            if (textCount) {
                characterCount = textCount;
            }
            if (postfix === undefined) {
                postfix = '';
            }
            if (text !== null && text.length > 0) {
                shortDescription = text.substring(0, characterCount);
                const lastSentenceEndPos = shortDescription.split('').lastIndexOf('.');
                if (lastSentenceEndPos !== -1 && lastSentenceEndPos > characterCount) {
                    shortDescription = shortDescription.substring(0, lastSentenceEndPos + 1);
                }
                if (text.length > textCount) {
                    shortDescription += postfix;
                }
            }
        }
        return shortDescription;
    }
}
TextLimitPipe.ɵfac = function TextLimitPipe_Factory(t) { return new (t || TextLimitPipe)(); };
TextLimitPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "TextLimit", type: TextLimitPipe, pure: true });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TextLimitPipe, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"],
        args: [{
                name: 'TextLimit'
            }]
    }], null, null); })();


/***/ }),

/***/ "zFxm":
/*!********************************************************!*\
  !*** ./src/services/MessageService/message.service.ts ***!
  \********************************************************/
/*! exports provided: MessageType, MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageType", function() { return MessageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


var MessageType;
(function (MessageType) {
    MessageType["CONST_ERROR_TYPE"] = "ERROR";
    MessageType["CONST_WARNING_TYPE"] = "WARNING";
    MessageType["CONST_SUCCESS_TYPE"] = "SUCCESS";
})(MessageType || (MessageType = {}));
class MessageService {
    constructor() {
        this.message = { type: '', text: '' };
    }
    setMessage(page, type, text, timeout) {
        this.webpage = page;
        this.message = { type, text };
        // set the default timeout if it hasn't been provided
        timeout = timeout || MessageService.MESSAGE_TIMEOUT;
        if (timeout > -1) {
            // clear the message
            setTimeout(() => {
                this.clearMessage();
            }, timeout);
        }
    }
    clearMessage() {
        this.message.type = '';
        this.message.text = '';
    }
}
// The time in seconds that a message displays on screen
MessageService.MESSAGE_TIMEOUT = 2500; // 2.5 seconds
MessageService.ɵfac = function MessageService_Factory(t) { return new (t || MessageService)(); };
MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MessageService, factory: MessageService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MessageService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map