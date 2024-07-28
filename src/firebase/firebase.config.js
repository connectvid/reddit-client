// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCKiGchwJyYQOAOlie3rjueG4gVvuG_e4A',
    authDomain: 'bizreply-app.firebaseapp.com',
    projectId: 'bizreply-app',
    storageBucket: 'bizreply-app.appspot.com',
    messagingSenderId: '577668839443',
    appId: '1:577668839443:web:296008cc845c9aafefe7e6'
};

/*
const firebaseConfig = {
    apiKey: 'AIzaSyDXNfzQFhgUfHB7pRwie5zIeLejKPWWBMo',
    authDomain: 'fly-dms.firebaseapp.com',
    projectId: 'fly-dms',
    storageBucket: 'fly-dms.appspot.com',
    messagingSenderId: '405248891475',
    appId: '1:405248891475:web:dae277ddd29c84743a04a6'
    // measurementId: 'G-CY9S1ZH79D'
};
*/
/*

apiKey: "AIzaSyAs4Jr-6nPIVqrmxQqPxyiHrKy2I5UrXOc",

authDomain: "twitter-dm-1423a.firebaseapp.com",

projectId: "twitter-dm-1423a",

storageBucket: "twitter-dm-1423a.appspot.com",

messagingSenderId: "537864803672",

appId: "1:537864803672:web:b22a02ec6e8adfad2e812d"

};
*/ // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
