import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text, StyleSheet } from 'react-native';

const dejaVuSansFont = {
  // eslint-disable-next-line global-require
  DejaVuSans: require('../../../assets/fonts/DejaVuSans.ttf')
};

const TextClient = props => {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const loadFontAsync = async () => {
    await Font.loadAsync(dejaVuSansFont);
    setFontIsLoaded(true);
  };

  useEffect(() => {
    loadFontAsync();
  }, []);

  const { style, ellipsizeMode, selectable, children } = props;
  if (fontIsLoaded) {
    return (
      <Text
        style={[style, styles.fontStyle]}
        ellipsizeMode={ellipsizeMode}
        selectable={selectable}
      >
        {children}
      </Text>
    );
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  fontStyle: { fontFamily: 'DejaVuSans' }
});

export default TextClient;
