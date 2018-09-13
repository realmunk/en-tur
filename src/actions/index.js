import ActionTypes from './types'

export const estimatedCallsRoutine = () => {
     return {
         type: ActionTypes.ESTIMATED_CALLS_ROUTINE
     }
}

export const fetchEstimatedCallsRequest = () => {
    return {
        type: ActionTypes.ESTIMATED_CALLS_FETCH_REQUESTED
    }
}

export const fetchEstimatedCallsSuccess = (body) => {
    return {
        type: ActionTypes.ESTIMATED_CALLS_FETCH_SUCCEEDED,
        body
    }
}

export const fetchEstimatedCallsFailed = () => {
    return {
        type: ActionTypes.ESTIMATED_CALLS_FETCH_FAILED
    }
}
