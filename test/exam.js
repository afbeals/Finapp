import * as test from '../client/app/actions/expensesActionCreators';
import {assert} from 'chai';



describe('Array', function() {
  it('should start empty', function() {
    var arr = [];

    assert.equal(arr.length, 0);
  });
});