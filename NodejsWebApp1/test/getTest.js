var supertest = require('supertest');
var express = require('express');
var assert = require('assert');
var should = require('should');
var debug = require('debug')('app');
describe('Baseline tests', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            debug([1, 2, 3].indexOf(3));
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
            [1, 2, 3].indexOf(5).should.equal(-1);
            [1, 2, 3].indexOf(0).should.equal(-1);
        });
    });
});