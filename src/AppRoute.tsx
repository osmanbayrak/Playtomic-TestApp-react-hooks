import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { Router } from 'react-router';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth  } from "firebase/auth";
import "antd/dist/antd.css";
import { Login } from './features/login/Login';
import { Dashboard } from './features/dashboard/Dashboard';

export const AppRoute: any = (props: any) => {
  const firebaseConfig = {
    apiKey: "AIzaSyC2xl3mNGQbQ7jh8An2q-3hrlIX65FXc_s",
    authDomain: "playtomic-auth-77056.firebaseapp.com",
    projectId: "playtomic-auth-77056",
    storageBucket: "playtomic-auth-77056.appspot.com",
    messagingSenderId: "1007166344297",
    appId: "1:1007166344297:web:30656113fae9349d9b66f8",
    measurementId: "G-YR1L6MQ01L"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}
