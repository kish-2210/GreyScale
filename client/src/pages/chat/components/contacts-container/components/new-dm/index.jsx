
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import { IoSearchOutline } from "react-icons/io5";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants.js";
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import Lottie from "lottie-react";
import GemDark from "@/assets/gem-dark.json"


const Newdm = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [openNewContactModal, setOpenNewContactModal] = useState(false)
  const [searchedContacts, setSearchedContacts] = useState([])
  const searchContact = async (searchText) => {
    try {
      if (searchText.length > 0) {
        const res = await apiClient.post(SEARCH_CONTACTS_ROUTES, { searchText }, { withCredentials: true });
        if (res.status === 200 && res.data.contacts) {
          setSearchedContacts(res.data.contacts)
        }
      }
      else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error)
    }

  }

  const selectNewContact = (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact)
    setSearchedContacts([]);

  }

  return (
    <div>
      <Tooltip>
        <TooltipTrigger>
          <IoSearchOutline
            className="text-2xl md:text-xl text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
            onClick={() => setOpenNewContactModal(true)}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p> Search Contact</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent
          className="bg-[#1c1c1c] border-none text-white 
                 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                 max-h-[80vh] flex flex-col"
        >
          <DialogHeader>
            <DialogTitle> Select a contact </DialogTitle>
          </DialogHeader>

          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-md p-5 sm:p-5 text-white bg-greyI border-0 focus:ring-0 focus:border-white w-full md:h-12"
              onChange={e => searchContact(e.target.value)}
            />
          </div>

          <ScrollArea className="flex flex-col gap-5 mt-4">
            {searchedContacts.map(contact => (
              <div
                key={contact._id}
                className="flex gap-3 items-center cursor-pointer mb-3"
                onClick={() => selectNewContact(contact)}
              >
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

                <div className="flex flex-col">
                  <div className="text-base sm:text-lg md:text-xl">
                    {contact.firstName ? contact.firstName : "User"}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base">
                    {contact.email ? contact.email : ""}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>

          {searchedContacts.length <= 0 && (
            <div className="text-center text-neutral-400 py-4">
              <Lottie
                animationData={GemDark}
                style={{ width: "150px", height: "150px", margin: "0 auto" }}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>


  )

}

export default Newdm
