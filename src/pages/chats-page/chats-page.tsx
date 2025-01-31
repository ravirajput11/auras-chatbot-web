import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../use-app-dispatch";
import { getChats, IChat } from "../../store/chatbotSlice";
import { useChatPage } from "./use-chat-page";
import parse from "html-react-parser";
import { decode } from "html-entities";
import { Button } from "@/components/ui/button";
import botChatLogo from "../../assets/chats-page-image/bot-chat-logo.png";
import chatRobotImage from "../../assets/chats-page-image/chat-robot-image-2x.png";
import chatUserLogo from "../../assets/chats-page-image/user-chat-logo.png";
import AurasBgLogo from "../../assets/AURAS-BG-LOGO.png";

interface ChatMessageProps {
  chat: IChat;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const cleanResponse = (html: string) => {
  // Decode entities and remove custom span classes
  const decoded = decode(html);
  return decoded.replace(/<span class=['"][^'"]*['"]>(.*?)<\/span>/g, "$1");
};

const ChatMessage = ({ chat, chatContainerRef }: ChatMessageProps) => {
  const cleanedResponse = cleanResponse(chat.chatGptResponse ?? "");

  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    scrollToBottom();
  }, [chat]);

  return (
    <div className="my-5">
      {chat.chatType === 1 && (
        <div className="flex flex-col">
          <div className="response">&nbsp;</div>
          <div className="flex items-center justify-end gap-2">
            <Button className="bg-[#663399] text-white hover:bg-[#563299] rounded-l-xl rounded-br-2xl">
              {chat.question}
            </Button>
            <img src={chatUserLogo} alt="User Icon" width={70} height={70} />
          </div>
        </div>
      )}
      {chat.chatType === 2 && (
        <div className="prose prose-xl max-w-none text-sm w-5/6 text-[#232323] bg-[#FFFFFF] drop-shadow-[0_3px_6px_#00000029] px-7 py-4 text-[12px] rounded-r-xl rounded-bl-2xl">
          {parse(cleanedResponse)}
        </div>
      )}
    </div>
  );
};

export const ChatsPage = () => {
  const {
    getGptReponse,
    chatResponseIsLoading,
    contactField,
    sendContact,
    displayError,
  } = useChatPage();
  const chats = useAppSelector(getChats);
  const [userQuestion, setUserQuestion] = useState<string>();
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [contactKey, setContactKey] = useState<string | null>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chats.length > 0 && chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  useEffect(() => {
    setContactKey(contactField);
  }, [contactField]);

  const handleTextChange = (inputData: string) => {
    setUserQuestion(inputData);
    setDisableButton(!inputData);
  };

  const validateName = (name: string): boolean => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  };

  const handleQuickAction = (question: string) => {
    handleSubmit(question);
  };

  //Submit form
  const handleSubmit = (predefinedQuestion?: string) => {
    const question = predefinedQuestion || userQuestion;
    if (!question) return;

    if (contactKey) {
      if (contactKey === "name" && question) {
        if (validateName(question)) {
          sendContact({ name: question }, question);
        } else {
          displayError({
            userData: question,
            msg: "Name can include only alphabets and space",
          });
        }
      } else if (contactKey === "email" && question) {
        if (validateEmail(question)) {
          sendContact({ email: question }, question);
        } else {
          displayError({
            userData: question,
            msg: "Please enter valid email id",
          });
        }
      } else if (
        ["companyName", "designation"].includes(contactKey) &&
        question
      ) {
        sendContact({ [contactKey]: question }, question);
      }
    } else {
      getGptReponse({ question });
    }

    if (!predefinedQuestion) handleTextChange("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !disableButton) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Logo */}
      <img
        className="fixed top-28 right-1/4 opacity-100 pointer-events-none"
        src={AurasBgLogo}
        alt=""
      />

      <div className="flex h-screen">
        {/* Left Side - RobotImage */}
        <div
          className="w-1/2 flex items-center justify-center"
          style={{ marginTop: "80px" }}
        >
          <img
            src={chatRobotImage}
            alt="Chat Illustration"
            className="h-[calc(100vh-200px)] w-6/12 pr-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] "
          />
        </div>

        {/* Right Side - Chat Container */}
        <div className="w-6/12 pt-28 px-8">
          <div
            ref={chatContainerRef}
            className="h-[calc(100vh-200px)] overflow-y-auto pr-5 space-y-4 hide-scrollbar"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {/* Bot Initial Message */}
            <div className="flex items-center gap-2">
              <img
                src={botChatLogo}
                alt="Bot Avatar"
                width={70}
                height={70}
                className="object-contain"
              />
              <p className="text-[#232323] bg-[#FFFFFF] drop-shadow-[0_3px_6px_#00000029] px-7 py-4 text-sm rounded-r-xl rounded-bl-2xl">
                Hi! I'm Auras. How may I help you?
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3 pl-20 text-[#232323]">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="rounded-full text-sm ring-1 ring-[#804C9E] bg-[#804C9E0D]"
                  onClick={() => handleQuickAction("What is Auras?")}
                >
                  What is Auras?
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full text-sm ring-1 ring-[#804C9E] bg-[#804C9E0D]"
                  onClick={() =>
                    handleQuickAction("What is Composable Commerce?")
                  }
                >
                  What is Composable Commerce?
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  className="rounded-full text-sm ring-1 ring-[#804C9E] bg-[#804C9E0D]"
                  onClick={() =>
                    handleQuickAction("How to migrate to Composable Commerce?")
                  }
                >
                  How to migrate to Composable Commerce?
                </Button>
              </div>

              {/* Chat Messages */}
              {chats.map((chat, index) => (
                <ChatMessage
                  chat={chat}
                  key={index}
                  chatContainerRef={chatContainerRef}
                />
              ))}

              {/* Loading Indicator */}
              {chatResponseIsLoading && (
                <div className="loader">
                  <div className="chat-loader"></div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="absolute bottom-4 right-8 w-[40%]">
            <textarea
              onChange={(e) => handleTextChange(e.target.value)}
              value={userQuestion}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="w-full px-4 py-3 shadow-lg font-medium text-sm text-[#232323] rounded-xl bg-[#F4F1F5] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-2xl bg-[#804C9E] px-4 py-2 font-semibold text-sm text-white"
              onClick={() => handleSubmit()}
              disabled={disableButton}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
