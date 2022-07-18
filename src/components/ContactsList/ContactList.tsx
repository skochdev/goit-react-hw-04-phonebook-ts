import { RiDeleteBin2Line } from 'react-icons/ri';
import Contact from '../Contact';
import { ContactType } from '../../App';
import s from './ContactList.module.css';

type ContactListProps = {
  contacts: ContactType[];
  onRemove: (id: string) => void;
};

export default function ContactList({ contacts, onRemove }: ContactListProps) {
  return (
    <ul>
      {contacts.map(({ id, name, phone }) => (
        <li className={s.ContactListItem} key={id}>
          <Contact name={name} phone={phone} />
          <button
            type="button"
            className={s.ContactRemoveBtn}
            onClick={() => onRemove(id)}
          >
            <RiDeleteBin2Line
              className={s.deleteIcon}
              title="remove from contacts"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}
