import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
      marginVertical: 10,
      width: '100%',
  },
  scrollContent: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingHorizontal: 12,
  },
  button: {
      backgroundColor: 'hotpink',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      margin: 4,
      flexShrink: 1,
      flexGrow: 0,
  },
  buttonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
  },
}); 