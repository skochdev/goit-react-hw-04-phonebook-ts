import { nanoid } from 'nanoid';
import React, { SyntheticEvent, useState } from 'react';
import s from './AddContactForm.module.css';
import { ContactType } from '../../App';

interface AddContactFormProps {
  onAddNewContact: (contact: ContactType) => void;
}

export default function AddContactForm({
  onAddNewContact,
}: AddContactFormProps) {
  let [name, setName] = useState('');
  let [phone, setPhone] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (name) {
      onAddNewContact({
        name,
        phone,
        id: nanoid(),
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setPhone('');
    setName('');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
      return;
    }

    if (e.target.name === 'phone') {
      setPhone(e.target.value);
      return;
    }
  };

  return (
    <>
      <form className={s.addContactForm} onSubmit={handleSubmit}>
        <label className={s.addContactLabel}>
          new contact
          <input
            className={s.addContactInput}
            placeholder="Bohdan Skochii"
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={onInputChange}
          />
        </label>
        <label className={s.addContactLabel}>
          phone
          <input
            onChange={onInputChange}
            type="tel"
            placeholder="+380633065553"
            className={s.addContactInput}
            name="phone"
            value={phone}
            required
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          />
        </label>
        <button className={`btn ${s.addContactBtn}`} type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
