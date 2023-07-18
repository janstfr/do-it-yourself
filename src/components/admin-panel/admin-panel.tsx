import { useSession } from "next-auth/react";
import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "~/utils/api";

interface AdminPanelProps {
  userInput: string;
  setUserInput: (value: string) => void;
}

const AdminPanel: FunctionComponent<AdminPanelProps> = ({
  userInput,
  setUserInput,
}) => {
  const [widgetPrice, setWidgetPrice] = useState("");
  const [widgetName, setWidgetName] = useState("");
  const [likeInput, setLikeInput] = useState("");
  const [userID, setUserID] = useState("");
  const [userEmailInput, setUserEmailInput] = useState("");
  const [userPasswordInput, setUserPasswordInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");

  const widgetMutation = api.dbAuth.createWidget.useMutation();
  const widgetQuery = api.dbAuth.findWidgets.useQuery();
  const userQuery = api.user.findUser.useQuery({
    id: userInput,
  });
  const followMutation = api.user.changeName.useMutation();
  const createUserMutation = api.user.createUser.useMutation();
  const setPasswordMutation = api.user.setPassword.useMutation();
  const deleteAllUsersMutation = api.user.deleteAllUsers.useMutation();
  const session = useSession();

  useEffect(() => {
    console.log("session ", session);
  }, [session]);
  const inputNameHandler = (e: any) => {
    setWidgetName(e.target.value);
  };
  const inputPriceHandler = (e: any) => {
    setWidgetPrice(e.target.value);
  };

  const sendWidget = async () => {
    await widgetMutation.mutateAsync({
      name: widgetName,
      price: widgetPrice,
    });
  };

  const logSession = () => {
    console.log("session ", session);
    console.log("session status ", session.status);
  };

  const testButton = async () => {
    const data = await userQuery.refetch();
    console.log(data);
  };

  const isAuthentificated = () => {
    if (session.status === "authenticated") {
      return true;
    } else {
      return false;
    }
  };

  const getUserID = () => {
    if (session.status === "authenticated") {
      setUserID(session.data?.user?.id || "undefined");
      return;
    }

    setUserID("undefined");
  };

  const inputUserHandler = (e: any) => {
    setUserInput(e.target.value);
  };

  const inputLikeHandler = (e: any) => {
    setLikeInput(e.target.value);
  };

  const getWidgets = async () => {
    const res = (await widgetQuery.refetch()).data;
    console.log("res ", res);
  };

  const addLike = async () => {
    const id = session.data?.user?.id;

    if (id === undefined) {
      return;
    }

    await likeMutation.mutateAsync({
      userID: userID,
      postID: likeInput,
    });
  };

  const changeName = async () => {
    await followMutation
      .mutateAsync({
        userID: userID,
        newName: likeInput,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const deleteAllUsers = async () => {
    const res = await deleteAllUsersMutation.mutateAsync();
    console.log("deleteAllUsers: ", res);
  };

  const createUser = async () => {
    console.log("createUser", userEmailInput, userPasswordInput, userNameInput);
    const newUser = await createUserMutation.mutateAsync({
      email: userEmailInput,
      password: userPasswordInput,
      name: userNameInput,
    });

    console.log("newuser: ", newUser);
  };

  const setPassword = async () => {
    const res = await setPasswordMutation.mutateAsync({
      userID: userEmailInput,
      password: userPasswordInput,
    });

    console.log("setPassword: ", res);
  };

  return (
    <div>
      <div className="mt-8">
        <input
          onChange={inputNameHandler}
          value={widgetName}
          className="border-2 border-gray-500"
          placeholder="name"
        />
        <input
          onChange={inputPriceHandler}
          className="border-2 border-gray-500"
          value={widgetPrice}
          placeholder="price"
        />
        <button
          type="button"
          className="m-2 cursor-pointer border-2 border-green-400 bg-green-400 text-white"
          onClick={sendWidget}
        >
          Send Widget
        </button>
        <button
          type="button"
          className="m-2 cursor-pointer border-2 border-orange-400 bg-orange-400 text-white"
          onClick={getWidgets}
        >
          Get Widgets
        </button>
        <button
          type="button"
          className="m-2 cursor-pointer border-2 border-blue-400 bg-blue-400 text-white"
          onClick={logSession}
        >
          Log Session
        </button>
      </div>
      <div className="mt-8">
        <div className="mt-8">
          <p>User ID: {userID}</p>
          <button
            type="button"
            className="m-2 cursor-pointer border-2 border-purple-400 bg-purple-400 text-white"
            onClick={getUserID}
          >
            Get UserID
          </button>
        </div>
        <input
          onChange={inputUserHandler}
          value={userInput}
          className="border-2 border-gray-500"
          placeholder="user"
        />
        <button
          type="button"
          className="m-2 cursor-pointer border-2 border-purple-400 bg-purple-400 text-white"
          onClick={testButton}
        >
          Find User
        </button>
        <div className="mt-8">
          <input
            onChange={inputLikeHandler}
            value={likeInput}
            className="border-2 border-gray-500"
            placeholder="likeID"
          />
          <button
            type="button"
            className="m-2 cursor-pointer border-2 border-purple-400 bg-purple-400 text-white"
            onClick={changeName}
          >
            Change Name
          </button>
        </div>
      </div>
      <div className="mt-8">
        <div className="mt-8 flex">
          <p>Create User {userID}</p>
        </div>
        <div>
          <div>
            <p>Überschrift</p>
            <input
              className="border-2 border-gray-500"
              onChange={(e) => setUserEmailInput(e.target.value)}
              value={userEmailInput}
              placeholder="e-mail.."
            />
            <input
              className="border-2 border-gray-500"
              onChange={(e) => setUserPasswordInput(e.target.value)}
              value={userPasswordInput}
              placeholder="password.."
            />
            <input
              className="border-2 border-gray-500"
              onChange={(e) => setUserNameInput(e.target.value)}
              value={userNameInput}
              placeholder="name..."
            />
          </div>
          <button
            className="m-2 cursor-pointer border-2 border-green-400 bg-green-400 text-white"
            onClick={createUser}
          >
            Create User
          </button>
          <button
            className="m-2 cursor-pointer border-2 border-green-400 bg-green-400 text-white"
            onClick={setPassword}
          >
            Set Password
          </button>
          <button
            className="m-2 cursor-pointer border-2 border-red-400 bg-red-400 text-white"
            onClick={deleteAllUsers}
          >
            DELETE ALL USERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

/* model User {
    id            String    @id @unique @default(cuid())
    name          String?
    password      String?
    email         String?   @unique
    emailVerified DateTime?
    image         String?
    accounts      Account[]
    sessions      Session[]
    likes         String[]
    posts         Post[]    @relation("WrittenPosts")
    favoritePosts Post[]    @relation("FavoritePosts")
}
*/
