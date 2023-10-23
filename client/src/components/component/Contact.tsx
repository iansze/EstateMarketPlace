import { useEffect, useState } from "react";
import { ListingPost, User } from "../types/Types";
import { getUser } from "../util/Http";
import { Link } from "react-router-dom";

type ContactProps = {
  listing: ListingPost;
};

const Contact = ({ listing }: ContactProps) => {
  const [message, setMessage] = useState<string>("");
  const [landlord, setLandlord] = useState<User | null>(null);
  useEffect(() => {
    const fetching = async () => {
      const fetchUser = await getUser(listing.userRef);
      setLandlord(fetchUser);
    };
    fetching();
  }, [listing.userRef]);

  return (
    <div className="mt-4">
      <p className="">
        Contact <span className="font-bold">{landlord?.username}</span> for new
        listing updated
      </p>
      <textarea
        name="message"
        id="message"
        cols={5}
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message here"
        className="my-4 w-full rounded-md border-2 p-2"
      />
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${listing.listName}&body=${message}`}
      >
        <button className="mb-4 w-full rounded-md border-2 border-solid bg-red-500 p-2 text-center text-white">
          SEND MESSAGE
        </button>
      </Link>
    </div>
  );
};

export default Contact;
