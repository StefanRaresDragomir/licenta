import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField';
import {images} from '../../constants';
import { useState } from 'react';
import  CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router';

const SignUp = () => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  }) 

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = () => {

  }

  return (
    <SafeAreaView className="bg-secondary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4">
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign up to NutriTrack</Text>
          
          <FormField 
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form,
              username: e })}
              otherStyles="mt-10"
          />
          
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form,
              password: e })}
              otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign In"
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="mt-7 bg-white"
          />

          <View className='justify-center pt-5 flex-row gap-2'>
              <Text className="text-lg text-gray-100 font-pregular">
                Have an account already?
              </Text>
              <Link href="/sign-in" className="text-lg font-psemibold text-primary">Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
