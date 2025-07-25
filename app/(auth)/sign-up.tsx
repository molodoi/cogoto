import { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import InputField from "@/components/InputField";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { fetchAPI } from "@/lib/fetch";
const SignUp = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [verification, setVerification] = useState({
        state: "default",
        error: "",
        code: "",
    });

    const onSignUpPress = async () => {
        if (!isLoaded) return;
        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });
            setVerification({
                ...verification,
                state: "pending",
            });
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.log(JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors[0].longMessage);
        }
    };
    const onPressVerify = async () => {
        if (!isLoaded) return;
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification(
                {
                    code: verification.code,
                }
            );
            if (completeSignUp.status === "complete") {
                await fetchAPI("/(api)/user", {
                    method: "POST",
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        clerkId: completeSignUp.createdUserId,
                    }),
                });
                await setActive({ session: completeSignUp.createdSessionId });
                setVerification({
                    ...verification,
                    state: "success",
                });
            } else {
                setVerification({
                    ...verification,
                    error: "La vérification a échoué. Veuillez réessayer.",
                    state: "failed",
                });
            }
        } catch (err: any) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            setVerification({
                ...verification,
                error: err.errors,
                state: "failed",
            });
        }
    };

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
                <ReactNativeModal
                    isVisible={verification.state === "pending"}
                    // onBackdropPress={() =>
                    //   setVerification({ ...verification, state: "default" })
                    // }
                    onModalHide={() => {
                        if (verification.state === "success") {
                            setShowSuccessModal(true);
                        }
                    }}
                >
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Text className="font-JakartaExtraBold text-2xl mb-2">
                            Vérification
                        </Text>
                        <Text className="font-Jakarta mb-5">
                            Code de vérification envoyé à {form.email}.
                        </Text>
                        <InputField
                            label={"Code"}
                            icon={icons.lock}
                            placeholder={"12345"}
                            value={verification.code}
                            keyboardType="numeric"
                            onChangeText={(code) =>
                                setVerification({ ...verification, code })
                            }
                        />
                        {verification.error && (
                            <Text className="text-red-500 text-sm mt-1">
                                {verification.error}
                            </Text>
                        )}
                        <CustomButton
                            title="Verify Email"
                            onPress={onPressVerify}
                            className="mt-5 bg-success-500"
                        />
                    </View>
                </ReactNativeModal>
                <ReactNativeModal isVisible={showSuccessModal}>
                    <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                        <Image
                            source={images.check}
                            className="w-[110px] h-[110px] mx-auto my-5"
                        />
                        <Text className="text-3xl font-JakartaBold text-center">
                            Verifié
                        </Text>
                        <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
                            Compte vérifié avec succés.
                        </Text>
                        <CustomButton
                            title="Browse Home"
                            onPress={() => router.push(`/(root)/(tabs)/home`)}
                            className="mt-5"
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
};

export default SignUp;
