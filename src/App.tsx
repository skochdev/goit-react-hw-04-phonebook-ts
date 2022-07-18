import React, { useEffect, useState } from 'react';
import './App.module.css';
import Container from './components/Container';
import FilterContacts from './components/FilterContacts';
import ContactList from './components/ContactsList';
import AddContactForm from './components/AddContactForm';

export type ContactType = {
  name: string;
  phone: string;
  id: string;
};

export default function App() {
  let [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')!) ?? [];
  });

  let [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      let serializedContacts = JSON.parse(storedContacts);

      setContacts(serializedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkForDuplicate = (name: string) => {
    let normalizedName = name.toLowerCase();

    if (contacts) {
      return contacts.some((contact: ContactType) =>
        contact.name.toLowerCase().includes(normalizedName)
      );
    }
  };

  const onAddNewContact = (contact: ContactType) => {
    const isDuplicate = checkForDuplicate(contact.name);

    if (isDuplicate) {
      alert(`${contact.name} is already in your contacts`);
    } else {
      setContacts((prevState: ContactType[]) => [...prevState, contact]);
    }
  };

  const onFilterChange = (filter: string) => {
    setFilter(filter);
  };

  const getFilteredContacts = () => {
    let normalizedFilter = filter.toLowerCase();

    // filters by name or phone number
    return contacts.filter((contact: ContactType) => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.includes(normalizedFilter)
      );
    });
  };

  const handleRemove = (id: string) => {
    let updatedContacts = contacts.filter(
      (contact: ContactType) => contact.id !== id
    );
    setContacts(updatedContacts);
  };

  return (
    <div className="App">
      <Container>
        <h1>Phonebook</h1>
        <AddContactForm onAddNewContact={onAddNewContact} />

        {contacts ? (
          <>
            <h2>Contacts</h2>
            <FilterContacts filter={filter} onFilter={onFilterChange} />
          </>
        ) : null}
        <ContactList contacts={getFilteredContacts()} onRemove={handleRemove} />
      </Container>
    </div>
  );
}
