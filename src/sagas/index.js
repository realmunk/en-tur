import { delay } from 'redux-saga'
import { call, all, put, spawn, takeLatest } from 'redux-saga/effects'

import ActionTypes from '../actions/types';

import Api from '../services/api'
import Queue from '../utilities/queue'

let isProcessing = false;

function* estimatedCallsRoutineA() {
    while(true) {
        try {
            yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_REQUESTED });
            
            const { result } = yield all({ // if not finished within 20000, wait until call is finished. 
                result: call(Api.getEstimatedCallsForStop),
                delay: call(delay, 20000) // update every 20 seconds
            })
            
            yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_SUCCEEDED, payload: result.data.stopPlace });
        } catch (e) {
            // on fail we retry right away.
            yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_FAILED, message: e.message });
        }
    }
}

function* estimatedCallsRoutineB() {
    
    let callsQueue = new Queue();
    
    while (true) {

        if (isProcessing) {
            callsQueue.enqueue(getEstimatedCalls);
        } else if (callsQueue.size()) {
            yield spawn(callsQueue.dequeue()); // spawn basically means non-blocking
        } else {
            yield spawn(getEstimatedCalls); 
        }
        yield call(delay, 20000); // this is our update interval
    }
}

function* getEstimatedCalls() {
    try {
        isProcessing = true;
        yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_REQUESTED });
        const result = yield call(Api.getEstimatedCallsForStop)
        yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_SUCCEEDED, payload: result.data.stopPlace });
    } catch (e) {
        yield put({ type: ActionTypes.ESTIMATED_CALLS_FETCH_FAILED, message: e.message });
    } finally {
        isProcessing = false;
    }
}

function* estimatedCallsSaga() {
    yield takeLatest(ActionTypes.ESTIMATED_CALLS_ROUTINE, estimatedCallsRoutineB);
}

export default estimatedCallsSaga;