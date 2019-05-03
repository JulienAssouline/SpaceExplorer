import ACTIONS from "./actions";

const MainReducer = (state, action) => {
  console.log("REDUCER: ", state, action)

  switch(action.type) {
    case ACTIONS.TEXT_INPUT_CHANGE:
        let newState = action.text
       return newState;
    default:
      return state;
  }
}