import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
  },
  header: {
      padding: 16,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
  },
  backButton: {
      fontSize: 16,
      color: '#007AFF',
      marginBottom: 8,
  },
  searchInput: {
      height: 40,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      paddingHorizontal: 12,
      backgroundColor: 'white',
  },
  loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  emptyText: {
      textAlign: 'center',
      marginTop: 32,
      fontSize: 16,
      color: '#666',
  },
}); 