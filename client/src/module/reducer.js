import ACTIONS from "./actions";
import _ from "lodash"

const MainReducer = (state, action) => {
  console.log("REDUCER: ", state, action)

  switch(action.type) {
    case ACTIONS.TEXT_INPUT_CHANGE:
    let newState = _.cloneDeep(state)
    newState.userEmail = action.payload
       return newState;
    default:
      return state;
  }


}

export default MainReducer