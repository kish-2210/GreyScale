import { useAppStore } from "@/store"
import { Avatar, AvatarImage } from "./avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";

const ContactList = ({ contacts, isChannel = false }) => {

    const { selectedChatData, setSelectedChatData, setSelectedChatType, selectedChatType, setSelectedChatMessages } = useAppStore();

    const handleClick = (contact) => {
        if (isChannel) selectedChatType("channel");
        else setSelectedChatType("contact");
        setSelectedChatData(contact);

        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }

    }

    return (
        <div className="mt-5">
            {
                contacts.map((contact) => (
                    <div
                        key={contact._id}
                        className={`md:pl-10 py-2 transition-all duration-300  cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? " bg-[#1c1c1c] hover:bg-[#1c1c1c]" : "hover:bg-[#171616]"}`}
                        onClick={() => handleClick(contact)}
                    >
                        <div className="flex gap-5 items-center justify-start text-neutral-300 ">
                            {
                                !isChannel ? (
                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-1 min-w-0 justify-center md:justify-start">
                                        <div>
                                            <Avatar className="h-12 w-12 sm:h-15 sm:w-15 md:h-13 md:w-13 rounded-md overflow-hidden">
                                                {contact.image ? (
                                                    <AvatarImage
                                                        src={`${HOST}/${contact.image}`}
                                                        alt="profile"
                                                        className="object-cover w-full h-full bg-black"
                                                    />
                                                ) : (
                                                    <div
                                                        className={`uppercase h-full w-full flex items-center justify-center text-xl md:text-2xl rounded-md ${getColor(contact.color)}`}
                                                    >
                                                        {contact.firstName ? contact.firstName[0] : contact.email[0]}
                                                    </div>
                                                )}
                                            </Avatar>
                                        </div>
                                        <div className='hidden md:flex flex-col'>
                                            <div className='text-xl'>{contact.firstName ? contact.firstName : "User"}</div>
                                            <div className='text-sm'>{contact.email ? contact.email : ""}</div>
                                        </div>

                                    </div>

                                ) : (
                                    <div className="flex items-center gap-2 sm:gap-3 md:gap-5 flex-1 min-w-0">
                                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-md overflow-hidden">
                                            {contact.image ? (
                                                <AvatarImage
                                                    src={`${HOST}/${contact.image}`}
                                                    alt="profile"
                                                    className="object-cover w-full h-full bg-black"
                                                />
                                            ) : (
                                                <div
                                                    className={`uppercase h-full w-full flex items-center justify-center text-sm sm:text-lg md:text-xl rounded-md ${getColor(contact.color)}`}
                                                >
                                                    {contact.firstName
                                                        ? contact.firstName[0]
                                                        : contact.email[0]}
                                                </div>
                                            )}
                                        </Avatar>

                                        <div className="flex flex-col truncate">
                                            <div className="text-sm sm:text-base md:text-lg font-medium truncate">
                                                {contact.name}
                                            </div>

                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                ))
            }

        </div>
    )
}

export default ContactList
