import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the entire screen
    justifyContent: 'flex-start', // Aligns items from the top
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop:70,
  },
  button: {
    backgroundColor: "black",
    height: 40,
    color: "white",
    width: "35%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Adds spacing between the input and button
  },
  buttontext: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20, // Adds spacing below the title
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    backgroundColor: '#fff',
  },
  tasksContainer: {
    width: '100%', // Takes full width to align properly
    paddingHorizontal: 16, // Padding on both sides
    paddingBottom: 20, // Adds space below the last task
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width:'80%',
  },
  task: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Ensures long text wraps instead of overflowing
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
