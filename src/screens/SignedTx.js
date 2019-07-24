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
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Subscribe } from 'unstated';
import colors from '../colors';
import AccountCard from '../components/AccountCard';
import QrView from '../components/QrView';
import TxDetailsCard from '../components/TxDetailsCard';
import AccountsStore from '../stores/AccountsStore';
import ScannerStore from '../stores/ScannerStore';

export default class SignedTx extends React.PureComponent {
  render() {
    return (
      <Subscribe to={[ScannerStore, AccountsStore]}>
        {(scanner, accounts) => {
          return (
            <SignedTxView
              {...scanner.getTx()}
              data={scanner.getSignedTxData()}
              recipient={scanner.getRecipient()}
            />
          );
        }}
      </Subscribe>
    );
  }
}

export class SignedTxView extends React.PureComponent {
  static propTypes = {
    data: PropTypes.string.isRequired,
    recipient: PropTypes.object.isRequired,
    value: PropTypes.string,
    nonce: PropTypes.string,
    gas: PropTypes.string,
    gasPrice: PropTypes.string
  };

  render() {
    return (
      <ScrollView style={styles.body} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.topTitle}>SCAN SIGNATURE</Text>
        <View style={styles.qr}>
          <QrView text={this.props.data} />
        </View>
        <Text style={styles.title}>TRANSACTION DETAILS</Text>
        <TxDetailsCard
          style={{ marginBottom: 20 }}
          description="After scanning and publishing you will have sent"
          value={this.props.value}
          gas={this.props.gas}
          gasPrice={this.props.gasPrice}
        />
        <Text style={styles.title}>RECIPIENT</Text>
        <AccountCard
          title={this.props.recipient.name}
          address={this.props.recipient.address}
          networkKey={this.props.recipient.networkKey || ''}
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
    overflow: 'hidden'
  },
  qr: {
    marginBottom: 20,
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
  }
});
