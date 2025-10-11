import React from 'react';
import Button from '../Button/Button';

function JournalForm({ onSubmit }) {
  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    onSubmit(formProps);
  };
  return (
    <form onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea name="post" id="" cols="30" rows="10" />
      <Button text="Сохранить" />
    </form>
  );
}

export default JournalForm;
