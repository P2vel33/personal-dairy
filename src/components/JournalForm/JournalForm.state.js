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
      const titleValidity = action.payload.title?.trim().length;
      const postValidity = action.payload.post?.trim().length;
      const tagValidity = action.payload.tag?.trim().length;
      const dateValidity = action.payload.date;
      return {
        values: action.payload,
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
      return { ...state, values: initialValue.values };
    }
    case 'SET_VALUE': {
      return { ...state, values: { ...state.values, ...action.payload } };
    }
  }
}
