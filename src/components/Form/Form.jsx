import { useState } from 'react';
import { Button } from 'components/Styled';
import { FormContainer } from './Form.styled';
import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import Modal from 'components/Modal/Modal';
import { addContact } from 'redux/contactsSlice';

const defaultFields = { name: '', number: '' };

const Form = () => {
  const [modalMessage, setModalMessage] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [fields, setFields] = useState(defaultFields);

  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);

  const handleAddContact = ({ name, number }) => {
    if (
      contacts.some(contact => {
        return contact.name.toLowerCase() === name.toLowerCase();
      })
    ) {
      setModalMessage(`${name} is already in contacts.`);
      setModalOpened(true);
      return;
    }
    dispatch(addContact({ name, number }));
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFields(fields => ({ ...fields, [name]: value }));
  };

  const submitHandler = e => {
    e.preventDefault();
    handleAddContact(fields);
    setFields({ ...defaultFields });
  };

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setModalMessage('');
      setModalOpened(false);
    }
  };

  return (
    <>
      <FormContainer onSubmit={submitHandler}>
        <Input
          label="Name"
          type="text"
          name="name"
          value={fields.name}
          onChange={handleInputChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Input
          label="Number"
          type="tel"
          name="number"
          value={fields.number}
          onChange={handleInputChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Button type="submit">Add contact</Button>
      </FormContainer>
      <Modal modalOpened={modalOpened} onCloseModal={closeModal}>
        {modalMessage}
      </Modal>
    </>
  );
};

export default Form;
