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

import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Image, View } from 'react-native';
import { qrCode } from '../util/native';

export default function QrView(props) {
  const [qr, setQr] = useState(null);

  useEffect(() => {
    async function displayQrCode(data) {
      try {
        let qr = await qrCode(data);
        setQr(qr);
      } catch (e) {
        console.log(e);
      }
    }
    displayQrCode(props.text);
  }, [props.text]);

  const { width: deviceWidth } = Dimensions.get('window');
  let size = props.size || deviceWidth - 80;
  let flexBasis = props.height || deviceWidth - 40;

  const renderQr = () => (
    <View
      style={[
        styles.rectangleContainer,
        { flexBasis, height: flexBasis },
        props.style
      ]}
    >
      <Image source={{ uri: qr }} style={{ width: size, height: size }} />
    </View>
  );

  if (this.props.screen) {
    return <View style={AppStyles.view}>{renderQr()}</View>;
  }

  return renderQr();
}

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});
