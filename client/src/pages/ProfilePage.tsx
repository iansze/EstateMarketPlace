import Form from "../components/component/Form";
import { CurrentUser, CurrentUserState, RootState, User } from "../components/types/Types";
import { useSelector } from "react-redux";

type Props = {};

const ProfilePage = (props: Props) => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  console.log("🚀 ~ file: ProfilePage.tsx:9 ~ ProfilePage ~ currentUser:", currentUser);

  return (
    <>
      {currentUser.photo !== "" ? (
        <img src={currentUser.photo} alt="user photo" className="rounded-full mx-auto mt-20 " />
      ) : null}
      <Form mode="update" />
      <div className="flex justify-between mt-5 p-3 w-5/6 xl:w-2/6 md:w-6/12 mx-auto ">
        <span className="cursor-pointer text-red-600">Delete Account</span>
        <span className="cursor-pointer text-red-600">Sign Out</span>
      </div>
    </>
  );
};

export default ProfilePage;
