import { Text, View, StyleSheet, Image } from 'react-native';

export default function ProfileImage() {
  return (  
      <Image style={styles.profile} source={require('../assets/images/dennis_pic.jpg')} />
  );
}

const styles = StyleSheet.create({
  profile : {
    borderRadius: 100,
    height: 128,
    width: 128,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});
