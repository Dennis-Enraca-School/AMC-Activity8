import { Text, View, StyleSheet, Image } from 'react-native';

export default function ProjectImage1() {
  return (  
      <Image style={styles.projectImage} source={require('../assets/images/mwp2.png')} />
  );
}

const styles = StyleSheet.create({
  projectImage : {
    height: 128,
    width: 250,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});
