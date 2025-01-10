import styled from "@emotion/styled";

export const ChatPageContainer = styled("div")({
  width: "80%",
  margin: "auto",

  "& .chat": {
    marginBottom: "5%",
  },
  "& .loader": {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "62%",
    marginTop: "5%",
  },
  "& .text-area, .text-area textarea": {
    width: "100%",
  },
  "& .text-area": {
    position: "relative",
  },
  "& .text-area textarea": {
    paddingRight: "40px",
  },
});

export const PopupContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  justifyContent: "center",
  alignItems: "center",
  transition: "opacity 0.3s ease",

  "& .popup-box": {
    background: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",
    width: "320px",
    textAlign: "center",
    opacity: 0,
    transform: "scale(0.8)",
    animation: "fadeInUp 0.5s ease-out forwards",
  },

  "& .form-container": {
    display: "flex",
    flexDirection: "column",

    "& div": {
      display: "flex",
      flexDirection: "column",
    },
  },

  "& .form-label": {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#444",
    textAlign: "left",
  },

  "& .form-input": {
    padding: "10px",
    marginBottom: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  },

  "& .btn-submit, .btn-close-popup": {
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },

  "& .btn-submit": {
    backgroundColor: "green",
    color: "#fff",
  },

  "& .btn-close-popup": {
    marginTop: "12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
  },

  "& .btn-submit:hover, .btn-close-popup:hover": {
    backgroundColor: "#4caf50",
  },
  "& .error": {
    color: "#e74c3c",
  },
});

export const ConversationContainer = styled("div")({
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  marginBottom: "25px",
});

export const QueryContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  marginBottom: "3%",

  "& .response": {
    color: "#fff",
    width: "69%",
  },
  "& .response-label": {
    backgroundColor: "rgba(191, 192, 194, 1)",
    border: "solid rgba(191, 192, 194, 1)",
    bottom: "23px",
    left: 0,
    position: "relative",
    right: 0,
    top: 0,
  },
  "& .response-label p": {
    fontSize: "18px",
    font: "normal normal normal 18px / 1.3em madefor-text, helveticaneuew01-45ligh, helveticaneuew02-45ligh, helveticaneuew10-45ligh, sans-serif",
    color: "rgb(0 2 9 / 80%)",
    margin: "4%",
    whiteSpace: "break-spaces",
  },
  "& .response-rect": {
    borderBottom: "23px solid transparent",
    borderRight: "23px solid transparent",
    borderTop: "18px solid rgba(191, 192, 194, 1)",
    position: "absolute",
  },
  "& .user-query": {
    position: "relative",
    backgroundColor: "rgba(186, 218, 85, 1)",
    border: "solid rgba(186, 218, 85, 1)",
    alignContent: "center",
    width: "30%",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  },
  "& .user-query-rect": {
    borderBottom: "23px solid transparent",
    borderLeft: "23px solid transparent",
    borderTop: "18px solid rgba(186, 218, 85, 1)",
    bottom: "-43px",
    position: "absolute",
    right: "-3px",
  },
  "& .user-query-label p": {
    margin: "5%",
  },
  "& .user-query-label": {
    textAlign: "center",

    overflowWrap: "break-word",
    fontSize: "18px",
    font: "normal normal normal 18px/1.3em madefor-text, helveticaneuew01-45ligh, helveticaneuew02-45ligh, helveticaneuew10-45ligh, sans-serif",
    color: "rgb(0, 2, 9)",
    letterSpacing: "-0.01em",
  },
  "@media (max-width: 1300px)": {
    "& .user-query": {
      width: "40%",
    },
  },
  "@media (max-width: 1000px)": {
    "& .user-query": {
      width: "50%",
    },
  },
  "@media (max-width: 900px)": {
    "& .user-query": {
      width: "100%",
    },
  },
});
