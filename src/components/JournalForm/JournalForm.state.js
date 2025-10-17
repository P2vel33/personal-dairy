export const initialValue = {
  isValid: {
    title: true,
    tag: true,
    date: true,
    post: true
  },
  values: {
    title: '',
    tag: '',
    date: '',
    post: ''
  },
  isFormReadyToSubmit: false
};

export function formReducer(state, action) {
  switch (action.type) {
    case 'RESET_VALIDITY':
      return { ...state, isValid: initialValue.isValid };
    case 'SUBMIT': {
      const titleValidity = state.values.title?.trim().length;
      const postValidity = state.values.post?.trim().length;
      const tagValidity = state.values.tag?.trim().length;
      const dateValidity = state.values.date;
      return {
        ...state,
        isValid: {
          title: titleValidity,
          tag: tagValidity,
          date: dateValidity,
          post: postValidity
        },
        isFormReadyToSubmit: titleValidity && postValidity && tagValidity && dateValidity
      };
    }
    case 'CLEAR': {
      return { ...state, values: initialValue.values, isFormReadyToSubmit: false };
    }
    case 'SET_VALUE': {
      return { ...state, values: { ...state.values, ...action.payload } };
    }
  }
}
