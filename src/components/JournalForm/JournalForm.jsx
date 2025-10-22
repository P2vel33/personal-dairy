import React, { useContext, useEffect, useId, useReducer, useRef, useState } from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { formReducer, initialValue } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';
import { PostContext } from '../../context/post.context';

function JournalForm({ onSubmit, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, initialValue);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const tagRef = useRef();
  const { userId } = useContext(UserContext);
  const { currentPost, setCurrentPost } = useContext(PostContext);

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
    if (!currentPost.id) {
      dispatchForm({ type: 'CLEAR' });
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
    dispatchForm({ type: 'SET_VALUE', payload: { ...currentPost } });
  }, [currentPost, userId]);

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
      dispatchForm({ type: 'SET_VALUE', payload: { userId } });
    }
  }, [isFormReadyToSubmit, values, onSubmit, userId]);

  useEffect(() => {
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  }, [userId]);

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
  };
  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' });
  };

  const deleteJournalItem = () => {
    onDelete(currentPost.id);
    setCurrentPost({
      title: '',
      tag: '',
      date: '',
      post: ''
    });
    dispatchForm({ type: 'CLEAR' });
    dispatchForm({ type: 'SET_VALUE', payload: { userId } });
  };

  return (
    <form onSubmit={addJournalItem} className={cn(styles['journal-form'])}>
      {/* {userId} */}
      <div className={cn(styles['form-row'])}>
        <Input
          type="text"
          name="title"
          appearence="title"
          ref={titleRef}
          value={values.title}
          onChange={onChange}
          isValid={!isValid.title}
        />
        {currentPost?.id && (
          <button className={cn(styles['delete'])} onClick={deleteJournalItem}>
            <img className="delete" src="/exit.svg" alt="Иконка удаления поста"></img>
          </button>
        )}
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="date" className={cn(styles['form-label'])}>
          <img className="calendar" src="/calendar.svg" alt="Логотип календаря" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          ref={dateRef}
          onChange={onChange}
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          isValid={!isValid.date}
        />
      </div>
      <div className={cn(styles['form-row'])}>
        <label htmlFor="tag" className={cn(styles['form-label'])}>
          <img className="tags" src="/tags.svg" alt="Логотип тэга" />
          <span>Метки</span>
        </label>
        <Input type="text" name="tag" ref={tagRef} onChange={onChange} value={values.tag} isValid={!isValid.tag} />
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
      <Button>Сохранить</Button>
    </form>
  );
}

export default JournalForm;
