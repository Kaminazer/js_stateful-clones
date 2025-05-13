'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformHistory = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      let transformResult;

      if (transformHistory.length > 0) {
        transformResult = cloneLastTransform(transformHistory.at(-1));
      } else {
        transformResult = cloneLastTransform(state);
      }

      for (const field in action.extraData) {
        transformResult[field] = action.extraData[field];
      }

      transformHistory.push(transformResult);
    }

    if (action.type === 'removeProperties') {
      let transformResult;

      if (transformHistory.length > 0) {
        transformResult = cloneLastTransform(transformHistory.at(-1));
      } else {
        transformResult = cloneLastTransform(state);
      }

      for (const key of action.keysToRemove) {
        delete transformResult[key];
      }

      transformHistory.push(transformResult);
    }

    if (action.type === 'clear') {
      let transformResult;

      if (transformHistory.length > 0) {
        transformResult = cloneLastTransform(transformHistory.at(-1));
      } else {
        transformResult = cloneLastTransform(state);
      }

      for (const field in transformResult) {
        delete transformResult[field];
      }

      transformHistory.push(transformResult);
    }
  }

  return transformHistory;
}

function cloneLastTransform(source) {
  const clone = {};

  Object.assign(clone, source);

  return clone;
}

module.exports = transformStateWithClones;
