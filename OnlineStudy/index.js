/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Platform } from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setEnableDebugging(false);
    KeyboardManager.setKeyboardDistanceFromTextField(10);
    KeyboardManager.setPreventShowingBottomBlankSpace(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText("Done");
    KeyboardManager.setToolbarManageBehaviour(0);
    KeyboardManager.setToolbarPreviousNextButtonEnable(false);
    KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
    KeyboardManager.setShouldShowTextFieldPlaceholder(true); // deprecated, use setShouldShowToolbarPlaceholder
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.resignFirstResponder();
    KeyboardManager.isKeyboardShowing()
      .then((isShowing) => {
          // ...
      });
}
AppRegistry.registerComponent(appName, () => App);
