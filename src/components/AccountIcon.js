// Copyright 2015-2019 Parity Technologies (UK) Ltd.
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
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { blockiesIcon } from '../util/native';

AccountIcon.propTypes = {
  seed: PropTypes.string.isRequired
};

export default function AccountIcon(props) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    async function displayIcon(seed) {
      try {
        let icon = await blockiesIcon(seed);
        setIcon(icon);
      } catch (e) {
        console.log(e);
      }
    }

    displayIcon(props.seed);
  }, [props.seed]);

  return (
    <View style={styles.identicon}>
      <Image style={props.style || {}} source={{ uri: icon }} />
    </View>
  );
}

const styles = StyleSheet.create({
  identicon: {
    alignItems: 'center'
  }
});
