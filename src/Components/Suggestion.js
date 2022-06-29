import React, {useState, useEffect} from 'react';



const Suggestion = (props) => {

  const [value, setValue] = useState('');

  useEffect(()=>{
    props.onFocus()
  },[])

  return (
    <div style={{
        // marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    // marginHorizontal: 15,
    height: '100%',
    width: '100%',
    elevation: 4,
    shadowOpacity: 2,
    shadowRadius: 15,

    shadowColor: 'rgba(0, 0, 0, 0.15)',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    }}>
      <textarea className={props.minimize ?"suggestion-box-tab" : "suggestion-box"}
        // editable={false}
      
        multiline={true}
      
        value={props.value}
        onChange={props.onChangeText}
        returnKeyType="next"
        placeholder= "Your Suggestion Here..."
      />

     
    </div>
  );
};

export default Suggestion;
// const styles = StyleSheet.create({
//   content: {
//     // marginTop: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderRadius: 15,
//     // marginHorizontal: 15,
//     height: '100%',
//     width: '100%',
//     elevation: 4,
//     shadowOpacity: 2,
//     shadowRadius: 15,

//     shadowColor: 'rgba(0, 0, 0, 0.15)',
//     borderColor: 'rgba(0, 0, 0, 0.15)',
//   },
// });

// import React from 'react';
// import {Text, View, TextInput, StyleSheet, Modal} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
