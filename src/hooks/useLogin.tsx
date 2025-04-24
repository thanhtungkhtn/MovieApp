import { useAuth } from "@/context/AuthContext";
import { getRequestToken, getSessionId, validateLogin } from "@/services/user.services";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Status } from "./useShowToast";
import { useEffect } from "react";
import { showToast } from "@/services/toast.services";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginForm = {
  username: string;
  password: string;
};
export function useLogin() {
  const { login } = useAuth();
  
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  
  const handleLogin = async (loginForm: LoginForm) => {
    try {
      const token = await getRequestToken();
      const param: type = {
        loginForm.username,
        loginForm.password,
        token
      );
      }
      const validatedToken = await validateLogin(
        param

      );
      const sessionId = await getSessionId(validatedToken);
      await AsyncStorage.setItem('requestToken', token);

      login(sessionId);
      showToast(Status.success, 'Login success');
      navigation.goBack();
    } catch (err: any) {
      showToast(Status.error, 'Invalid username or password');
    }
  };

  useEffect(() => {
    return () => {
      reset({
        // break by func
        username: '',
        password: '',
      });
    };
  }, []);
  return {
    control,
    handleLogin: handleSubmit(handleLogin),
    errors
  }
}
