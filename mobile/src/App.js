import React from 'react';
import {StatusBar} from 'react-native';
import {withAuthenticator,} from 'aws-amplify-react-native';

import Navigation from './Navigation';
import MainNavigation from './MainNavigation';
import Auth from '@aws-amplify/auth';

const App = () => {
  // StatusBar.setBarStyle('light-content', true);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  // signOut();

  Auth.currentCredentials().then((info) => {
    const cognitoIdentityId = info.identityId;
    console.log("identity ID: " + cognitoIdentityId);
  });

  return <Navigation />;
};

const signUpConfig = {
  header: 'Register for SMLCS',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      placeholder: 'Email',
      type: 'email',
      displayOrder: 1,
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      placeholder: 'Password',
      type: 'password',
      displayOrder: 2,
    },
  ],
};

export default withAuthenticator(App, {signUpConfig});
