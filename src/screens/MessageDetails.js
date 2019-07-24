// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Subscribe } from 'unstated';
import colors from '../colors';
import AccountCard from '../components/AccountCard';
import Background from '../components/Background';
import Button from '../components/Button';
import AccountsStore from '../stores/AccountsStore';
import ScannerStore from '../stores/ScannerStore';
import { hexToAscii, isAscii } from '../util/message';

const orUnknown = (value = 'Unknown') => value;

export default class MessageDetails extends React.PureComponent {
  static navigationOptions = {
    title: 'Transaction Details',
    headerBackTitle: 'Transaction details'
  };
  render() {
    return (
      <Subscribe to={[ScannerStore, AccountsStore]}>
        {(scannerStore, accounts) => {
          const dataToSign = scannerStore.getDataToSign();
          if (dataToSign) {
            const tx = scannerStore.getTx();
            return (
              <MessageDetailsView
                {...this.props}
                scannerStore={scannerStore}
                sender={scannerStore.getSender()}
                message={scannerStore.getMessage()}
                dataToSign={dataToSign}
                onPressAccount={async account => {
                  await accounts.select(account);
                  this.props.navigation.navigate('AccountDetails');
                }}
                onNext={async () => {
                  try {
                    this.props.navigation.navigate('AccountUnlockAndSign', {
                      next: 'SignedMessage'
                    });
                  } catch (e) {
                    scannerStore.setErrorMsg(e.message);
                  }
                }}
              />
            );
          } else {
            return null;
          }
        }}
      </Subscribe>
    );
  }
}

export class MessageDetailsView extends React.PureComponent {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    dataToSign: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.bodyContent}
        style={styles.body}
      >
        <Background />
        <Text style={styles.topTitle}>SIGN MESSAGE</Text>
        <Text style={styles.title}>FROM ACCOUNT</Text>
        <AccountCard
          title={this.props.sender.name}
          address={this.props.sender.address}
          networkKey={this.props.sender.networkKey}
          onPress={() => {
            this.props.onPressAccount(this.props.sender);
          }}
        />
        <Text style={styles.title}>MESSAGE</Text>
        <Text style={styles.message}>
          {isAscii(this.props.message)
            ? hexToAscii(this.props.message)
            : this.props.data}
        </Text>
        <Button
          buttonStyles={{ backgroundColor: colors.bg_positive, height: 60 }}
          title="Sign Message"
          textStyles={{ color: colors.card_text }}
          onPress={() => this.props.onNext()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.bg,
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    overflow: 'hidden'
  },
  bodyContent: {
    paddingBottom: 40
  },
  transactionDetails: {
    flex: 1,
    backgroundColor: colors.card_bg
  },
  topTitle: {
    textAlign: 'center',
    color: colors.bg_text_sec,
    fontSize: 24,
    fontFamily: 'Manifold CF',
    fontWeight: 'bold',
    paddingBottom: 20
  },
  title: {
    color: colors.bg_text_sec,
    fontSize: 18,
    fontFamily: 'Manifold CF',
    fontWeight: 'bold',
    paddingBottom: 20
  },
  message: {
    marginBottom: 20,
    padding: 10,
    height: 120,
    lineHeight: 26,
    fontSize: 20,
    backgroundColor: colors.card_bg
  },
  wrapper: {
    borderRadius: 5
  },
  address: {
    flex: 1
  },
  deleteText: {
    textAlign: 'right'
  },
  changePinText: {
    textAlign: 'left',
    color: 'green'
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  actionButtonContainer: {
    flex: 1
  }
});
