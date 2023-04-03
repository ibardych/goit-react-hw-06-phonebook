// import { PropTypes } from 'prop-types';
import { List } from '../ContactsList/ContactsList.styled';
import { Contact } from '../Styled';
import { Button } from 'components/Styled';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';

const ContactsList = () => {
  const dispatch = useDispatch();

  const getVisibleContacts = (contacts, filter) => {
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filter.toLowerCase()) ||
        number.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter);

  const handleDeleteContact = id => dispatch(deleteContact(id));

  return (
    <List>
      {visibleContacts.map(({ id, name, number }) => (
        <Contact key={id}>
          <span>
            {name}:<strong>{number}</strong>
          </span>
          <Button onClick={() => handleDeleteContact(id)}>Delete</Button>
        </Contact>
      ))}
    </List>
  );
};

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   onDeleteContact: PropTypes.func.isRequired,
// };

export default ContactsList;
