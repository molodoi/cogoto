import InputField from "@/components/InputField";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";
const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const onSignInPress = async () => {};

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[210px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px] -top-44"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Se connecter
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Email"
                        placeholder="Votre email"
                        icon={icons.email}
                        textContentType="emailAddress"
                        value={form.email}
                        onChangeText={(value) =>
                            setForm({ ...form, email: value })
                        }
                    />
                    <InputField
                        label="Mot de passe"
                        placeholder="Votre mot de passe"
                        icon={icons.lock}
                        secureTextEntry={true}
                        textContentType="password"
                        value={form.password}
                        onChangeText={(value) =>
                            setForm({ ...form, password: value })
                        }
                    />
                    <CustomButton
                        title="S'inscrire"
                        onPress={onSignInPress}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href="/sign-up"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Vous n'avez pas de compte?{" "}
                        <Text className="text-primary-500">
                            Créer un compte
                        </Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
