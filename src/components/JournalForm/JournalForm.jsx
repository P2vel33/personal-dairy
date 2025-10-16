import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
function JournalForm({ onSubmit }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    tag: true,
    date: true,
    post: true
  });
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
      <input
        type="text"
        name="title"
        className={cn(styles['input'], {
          [styles['invalid']]: !formValidState.title
        })}
      />
      <input type="date" name="date" className={cn(styles['input'], { [styles['invalid']]: !formValidState.date })} />
      <input type="text" name="tag" className={cn(styles['input'], { [styles['invalid']]: !formValidState.tag })} />
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
