import { Platform, View, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'

import {
  SafeAreaView
} from 'react-native-safe-area-context';

const InnerLayer = ({ children, noPadding, noHeader, backNav, title, showFooter, pageScroll, pageReload }) => {

    const styles = GetStyles()

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1, backgroundColor:"#fff" }}
        >
          <View style={[styles.wrapper]}>

              <SafeAreaView style={styles.safeView}>

                {/* {!noHeader ?
                  <Header 
                    backNav={backNav}
                    title={title}
                  />
                : null } */}

                  <View style={[styles.innerContent, {padding: noPadding ? 0 : 15}]}>{children}</View>

                  {/* {showFooter ?
                    <BottomTab 
                      pageScroll={pageScroll}
                      pageReload={pageReload}
                    />
                  : null } */}
                  
              </SafeAreaView>

          </View>

        </KeyboardAvoidingView>
    )
}

export default InnerLayer


const GetStyles = () => StyleSheet.create({
    wrapper: {
      flex: 1,
    },
    safeView: {
      flex: 1,
    },
    innerContent: {
      flex: 1,
    },
  });