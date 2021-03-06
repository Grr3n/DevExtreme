"use strict";

var $ = require("jquery");



QUnit.testStart(function() {
    var markup =
        '<div class="focusable tabbable" tabindex="0"></div>\
        <input class="focusable tabbable" type="text" value=" />\
        <select class="focusable tabbable"></select>\
        <textarea class="focusable tabbable"></textarea>\
        <button class="focusable tabbable"></button>\
        <object class="focusable tabbable"></object>\
        <iframe class="focusable tabbable"></iframe>\
        <a class="focusable tabbable" href="#">1</a>\
        <a class="focusable tabbable" tabindex="0">1</a>\
        \
        <div class="focusable nottabbable" tabindex="-1"></div>\
        \
        <input class="notfocusable nottabbable" type="text" disabled/>\
        <button class="notfocusable nottabbable" disabled></button>\
        <a class="notfocusable nottabbable">1</a>\
        <div class="notfocusable nottabbable"></div>\
        \
        <style>\
            .hidden-display{\
                display: none;\
            }\
        </style>\
        \
        <div class="hidden-display" tabindex="1"></div>\
        <input class="hidden-display" type="text" value="" />\
        <object class="hidden-display"></object>\
        \
        <style>\
            .hidden-visibility {\
                visibility: hidden;\
            }\
        </style>\
        \
        <div class="hidden-visibility" tabindex="1"></div>\
        <input class="hidden-visibility" type="text" value="" />\
        <object class="hidden-visibility"></object>';

    $("#qunit-fixture").html(markup);
});

var selectors = require("ui/widget/jquery.selectors");

QUnit.test("focusable", function(assert) {
    var focusableContainer = $(".focusable");
    focusableContainer.each(function(index, item) {
        assert.ok($(item).is(selectors.focusable));
    });
});

QUnit.test("tabbable", function(assert) {
    var focusableContainer = $(".tabbable");
    focusableContainer.each(function(index, item) {
        assert.ok($(item).is(selectors.tabbable));
    });
});

QUnit.test("not focusable", function(assert) {
    var focusableContainer = $(".notfocusable, .hidden-display, .hidden-visibility");
    focusableContainer.each(function(index, item) {
        assert.ok(!$(item).is(selectors.focusable));
    });
});

QUnit.test("not tabbable", function(assert) {
    var focusableContainer = $(".nottabbable, .hidden-display, .hidden-visibility");
    focusableContainer.each(function(index, item) {
        assert.ok(!$(item).is(":dx-tabbable"));
    });
});

QUnit.test("icontains", function(assert) {
    var $fixture = $("#qunit-fixture");
    $("<span />").html("test sentence").appendTo($fixture);
    $("<span />").html("Test sentence 2").appendTo($fixture);
    $("<span />").html("no any *est sentence").appendTo($fixture);

    var $result = $fixture.find(selectors.icontains + "(test)");

    assert.strictEqual($result.length, 2, "All elements were found");
});
