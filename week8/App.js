import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
// import image1 from "./assets/images/mwp2.png";
// import image2 from "./assets/images/Daikin3.png";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import Image1 from './components/ProjectImage_1';
import Image2 from './components/ProjectImage_2';
import ProfileImage from './components/ProfileImage'
const App = () => {
  // Step 1: Use `useState` to keep track of the current section index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Step 2: Define the resume data (this is static data for the app)
  const resumeData = {
    about: '\t I am Dennis Enraca, Currently taking a BSIT course at Global Reciprocal College, hoping to graduate on 2026. I am a part timer on one web development company before but now I resigned to focus on my academics. I handle multiple projects that in laravel framework.',
    workdetails: {
      project1: {
        link : 'https://myweddingplanner.ph/',
        name: 'MWP - My Wedding Planner',
        description : '\tMy Wedding Planner Phillippines - is a wedding planner platform for couple where they can manage their events by setting a event date info, send rvps, manage suppliers need, and templated wedding website. For the supplier the system aims to gain more insights, get more clients and posting their business profile on platform.',
      },
      project2: {
        link : 'https://intranet.daikin.com.ph/',
        name: 'Daikin PH Intranet',
        description : '\tIntranet Daikin Philippines - is an intranet/employee portal for the Philippines branch of the famous airconditioning producer Daikin. We created a portal for Daikin ph to make them easily notified about announcements, birthdays, events, etc. They can easily browse the employee list company policy and company history.',
      }
 
    },
    contact: {
      emailaddress: 'dennisenraca25@gmail.com',
      contactnumber: '(+63)905 044 9294'
    },
    name: {
      fullname: 'Dennis Enraca',
      course: 'BS Information Technology'
    },
    education: {
      elementary: 'Almanza Elementary School',
      highschool: 'BS Information Technology',
      college: 'Global Reciprocal College'
    },
    skills: 'Laravel, React, Python, Tailwind CSS and PHP ',
  };

  // Step 3: Define an array of sections
  // Each section has a `key` (unique identifier) and `content` (JSX to render)
  const sections = [
    {
      key: 'name',
      content: (

      <View style={styles.textContainer}>
          {/* Display the profile image and name */}
          <ProfileImage />
          <Text style={styles.header}>Full Name:</Text>
          <Text style={styles.info}>{resumeData.name.fullname}</Text>
          <Text style={styles.header}>Course:</Text>
          <Text style={styles.info}>{resumeData.name.course}</Text>
        </View>
      ),
    },
    {
      key: 'education',
      content: (
        <View style={styles.textContainer}>
          <Text style={styles.header}>College:</Text>
          <Text style={styles.info}>{resumeData.education.college}</Text>
          <Text style={styles.header}>High School:</Text>
          <Text style={styles.info}>{resumeData.education.highschool}</Text>
          <Text style={styles.header}>Elementary:</Text>
          <Text style={styles.info}>{resumeData.education.elementary}</Text>
          {/* Display education details */}
        </View>
      ),
    },
    {
      key: 'about',
      content: (
        <View style={styles.textContainer}>
          {/* Display about me section */}
          <Text style={styles.title}>About Me:</Text>
          <Text style={styles.info}>{resumeData.about}</Text>
        </View>
      ),
    },
    {
      key: 'workdetails',
      content: (
        <ScrollView>
          <View style={styles.projectsContainer}>
          {/* Display work details */}
         
          <Image1 />
          <Text style={styles.header}>{resumeData.workdetails.project1.name}</Text>
          <Text style={styles.link}>{resumeData.workdetails.project1.link}</Text>
          <Text style={styles.projectDescription}>{resumeData.workdetails.project1.description}</Text>
        </View>

         <View style={styles.projectsContainer}>
            {/* Display work details */}
          
            <Image2 />
            // <Image source={resumeData.workdetails.project2.imageSrc} style={styles.projectImage} />
            <Text style={styles.header}>{resumeData.workdetails.project2.name}</Text>
            <Text style={styles.link}>{resumeData.workdetails.project2.link}</Text>
            <Text style={styles.projectDescription}>{resumeData.workdetails.project2.description}</Text>
        </View>
        </ScrollView>
        
      ),
    },
    {
      key: 'contact',
      content: (
        <View style={styles.contactContainer}>
          {/* Display contact information */}
          <Text style={styles.header}>Contact Me:</Text>
          <Text style={styles.info}>
            Email: {resumeData.contact.emailaddress}{'\n'}
            Contact Number: {resumeData.contact.contactnumber}
          </Text>
        </View>
      ),
    },
    {
      key: 'skills',
      content: (
        <View style={styles.skillsContainer}>
          {/* Display contact information */}
          <Text style={styles.header}>Skills:</Text>
          <Text style={styles.info}>
            {resumeData.skills}
          </Text>
        </View>
      ),
    },
  ];



  // Animation value
    const opacity = useSharedValue(1);
    const translateX = useSharedValue(0);

    // Animated style
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    }));


  // Step 4: Handle button press to cycle through sections
  
   const swipe = (action) => {

    opacity.value = withTiming(0, { duration: 200 }); // Fade out
    translateX.value = withTiming(action === "left" ? -50 : 50, { duration: 200 });


    setTimeout(() => {
      if (action === "left") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
      } else if (action === "right") {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
      }
      opacity.value = withTiming(1, { duration: 200 }); // Fade in
      translateX.value = withTiming(0, { duration: 200 });
    }, 200);



  };
  return (
        <SafeAreaView style={{ flex: 1 }, styles.container}>
        {/* Step 5: Use TouchableOpacity to make the content clickable change to Gesture Recognizer */}
        <GestureRecognizer style={styles.contentContainer} 
            onSwipeLeft={() => swipe('left')}
            onSwipeRight={() =>  swipe('right')}>
        <Text style={styles.title}> My Portfolio</Text>

          <Animated.ScrollView contentContainerStyle={[styles.card, animatedStyle]}>             
            {/* Step 6: Render the current section's content */}
            {sections[currentIndex].content}           
          </Animated.ScrollView>
          </GestureRecognizer>

        </SafeAreaView>
  );
};

// Step 7: Define styles for the components
const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  header: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
  },
  info:{
    marginBottom: 5,
    fontSize: 12
  },

  link :{
    color: 'blue',
    textDecorationLine: 'underline'
  },
  projectDescription: {
    fontSize: 10,
    marginTop: 5
  },
  projectsContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  }
 
});

export default App;
