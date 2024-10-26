import InputField from "@/components/InputField";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";
const SignUp = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onSignUpPress = async () => {};

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                <View className="relative w-full h-[120px]">
                    <Image
                        source={images.signUpCar}
                        className="z-0 w-full h-[250px] -top-44"
                    />
                    <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                        Créer un compte
                    </Text>
                </View>
                <View className="p-5">
                    <InputField
                        label="Nom"
                        placeholder="Votre nom"
                        icon={icons.person}
                        value={form.name}
                        onChangeText={(value) =>
                            setForm({ ...form, name: value })
                        }
                    />
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
                        onPress={onSignUpPress}
                        className="mt-6"
                    />
                    <OAuth />
                    <Link
                        href="/sign-in"
                        className="text-lg text-center text-general-200 mt-10"
                    >
                        Vous avez déjà un compte?{" "}
                        <Text className="text-primary-500">Se connecter</Text>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUp;
