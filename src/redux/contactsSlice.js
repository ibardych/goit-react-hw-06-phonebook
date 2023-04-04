import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'contacts',
  storage,
};

const contactsInitialState = {
  // contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
  contacts: [
    { id: 'id-1', name: 'Zara Nova', number: '459-12-56' },
    { id: 'id-2', name: 'Kairos Blackwood', number: '443-89-12' },
    { id: 'id-3', name: 'Lysandra Steele', number: '645-17-79' },
    { id: 'id-4', name: 'Xander Vex', number: '227-91-26' },
    { id: 'id-5', name: 'Vega Starlight', number: '124-87-56' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {
    addContact: (state, { payload }) => {
      const newContact = {
        id: nanoid(),
        name: payload.name,
        number: payload.number,
      };

      state.contacts.push(newContact);
    },
    deleteContact({ contacts }, action) {
      const index = contacts.findIndex(
        contact => contact.id === action.payload
      );
      contacts.splice(index, 1);
    },
    clearContacts() {
      return [];
    },
  },
});

export const { addContact, deleteContact, clearContacts } =
  contactsSlice.actions;

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);
