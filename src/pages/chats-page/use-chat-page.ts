import { useAppDispatch } from "../../use-app-dispatch";
import { setAuth } from "../../store/authSlice";
import {
  api,
  ChatbotApiArg,
  IContactQuestion,
} from "../../api/chatbotApi.generated";
import { useEffect, useState } from "react";
import {
  addChat,
  setContactQuestionResponse,
  setCustomerId,
} from "../../store/chatbotSlice";
import { isDefined } from "../../utils";

interface IErrorParams {
  userData: string;
  msg: string;
}

export const useChatPage = () => {
  const dispatch = useAppDispatch();
  const { data } = api.useGetAccessTokenQuery();
  const [contactField, setContactField] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>();
  const [
    getChatResponse,
    { data: chatResponseData, isFetching: chatResponseIsLoading },
  ] = api.useLazyGetChatGptResponseQuery();

  useEffect(() => {
    if (data) dispatch(setAuth(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isDefined(chatResponseData)) {
      if (isDefined(chatResponseData?.customerId) && !userId) {
        setUserId(chatResponseData?.customerId);
        dispatch(setCustomerId(chatResponseData.customerId));
      }
      if (isDefined(chatResponseData.chatGptResponse)) {
        dispatch(
          addChat({
            chatGptResponse: chatResponseData.chatGptResponse,
            chatType: 2,
          })
        );
        setContactField(null);
      } else if (isDefined(chatResponseData.contactQuestions)) {
        const contactKey = Object.keys(chatResponseData.contactQuestions[0])[0];
        setContactField(contactKey);
        dispatch(
          addChat({
            chatGptResponse: Object.values(
              chatResponseData.contactQuestions[0]
            )[0],
            chatType: 2,
          })
        );
      }
    }
  }, [chatResponseData]);

  const getGptReponse = ({ question }: ChatbotApiArg) => {
    dispatch(addChat({ question, chatType: 1 }));
    getChatResponse({ question, customerId: userId });
  };
  const sendContact = (
    contactResponse: IContactQuestion,
    contValue: string
  ) => {
    dispatch(setContactQuestionResponse(contactResponse));
    dispatch(addChat({ question: contValue, chatType: 1 }));
    getChatResponse({
      customerId: userId,
      contactQuestionResponse: contactResponse,
    });
  };
  const displayError = ({ userData, msg }: IErrorParams) => {
    dispatch(addChat({ question: userData, chatType: 1 }));
    dispatch(addChat({ chatGptResponse: msg, chatType: 2 }));
  };

  return {
    getGptReponse,
    chatResponseIsLoading,
    contactField,
    sendContact,
    displayError,
  };
};
