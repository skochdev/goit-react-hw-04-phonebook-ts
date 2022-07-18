import s from './Contact.module.css';

type ContactProps = {
  name: string,
  phone: string,
}

export default function Contact({ name, phone }: ContactProps) {
  return (
    <div className={s.contactDataWrapper}>
      <p className={s.contactData}>{name}</p>
      <p className={s.contactData}>{phone}</p>
    </div>
  );
}

