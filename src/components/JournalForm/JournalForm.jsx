import React, { useEffect, useReducer, useRef, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, initialValue } from './JournalForm.state';

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, initialValue);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const tagRef = useRef();

  const focusError = () => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.tag:
        tagRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timer;
    if (!isValid.date || !isValid.post || !isValid.tag || !isValid.title) {
      focusError(isValid);
      timer = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' });
      }, 2000);
    }
    return clearTimeout(timer);
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: 'CLEAR' });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
  };
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };
  return (
    <form onSubmit={addJournalItem} className={cn(styles['journal-form'])}>
      <div className={cn(styles['form-row'])}>
        <input
          type="text"
          name="title"
          ref={titleRef}
          value={values.title}
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title
          })}
          onChange={onChange}
        />
        <img className="delete" src="/exit.svg" alt="Иконка удаления поста"></img>
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="date" className={cn(styles['form-label'])}>
          <img className="calendar" src="/calendar.svg" alt="Логотип календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          ref={dateRef}
          onChange={onChange}
          value={values.date}
          className={cn(styles['input'], { [styles['invalid']]: !isValid.date })}
        />
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="tag" className={cn(styles['form-label'])}>
          <img className="tags" src="/tags.svg" alt="Логотип тэга" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          name="tag"
          ref={tagRef}
          onChange={onChange}
          value={values.tag}
          className={cn(styles['input'], { [styles['invalid']]: !isValid.tag })}
        />
      </div>

      <textarea
        name="post"
        id=""
        ref={postRef}
        onChange={onChange}
        value={values.post}
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
      />
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
