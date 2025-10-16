import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
const initialValue = {
  title: true,
  tag: true,
  date: true,
  post: true
};
function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState(initialValue);

  useEffect(() => {
    let timer;
    if (!formValidState.date || !formValidState.post || !formValidState.tag || !formValidState.title) {
      setTimeout(() => {
        setFormValidState(initialValue);
      }, 2000);
    }
    return clearTimeout(timer);
  }, [formValidState]);

  let isFormValid = true;
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if (!formProps.title?.trim().length) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.tag?.trim().length) {
      setFormValidState((state) => ({ ...state, tag: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, tag: true }));
    }
    if (!formProps.post?.trim().length) {
      setFormValidState((state) => ({ ...state, post: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, post: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };
  return (
    <form onSubmit={addJournalItem} className={cn(styles['journal-form'])}>
      <div className={cn(styles['form-row'])}>
        <input
          type="text"
          name="title"
          className={cn(styles['input-title'], {
            [styles['invalid']]: !formValidState.title
          })}
        />
        <img className="delete" src="/exit.svg" alt="Иконка удаления поста"></img>
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="date" className={cn(styles['form-label'])}>
          <img className="calendar" src="/calendar.svg" alt="Логотип календаря" />
          <span>Дата</span>
        </label>
        <input type="date" name="date" className={cn(styles['input'], { [styles['invalid']]: !formValidState.date })} />
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="tag" className={cn(styles['form-label'])}>
          <img className="tags" src="/tags.svg" alt="Логотип тэга" />
          <span>Метки</span>
        </label>
        <input type="text" name="tag" className={cn(styles['input'], { [styles['invalid']]: !formValidState.tag })} />
      </div>

      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.post
        })}
      />
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
