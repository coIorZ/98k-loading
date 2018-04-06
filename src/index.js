export default opts => (injectReducer, injectEffect) => {
  const { namespace, include, exclude } = Object.assign({}, defaultOpts, opts);
  const initialState = {};

  injectReducer({
    [namespace](state = initialState, { type, payload }) {
      let effects = {};
      const { namespace, actionType } = payload || {};
      switch(type) {
        case '@@98k/showLoading':
          return { 
            ...state, 
            [namespace] : true,
            effects     : {
              ...state.effects,
              [actionType]: true,
            },
          };
        case '@@98k/hideLoading':
          effects = { ...state.effects, [actionType]: false };
          return { 
            ...state, 
            effects,
            [namespace]: Object.keys(state.effects).some(actionType => {
              const name = actionType.split('/')[0];
              if(name !== namespace) return false;
              return effects[actionType];
            }),
          };
        default:
          return state;
      }
    },
  });

  injectEffect((saga, module, actionType, { put }) => {
    const { namespace } = module;
    let isInclude = true, isExclude = false;
    isInclude = !include.length || include.some(type => new RegExp(type).test(actionType));
    isExclude = exclude.length && exclude.some(type => new RegExp(type).test(actionType));
    if(isInclude && !isExclude) return function*(action) {
      yield put({ type: '@@98k/showLoading', payload: { namespace, actionType } });
      yield saga(action);
      yield put({ type: '@@98k/hideLoading', payload: { namespace, actionType } });
    };
    return saga;
  });
};

const defaultOpts = {
  namespace : 'loading',
  include   : [],
  exclude   : [],
};
