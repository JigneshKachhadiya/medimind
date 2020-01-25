import { combineReducers } from 'redux';

import loginUser from './loginUser';
import introSlid from './introSlid';
import homeData from './homeData';
import article from './article';
import activity from './activity';
import currentPlaye from './currentPlaye';

const appReducer = combineReducers({
  introSlid,
  loginUser,
  homeData,
  article,
  activity,
  currentPlaye
});


const rootReducer = (state = {}, action) => {
  return appReducer(state, action);
};

export default rootReducer;
