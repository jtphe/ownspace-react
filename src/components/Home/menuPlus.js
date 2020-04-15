import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import i18n from '@i18n/i18n';
import { Actions } from 'react-native-router-flux';

const { SlideInMenu } = renderers;

const MenuPlus = ({ setRefPlus }) => {
  return (
    <View>
      <Menu ref={setRefPlus} renderer={SlideInMenu}>
        <MenuTrigger />
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            },
            optionsWrapper: {
              ...ifIphoneX(
                {
                  paddingBottom: 30
                },
                {
                  paddingBottom: 10
                }
              ),
              paddingTop: 10
            }
          }}
        >
          <MenuOption
            value={1}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => console.log('import file')}
          >
            <View style={styles.options}>
              <Icon name="import" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.importFile')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={2}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => Actions.createFile()}
          >
            <View style={styles.options}>
              <IconFeather name="file-plus" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.createFile')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={3}
            customStyles={{
              optionWrapper: styles.menuOptions
            }}
            onSelect={() => console.log('create folder')}
          >
            <View style={styles.options}>
              <IconFeather name="folder-plus" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.createFolder')}
              </Text>
            </View>
          </MenuOption>
          <MenuOption
            value={4}
            customStyles={{
              optionWrapper: styles.menuOptionsLast
            }}
            onSelect={() => console.log('take picture')}
          >
            <View style={styles.options}>
              <IconFeather name="camera" size={25} color="#003466" />
              <Text style={styles.textMenuOptions}>
                {i18n.t('menuPlus.takePicture')}
              </Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOptions: {
    margin: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    borderBottomWidth: 0.3,
    borderColor: '#ccc',
    paddingBottom: 15
  },
  menuOptionsLast: {
    margin: 7,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  textMenuOptions: {
    marginLeft: 20
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default MenuPlus;
