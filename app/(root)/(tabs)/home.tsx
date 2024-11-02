import { SignedIn, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Home() {
    const { user } = useUser();

    return (
        <SafeAreaView className="bg-general-500">
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>
        </SafeAreaView>
    );
}
