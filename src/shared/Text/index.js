import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Text, StyleSheet } from 'react-native';

const helveticaFont = {
  // eslint-disable-next-line global-require
  HelveticaNeue: require('../../../assets/fonts/HelveticaNeue.ttf')
};

const TextHelvetica = props => {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);
  const loadFontAsync = async () => {
    await Font.loadAsync(helveticaFont);
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
  fontStyle: { fontFamily: 'HelveticaNeue' }
});

export default TextHelvetica;
