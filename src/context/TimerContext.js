import { createContext, useReducer } from 'react';

const TimerContext = createContext();

const initialState = {
    timers: [], //store the added timers in an array
    currentTimerIndex: 0,
    isWorkoutRunning: false, //
};

const timerReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TIMER': //add new timer at end of timers array
            return {
                ...state,
                timers: [...state.timers, action.payload],
            };
        case 'REMOVE_TIMER': //remove a timer and create a new array excluding the removed timer at the relevant index
            return {
                ...state,
                timers: state.timers.filter((_, index) => index !== action.payload),
            };
        case 'TOGGLE_WORKOUT': //toggle between starting/resuming and pausing a workout
            return {
                ...state,
                isWorkoutRunning: !state.isWorkoutRunning,
            };
        case 'RESET_WORKOUT': //reset workout to initial state
            return initialState;
        case 'NEXT_TIMER': //move to the next timer in sequence, end workout if the timer is last in sequence
            if (state.currentTimerIndex === state.timers.length - 1) {
                return {
                    ...state,
                    isWorkoutRunning: false,
                };
            } else {
                return {
                    ...state,
                    currentTimerIndex: state.currentTimerIndex + 1,
                };
            }
        default:
            return state;
    }
};

export const TimerProvider = ({ children }) => {
    const [state, dispatch] = useReducer(timerReducer, initialState);

    return (
        <TimerContext.Provider value={{ state, dispatch }}>
            {children}
        </TimerContext.Provider>
    );
};

export { TimerContext, TimerProvider };
