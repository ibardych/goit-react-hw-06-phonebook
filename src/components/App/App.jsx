import Canvas from 'components/Canvas/Canvas';
import { draw } from 'utils';
import { MainContainer } from './App.styled';
import PhoneBook from '../PhoneBook/PhoneBook';
import Copyright from 'components/Copyright/Copyright';
import { Provider } from 'react-redux';
import { persistor, store } from './../../redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Canvas draw={draw} height={1000} width={1000} />
        <MainContainer>
          <PhoneBook />
          <Copyright message="©2023 Made by Iurii Bardych" />
        </MainContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
