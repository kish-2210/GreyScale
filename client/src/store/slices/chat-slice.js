export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  directmessagesContacts: [],

  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) => set({ selectedChatMessages }),
  setDirectmessagesContacts: (directmessagesContacts) => set ({directmessagesContacts}),
  

  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),

    addMessage: (message)=> {
      const selectedChatMessages = get().selectedChatMessages;
      const selectedChatType = get().selectedChatType;

      set({
        selectedChatMessages:[
          ...selectedChatMessages,{
            ...message,
            recipient: selectedChatType === "channel" ? message.recipient: message.recipient._id,
            sender : selectedChatType === "channel" ? message.sender: message.sender._id
            
          }
        ]
      })
    }
});
