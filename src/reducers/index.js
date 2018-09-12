import ActionTypes from '../actions/types'

const initialState = {
    lastUpdated: null,
    transportMode: null,
    id: null,
    name: null,
    estimatedCalls: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ESTIMATED_CALLS_FETCH_SUCCEEDED:
            return {
                ...action.payload
            }
        default:
            return state
    }
}