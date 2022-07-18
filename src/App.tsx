import React, { Component } from 'react';
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

type AppState = {
  contacts: ContactType[];
  filter: string;
};

class App extends Component<{}, AppState> {
  state: AppState = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      let serializedContacts = JSON.parse(storedContacts);

      this.setState({ contacts: serializedContacts });
    }
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  checkForDuplicate = (name: string) => {
    let { contacts } = this.state;
    let normalizedName = name.toLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
  };

  onAddNewContact = (contact: ContactType) => {
    const isDuplicate = this.checkForDuplicate(contact.name);

    if (isDuplicate) {
      alert(`${contact.name} is already in your contacts`);
    } else {
      this.setState(current => ({
        contacts: [...current.contacts, contact],
      }));
    }
  };

  onFilterChange = (filter: string) => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    let { contacts, filter } = this.state;
    let normalizedFilter = filter.toLowerCase();

    // filters by name or phone number
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.includes(normalizedFilter)
      );
    });
  };

  handleRemove = (id: string) => {
    this.setState(current => ({
      contacts: current.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const {
      getFilteredContacts,
      onFilterChange,
      onAddNewContact,
      handleRemove,
    } = this;
    const { contacts, filter } = this.state;
    const contactsAreNotEmpty = contacts.length;
    const filteredContacts = getFilteredContacts();

    return (
      <div className="App">
        <Container>
          <h1>Phonebook</h1>
          <AddContactForm onAddNewContact={onAddNewContact} />

          {contactsAreNotEmpty ? (
            <>
              <h2>Contacts</h2>
              <FilterContacts filter={filter} onFilter={onFilterChange} />
            </>
          ) : null}
          <ContactList contacts={filteredContacts} onRemove={handleRemove} />
        </Container>
      </div>
    );
  }
}

export default App;
