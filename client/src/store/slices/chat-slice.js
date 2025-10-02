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
    },

    addContactsInDMContacts: (message)=> {
      const userId = get().userInfo.id;
      const fromId = 
      message.sender._id === userId
      ? message.recipient._id
      : message.sender._id;

      const fromData = message.sender._id === userId ? message.recipient : message.sender;
      const dmContacts = get().directmessagesContacts;
      const data = dmContacts.find((contact) => contact._id === fromId );
      const index = dmContacts.findIndex((contact)=> contact._id === fromId )
      
      if(index !== -1 && index!== undefined){
        dmContacts.splice(index,1);
        dmContacts.unshift(data);
      }
      else{
        dmContacts.unshift(fromData);
      }
      set({directMessagesContacts: dmContacts})

    }
});
