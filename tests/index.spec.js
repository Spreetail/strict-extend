'use strict';

var strictExtend = require('../index');

describe('strictExtend', function () {
    it('should return an empty object if called with no parameters', function () {
        var result = strictExtend();
        expect(result).to.eql({});
    });
    it('should return an empty object if called with all null parameters', function () {
        var result = strictExtend(null, null, null);
        expect(result).to.eql({});
    });
    it('should return an empty object if source is null', function () {
        var result = strictExtend({ field: false }, null);
        expect(result).to.eql({});
    });
    it('should assign source fields', function () {
        var result = strictExtend({}, { field1: 1 }, { field2: 2 });
        expect(result).to.eql({ field1: 1, field2: 2 });
    });
    it('should have last-in preference for source fields', function () {
        var result = strictExtend({}, { field: false }, { field: true });
        expect(result).to.eql({ field: true });
    });
    it('should not overwrite valid target properties', function () {
        var result = strictExtend({ keepMe: true }, { keepMe: false });
        expect(result).to.eql({ keepMe: true });
    });
    it('should ignore target properties not on sources', function () {
        var result = strictExtend({ invalid: true, valid: true }, { valid: true });
        expect(result).to.eql({ valid: true });
    });
    it('should return object with source fields even if target is null', function () {
        var result = strictExtend(null, { field: true });
        expect(result).to.eql({ field: true });
    });
    it('should work with arrays', function() {
        var result = strictExtend(['keep', 'keep'], ['ignore'], ['ignore', 'ignore', 'new']);
        expect(result).to.eql(['keep', 'keep', 'new']);
    });
    it('should return an array if the target is an array but sources are objects', function() {
        var result = strictExtend(['keep'], { newField: true, 0: 'ignore' });
        expect(result).to.be.instanceOf(Array).and.to.have.property(0, 'keep');
        expect(result).to.have.property('newField', true);
    });
    it('should return an array if the target is an array but some sources are objects', function() {
        var result = strictExtend(['keep'], { newField: true, 0: 'ignore' }, ['ignore', 'new']);
        expect(result).to.be.instanceOf(Array).and.to.have.property(0, 'keep');
        expect(result).to.have.property('newField', true);
        expect(result).to.have.property(1, 'new');
    });
    it('should return an object if the target is an object but sources are arrays', function() {
        var result = strictExtend({ 0: true }, [false, false], [false, true, true]);
        expect(result).to.eql({ 0: true, 1: true, 2: true });
    });
    it('should return an object if the target is an object but some sources are arrays', function() {
        var lastSource = [],
            result;

        lastSource.keep = false;
        result = strictExtend({ 0: true, removed: true, keep: true }, [false], lastSource);
        expect(result).to.eql({ 0: true, keep: true });
    });
});
