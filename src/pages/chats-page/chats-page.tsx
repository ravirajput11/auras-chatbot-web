import { useEffect, useState, useRef } from "react";
import { useAppSelector } from "../../use-app-dispatch";
import { getChats, IChat } from "../../store/chatbotSlice";
import { useChatPage } from "./use-chat-page";
import { Button } from "@/components/ui/button";
import botChatLogo from "../../assets/chats-page-image/bot-chat-logo.png";
import chatRobotImage from "../../assets/chats-page-image/chat-robot-image-2x.png";
import chatUserLogo from "../../assets/chats-page-image/user-chat-logo.png";
import AurasBgLogo from "../../assets/AURAS-BG-LOGO.png";

interface ChatMessageProps {
  chat: IChat;
  chatContainerRef: React.RefObject<HTMLDivElement>;
}

const ChatMessage = ({ chat, chatContainerRef }: ChatMessageProps) => {
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
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
        <div
          className="text-sm w-5/6 text-[#232323] bg-[#FFFFFF] drop-shadow-[0_3px_6px_#00000029] px-7 py-4 text-[12px] rounded-r-xl rounded-bl-2xl"
          dangerouslySetInnerHTML={{ __html: chat.chatGptResponse ?? "" }}
        />
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
    <>
      <img
        className="fixed top-28 left-1/4 opacity-100"
        src={AurasBgLogo}
        alt=""
      />
      <main className="flex-1 relative max-w-6xl mx-auto pt-28 w-full p-6 flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side - Chat Interface */}
        <div className="flex-1 space-y-1 ">
          <div
            ref={chatContainerRef}
            className="h-[calc(100vh-200px)] w-6/12 overflow-y-scroll pr-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {/* Bot Avatar and Initial Message */}
            <div className="flex items-center gap-2">
              <img
                src={botChatLogo}
                alt="Bot Avatar"
                width={70}
                height={70}
                className="object-contain"
              />
              <p className="text-[#232323] bg-[#FFFFFF] drop-shadow-[0_3px_6px_#00000029] px-7 py-4 text-[12px] rounded-r-xl rounded-bl-2xl">
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

              {/* auto scroll */}
              {chats.map((chat, index) => (
                <ChatMessage
                  chat={chat}
                  key={index}
                  chatContainerRef={chatContainerRef}
                />
              ))}
              {chatResponseIsLoading && (
                <div className="loader">
                  <div className="chat-loader"></div>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <textarea
              onChange={(e) => handleTextChange(e.target.value)}
              value={userQuestion}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="fixed bottom-1 w-6/12 px-4 py-3 shadow-lg font-medium text-sm text-[#232323] rounded-xl bg-[#F4F1F5] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#663399] focus:border-transparent"
            />
            <button
              className="fixed left-2/4 rounded-2xl ring-[#804C9E] bg-[#804C9E] bottom-3 px-4 py-2 font-semibold text-sm z-10"
              onClick={() => handleSubmit()}
              disabled={disableButton}
            >
              Send
            </button>
          </div>
        </div>
        {/* Robot image */}
        <div className="fixed -right-20 md:w-8/12 h-[84vh] flex justify-center items-center">
          <img
            src={chatRobotImage}
            alt="Chat Illustration"
            width={350}
            height={450}
            className="object-contain"
          />
        </div>
      </main>
    </>
  );
};
