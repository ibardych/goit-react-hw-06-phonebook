import { useEffect } from 'react';
import { PhoneBookStyled } from './PhoneBook.styled';
import { Button } from 'components/Styled';
import Section from 'components/Section/Section';
import Form from 'components/Form/Form';
import Input from 'components/Form/Input';
import ContactsList from 'components/ContactsList/ContactsList';
import Notification from 'components/Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import { clearContacts } from 'redux/contactsSlice';

const PhoneBook = () => {
  // const storedContacts = window.localStorage.getItem('contacts');
  // const parsedContacts = JSON.parse(storedContacts);

  // const [contacts, setContacts] = useState(parsedContacts ?? []);

  const contacts = useSelector(getContacts);

  const dispatch = useDispatch();

  const filter = useSelector(getFilter);

  const deleteAllContacts = () => {
    dispatch(clearContacts());
  };

  const handleFilter = e => {
    dispatch(setFilter(e.target.value));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <PhoneBookStyled>
      <Section title="Phone book">
        <Form />
      </Section>
      <Section title="Contacts">
        {contacts.length ? (
          <>
            <Input
              label="Find contacts by name or number"
              type="text"
              name="filter"
              onChange={handleFilter}
              value={filter}
            />
            <ContactsList />
            <Button type="default" onClick={deleteAllContacts}>
              Clear all contacts
            </Button>
          </>
        ) : (
          <Notification message="There is no contacts yet" />
        )}
      </Section>
    </PhoneBookStyled>
  );
};

export default PhoneBook;
