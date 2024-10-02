"use client";
import { useState, useEffect } from "react";

import { useParams, useRouter } from "next/navigation";
import UploadCvForm from "../../../components/ui/profile/forms/UploadCvForm";
import ContactsForm from "../../../components/ui/profile/forms/ContactsForm";
import BioForm from "../../../components/ui/profile/forms/BioForm";
import HeroLayout from "../../../components/ui/cards/HeroLayout";

function BioPage() {
  const router = useRouter();
  const { userId } = useParams();
  const [bio, setBio] = useState();
  const [contacts, setContacts] = useState();
  const [switcher, setSwitcher] = useState("bio");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    async function getUserBio(userId) {
      const request = await fetch(`http://localhost:4000/api/${userId}/bio`);
      const userBio = await request.json();
      setBio({ ...userBio, layoutStyle: "4" });
    }
    async function getUserContacts(userId) {
      const request = await fetch(
        `http://localhost:4000/api/${userId}/contacts`
      );
      const userContacts = await request.json();
      setContacts(userContacts);
    }
    getUserBio(userId);
    getUserContacts(userId);
    setLoading(false);
    router.refresh();
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4 overflow-x-hidden overflow-y-scroll no-scrollbar p-4">
      <div className="bg-secondary w-full max-sm:w-full max-md:w-full  m-auto mt-4  rounded-md p-8 border-2 border-dashed">
        {isLoading ? (
          <div className="w-full h-full min-w-full min-h-1/2 flex justify-center items-center p-8">
            <h1 className="text-4xl">Loading...</h1>
          </div>
        ) : (
          <HeroLayout
            name={bio?.bioName}
            summary={bio?.bio}
            jobTitle={bio?.jobTitle}
            img={bio?.heroImage}
            layoutStyle={bio?.layoutStyle}
            contacts={contacts}
          />
        )}
      </div>
      <div className="w-full max-sm:w-full max-md:w-full m-auto ">
        <div className="w-full m-auto py-4 rounded-md flex gap-4 ">
          <button
            className={`px-4 py-2 w-40  max-w-40  max-sm:px-2  max-sm:py-1 border-primary-foreground  border rounded-md text-primary cursor-pointer duration-150 ${
              switcher === "bio" ? "bg-card" : "bg-secondary"
            }`}
            onClick={() => setSwitcher("bio")}
          >
            Bio
          </button>
          <button
            className={`px-4 py-2  w-40  max-w-40 max-sm:px-2  max-sm:py-1 border-primary-foreground  border rounded-md text-primary cursor-pointer duration-150 ${
              switcher === "contacts" ? "bg-card" : "bg-secondary"
            }`}
            onClick={() => setSwitcher("contacts")}
          >
            Contacts
          </button>
          <button
            className={`px-4 py-2  w-40  max-w-40 max-sm:px-2  max-sm:py-1  border-primary-foreground border rounded-md text-primary cursor-pointer duration-150 ${
              switcher === "uploadCv" ? "bg-card" : "bg-secondary"
            }`}
            onClick={() => setSwitcher("uploadCv")}
          >
            Upload CV
          </button>
        </div>
        <div className="w-full">
          {switcher === "bio" && <BioForm bio={bio} setBio={setBio} />}
          {switcher === "contacts" && (
            <ContactsForm contacts={contacts} setContacts={setContacts} />
          )}
          {switcher === "uploadCv" && <UploadCvForm />}
        </div>
      </div>
    </div>
  );
}

export default BioPage;
