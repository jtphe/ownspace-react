import React from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Text from '@shared/ClientText';
import i18n from '@i18n/i18n';

class Animations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0)
    };
  }

  componentDidMount() {}

  render() {
    const { animation } = this.state;
    const progressInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp'
    });

    const colorInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 52, 102, 1)', 'rgba(227, 0, 67, 1)']
    });

    const progressStyle = {
      width: progressInterpolate,
      bottom: 0,
      backgroundColor: colorInterpolate
    };

    return (
      <View style={styles.container}>
        <View style={styles.progressBar}>
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progress, progressStyle]} />
          </View>
          <Text style={styles.progressText}>
            {i18n.t('progressBar.createFile')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  progressBar: {
    paddingLeft: 35,
    paddingVertical: 10,
    backgroundColor: '#E30043',
    overflow: 'hidden'
  },
  progressText: {
    color: 'white',
    backgroundColor: 'transparent'
  },
  progress: {
    position: 'absolute',
    top: 0,
    left: 0
  }
});

export default Animations;
