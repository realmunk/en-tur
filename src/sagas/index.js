import { delay } from 'redux-saga'
import { call, all, put, takeLatest } from 'redux-saga/effects'

import moment from 'moment';

import ActionTypes from '../actions/types';
import { fetchEstimatedCallsFailed, fetchEstimatedCallsSuccess, fetchEstimatedCallsRequest} from '../actions/';
import Api from '../services/api'

function* estimatedCallsRoutine() {
    while(true) {
        try {
            
            yield all({
                result: call(getEstimatedCalls),
                delay: call(delay, 20000)
            })
            
        } catch (e) {
            yield put(fetchEstimatedCallsFailed(e.message));
            // make sure that we wait for a second on fail
            yield call(delay, 1000);
        }
    }
}

function* getEstimatedCalls() {

    let processedCalls = {};

    yield put(fetchEstimatedCallsRequest());

    let result = yield call(Api.getEstimatedCallsForStop)

    result = result.data.stopPlace;

    result.estimatedCalls.forEach(call => {
        let expected = moment(call.expectedArrivalTime);
        let waitTime = expected.diff(new Date(), 'minutes');
        processedCalls[waitTime] ? processedCalls[waitTime].push(call) : processedCalls[waitTime] = [call];
    });

    result.estimatedCalls = processedCalls;

    yield put(fetchEstimatedCallsSuccess(result));
}

/* Alternative B: If you want it to work with a queue

import Queue from '../utilities/queue'
let isProcessing = false;

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

        let processedCalls = {};
        isProcessing = true;

        yield put(fetchEstimatedCallsRequest);
        let result = yield call(Api.getEstimatedCallsForStop)

        result = result.data.stopPlace;

        result.estimatedCalls.forEach(call => {
            let expected = moment(call.expectedArrivalTime);
            let waitTime = expected.diff(new Date(), 'minutes');
            processedCalls[waitTime] ? processedCalls[waitTime].push(call) : processedCalls[waitTime] = [call];
        });

        result.estimatedCalls = processedCalls;
        
        yield put(fetchEstimatedCallsSuccess(result));
    } catch (e) {
        yield put(fetchEstimatedCallsFailed(e.message));
    } finally {
        isProcessing = false;
    }
}

*/

function* estimatedCallsSaga() {
    yield takeLatest(ActionTypes.ESTIMATED_CALLS_ROUTINE, estimatedCallsRoutine);
}

export default estimatedCallsSaga;